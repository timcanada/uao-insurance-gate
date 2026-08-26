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
4. Publish Wave 1–15 from `publish/` into Ghost (`tools/publish_to_ghost.py` once `GHOST_ADMIN_API_KEY` is set). Paste Wave 5 onto `/largest-sovereign-wealth-funds/` **before** 301ing the year-stamped twins. Then Wave 6 (asset-owners title is still “(2025)”). Then Wave 7 (GPIF return is wrong on the live page). Then Wave 8 (CIC explained still says $1.3T). Then Wave 9 (NZ Super still NZ$71.4bn; ADIA still prints ~$1.1T). Then Wave 10 (NY Common still $226.8bn; Texas PSF still $8.3bn). Then Wave 11 (Chile ESSF still $10.8bn; Mumtalakat still a tracker AUM). Then Wave 12 (CDPQ still C$473bn; SOFAZ still $43bn). Then Wave 13 (CDPQ Q&A still $430bn; CPP Q&A still Dec 2023 $600.9bn). Then Wave 14 (reference portfolio missing CalPERS 75/25; FGF/SIF peer sizes; Yale still $41.4bn; NSIA still $1.6bn). Then Wave 15 (events calendar is invented; Danantara $9.5bn; TVF $195bn; LDI unsourced; endowment model cut off).
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
| `publish/wave-5/` | Keeper overwrites: largest SWFs + largest pensions (paste before 301s) |
| `publish/wave-6/` | Asset-owners keeper overwrite + `/llms/` twin strip |
| `publish/wave-7/` | Public-pension define + GPIF (correct 16.47%) + NBIM H1 2026 |
| `publish/wave-8/` | CIC explained ($1.57T), CalSTRS funded status, Temasek-is-SWF, pension define, global-owners hub |
| `publish/wave-9/` | NZ Super (NZ$86.6bn), OTPP mid-year C$303.2bn, ADIA (no AUM), USS 2026 accounts, universal-owner define |
| `publish/wave-10/` | NY Common ($295.4bn / $309.7bn), Texas PSF ($60.6bn not $8.3bn), ART (A$351bn, 2022 Sunsuper merger), HKMA (HK$4,463.6bn), SWIB ($178.175bn not $215bn) |
| `publish/wave-11/` | Chile ESSF (US$3.88bn not $10.8bn), Mumtalakat (profit, no AUM), OIA (three official portfolios), Samruk (KZT 44.2T), Santiago Principles |
| `publish/wave-12/` | CDPQ / La Caisse (CAD $517.3bn not C$473bn), SOFAZ (USD 72.6bn not $43bn), Khazanah (RM105bn NAV, no USD), ISIF (two books, not €24bn), Alaska ($91.3bn unaudited) |
| `publish/wave-13/` | CDPQ Q&A (not a SWF; $517.3bn not $430bn), CPP Q&A (C$793.3bn not $600.9bn), TPA (CalPERS 1 Jul 2026), Russia NWF (MinFin 13.2T RUB / liquid $48bn), ATP (DKK 694bn not €85bn) |
| `publish/wave-14/` | Reference portfolio (CalPERS 75/25), FGF/SIF peer-size kills, Yale FY2025 ($44.1bn / 11.1%), NSIA FY2025 ($3.40bn NAV not $1.6bn) |
| `publish/wave-15/` | Events (kill fake 2026 grid + CalPERS $415bn), Danantara (no official AUM), TVF (TRY 12.7T assets), LDI (BoE £19.3bn), endowment model (Yale $44.1bn + Harvard $56.9bn) |
| `inventory/twins.csv` | Live 301 queue from the 26 Aug sitemap scan |
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
