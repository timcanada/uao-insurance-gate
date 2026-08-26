# First-party Search Console and Analytics baseline

Tim confirmed GSC and GA exist (26 Aug 2026). This file is filled **only** from Google’s own mail to `info@universalassetowners.com` and from live site tags. It is not a third-party estimate.

The Search Console / Analytics Data APIs are not in this agent environment yet. The puller is `tools/pull_search_analytics.py`. Until those secrets land, use this baseline.

## Properties (confirmed)

| System | Identifier | Evidence |
| --- | --- | --- |
| Search Console | `universalassetowners.com` (domain property) | GSC mail, May–Aug 2026 |
| GA4 measurement ID on the live site | `G-ZRS5B4BPJS` | Site-wide `gtag` in Ghost head, 26 Aug 2026 |
| Current GA4 property | **Universal Asset Owners — universalassetowners.com (`399677697`)** | Analytics ↔ Ads link mail, 6 Aug 2026 |
| Google Ads | Customer ID `547-310-0295` | Same mail; card-expiry mail 20 Aug 2026 |
| AdSense | `pub-2424526898676616` / `ca-pub-2424526898676616` | Site meta + AdSense mail (site not approved to show ads as of 19 Aug 2026) |
| Ghost analytics | `/.ghost/analytics/api/v1/page_hit` | Live site |

### Data-quality note (do not ignore)

On 18 Jul 2026 GSC unlinked the old property **Universal Asset Owners Website (`538805602`)** and associated the site with **http://www.herofund.ca - GA4**. The old UAO Website property was then scheduled for deletion. The current live tag is `G-ZRS5B4BPJS` / property `399677697`. June 2026 Analytics emails may describe the old or mixed property. Treat June GA as directional until the API is pointed at `399677697`.

## Search Console — July 2026 (official monthly mail, 4 Aug 2026)

| Metric | Value |
| --- | --- |
| Clicks (web) | **460** |
| Impressions (web) | **55.6K** |
| Implied CTR | ~0.83% |
| Pages with first impressions (estimated) | **876** |
| Image / video clicks | 0 / 0 |

**Top pages by clicks (July)**

| Page | Clicks | MoM |
| --- | --- | --- |
| `/` | 50 | +35 |
| `/temasek-vs-gic-difference/` | 32 | +30 |
| `/brunei-investment-agency-bia/` | 15 | +15 |

**Top queries by clicks (July)**

| Query | Clicks | MoM |
| --- | --- | --- |
| universal asset owners | 36 | +36 |
| temasek vs gic | 5 | +5 |
| gic vs temasek | 5 | +5 |

Brand still dominates. The only non-brand queries Google mailed are Temasek/GIC comparison variants.

**Devices (clicks):** desktop 364 · mobile 93 · tablet 3  
**Countries (clicks):** United States 98 · United Kingdom 53 · Canada 36

## Search Console — 28-day click milestones (official “Search Impact” mail)

| As-of | Clicks in prior 28 days |
| --- | --- |
| 23 Jun 2026 | 20 |
| 17 Jul 2026 | 180 |
| 31 Jul 2026 | 450 |
| 11 Aug 2026 | 600 |
| **18 Aug 2026** | **700** |

That is roughly **25 Google clicks/day** in mid-August — not millions of monthly views. Display $1M still requires a traffic step-change, not a dashboard rounding error.

## Search Console — open issues (mail)

- 23 Aug 2026: new reason **Blocked due to other 4xx issue**
- 17 Aug 2026: **2 Profile page structured data** issues
- Earlier: 404s, duplicates, “alternate page with proper canonical,” one “Indexed, though blocked by robots.txt”

Wave 1–4 slugs that 404 will sit in that 4xx bucket until Ghost publish. Rechecked 26 Aug wake 3: `/directory/` and `/royal-family-investment-offices/` still 404. No newer Search Impact mail than 700 clicks / 28 days to 18 Aug.

## Analytics — June 2–29 2026 (official performance mail)

Use with the remap caveat above.

| Metric | Value | vs prior |
| --- | --- | --- |
| Active users | 5,476 | +7,722.86% |
| New users | 6,655 | +9,407.14% |
| Avg engagement time | 12s | −93.35% |
| Events | 37,377 | +2,169.4% |

**Top pages/screens in that mail**

| Page | Views | Active users | Bounce |
| --- | --- | --- | --- |
| Home — Capital at the Scale of the World | 2,929 | 1,645 | 46.26% |
| The Universal Owner — 3 Jun 2026 | 1,061 | 335 | 39.03% |
| Scenario Lab | 1,026 | 481 | 27.85% |
| Universal Asset Owners | 836 | 507 | 43.85% |
| The Center of Gravity (Gulf capital) | 787 | 267 | 52.45% |

12-second engagement plus a 7,000% user jump is consistent with a new property, a newsletter prefetch, or a remapped stream — not with a mature site. Do not treat 5,476 as the August run-rate until property `399677697` is queried via API.

## What this changes in the operating system

1. **Score the live winners first.** `/temasek-vs-gic-difference/` and `/brunei-investment-agency-bia/` already take non-brand clicks. Refresh those before inventing new synonym explainers.
2. **Brand query “universal asset owners” is the #1 query.** Keep the homepage and about/masthead tight; do not siphon it into a thin “what is UAO” farm.
3. **Franchise define-pages are not in Google’s mailed top-3.** `/sovereign-wealth-fund/` and `/what-is-a-family-office/` still need the Wave 3 refresh if they are going to take “what is a SWF / family office.”
4. **Views are not millions.** Display packages stay CPM-only against real analytics. Premium IOs do not depend on this number.
5. **Ghost 404s are now a GSC problem, not just a CMS problem.** Publishing Wave 1–3 is the highest-leverage SEO action.

## Still unknown (need the API or Ghost Admin)

- Query-level ranks and impressions for the franchise board (not in the monthly digest)
- August sessions / users on GA4 `399677697`
- Newsletter subscriber counts (Ghost members)
- Whether herofund.ca traffic is still leaking into a UAO view
