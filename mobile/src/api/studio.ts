const RSS2JSON = 'https://api.rss2json.com/v1/api.json?rss_url=';

export const YOUTUBE_CHANNEL_ID = 'UCN7F2P9H29cIxwWyIIq7BxQ';
export const YOUTUBE_FEED =
  'https://www.youtube.com/feeds/videos.xml?channel_id=' + YOUTUBE_CHANNEL_ID;
export const YOUTUBE_CHANNEL = 'https://www.youtube.com/@UniversalOwners';

export const PODCASTS = [
  {
    id: 'tuo',
    title: 'The Universal Owner',
    rss: 'https://feed.podbean.com/universalassetowners/feed.xml',
  },
  {
    id: 'pd',
    title: 'The Probability Desk',
    rss: 'https://feed.podbean.com/probabilitydesk/feed.xml',
  },
] as const;

export type Episode = {
  show: string;
  title: string;
  publishedAt: string;
  audio: string;
  duration?: number;
  summary: string;
};

export type StudioShow = {
  id: string;
  title: string;
  publishedAt: string;
  videoId: string;
  thumbnail?: string;
};

export function youtubeId(url: string): string | null {
  const match =
    url.match(/[?&]v=([\w-]+)/) ||
    url.match(/youtu\.be\/([\w-]+)/) ||
    url.match(/\/(?:v|embed)\/([\w-]+)/);
  const id = match?.[1] ?? null;
  return id && /^[\w-]{11}$/.test(id) ? id : null;
}

export function safeAudioUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return null;
    if (!/(^|\.)podbean\.com$/i.test(parsed.hostname)) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

export function audioPlayerHtml(url: string): string | null {
  const src = safeAudioUrl(url);
  if (!src) return null;
  return (
    '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">' +
    `<audio controls playsinline style="width:100%" src=${JSON.stringify(src)}></audio>`
  );
}

function strip(html?: string): string {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

async function rss2json(url: string): Promise<Record<string, unknown>[]> {
  const response = await fetch(`${RSS2JSON}${encodeURIComponent(url)}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) return [];
  const data = (await response.json()) as { status?: string; items?: Record<string, unknown>[] };
  return data.status === 'ok' ? data.items || [] : [];
}

export function episodeFromRss(show: string, item: Record<string, unknown>): Episode | null {
  const enclosure = (item.enclosure || {}) as { link?: string; type?: string; duration?: number };
  const audio = enclosure.link || '';
  if (!audio || (enclosure.type && !String(enclosure.type).includes('audio'))) return null;
  return {
    show,
    title: String(item.title || '').trim(),
    publishedAt: item.pubDate ? new Date(String(item.pubDate)).toISOString() : '',
    audio,
    duration: enclosure.duration,
    summary: strip(String(item.description || '')).slice(0, 220),
  };
}

export function showFromRss(item: Record<string, unknown>): StudioShow | null {
  const id = youtubeId(String(item.link || item.guid || ''));
  if (!id) return null;
  return {
    id,
    title: String(item.title || '').trim(),
    publishedAt: item.pubDate ? new Date(String(item.pubDate)).toISOString() : '',
    videoId: id,
    thumbnail: typeof item.thumbnail === 'string' ? item.thumbnail : undefined,
  };
}

export async function fetchEpisodes(): Promise<Episode[]> {
  const batches = await Promise.all(
    PODCASTS.map(async (show) => {
      const items = await rss2json(show.rss);
      return items
        .map((item) => episodeFromRss(show.title, item))
        .filter((item): item is Episode => Boolean(item));
    }),
  );
  return batches.flat().sort((a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0));
}

export async function fetchStudioShows(): Promise<StudioShow[]> {
  const items = await rss2json(YOUTUBE_FEED);
  const seen = new Set<string>();
  return items
    .map(showFromRss)
    .filter((item): item is StudioShow => {
      if (!item || seen.has(item.videoId)) return false;
      seen.add(item.videoId);
      return true;
    });
}
