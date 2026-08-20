import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';

export default function ChartsScreen() {
  return (
    <Feed
      filter={FILTERS.charts}
      kicker="Charts"
      title="Chart of the Day"
      blurb="One visual signal per show, every weekday — the data point beneath the day’s headline."
    />
  );
}
