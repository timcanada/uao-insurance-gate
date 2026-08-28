export type PackKind = 'brief' | 'desk' | 'research' | 'people' | 'official' | 'peer';

export type PackSeed = {
  id: string;
  title: string;
  publishedAt: string;
  slug?: string;
  url?: string;
  source: string;
  kind: PackKind;
};

export type PackItem = PackSeed & { why: string };

export function isPublicDeskCopy(title: string): boolean {
  return !/\[QC|NOT SENT TO LIST/i.test(title || '');
}

export function isChartOfTheDay(title: string): boolean {
  return /^(pd\s+)?chart of the day/i.test((title || '').trim());
}

export function defaultLastIc(now = new Date()): string {
  const d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export function parseLastIc(raw: string | null | undefined, now = new Date()): string {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return defaultLastIc(now);
}

export function publishedOnOrAfter(iso: string | undefined, lastIc: string): boolean {
  if (!iso) return false;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  const floor = Date.parse(`${lastIc}T00:00:00.000Z`);
  if (Number.isNaN(floor)) return false;
  return t >= floor;
}

const WHY: Record<PackKind, string> = {
  brief: 'Morning desk — the board did not have this edition.',
  desk: 'Probability Desk — weights, or the scenario that moved them.',
  research: 'A report. Take the chart, not the adjective.',
  people: 'Who moved. Mandate, not gossip.',
  official: 'A primary. If it is not official, it is not in this pack.',
  peer: 'A peer print on a name you already hold.',
};

function kindRank(kind: PackKind): number {
  return { brief: 0, desk: 1, official: 2, people: 3, peer: 4, research: 5 }[kind];
}

export function assemblePack(seeds: PackSeed[], lastIc: string, limit = 12): PackItem[] {
  const eligible = seeds
    .filter((item) => isPublicDeskCopy(item.title) && !isChartOfTheDay(item.title))
    .filter((item) => publishedOnOrAfter(item.publishedAt, lastIc))
    .sort((a, b) => {
      const byDate = (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0);
      if (byDate) return byDate;
      return kindRank(a.kind) - kindRank(b.kind);
    });

  const used = new Set<string>();
  const out: PackItem[] = [];
  const seenTitle = new Set<string>();

  function take(item: PackSeed) {
    const key = (item.slug || item.url || item.title).toLowerCase();
    const titleKey = item.title.trim().toLowerCase();
    if (used.has(key) || seenTitle.has(titleKey)) return;
    used.add(key);
    seenTitle.add(titleKey);
    out.push({ ...item, why: WHY[item.kind] });
  }

  for (const kind of ['brief', 'desk', 'official', 'people', 'research'] as PackKind[]) {
    const next = eligible.find((item) => item.kind === kind);
    if (next) take(next);
  }
  for (const item of eligible) {
    if (out.length >= limit) break;
    take(item);
  }
  return out.slice(0, limit);
}
