import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';

export default function BriefScreen() {
  return (
    <Feed
      filter={FILTERS.dailyBrief}
      kicker="Morning intelligence"
      title="The Universal Owner"
      blurb="The daily brief for long-horizon capital — the same written long-form that ships every weekday morning on the website."
    />
  );
}
