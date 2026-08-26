# Next human actions (Tim)

GSC and GA are in use from Google’s own mail (`tracking/first-party-baseline.md`). The remaining blocker is **credentials in this environment**, not “do we have the products.”

## Access (do this first — you offered)

1. **Ghost Admin API** — Settings → Integrations → Add custom integration “UAO SEO agent” → paste the Admin API Key (`id:hexsecret`) into this environment as `GHOST_ADMIN_API_KEY`. Optional: `GHOST_URL` if it is not `https://www.universalassetowners.com`.
2. **Search Console + GA4 API** — GCP service account JSON as `GOOGLE_SERVICE_ACCOUNT_JSON`. Add that `client_email` as a user on the GSC domain property `universalassetowners.com` and as Viewer on GA4 property **399677697**. Optional: `GSC_SITE_URL` (default `sc-domain:universalassetowners.com`), `GA4_PROPERTY_ID` (default `399677697`).
3. Confirm GSC is linked to the UAO property (`399677697` / `G-ZRS5B4BPJS`), not `herofund.ca`.

Once those secrets are in, this agent publishes Wave 1–11 as Ghost drafts (or live if you say so) and scores the keyword board from GSC instead of “unknown.”

## This week (editorial)

1. Read `prompts/v4-FINAL.md` once. That is now the standing brief for every growth agent.
2. Editor pass on `publish/wave-1/` — especially visa/tax language and any institution name that has moved.
3. If Ghost API is not in yet, paste in this order: **Wave 5** SWF keeper → 301 twins → **Waves 6–14** as already briefed → **Wave 15** events / Danantara / TVF / LDI / endowment-model → Wave 4 GSC winners → Wave 3 defines → Wave 1–2 new slugs. Prefer the API. After Wave 8 CIC paste, 301 `/china-investment-corporation-cic/`. `/cpp-investments-explained/` is already on C$793.3bn — 301 the short slug now. After Wave 15, 301 `/asset-owner-events-conferences-2026/`, `/turkey-wealth-fund/`, and `/what-is-liability-driven-investing/`.
4. 301 the twin explainers in `inventory/twins.csv` / `publish/wave-3/merge-brief.md`. Highest cost: the year-stamped SWF URLs (Google is ranking the long twin) and `/what-is-a-universal-asset-owner/` → `/universal-owner/`. Then the institution `*-explained` vs short-slug farm. Strip losers from `/llms/` (`publish/wave-6/llms-canonical-patch.md`) — the live TOC lists twins **and** two 404 plurals.
5. Upgrade `/advertise/` and `/press-desk/` from the drafts (they overwrite thin live pages).
6. Put `/llms/` patch live.
7. Paste Wave 4 over the live GSC winners (`publish/wave-4/INDEX.md`) — Temasek vs GIC is stale on GIC’s 24 Jul 2026 report.
8. Send the advertiser one-pager (`media/advertiser-packages.md`) as a PDF to the first ten firms that already buy IPE/P&I/Campden.
9. **MailAdx (support replied 26 Aug 11:28 UTC):** house and Direct-Sold fill **both** require a funded **publisher** wallet. Fund `https://mailadx.com/app/wallet` (Razorpay **$118** failed three times on 24 Aug). Ghost `eh=` recipe is in `media/mailadx-ghost-setup.md`: HTML card, `%%{email}%%`, web visibility off. Use `PUT /dsp/line-items/{id}`, not PATCH. Do not email support again until the wallet is funded and a single-recipient test has run.
10. Decide when to stand up **Lane A** (public scale newsletter) so the 1M-subscriber goal has a list that is not the reviewed brief.

## What not to do

- Do not ask an agent for another 400 synonym explainers.
- Do not put $20–50k packages on the site as “guaranteed revenue.”
- Do not auto-publish directory firm pages without three sources.
- Do not let sales into the brief.

## Success in 30 days (observable)

- Directory and six city pages are live and internally linked from careers + brief footer.
- At least one labelled advertiser conversation using the new packages.
- At least one press reply using the quotation kit.
- Twin merges done.
- AEO panel scored once by hand (even if the score is ugly).
