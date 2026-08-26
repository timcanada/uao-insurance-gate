# Universal Asset Owners — SEO / AEO Operating System

This folder is the launch kit for an autonomous research → competitor → monitor → learn → publish system that grows Universal Asset Owners into the default home for long-horizon capital — and for the service providers who pay to stand in front of that audience.

**Owner:** Tim Peters, founder and publisher  
**Site:** [universalassetowners.com](https://www.universalassetowners.com/)  
**CMS:** Ghost  
**Audience:** CIOs, C-suite, and desks at sovereign wealth funds, public and corporate pensions, endowments, foundations, insurers, royal family investment offices, and multi-generational family offices — globally. Secondary: lawyers, accountants, technology vendors, investment banks, consultants, OCIOs, executive search, event hosts, and anyone who wants to advertise or partner in front of that room.

## What this is (and is not)

This is not a plan to spray tens of thousands of thin pages. That would destroy the journalism brand and get ignored by Google and answer engines.

This is a plan to become the **entity graph** of universal ownership: every consequential institution, person, mandate, city, question, and service category, written to a newsroom standard, then kept alive by monitoring and self-learning.

Target inventory over the full build: **10,000–30,000 indexable pages**, each of which would still be worth citing by a CIO, a journalist, or ChatGPT.

## How to use this kit

0. **`GOALS.md` is the locked north star** — 1M subscribers, $1M/year ads, #1 across search and LLMs, 24/7 learning. Do not reopen the goal. Run the machine.
1. Read `prompts/iteration-log.md` to see how the super prompt was refined.
2. Use **`prompts/v4-FINAL.md`** as the standing brief for every future agent run.
3. Treat `plan/01-ultimate-plan.md` as the strategy of record; `plan/12-always-on-machine.md` as the 24/7 loop.
4. Publish Wave 1–3 from `publish/` into Ghost (`tools/publish_to_ghost.py` once `GHOST_ADMIN_API_KEY` is set).
5. Load `inventory/priority-slugs.csv` and `inventory/keyword-board.csv` as the production backlog.
6. Update `tracking/` every run. First-party GSC/GA live in `tracking/first-party-baseline.md`; API puller is `tools/pull_search_analytics.py`.
7. Never idle: if you cannot publish, still score, merge, and log.

## Folder map

| Path | What it is |
| --- | --- |
| `GOALS.md` | Locked north star — read first, every run |
| `prompts/` | Super prompt v1–v4 and the critique that improved each version |
| `plan/` | Strategy, competitors, architecture, traffic, advertisers, PR, 24/7 ops |
| `inventory/` | Priority slugs + franchise keyword board |
| `templates/` | Ghost-ready page templates (institution, person, city, Q&A, firm) |
| `publish/wave-1/` | First-wave articles ready for the newsroom |
| `publish/wave-2/` | Scale/sponsor/podcast/events/royal-office hubs |
| `publish/wave-3/` | Franchise refreshes (SWF, family office) + PSP / KIC / AustralianSuper |
| `publish/wave-4/` | Overwrites for the GSC winners: Temasek vs GIC, GIC explained, BIA |
| `tools/` | Ghost publisher + GSC/GA4 puller |
| `media/` | Advertiser packages ($20k–$50k / month + display path) |
| `tracking/` | First-party GSC/GA baseline, subscribers, sponsors, learning log — never invent numbers |

## Hard rules (never skip)

- Editorial independence. Payment never buys coverage.
- Every consequential claim is sourced.
- Nothing is investment, legal, tax, or fiduciary advice.
- Sponsored material is labelled.
- No page ships if it cannibalizes a stronger existing URL.
- AI may draft. A named human editor reviews anything that could be quoted.
- Global by default. Gulf, Asia-Pacific, Europe, Africa, and the Americas — not a North America desk with a world map.

## The flywheel in one sentence

Rank and get cited everywhere long-horizon capital is searched → millions of views and two newsletter lanes toward 1M subscribers → premium sponsors plus display toward $1M/year → journalism, podcast, and event coverage that make UAO the newsroom people quote → more rank, more room, more money. Never stop the loop.
