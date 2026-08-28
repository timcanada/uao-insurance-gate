export type CurveRow = {
  date: string;
  twenty: number;
  thirty: number;
};

export type ThirtyYearPrint = {
  date: string;
  yield: number;
  prior: number | null;
  deltaBp: number | null;
  source: 'treasury' | 'desk-note';
  label: string;
};

const TREASURY =
  'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView';

export function treasuryMonthUrl(now = new Date()): string {
  const year = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric' }).format(now);
  const month = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', month: '2-digit' }).format(now);
  return `${TREASURY}?type=daily_treasury_yield_curve&field_tdr_date_value_month=${year}${month}`;
}

export function treasuryReaderUrl(now = new Date()): string {
  return `https://r.jina.ai/${treasuryMonthUrl(now)}`;
}

function toIso(mdy: string): string | null {
  const match = mdy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;
  return `${match[3]}-${match[1]}-${match[2]}`;
}

function rowFromLine(line: string): CurveRow | null {
  const match = line.match(/(\d{2}\/\d{2}\/\d{4})/);
  if (!match) return null;
  const nums = (line.slice(line.indexOf(match[1]) + match[1].length).match(/\d+\.\d+/g) || []).map(Number);
  if (nums.length < 2) return null;
  const thirty = nums[nums.length - 1];
  const twenty = nums[nums.length - 2];
  if (thirty < 1 || thirty > 12 || twenty < 1 || twenty > 12) return null;
  const date = toIso(match[1]);
  if (!date) return null;
  return { date, twenty, thirty };
}

export function parseTreasuryYieldRows(text: string): CurveRow[] {
  const lines = String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\|/g, ' ')
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, ' ').trim());
  const rows: CurveRow[] = [];
  const seen = new Set<string>();
  for (const line of lines) {
    const row = rowFromLine(line);
    if (!row || seen.has(row.date)) continue;
    seen.add(row.date);
    rows.push(row);
  }
  return rows.sort((a, b) => a.date.localeCompare(b.date));
}

export function latestThirtyYear(rows: CurveRow[]): ThirtyYearPrint | null {
  if (!rows.length) return null;
  const last = rows[rows.length - 1];
  const prior = rows.length > 1 ? rows[rows.length - 2].thirty : null;
  const deltaBp = prior == null ? null : Math.round((last.thirty - prior) * 100);
  return {
    date: last.date,
    yield: last.thirty,
    prior,
    deltaBp,
    source: 'treasury',
    label: 'U.S. Treasury 30-year par yield',
  };
}

export function yieldFromCopy(text: string): ThirtyYearPrint | null {
  const match =
    String(text || '').match(/30-year[^\d%]{0,48}(\d\.\d{2})\s*%/i) ||
    String(text || '').match(/(\d\.\d{2})\s*%[^\n.]{0,32}30-year/i);
  if (!match) return null;
  const value = Number(match[1]);
  if (value < 1 || value > 12) return null;
  return {
    date: '',
    yield: value,
    prior: null,
    deltaBp: null,
    source: 'desk-note',
    label: '30-year as printed in the desk note',
  };
}

export function formatBp(deltaBp: number | null): string {
  if (deltaBp == null) return '';
  if (deltaBp === 0) return 'unch vs prior print';
  const sign = deltaBp > 0 ? '+' : '';
  return `${sign}${deltaBp} bp vs prior print`;
}
