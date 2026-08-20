import { classifyPost } from '../lib/classify';
import type { ClassifiedPost, GhostPost, GhostPostsResponse } from '../types';

export const GHOST_API = 'https://universal-asset-owners.ghost.io/ghost/api/content';
export const GHOST_KEY = '4cb0118527b7b2a473e665856a';

export type FetchPostsOptions = {
  filter?: string;
  page?: number;
  limit?: number;
  includeHtml?: boolean;
};

function buildUrl(path: string, params: Record<string, string | number | undefined>): string {
  const search = new URLSearchParams({ key: GHOST_KEY });
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') search.set(key, String(value));
  }
  return `${GHOST_API}${path}?${search.toString()}`;
}

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`UAO content request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

const LIST_FIELDS = [
  'id',
  'slug',
  'title',
  'excerpt',
  'custom_excerpt',
  'feature_image',
  'published_at',
  'reading_time',
  'url',
  'visibility',
].join(',');

export async function fetchPosts(options: FetchPostsOptions = {}): Promise<{
  posts: ClassifiedPost[];
  pages: number;
  total: number;
  page: number;
}> {
  const { filter = '', page = 1, limit = 12, includeHtml = false } = options;
  const url = buildUrl('/posts/', {
    limit,
    page,
    include: 'tags,authors',
    order: 'published_at DESC',
    filter,
    fields: includeHtml ? undefined : LIST_FIELDS,
  });
  const data = await getJson<GhostPostsResponse>(url);
  return {
    posts: (data.posts ?? []).map(classifyPost),
    pages: data.meta?.pagination?.pages ?? 1,
    total: data.meta?.pagination?.total ?? 0,
    page: data.meta?.pagination?.page ?? page,
  };
}

export async function fetchPostBySlug(slug: string): Promise<ClassifiedPost> {
  const url = buildUrl(`/posts/slug/${encodeURIComponent(slug)}/`, {
    include: 'tags,authors',
  });
  const data = await getJson<{ posts: GhostPost[] }>(url);
  const post = data.posts?.[0];
  if (!post) throw new Error('This briefing is not available.');
  return classifyPost(post);
}

export async function searchPosts(query: string, page = 1): Promise<ClassifiedPost[]> {
  const cleaned = query.replace(/'/g, '').trim();
  if (!cleaned) return [];
  const { posts } = await fetchPosts({
    filter: `title:~'${cleaned}'`,
    page,
    limit: 20,
  });
  return posts;
}
