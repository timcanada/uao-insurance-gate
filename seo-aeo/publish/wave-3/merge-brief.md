---
title: "Ghost merge brief — twins that are costing us rankings"
slug: _internal-merge-brief
type: press
desk: research
audience: press
primary_keyword: ""
answer_block: "Internal. Do not publish."
sources: []
conversion: brief
editor_status: draft
---

# Ghost merge brief (do not publish)

Rechecked live 26 August 2026 (wake 3). All of these still return HTTP 200 unless noted.

## Do this week (highest SEO cost)

**Paste Wave 5 onto the keeper first.** Then 301. Google is already ranking a twin; a 301 into the May 2026 keeper would move the ranking onto stale copy.

| Keep (canonical) | 301 these into it | Why |
| --- | --- | --- |
| `/largest-sovereign-wealth-funds/` | `/the-worlds-largest-sovereign-wealth-funds-2026/` **and** `/largest-sovereign-wealth-funds-2026/` | Three URLs, one query. **26 Aug web search ranks the long twin first** for “largest sovereign wealth funds 2026.” The short `-2026` twin is factually harmful: it treats **GPIF as a SWF**, quotes Norway near **$1.27T**, and still says KIA was “created in 2003.” Paste `publish/wave-5/largest-sovereign-wealth-funds-REFRESH.md` onto the keeper, then 301 both twins. |
| `/universal-owner/` | `/what-is-a-universal-asset-owner/` | Both 200. The short slug already owns “what is a universal owner” in 26 Aug web results. |
| `/santiago-principles/` | `/santiago-principles-explained/` | Same question. Both still 200. |
| `/total-portfolio-approach/` | `/total-portfolio-approach-investing/` **and** `/what-is-the-total-portfolio-approach/` | Three twins. All still 200. |

## Already resolved

- `/reference-portfolio/` is **404**. Keep `/reference-portfolio-explained/` as canonical (or 301 the explained slug to a shorter URL later — one move, not two). `/what-is-a-reference-portfolio/` is still 200 — 301 that too.

## Institution twins (P1 — after the franchise 301s)

Sitemap scan 26 Aug 2026 (127 pages + 1,136 posts). Full machine list: `inventory/twins.csv`.

Pattern: almost every institution has `/name/` **and** `/name-explained/`. Both 200. Keep the URL already on `/llms/` (usually `*-explained`). 301 the short duplicate. Same for USS (three URLs) and SWIB (three URLs).

Do not write a third “explained” page for any of these.

**Wave 8 exception (CIC):** keep `/china-investment-corporation-cic-explained/` as canonical, but **paste the Wave 8 overwrite first**. The live explained URL still says ~$1.3T / Dec 2023. The short twin already has the official US$1.57T / US$1.37T YE2024 print. 301 short → explained only after the explained page is current.

**CPP:** `/cpp-investments-explained/` already has C$793.3bn at 31 Mar 2026. The short `/cpp-investments/` still says “on the order of C$700 billion.” No new overwrite — **301 the short slug now**.

**Wave 9:** Paste OTPP explained (adds C$303.2bn at 30 Jun 2026) then 301 `/ontario-teachers-pension-plan/`. Paste USS **short** keeper (2026 accounts) then 301 the two USS explained twins. Paste `/universal-owner/` then 301 `/what-is-a-universal-asset-owner/`.

## After 301

Update `/llms/` so only the canonical is listed (`publish/wave-6/llms-canonical-patch.md`). Refresh the canonical’s answer block and as-of dates. Do not write a fourth “largest SWF 2027” page; update the one URL.
