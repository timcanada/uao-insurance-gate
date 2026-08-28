export type Sleeve = {
  id: 'energy' | 'lanes' | 'insurance' | 'duration' | 'credit' | 'dc';
  label: string;
  needles: string[];
};

export const SLEEVES: Sleeve[] = [
  {
    id: 'energy',
    label: 'Energy',
    needles: ['brent', 'wti', 'crude', 'opec', 'lng', 'oil price', 'refinery', 'tungsten'],
  },
  {
    id: 'lanes',
    label: 'Sea lanes',
    needles: ['hormuz', 'strait', 'red sea', 'suez', 'tanker', 'chokepoint', 'cargo', 'shipping'],
  },
  {
    id: 'insurance',
    label: 'Insurance',
    needles: ['war risk', 'reinsurance', 'lloyd', 'hull', 'premium', 'insurer'],
  },
  {
    id: 'duration',
    label: 'Duration',
    needles: [
      '30-year',
      '30 year',
      'discount rate',
      'h.15',
      'gilt',
      'duration',
      'liability',
      'long bond',
      'treasury yield',
      'convexity',
    ],
  },
  {
    id: 'credit',
    label: 'Private credit',
    needles: ['private credit', 'direct lending', 'private-markets', 'private markets', 'secondaries', 'unquoted'],
  },
  {
    id: 'dc',
    label: 'DC',
    needles: ['defined contribution', 'target-date', 'target date', 'dc sleeve', 'dc plan', '401(k)'],
  },
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasNeedle(haystack: string, needle: string): boolean {
  const hay = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (n.includes(' ') || n.includes('(')) return hay.includes(n);
  return new RegExp(`\\b${escapeRegExp(n)}\\b`, 'i').test(haystack);
}

export function sleeveHits(text: string): Sleeve[] {
  return SLEEVES.filter((sleeve) => sleeve.needles.some((needle) => hasNeedle(text, needle)));
}

export type LitSleeve = {
  id: Sleeve['id'];
  label: string;
  lit: boolean;
  titles: string[];
};

export function lightSleeves(
  items: { title?: string; summary?: string; html?: string | null }[],
): LitSleeve[] {
  return SLEEVES.map((sleeve) => {
    const titles: string[] = [];
    for (const item of items) {
      const blob = `${item.title || ''} ${item.summary || ''} ${item.html || ''}`;
      if (sleeve.needles.some((needle) => hasNeedle(blob, needle))) {
        if (item.title && !titles.includes(item.title)) titles.push(item.title);
      }
    }
    return { id: sleeve.id, label: sleeve.label, lit: titles.length > 0, titles: titles.slice(0, 2) };
  });
}
