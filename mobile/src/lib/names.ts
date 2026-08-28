export type BookName = {
  id: string;
  label: string;
  needles: string[];
};

export const BOOK_NAMES: BookName[] = [
  { id: 'cpp', label: 'CPP', needles: ['cpp investments', 'canada pension', 'cpib'] },
  { id: 'calpers', label: 'CalPERS', needles: ['calpers'] },
  { id: 'calstrs', label: 'CalSTRS', needles: ['calstrs'] },
  { id: 'otpp', label: 'OTPP', needles: ['otpp', 'ontario teachers'] },
  { id: 'nbim', label: 'NBIM', needles: ['nbim', 'norges bank'] },
  { id: 'gic', label: 'GIC', needles: ['gic'] },
  { id: 'adia', label: 'ADIA', needles: ['adia'] },
  { id: 'pif', label: 'PIF', needles: ['public investment fund'] },
  { id: 'temasek', label: 'Temasek', needles: ['temasek'] },
  { id: 'cic', label: 'CIC', needles: ['china investment corporation'] },
  { id: 'abp', label: 'ABP', needles: ['abp'] },
  { id: 'kic', label: 'KIC', needles: ['korea investment', 'kic'] },
  { id: 'nps', label: 'NPS', needles: ['national pension service'] },
  { id: 'hormuz', label: 'Hormuz', needles: ['hormuz'] },
  { id: 'brent', label: 'Brent', needles: ['brent'] },
  { id: '30y', label: '30-year', needles: ['30-year', '30 year', 'long bond'] },
];

const JUNK = [
  'marketbeat',
  'makes new investment',
  'should trump create',
  'holdings report -',
  'zacks',
  'tipranks',
  'stocknews',
];

export const BOOK_FEED_QUERY =
  'CalPERS OR "CPP Investments" OR NBIM OR "Norges Bank" OR Temasek OR "Ontario Teachers" OR ADIA OR "Korea Investment" OR "sovereign wealth fund" OR "pension CIO"';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function hasNeedle(haystack: string, needle: string): boolean {
  const hay = haystack.toLowerCase();
  const n = needle.toLowerCase();
  if (n.includes(' ')) return hay.includes(n);
  return new RegExp(`\\b${escapeRegExp(n)}\\b`, 'i').test(haystack);
}

export function nameHits(text: string): BookName[] {
  return BOOK_NAMES.filter((name) => name.needles.some((needle) => hasNeedle(text, needle)));
}

export function isAllocatorGrade(item: { title: string; summary?: string; source?: string }): boolean {
  const blob = `${item.title} ${item.summary || ''} ${item.source || ''}`;
  if (JUNK.some((junk) => blob.toLowerCase().includes(junk))) return false;
  if (nameHits(blob).length) return true;
  return /\b(sovereign wealth|pension fund|family office|endowment)\b/i.test(blob);
}
