import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';

export default function DeskScreen() {
  return (
    <Feed
      filter={FILTERS.probabilityDesk}
      kicker="Afternoon scenario desk"
      title="The Probability Desk"
      blurb="Base cases, tail risks and second-order effects — probability-weighted, for capital that thinks in decades."
    />
  );
}
