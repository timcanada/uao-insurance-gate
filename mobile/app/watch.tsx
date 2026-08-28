import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';

export default function WatchScreen() {
  return (
    <Feed
      filter={FILTERS.video}
      kicker="Watch"
      title="Video briefings"
      blurb="The morning explainer from The Universal Owner, the afternoon scenario video from The Probability Desk, and weekly Frontier deep dives."
    />
  );
}
