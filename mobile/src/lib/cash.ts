import { FLOW_LABEL, flowKind } from './flows';

export type CashSeed = {
  id: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  slug?: string;
  url?: string;
  source?: string;
};

export type CashItem = CashSeed & {
  kind: 'pacing' | 'private-markets';
  label: string;
};

export const CASH_COPY =
  'Cash the desk already printed — calls, tenders, distributions, pacing. Not your statements. Addepar already holds those.';

export function isCashCopy(title: string, summary = ''): boolean {
  const kind = flowKind(title, summary);
  return kind === 'pacing' || kind === 'private-markets';
}

export function publishedWithinDays(iso: string | undefined, nowMs: number, days: number): boolean {
  if (!iso) return false;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  const horizon = days * 24 * 60 * 60 * 1000;
  return t <= nowMs + 60 * 60 * 1000 && nowMs - t <= horizon;
}

export function assembleCash(seeds: CashSeed[], nowMs = Date.now(), days = 7, limit = 6): CashItem[] {
  const seen = new Set<string>();
  const out: CashItem[] = [];
  const ranked = [...seeds].sort(
    (a, b) => (Date.parse(b.publishedAt || '') || 0) - (Date.parse(a.publishedAt || '') || 0),
  );
  for (const seed of ranked) {
    if (!isCashCopy(seed.title, seed.summary || '')) continue;
    if (!publishedWithinDays(seed.publishedAt, nowMs, days)) continue;
    const key = (seed.slug || seed.url || seed.title || '').toLowerCase();
    if (!key || seen.has(key)) continue;
    const kind = flowKind(seed.title, seed.summary || '');
    if (kind !== 'pacing' && kind !== 'private-markets') continue;
    seen.add(key);
    out.push({ ...seed, kind, label: FLOW_LABEL[kind] });
    if (out.length >= limit) break;
  }
  return out;
}
