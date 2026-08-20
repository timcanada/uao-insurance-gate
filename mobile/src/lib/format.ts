const DATE = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/New_York',
});

export function formatDate(iso?: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return DATE.format(date);
}

export function formatReadingTime(minutes?: number | null): string {
  if (!minutes || minutes < 1) return '';
  return `${minutes} min read`;
}

export function formatMeta(publishedAt?: string | null, readingTime?: number | null): string {
  return [formatDate(publishedAt), formatReadingTime(readingTime)].filter(Boolean).join(' · ');
}

export function isWorkEmail(email: string): boolean {
  const value = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return false;
  const domain = value.split('@')[1] ?? '';
  const consumer = new Set([
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'icloud.com',
    'aol.com',
    'live.com',
    'msn.com',
    'me.com',
    'proton.me',
    'protonmail.com',
  ]);
  return !consumer.has(domain);
}
