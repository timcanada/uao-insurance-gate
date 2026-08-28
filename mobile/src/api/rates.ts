import {
  latestThirtyYear,
  parseTreasuryYieldRows,
  treasuryMonthUrl,
  treasuryReaderUrl,
  type ThirtyYearPrint,
} from '../lib/rates';

export async function fetchThirtyYear(): Promise<ThirtyYearPrint | null> {
  const urls = [treasuryMonthUrl(), treasuryReaderUrl()];
  for (const url of urls) {
    try {
      const response = await fetch(url, { headers: { Accept: 'text/html,text/plain,*/*' } });
      if (!response.ok) continue;
      const print = latestThirtyYear(parseTreasuryYieldRows(await response.text()));
      if (print) return print;
    } catch {
      /* try the next path */
    }
  }
  return null;
}
