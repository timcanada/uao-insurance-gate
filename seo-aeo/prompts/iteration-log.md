# Super prompt iteration log

The user asked for a super prompt first, then three or four runs until it was good enough to launch. This file is the record of those runs. The winning prompt is `v4-FINAL.md`.

## Run 1 — generic scale prompt

**File:** `v1.md`

**What it asked:** Research the market, look at competitors, publish tens of thousands of pages, drive all traffic types.

**What was wrong when I ran it against UAO as it actually exists:**

- It would have treated UAO like a greenfield blog. The site already has daily desks, `llms.txt`, explainer clusters, careers, a registry, membership at $60k–$300k+, and a journalism ethics page.
- “Tens of thousands of pages” with no quality gate is how you get a helpful-content penalty and a ruined masthead.
- It had one audience. UAO has two: allocators who become members, and service providers who become advertisers.
- It ignored Ghost, the existing URL taxonomy, and the cannibalization already visible in the sitemap (`santiago-principles` vs `santiago-principles-explained`, `total-portfolio-approach` vs `total-portfolio-approach-investing`).
- It had no path to being *quoted* — only to ranking.
- It was not global. Family offices in Singapore, pensions in the Netherlands, SWFs in the Gulf, and endowments in the US are different desks.

**Score as an operating brief:** 4/10. Directionally right, unusable as a standing agent prompt.

## Run 2 — brand-aware, dual-audience prompt

**File:** `v2.md`

**What changed:** Locked the brand, named both audiences, added quality gates, named existing properties, required source discipline.

**What was still wrong:**

- Competitor set was a list, not a gap map. IPE, P&I, SWFI, MandateWire, Campden, and Institutional Investor win for different reasons. The agent needs to steal a specific job from each, not “beat competitors.”
- No page math. Without a taxonomy, “scale” becomes random explainers.
- No money model for $20k–$50k monthly advertiser spend. Ranking pages does not automatically produce that invoice.
- No self-learning loop. Publish-and-hope is not autonomous.
- Still underweighted journalism: press desk, quotable originals, correspondent network.

**Score:** 6.5/10. Good strategy memo. Not yet an agent that can run overnight.

## Run 3 — operating system prompt

**File:** `v3.md`

**What changed:** Forced a five-stage loop (research → competitors → monitor → learn → publish). Added entity-graph taxonomy, advertiser packages, AEO citation design, Ghost constraints, PR/quotation path.

**What was still wrong:**

- Too much freedom on *what* to publish first. An autonomous bot will default to more “what is a sovereign wealth fund” pages. Those already exist.
- Missing the careers / relocation / directory stack Tim already started — the stickiest non-brief surfaces.
- Missing anti-patterns: duplicate slugs, US-centric sourcing, advice-shaped language, advertiser-shaped editorial.
- No KPI contract. Without numbers, the bot cannot know if it is winning.
- No “stop and ask the editor” rules for legal, personnel, or unverified AUM.

**Score:** 8/10. Runnable, still able to drift into commodity SEO.

## Run 4 — launch prompt (adopted)

**File:** `v4-FINAL.md`

**What changed:**

- Starts every run from the *live inventory*, not a blank page.
- Dual flywheel with explicit conversion events (brief signup, member inquiry, role alert, advertiser call).
- Entity graph with volume caps and kill rules.
- Wave sequencing so careers, people, cities, and service-provider hubs ship before vanity explainers.
- Quotation engine: original numbers, named desk, press-ready excerpts.
- Advertiser ladder from $20k to $50k+ monthly.
- Self-learning scorecard and weekly stop/continue rules.
- Voice, ethics, and legal locks copied from the About / Editorial Standards pages.

**Score:** 9.5/10. This is the prompt future agents should run. Re-open it only if the site’s CMS, masthead, or commercial firewall changes.

## Decision

Launch against `v4-FINAL.md`. Do not keep iterating the prompt. Iterate the *pages* and the *scorecard*.
