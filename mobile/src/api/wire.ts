import { fetchPosts } from './ghost';

export type WireDesk = 'UAO' | 'OFFICIAL' | 'BOOK';

export type WireItem = {
  id: string;
  desk: WireDesk;
  source: string;
  title: string;
  publishedAt: string;
  summary?: string;
  slug?: string;
  url?: string;
};

const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

export const OFFICIAL_FEEDS: { source: string; url: string }[] = [
  { source: 'Federal Reserve', url: 'https://www.federalreserve.gov/feeds/press_all.xml' },
  { source: 'ECB', url: 'https://www.ecb.europa.eu/rss/press.html' },
  { source: 'SEC', url: 'https://www.sec.gov/news/pressreleases.rss' },
  { source: 'BIS', url: 'https://www.bis.org/doclist/all_pressrels.rss' },
];

export const BOOK_FEED =
  'https://news.google.com/rss/search?q=%22sovereign+wealth%22+OR+%22pension+fund%22+OR+%22family+office%22&hl=en-US&gl=US&ceid=US:en';

type Rss2JsonItem = {
  title?: string;
  pubDate?: string;
  link?: string;
  guid?: string;
  description?: string;
};

function strip(html?: string): string {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function isJustIn(iso?: string, minutes = 30): boolean {
  if (!iso) return false;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return false;
  return Date.now() - then < minutes * 60 * 1000;
}

export function mergeWire(items: WireItem[]): WireItem[] {
  const seen = new Set<string>();
  return items
    .filter((item) => {
      const key = (item.url || item.slug || item.title).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return Boolean(item.title);
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

async function fromRss2Json(source: string, desk: WireDesk, url: string): Promise<WireItem[]> {
  const response = await fetch(`${RSS2JSON}${encodeURIComponent(url)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) return [];
  const data = (await response.json()) as { status?: string; items?: Rss2JsonItem[] };
  if (data.status !== 'ok') return [];
  return (data.items ?? []).slice(0, 8).map((item, index) => ({
    id: `${source}-${item.guid || item.link || index}`,
    desk,
    source,
    title: (item.title || '').replace(/\s+-\s+[^-]+$/, '').trim(),
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
    summary: strip(item.description).slice(0, 180),
    url: item.link,
  }));
}

export async function fetchDeskWire(): Promise<WireItem[]> {
  const { posts } = await fetchPosts({ limit: 24 });
  return posts.map((post) => ({
    id: post.id,
    desk: 'UAO' as const,
    source: post.kicker,
    title: post.title,
    publishedAt: post.published_at || new Date().toISOString(),
    summary: post.summary,
    slug: post.slug,
    url: post.url,
  }));
}

export async function fetchOfficialWire(): Promise<WireItem[]> {
  const batches = await Promise.all(
    OFFICIAL_FEEDS.map((feed) => fromRss2Json(feed.source, 'OFFICIAL', feed.url).catch(() => [])),
  );
  return batches.flat();
}

export async function fetchBookWire(): Promise<WireItem[]> {
  return fromRss2Json('Allocator wire', 'BOOK', BOOK_FEED).catch(() => []);
}

export async function fetchWire(): Promise<WireItem[]> {
  const [desk, official, book] = await Promise.all([
    fetchDeskWire().catch(() => []),
    fetchOfficialWire().catch(() => []),
    fetchBookWire().catch(() => []),
  ]);
  return mergeWire([...desk, ...official, ...book]);
}
