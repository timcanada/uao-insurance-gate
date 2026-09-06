import { FLOW_LABEL, flowKind, type FlowKind } from './flows';
import { nameHits } from './names';
import { normalizeWatch } from './watch';

export type WireDeskFilter = 'ALL' | 'UAO' | 'OFFICIAL' | 'BOOK' | 'FLOWS';
export type WireNameFilter = 'ALL' | 'WATCH' | string;

export type WireLike = {
  id?: string;
  desk?: string;
  title?: string;
  summary?: string;
  source?: string;
  publishedAt?: string;
  slug?: string;
  url?: string;
};

export const WIRE_OPENED_KEY = 'uao.wireOpenedAt';

export function itemNameIds(item: WireLike): string[] {
  return nameHits(`${item.title || ''} ${item.summary || ''} ${item.source || ''}`).map((name) => name.id);
}

export function itemNames(item: WireLike): string[] {
  return nameHits(`${item.title || ''} ${item.summary || ''} ${item.source || ''}`).map((name) => name.label);
}

export function hitsWatch(item: WireLike, watchIds: string[]): boolean {
  const have = new Set(normalizeWatch(watchIds));
  return itemNameIds(item).some((id) => have.has(id));
}

export function itemFlow(item: WireLike): FlowKind | null {
  return flowKind(item.title || '', item.summary || '');
}

export function itemFlowLabel(item: WireLike): string | null {
  const kind = itemFlow(item);
  return kind ? FLOW_LABEL[kind] : null;
}

export function visibleWire<T extends WireLike>(
  items: T[],
  desk: WireDeskFilter,
  name: WireNameFilter,
  watchIds: string[],
): T[] {
  return items.filter((item) => {
    if (desk === 'FLOWS') {
      if (!itemFlow(item)) return false;
    } else if (desk !== 'ALL' && item.desk !== desk) {
      return false;
    }
    if (name === 'ALL') return true;
    if (name === 'WATCH') return hitsWatch(item, watchIds);
    return itemNameIds(item).includes(name);
  });
}

export function wireItemKey(item: WireLike): string {
  return (item.url || item.slug || item.id || item.title || '').toLowerCase();
}

export function parseLastOpen(raw: string | null | undefined): number | null {
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function printedSinceOpen<T extends WireLike>(
  items: T[],
  watchIds: string[],
  lastOpenMs: number | null,
): T[] {
  if (lastOpenMs == null || !Number.isFinite(lastOpenMs)) return [];
  const seen = new Set<string>();
  return items.filter((item) => {
    if (!hitsWatch(item, watchIds)) return false;
    const t = Date.parse(item.publishedAt || '');
    if (Number.isNaN(t) || t <= lastOpenMs) return false;
    const key = wireItemKey(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
