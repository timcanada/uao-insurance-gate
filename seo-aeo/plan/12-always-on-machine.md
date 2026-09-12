# Always-on machine (24/7)

The goal is locked in `GOALS.md`. This file is how the agent refuses to idle.

## What “24 hours a day” means in this repo

A single cloud-agent turn is not a daemon. The **machine** is:

1. A locked goal and prompt (`GOALS.md` + `prompts/v4-FINAL.md`).
2. Trackers that persist in git (`tracking/`).
3. A recurring wake (Cursor timer) that runs the loop again.
4. A human editor who pastes Ghost-ready drafts.

If you are this agent and you are awake, you execute the next loop. You do not wait to be asked “what should we do next?”

## Loop (every wake)

```text
1. Read seo-aeo/GOALS.md
2. Read tracking/learning-log.md (last 20 lines)
3. Read inventory/keyword-board.csv — pick the highest-priority query we do not own
4. Pull live sitemaps + /llms/ — no twin slugs
5. Run prompts/v4-FINAL.md on THAT cluster
6. Write ≤5 Ghost-ready drafts OR refresh/merge (refresh preferred)
7. Append tracking/learning-log.md
8. Update keyword-board / sponsors / subscribers with known data only
9. Commit, push, update the PR
10. Leave the next wake a concrete “start here” line in the learning log
```

Cap stays at five new drafts per wake. Volume comes from *wakes*, not from dumping 200 thin pages in one hour.

## Rotation (so we do not only write explainers)

| Wake | Cluster |
| --- | --- |
| 0 | Goal lock + trackers (done 26 Aug 2026) |
| 1 | Royal family offices + ultimate hub |
| 2 | Advertiser/event/podcast ranking pages |
| 3 | Keyword board franchise queries (largest SWF / pension / FO) |
| 4 | Merges of twin slugs |
| 5 | People / institution nodes |
| 6 | City / careers |
| 7 | Podcast episode SEO + YouTube/show notes |
| then | Repeat 3→7, always checking the scoreboard |

## What counts as learning

A wake that only writes prose and does not update the learning log **did not learn**. Minimum learning artifact:

- What query we tried to own
- What already ranks / which LLM cites whom
- What we shipped or refused
- What the next wake must do

## When analytics are missing

Write `unknown`. Then do work that does not require analytics: franchise pages, merges, press kit, advertiser hubs, podcast hubs. Do not halt the machine because Search Console is not connected.

## Human still required

- Ghost publish
- AUM and people-move review
- Insertion orders
- Anything a newspaper will lift

The machine drafts and learns 24/7. It does not silently rewrite the live newsroom.
