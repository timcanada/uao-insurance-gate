# UAO senior research agent

Builds a weekly list of **new, very senior** people who should care about Universal Asset Owners — CIOs, asset-owner CEOs, family-office principals, finance ministers, Big Four investment leaders, and the people who run ADFW / SuperReturn / iConnections.

It does **not** subscribe anyone. Current members are a hard exclusion list.

## Current members are never brought back in

Drop a Ghost member export at `growth-agent/private/members.csv` (gitignored) or pass any CSV with an `email` column:

```bash
PYTHONPATH=src python3 -m uao_growth import-members private/members.csv
```

The agent stores those people locally and will not scrape, enrich, or export them. Matching is by:

- email
- name + organization
- LinkedIn URL when present

If a later discovery run finds one of them again, they are marked `suppressed` and dropped from the week file.

Optional: set `GHOST_ADMIN_API_KEY` and run `pull-ghost-members` to refresh the exclusion list from Ghost.

## What it uses

Public records and official APIs only:

- Curated UAO desk list (SWFs, pensions, endowments, family offices, PE, insurers, Big Four, finance ministries, flagship events)
- Wikidata (sovereign wealth funds, large pensions, sitting finance ministers, CIO occupation)
- Wikipedia MediaWiki API (current finance ministers + infobox leaders of seed institutions)
- SEC EDGAR full-text search (13F managers) and 13F signature blocks (named CIOs/CFOs/CEOs)
- SEC IAPD / Form ADV firm search
- Apollo people search + match, if `APOLLO_API_KEY` is set — use later to fill work emails
- Neverbounce, if `NEVERBOUNCE_API_KEY` is set — use later to verify contacts

It does not scrape Apollo’s UI, LinkedIn, or login-walled attendee lists.

## Weekly loop

```bash
cd growth-agent
cp .env.example .env          # add keys when you have them
PYTHONPATH=src python3 -m uao_growth weekly --public-only --members private/members.csv
```

That will:

1. Reload `private/members.csv` if it exists
2. Discover institutions and named senior roles
3. Enrich only **non-members** via Apollo when configured
4. Validate emails via Neverbounce when configured
5. Keep people at or above seniority 78 (CIO / minister / managing partner / head of desk)
6. Write `exports/week-*-prospects.csv` with `consent_status=prospect_not_subscribed`
7. Write `exports/week-*-report.html`
8. Reweight sources that produced senior non-members

Target pace is 10,000 **new non-member prospects per week**. Apollo credits are the usual bottleneck. Without keys, the agent still builds the institution graph and named public officials.

## Other commands

```bash
PYTHONPATH=src python3 -m uao_growth status
PYTHONPATH=src python3 -m uao_growth discover --sources seeds,wikidata
PYTHONPATH=src python3 -m uao_growth enrich --limit 200
PYTHONPATH=src python3 -m uao_growth validate --limit 500
PYTHONPATH=src python3 -m uao_growth learn path/to/feedback.csv
PYTHONPATH=src python3 -m uao_growth report
```

Feedback CSV columns: `email,outcome` where outcome is `subscribed`, `opened`, `clicked`, `bounced`, `unsubscribed`, `ignored`, or `junior`.

## Tests

```bash
cd growth-agent
PYTHONPATH=src python3 -m pytest -q
```
