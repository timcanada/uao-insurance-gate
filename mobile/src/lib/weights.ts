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
