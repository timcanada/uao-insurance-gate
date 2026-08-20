import type { ClassifiedPost, Desk, Format, GhostPost, SectionDef } from '../types';

export const FILTERS = {
  latest: '',
  dailyBrief: 'tag:hash-daily-brief',
  probabilityDesk: 'tag:hash-probability-desk',
  research: 'tag:hash-research',
  charts: 'tag:hash-chart',
  video: 'tag:hash-video-briefing',
  podcast: 'tag:hash-podcast',
  featured: 'tag:hash-homepage-featured',
} as const;

export const DESK_FILTERS: Record<Exclude<Desk, 'other'>, string> = {
  'universal-owner': FILTERS.dailyBrief,
  'probability-desk': FILTERS.probabilityDesk,
  research: FILTERS.research,
};

export const FORMAT_FILTERS: Record<Format, string> = {
  read: FILTERS.dailyBrief,
  watch: FILTERS.video,
  listen: FILTERS.podcast,
  chart: FILTERS.charts,
};

export const THEMES: SectionDef[] = [
  {
    slug: 'infrastructure',
    title: 'Infrastructure',
    kicker: 'Theme',
    blurb: 'Physical systems, grids, ports and the capital that owns them.',
    filter: 'tag:infrastructure',
  },
  {
    slug: 'ai-infrastructure',
    title: 'AI Infrastructure',
    kicker: 'Theme',
    blurb: 'Compute, power, credit and the build-out behind the model layer.',
    filter: 'tag:ai-infrastructure',
  },
  {
    slug: 'private-credit',
    title: 'Private Credit',
    kicker: 'Theme',
    blurb: 'Insurance, pensions and the private-credit stack.',
    filter: 'tag:private-credit',
  },
  {
    slug: 'esg-sustainability',
    title: 'ESG & Sustainability',
    kicker: 'Theme',
    blurb: 'Stewardship, disclosure and the long-horizon book.',
    filter: 'tag:esg-sustainability',
  },
  {
    slug: 'energy-transition',
    title: 'Energy Transition',
    kicker: 'Theme',
    blurb: 'Power, fuels and the transition that asset owners already hold.',
    filter: 'tag:energy-transition',
  },
  {
    slug: 'geopolitics',
    title: 'Geopolitics',
    kicker: 'Theme',
    blurb: 'Chokepoints, sanctions and political risk that cannot be diversified away.',
    filter: 'tag:geopolitics',
  },
  {
    slug: 'universal-ownership',
    title: 'Universal Ownership',
    kicker: 'Theme',
    blurb: 'What it means to own the market, not a slice of it.',
    filter: 'tag:universal-ownership',
  },
  {
    slug: 'long-horizon-capital',
    title: 'Long-Horizon Capital',
    kicker: 'Theme',
    blurb: 'Pensions, sovereigns, endowments and family offices thinking in decades.',
    filter: 'tag:long-horizon-capital',
  },
];

export const PEOPLE: SectionDef[] = [
  {
    slug: 'sovereign-wealth',
    title: 'Sovereign Wealth',
    kicker: 'People & institutions',
    blurb: 'State balance sheets investing at the scale of nations.',
    filter: 'tag:sovereign-wealth',
  },
  {
    slug: 'public-pensions',
    title: 'Public Pensions',
    kicker: 'People & institutions',
    blurb: 'What the world’s largest plans are actually doing.',
    filter: 'tag:public-pensions',
  },
  {
    slug: 'endowments',
    title: 'Endowments & Foundations',
    kicker: 'People & institutions',
    blurb: 'Perpetual capital and the endowment model.',
    filter: 'tag:endowments',
  },
  {
    slug: 'family-offices',
    title: 'Family Offices',
    kicker: 'People & institutions',
    blurb: 'Multi-generational capital, taken seriously.',
    filter: 'tag:family-offices',
  },
  {
    slug: 'private-markets',
    title: 'Private Markets',
    kicker: 'People & institutions',
    blurb: 'Private equity, credit and the allocators behind them.',
    filter: 'tag:private-markets',
  },
  {
    slug: 'policy-regulation',
    title: 'Policy & Regulation',
    kicker: 'People & institutions',
    blurb: 'The rules shaping where long capital can go.',
    filter: 'tag:policy-regulation',
  },
];

function tagSlugs(post: GhostPost): string[] {
  return (post.tags ?? []).map((tag) => tag.slug.toLowerCase());
}

function hasAny(slugs: string[], needles: string[]): boolean {
  return slugs.some((slug) =>
    needles.some((needle) => slug === needle || slug === `hash-${needle}` || slug.includes(needle)),
  );
}

export function classifyFormat(post: GhostPost): Format {
  const slugs = tagSlugs(post);
  if (hasAny(slugs, ['podcast', 'video-podcast'])) return 'listen';
  if (hasAny(slugs, ['video-briefing', 'daily-video', 'video', 'probability-desk-video'])) return 'watch';
  if (hasAny(slugs, ['chart', 'chart-of-the-day', 'pd-chart-of-the-day'])) return 'chart';
  return 'read';
}

export function classifyDesk(post: GhostPost): Desk {
  const slugs = tagSlugs(post);
  if (hasAny(slugs, ['probability-desk', 'the-probability-desk', 'pd-chart-of-the-day'])) {
    return 'probability-desk';
  }
  if (hasAny(slugs, ['research', 'uao-research', 'flagship'])) return 'research';
  if (hasAny(slugs, ['daily-brief', 'uao-daily', 'the-universal-owner', 'universal-owner'])) {
    return 'universal-owner';
  }
  return 'other';
}

export function deskLabel(desk: Desk): string {
  switch (desk) {
    case 'universal-owner':
      return 'The Universal Owner';
    case 'probability-desk':
      return 'The Probability Desk';
    case 'research':
      return 'UAO Research';
    default:
      return 'Universal Asset Owners';
  }
}

export function formatLabel(format: Format): string {
  switch (format) {
    case 'watch':
      return 'Watch';
    case 'listen':
      return 'Listen';
    case 'chart':
      return 'Chart';
    default:
      return 'Read';
  }
}

export function postSummary(post: GhostPost): string {
  return (post.custom_excerpt || post.excerpt || '').trim();
}

export function classifyPost(post: GhostPost): ClassifiedPost {
  const desk = classifyDesk(post);
  const format = classifyFormat(post);
  const kicker =
    format === 'read' ? deskLabel(desk) : `${deskLabel(desk)} · ${formatLabel(format)}`;
  return {
    ...post,
    desk,
    format,
    kicker,
    summary: postSummary(post),
  };
}

export function searchFilter(query: string): string {
  const cleaned = query.replace(/'/g, '').trim();
  if (!cleaned) return '';
  return `title:~'${cleaned}'`;
}
