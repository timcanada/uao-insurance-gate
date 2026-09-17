import { isPublicDeskCopy } from './ic';
import { nameHits } from './names';

export type PeerKind = 'holdings' | 'vote' | 'filing';

export type PeerSeed = {
  id: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  slug?: string;
  url?: string;
  source?: string;
};

export type PeerItem = PeerSeed & {
  kind: PeerKind;
  label: string;
  names: string[];
};

export const PEER_LABEL: Record<PeerKind, string> = {
  holdings: 'Holdings',
  vote: 'Vote',
  filing: 'Filing',
};

export const PEER_COPY =
  'Who moved — holdings, votes, filings the desk already printed. Not a 13F we invented. SWFI already sells the scrape.';

export const PEER_EMPTY =
  'No peer filing the desk has printed since Tuesday. We do not invent a 13F.';

export function peerKind(title: string, summary = ''): PeerKind | null {
  const blob = `${title} ${summary}`;
  if (!nameHits(blob).length) return null;
  if (/\b(13[\s-]?f|form 13[dfg]|13d|13g|filed prospectus|prospectus names)\b/i.test(blob)) {
    return 'filing';
  }
  if (
    /\b(owned versus voted|proxy (vote|solic|season)|shareholder proposal|voted (for|against|down))\b/i.test(
      blob,
    )
  ) {
    return 'vote';
  }
  if (
    /\b(holdings (report|disclosure|file|rose|fell|cut|added)|disclosed (its )?(holdings|stake|position)|stake disclosure|increased its stake|cut its stake|among the sellers|among the buyers)\b/i.test(
      blob,
    ) ||
    (/\bsold\b/i.test(blob) && /\bbought\b/i.test(blob))
  ) {
    return 'holdings';
  }
  return null;
}

export function sinceTuesdayMs(nowMs = Date.now()): number {
  const now = new Date(nowMs);
  const day = now.getUTCDay();
  const back = (day + 5) % 7;
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - back);
}

export function assemblePeers(seeds: PeerSeed[], nowMs = Date.now(), limit = 6): PeerItem[] {
  const floor = sinceTuesdayMs(nowMs);
  const seen = new Set<string>();
  const out: PeerItem[] = [];
  const ranked = [...seeds].sort(
    (a, b) => (Date.parse(b.publishedAt || '') || 0) - (Date.parse(a.publishedAt || '') || 0),
  );
  for (const seed of ranked) {
    if (!isPublicDeskCopy(seed.title)) continue;
    const kind = peerKind(seed.title, seed.summary || '');
    if (!kind) continue;
    const t = Date.parse(seed.publishedAt || '');
    if (Number.isNaN(t) || t < floor || t > nowMs + 60 * 60 * 1000) continue;
    const key = (seed.slug || seed.url || seed.title || '').toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({
      ...seed,
      kind,
      label: PEER_LABEL[kind],
      names: nameHits(`${seed.title} ${seed.summary || ''}`).map((name) => name.label),
    });
    if (out.length >= limit) break;
  }
  return out;
}
