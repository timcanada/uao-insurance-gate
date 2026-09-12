# Monitoring and self-learning

Autonomy without a scorecard is a content farm. This is the nervous system.

## What to watch (sources)

| Signal | Where | Cadence | Action |
| --- | --- | --- | --- |
| Employer career portals | Tracked institutions on `/careers/` | Daily | New verified role or employer-page refresh |
| Leadership announcements | Fund sites, regulators, exchanges, reputable wires | Daily | Move page + Allocator Class update |
| Filings / official reports | Annual reports, N-PX, 8-K, parliamentary SWF reviews | Weekly | Institution page AUM/mandate refresh |
| Search queries | Search Console + People Also Ask | Weekly | Refresh vs new Q&A |
| AI answers | 50-query panel | Weekly | Citation share |
| Newsroom mentions | Alerts for “Universal Asset Owners” | Daily | Log + thank-you / correction |
| Competitor homepages | IPE, P&I, II, Top1000, SWFI, Campden | 3× week | Gap memo fuel |
| Brief replies / request-access | Inbox | Weekly | Quality of room, story ideas |
| Advertiser inbound | info@ / advertise form | Weekly | Package-market fit |

Use a simple ledger (Ghost tag `signal` or a spreadsheet). Columns: date, entity, signal, source URL, action (`publish` / `refresh` / `ignore` / `ask-editor`).

## Scorecard (weekly)

Fill with real data only. Empty is allowed. Invented is not.

```text
Week of:
New URLs shipped / refreshed / merged / killed:
Search Console: impressions, clicks, top new queries (non-brand):
AEO panel: cited / mentioned / absent ( /50 ):
Brief signups (approved):
Membership sample requests:
Advertiser/recruiter conversations:
Press pickups:
Winner pattern to repeat:
Loser pattern to stop:
```

## Learning rules

**Double** a pattern if it produced any of: AI citation, journalist pickup, non-brand click-through to signup, advertiser call.

**Refresh first** if a franchise URL lost impressions or lost the AEO panel.

**Kill or noindex** if 90 days, near-zero content, no inbound from a desk, no unique facts. Do not let the graph accumulate corpses.

**Merge** when two URLs answer the same question. The older or better-linked URL usually wins.

## Self-learning for the agent

Each run of v4 must open with last week’s scorecard. If last week’s new Q&As did nothing and a city page did, the agent writes city pages. The prompt already forbids drifting back to synonym explainers.

## Tooling (enough to start)

- Google Search Console + Ghost analytics
- A sheet for the 50-query panel
- RSS/alerts on institution press rooms (start with the 25 careers-tracked employers)
- Human inbox triage

Buy an AI-visibility vendor only after the panel is being scored by hand for a month — otherwise you will optimize to the vendor’s dashboard.

## Red alerts (wake the publisher)

- A people-move we cannot source
- A correction request from an institution
- A sponsor asking for a story
- A sudden collapse in brief approval quality (retail flood)
- Algorithm or AI-overview change that drops franchise URLs
