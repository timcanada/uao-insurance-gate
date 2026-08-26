# Learning log (append only)

## 2026-08-26 — First-party GSC/GA (wake 1)

**Correction:** Tim said the “no GSC / no GA” puzzle was a mistake. Both exist. Gmail on `info@universalassetowners.com` already receives the official reports.

**Known from Google’s own mail (not third-party):**

- July 2026 Search: **460 clicks**, **55.6K impressions**, 876 pages with first impressions. CTR ~0.83%. Desktop 364 / mobile 93.
- 28-day Google clicks: 20 (23 Jun) → 180 (17 Jul) → 450 (31 Jul) → 600 (11 Aug) → **700 (18 Aug)**.
- July non-brand queries Google mailed: `temasek vs gic` (5) and `gic vs temasek` (5). Brand `universal asset owners` is #1 (36).
- July pages: homepage 50, `/temasek-vs-gic-difference/` 32, `/brunei-investment-agency-bia/` 15.
- Live GA4 tag: `G-ZRS5B4BPJS`. Current property: `399677697`. Old property `538805602` was trashed; GSC was briefly associated with herofund.ca GA4 on 18 Jul — do not mix those streams.
- June GA mail (treat as dirty): 5,476 active users, 12s engagement. Too jumpy to be the August run-rate.

**Implication:** Traffic is real and rising, and it is **not** millions of monthly views. Display $1M is still a later product. The SEO machine should refresh the pages already taking clicks (Temasek/GIC, BIA) and get Wave 1–3 out of 404.

**Access still missing in this environment:** `GHOST_ADMIN_API_KEY`, `GOOGLE_SERVICE_ACCOUNT_JSON`. Puller is `tools/pull_search_analytics.py`.

**MailAdx (same day):** Four newsletter units + web units all return the 43-byte GIF89a no-fill. Reproduced 26 Aug 10:36 UTC. Follow-up sent on the `support@mailadx.com` thread (pub `c1a281f3-6e78-4e49-89ff-853c2c360d05`).

## 2026-08-26 — Goal lock (wake 0)

**Goal plugged in:** #1 hub for universal owners across Google/Bing/Yahoo/LLMs; 1M newsletter subscribers; $1M/year advertising; journalism + world-class podcast; 24/7 self-learning.

**Learned from live site (prior turn):** UAO is not greenfield. Explainer twins already exist. Wave 1 should not add more “what is a SWF” pages. Careers, directory, cities, and advertiser hubs were the gap.

**This wake:** Locked `GOALS.md`. Split subscribers into Lane A (public scale) and Lane B (reviewed institutional) so 1M names do not destroy premium CPMs. Added display as a second ad line that *requires* millions of views. Added royal family offices as an owner type. Wired v4 to the scoreboard.

**Shipped (drafts):** Wave 2 hubs — ultimate owner hub, royal family investment offices, advertise-to-this-room, event coverage, podcast media-company page, display/scale lane, publications CIOs use.

**Refused:** Inventing current subscriber or view counts. Targeting hedge-fund retail keywords (Tim corrected off that beat).

**Next wake must:** Score franchise keywords on the keyword board against live Google/Bing/Perplexity (no guessed ranks). Merge one twin pair from `plan/04-page-architecture.md` if still live. Draft the next 3 institution or people nodes that the sitemap still lacks.

## 2026-08-25 — Wave 1 (prior)

Built v1–v4 prompt, entity-graph plan, Wave 1 directory/cities/press/advertise drafts. PR #3.
