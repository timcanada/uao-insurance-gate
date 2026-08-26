# Autonomous operating system

This is how a future Cursor agent (or a human desk) runs UAO growth without reinventing strategy.

## Roles

| Role | Human or agent | Authority |
| --- | --- | --- |
| Publisher (Tim) | Human | Firewall, prices, masthead, “ask the editor” cases |
| Desk editor | Human | Consequential claims, AUM, people, briefs |
| Growth agent | Agent | Research, inventory, drafts, scorecard, monitoring |
| Commercial | Human | Insertion orders, NDA audit |

The agent never publishes directly to Ghost until a human has a one-click review path. Drafts live in `publish/wave-N/`.

## Always-on

The weekly runbook below is still valid. The **default** is now the 24/7 loop in `12-always-on-machine.md`, aimed at `GOALS.md`. If you are awake, run that loop. Do not wait for Monday.

## Weekly runbook (copy into the agent chat)

```text
You will read seo-aeo/GOALS.md, then run seo-aeo/prompts/v4-FINAL.md.

This wake’s cluster: {keywords | royal offices | podcast | people | merges}

1. Pull live sitemaps and llms.txt. Diff against seo-aeo/inventory/.
2. Read tracking/learning-log.md and the north-star dashboard.
3. Monitor the 25 tracked career portals + any signals in inbox notes.
4. Write a 10-line gap memo vs {rotating competitor}.
5. Produce at most 5 Ghost-ready drafts that pass the quality gate.
6. List merges/kills.
7. Update tracking/ (learning log, keyword board, sponsors, subscribers) with available data only.
8. Patch list for /llms/.
9. State what you refused to publish. Commit, push, update the PR.
```

Cap of **five** new drafts per run prevents farm behavior. Refresh counts extra and is preferred.

## Daily micro-loop (15–30 minutes)

1. Scan tracked portals and wires for moves.
2. If a move is sourced: draft a leadership-move page + update the person/institution nodes.
3. If a brief names an entity without a node: add to inventory, do not necessarily draft the same day.

## Monthly publisher review

- Which layer converted?
- Advertiser pipeline vs package rungs
- Correspondent capacity
- Whether to raise the draft cap (never above 10/week without a proven layer)

## Systems to add when ready

- Ghost custom routes for `/directory/` and `/careers/cities/`
- A structured store (even a Git YAML graph) for institution/person facts so pages do not drift
- Search Console API into the scorecard
- Claim flow for directory listings (auth + labelled badge)

## This repository vs the Ghost site

`uao-insurance-gate` is a flipbook/lead-gate repo. It is **not** the CMS. This `seo-aeo/` tree is the operating system and draft factory. Publishing is a human paste or a future Ghost Admin API integration with review.

Do not generate HTML spam in this repo as a substitute for Ghost templates.
