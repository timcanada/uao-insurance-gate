import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';

export default function ChartsTabScreen() {
  return (
    <Feed
      filter={FILTERS.charts}
      kicker="Visual signal"
      title="Charts"
      blurb="One print a day from each desk. Tap a chart for the briefing underneath it."
    />
  );
}
