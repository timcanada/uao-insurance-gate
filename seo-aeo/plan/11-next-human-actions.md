# Next human actions (Tim)

GSC and GA are in use from Google’s own mail (`tracking/first-party-baseline.md`). The remaining blocker is **credentials in this environment**, not “do we have the products.”

## Access (do this first — you offered)

1. **Ghost Admin API** — Settings → Integrations → Add custom integration “UAO SEO agent” → paste the Admin API Key (`id:hexsecret`) into this environment as `GHOST_ADMIN_API_KEY`. Optional: `GHOST_URL` if it is not `https://www.universalassetowners.com`.
2. **Search Console + GA4 API** — GCP service account JSON as `GOOGLE_SERVICE_ACCOUNT_JSON`. Add that `client_email` as a user on the GSC domain property `universalassetowners.com` and as Viewer on GA4 property **399677697**. Optional: `GSC_SITE_URL` (default `sc-domain:universalassetowners.com`), `GA4_PROPERTY_ID` (default `399677697`).
3. Confirm GSC is linked to the UAO property (`399677697` / `G-ZRS5B4BPJS`), not `herofund.ca`.

Once those secrets are in, this agent publishes Wave 1–5 as Ghost drafts (or live if you say so) and scores the keyword board from GSC instead of “unknown.”

## This week (editorial)

1. Read `prompts/v4-FINAL.md` once. That is now the standing brief for every growth agent.
2. Editor pass on `publish/wave-1/` — especially visa/tax language and any institution name that has moved.
3. If Ghost API is not in yet, paste in this order: **Wave 5 keeper** (`/largest-sovereign-wealth-funds/`) → **then** 301 the twins → Wave 4 GSC winners → Wave 3 define refreshes → Wave 1–2 new slugs. Prefer the API (`tools/publish_to_ghost.py`).
4. 301 the twin explainers in `publish/wave-3/merge-brief.md`. Highest cost: the year-stamped SWF URLs (Google is ranking the long twin) and `/what-is-a-universal-asset-owner/` → `/universal-owner/`.
5. Upgrade `/advertise/` and `/press-desk/` from the drafts (they overwrite thin live pages).
6. Put `/llms/` patch live.
7. Paste Wave 4 over the live GSC winners (`publish/wave-4/INDEX.md`) — Temasek vs GIC is stale on GIC’s 24 Jul 2026 report.
8. Send the advertiser one-pager (`media/advertiser-packages.md`) as a PDF to the first ten firms that already buy IPE/P&I/Campden.
9. **MailAdx (first-party mail, 24–25 Aug):** publisher wallet is **$0.00 — ads paused**; Razorpay **$118 top-up failed** (three tries, 24 Aug). Fund `https://mailadx.com/app/wallet` if house fill is gated on it. Do not ping `support@mailadx.com` again until they reply to the 26 Aug 10:37 UTC thread.
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
