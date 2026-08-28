export type FlowKind = 'appointment' | 'allocation' | 'dc' | 'private-markets' | 'pacing';

export const FLOW_LABEL: Record<FlowKind, string> = {
  appointment: 'Appointment',
  allocation: 'Allocation',
  dc: 'DC sleeve',
  'private-markets': 'Private markets',
  pacing: 'Pacing',
};

export function flowKind(title: string, summary = ''): FlowKind | null {
  const blob = `${title} ${summary}`;
  if (/\b(cio|appointment|named|joins|resigns|steps down|talent)\b/i.test(blob)) return 'appointment';
  if (/\b(defined contribution|dc sleeve|dc plan|target-date|target date|401\(k\))\b/i.test(blob)) {
    return 'dc';
  }
  if (/\b(capital call|distribution|vintage|pacing|tender)\b/i.test(blob)) return 'pacing';
  if (/\b(private credit|private markets|private-markets|secondaries|unquoted)\b/i.test(blob)) {
    return 'private-markets';
  }
  if (/\b(allocation|overweight|underweight|sleeve|mandate shift|in-hous)\b/i.test(blob)) {
    return 'allocation';
  }
  return null;
}
