export type DeskWeights = {
  base: number;
  upside: number;
  tail: number;
};

export function parseDeskWeights(html: string): DeskWeights | null {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const split = text.match(/Desk split\s+(\d{1,2})\s*\/\s*(\d{1,2})\s*\/\s*(\d{1,2})/i);
  if (split) {
    const weights = {
      base: Number(split[1]),
      upside: Number(split[2]),
      tail: Number(split[3]),
    };
    if (weights.base + weights.upside + weights.tail === 100) return weights;
  }
  const base = text.match(/\bBASE\b[^\d]{0,48}(\d{1,2})\s*%/i);
  const upside = text.match(/\b(UPSIDE|BREAK)\b[^\d]{0,48}(\d{1,2})\s*%/i);
  const tail = text.match(/\bTAIL\b[^\d]{0,48}(\d{1,2})\s*%/i);
  if (base && upside && tail) {
    const weights = {
      base: Number(base[1]),
      upside: Number(upside[2]),
      tail: Number(tail[1]),
    };
    if (weights.base + weights.upside + weights.tail === 100) return weights;
  }
  return null;
}

export function weightDelta(prev: DeskWeights | null | undefined, next: DeskWeights): DeskWeights | null {
  if (!prev) return null;
  return {
    base: next.base - prev.base,
    upside: next.upside - prev.upside,
    tail: next.tail - prev.tail,
  };
}

export function formatDelta(points: number): string {
  if (!points) return 'unch';
  return `${points > 0 ? '+' : ''}${points}`;
}

export const GRID_COPY = 'Desk stated on a 5% grid. We do not relabel the buckets.';

export function parseDeskGrid(html: string): number[] | null {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const block = text.match(/Desk stated\s*\(\s*5%\s*grid\s*\)\s*((?:\d{1,2}\s*%\s*){5})/i);
  if (!block) return null;
  const values = [...block[1].matchAll(/(\d{1,2})\s*%/g)].map((hit) => Number(hit[1]));
  if (values.length !== 5) return null;
  if (values.reduce((sum, n) => sum + n, 0) !== 100) return null;
  return values;
}

export function gridDelta(prev: number[] | null | undefined, next: number[]): number[] | null {
  if (!prev || prev.length !== next.length) return null;
  return next.map((n, i) => n - prev[i]);
}
