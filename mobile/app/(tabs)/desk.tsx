import { Feed } from '@/src/components/Feed';
import { ProbabilityMeters } from '@/src/components/Terminal';
import { FILTERS } from '@/src/lib/classify';

export default function DeskScreen() {
  return (
    <Feed
      filter={FILTERS.probabilityDesk}
      kicker="Afternoon scenario desk"
      title="The Probability Desk"
      blurb="Every call is probability-weighted — base, upside and tail — for capital that thinks in decades."
      headerExtra={<ProbabilityMeters />}
    />
  );
}
