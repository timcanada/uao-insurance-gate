import { BOOK_NAMES, type BookName } from './names';

export const DEFAULT_WATCH = ['cpp', 'calpers', 'nbim', 'hormuz', '30y'] as const;

export function normalizeWatch(ids: unknown): string[] {
  const allowed = new Set(BOOK_NAMES.map((name) => name.id));
  const list = Array.isArray(ids) ? ids.map(String) : [];
  const next = list.filter((id) => allowed.has(id));
  return next.length ? Array.from(new Set(next)) : [...DEFAULT_WATCH];
}

export function toggleWatch(ids: string[], id: string): string[] {
  const allowed = BOOK_NAMES.some((name) => name.id === id);
  if (!allowed) return normalizeWatch(ids);
  const have = new Set(normalizeWatch(ids));
  if (have.has(id)) have.delete(id);
  else have.add(id);
  const next = BOOK_NAMES.map((name) => name.id).filter((key) => have.has(key));
  return next.length ? next : [...DEFAULT_WATCH];
}

export function watchedNames(ids: string[]): BookName[] {
  const have = new Set(normalizeWatch(ids));
  return BOOK_NAMES.filter((name) => have.has(name.id));
}
