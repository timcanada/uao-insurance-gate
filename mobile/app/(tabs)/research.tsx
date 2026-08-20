import { Feed } from '@/src/components/Feed';
import { FILTERS } from '@/src/lib/classify';

export default function ResearchScreen() {
  return (
    <Feed
      filter={FILTERS.research}
      kicker="UAO Research"
      title="Deep dives"
      blurb="The same research library as the website: flagship reports, chokepoints, discount rates and the capital-stage ledger."
    />
  );
}
