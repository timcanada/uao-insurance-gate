export type GhostTag = {
  id: string;
  name: string;
  slug: string;
  visibility?: string;
};

export type GhostAuthor = {
  id: string;
  name: string;
  slug: string;
  profile_image?: string | null;
};

export type GhostPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  custom_excerpt?: string | null;
  html?: string | null;
  feature_image?: string | null;
  published_at: string;
  reading_time?: number | null;
  url: string;
  visibility?: string;
  tags?: GhostTag[];
  authors?: GhostAuthor[];
};

export type GhostPagination = {
  page: number;
  limit: number;
  pages: number;
  total: number;
  next: number | null;
  prev: number | null;
};

export type GhostPostsResponse = {
  posts: GhostPost[];
  meta: { pagination: GhostPagination };
};

export type Desk = 'universal-owner' | 'probability-desk' | 'research' | 'other';
export type Format = 'read' | 'watch' | 'listen' | 'chart';

export type ClassifiedPost = GhostPost & {
  desk: Desk;
  format: Format;
  kicker: string;
  summary: string;
};

export type SectionDef = {
  slug: string;
  title: string;
  kicker: string;
  blurb: string;
  filter: string;
};
