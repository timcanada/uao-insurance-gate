# `/llms/` canonical patch — Wave 6

The live `/llms/` page currently lists **both sides** of several twins. That teaches answer engines there are two official URLs for one entity. Edit `/llms/` in Ghost. Do not publish this file as an article.

## Delete these lines from `/llms/` (keep the keeper)

| Delete from TOC | Keeper that must remain |
| --- | --- |
| `/the-worlds-largest-sovereign-wealth-funds-2026/` (if present) | `/largest-sovereign-wealth-funds/` |
| `/largest-sovereign-wealth-funds-2026/` (if present) | `/largest-sovereign-wealth-funds/` |
| `/santiago-principles-explained/` | `/santiago-principles/` |
| `/total-portfolio-approach-investing/` | `/total-portfolio-approach/` |
| `/what-is-the-total-portfolio-approach/` | `/total-portfolio-approach/` |
| `/what-is-a-universal-asset-owner/` | `/universal-owner/` |
| `/reference-portfolio/` (already 404) | `/reference-portfolio-explained/` |
| `/future-generations-funds/` (plural, 404) | `/future-generations-fund/` |
| `/strategic-investment-funds/` (plural, 404) | `/strategic-investment-fund/` |

## After Wave 5–6 paste, the TOC titles should read

- The World's Largest Sovereign Wealth Funds → `/largest-sovereign-wealth-funds/` (not a 2026 twin)
- The World's Largest Pension Funds → `/largest-pension-funds-in-the-world/`
- The Largest Asset Owners in the World → `/largest-asset-owners-in-the-world/` (drop the “(2025)” title)
- What Is a Universal Owner? → `/universal-owner/` only
- The Santiago Principles → `/santiago-principles/` only
- Total Portfolio Approach → `/total-portfolio-approach/` only

## Institution twins (301, then drop the loser from TOC)

Full list: `inventory/twins.csv`. Rule: keep the URL already linked from `/llms/` (usually `*-explained`); 301 the short duplicate.

Do not add Wave 1–2 slugs to `/llms/` until those URLs return 200.
