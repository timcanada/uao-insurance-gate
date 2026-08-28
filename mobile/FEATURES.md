# Ten features that would make allocators open this a few times a day

Research, 23 August 2026. Built from how SWFs, pensions and family offices actually spend attention — not from a generic “news app” list.

The daily stack they already pay for is split: **Bloomberg / Aladdin** for the book (IBOR, risk, orders), **MandateWire** for who is searching and firing managers, **Milliman / LCP** for daily funded status, **Addepar** for family-office look-through and capital calls. UAO should not fake those. It should be the intelligence layer they check *between* those systems — the thing that tells them *why the book just moved*.

Academic work on what funds actually read (Ben-Rephael, Da, Israelsen and follow-ons; Alpha Architect summary of the internet-reading data) is blunt: attention is scarce, funds read names they already hold about **five times** more than names they do not, and the funds that rotate toward **macro news in high-vol regimes** outperform. Repeat opens come from *their* names, *today’s* official print, and *this afternoon’s* liability number — not from a general homepage.

---

## 1. Name-level wire (watchlist news, not “the news”)

**Why they would reopen:** Funds already overweight attention on holdings. A wire that only fires when CPP, NBIM, PIF, CalPERS, a watched GP, Hormuz, or the 30-year prints is a habit. A general feed is a magazine.

**Proof:** Institutional attention research; MandateWire and SWFI both sell *entity* alerts, not a newspaper. UAO already has People & institutions tags.

**Build next:** Every watchlist name gets a live filter on the WIRE. Push when that name hits Ghost or an official print.

## 2. Official-print clock (Fed, ECB, SEC, Treasury, BIS, MOF)

**Why they would reopen:** Intra-day repricing of the universal-owner book is almost never a blog post. It is a 14:00 Fed note, an SEC enforcement, a BIS quarterly, a Japan MOF FX intervention. Pensions and SWFs keep a second screen for this.

**Proof:** Bloomberg ASKB and terminal alerts are built around official prints; UAO’s own August briefs treat MOF/FIMA and H.15 as the story.

**Status:** v1 is live on WIRE → Official.

## 3. Daily liability / discount-rate tape

**Why they would reopen:** US and UK pensions already get a **daily** funded-status number (Milliman Daily Pension Tracker, LCP Visualise+). The 30-year and the discount rate are the number that “reprices every liability” — UAO has already written that sentence. Put the number on the home mast, not inside an article.

**Proof:** Milliman sells daily email/SMS for this exact reason: so sponsors “check the overall health of their pension plans daily.”

**Build:** Public H.15 / DMO / EIOPA curve, one gold number, sparkline, “vs yesterday / vs last IC.”

## 4. Peer book changes (who just bought or voted)

**Why they would reopen:** SWFs and large pensions watch each other. NBIM holdings, CPP votes, 13F prints, GIC commentary — these are discrete events. A “peer moved” card at 07:00 and 16:00 ET is a ritual.

**Proof:** UAO already runs “Owned versus voted” and CPP-director votes as lead stories. SWFI’s paid product is investor profiles + transactions.

**Build:** Watchlist of public holders; ingest NBIM, 13F, known vote disclosures; “what changed since Tuesday.”

## 5. Inverse MandateWire — owner-side flow

**Why they would reopen:** MandateWire is built for GPs (who is searching, who terminated). The *owner* wants the other side: which peers are adding private credit, cutting real estate, hiring a consultant, or opening a DC sleeve. That is gossip they will check after lunch.

**Proof:** MandateWire’s own site: RFPs, terminations, awards, investor appetite. IPE and SWFI Public Fund Monitor do a thinner free version.

**Build:** A labelled “Flows” rail: searches, awards, terminations, allocation shifts — UAO-reported, not scraped fantasy.

## 6. Private-markets cash calendar

**Why they would reopen:** Family offices live in capital calls. Addepar shipped a Capital Activity Dashboard in 2026 for exactly this — upcoming calls, distributions, documents. UAO will not hold their statements. It *can* hold a public close/call/distribution calendar for the deals and funds the desk already covers (Blue Owl tenders, Apollo DC sleeves, infrastructure draws).

**Proof:** Addepar Alts Data Management; every FO ops note in the last two years.

**Build:** “Cash this week” on TERM. Public deals only. Watchlist can pin a fund.

## 7. Probability Desk as a live book, not a PDF

**Why they would reopen:** Afternoon is a second session. If BASE / UPSIDE / TAIL weights *move* when Hormuz traffic or the 30-year prints, the desk becomes a second daily open — like a trading book, not a newsletter.

**Proof:** UAO already ships PD every weekday with explicit weights. Scenario platforms (Aladdin Whole Portfolio, LCP what-if) are daily tools because the weights change.

**Build:** Persist yesterday’s weights; flash the delta; tap through to the note.

## 8. Geopolitics → balance-sheet map

**Why they would reopen:** This is UAO’s actual editorial edge (Hormuz → insurance → cargo; FIMA → Fed counterparty policy). Allocators do not need another Gaza/Taiwan firehose. They need “which sleeve of the universal book is carrying this today.”

**Proof:** UAO daily briefs already write in this grammar. General news apps do not.

**Build:** A standing map: energy, sea lanes, insurance, duration, private credit, DC. Each official print or brief lights a sleeve.

## 9. “Since last IC” pack

**Why they would reopen:** SWF and pension workflow is the investment committee. The useful daily question on Thursday is not “what’s new,” it is “what would I have to tell the board that I did not know at the last IC.”

**Proof:** V7 and Bloomberg both sell board-pack / disclosure workflow into SWFs. UAO can do the intelligence half: 8–12 items, dated, sourced, one tap to the brief.

**Build:** User sets last IC date. Home grows a pack. Friday they screenshot it.

## 10. Session ritual + name-level push

**Why they would reopen:** Morning brief (07:00 ET), official-print window (08:30 / 14:00), Probability Desk (after lunch), after-close overnight book. Four natural opens. Push only for: new brief, live YouTube, watched name, official print, PD weight change.

**Proof:** Milliman already does email/SMS on funded-status moves. MandateWire sells real-time RFP alerts. UAO’s own product is already two desks a day — the app should enforce the ritual, not flatten it into a feed.

**Build:** The lock-screen worker we already scoped, keyed to the watchlist and the official wire.

---

## What not to build

- A fake Bloomberg terminal (no IBOR, no OMS, no licensed last-looks).
- A general world-news tab. Attention research says they will ignore it.
- Unlicensed price tapes presented as a book of record.

## What we just shipped

**WIRE** — streaming UAO desk + Fed/ECB/SEC/BIS official prints + name-level allocator scan (junk filtered), 30-second tick, JUST IN only when a timestamp exists. **PD meters** now print the live desk split (42/36/22 as of 22 Aug) instead of empty theatre. This is the spine for 1, 2, 7 and 10.

**HOUSE** — apply with name, work email and a direct line. Pending unlocks **LIVE** (in-app podcasts + YouTube live / just-missed / recent shows) and **BOOK** (tracked employer portals, Talent Desk, diary / briefing request, who-moved, research). The Room floor stays seated-only. No invented job listings: when the careers site has no individually verified roles live, the book says so.

**CIO DESK** — TERM is no longer a magazine homepage. It is the thing they do not already buy: Treasury 30-year on the mast (5.19% as of 27 Aug 2026, labelled as the par curve, never a fake Milliman number), a sleeve map lit from the desk copy, a since-last-IC pack they date themselves, and a name book they keep. WIRE filters to *my names*. BOOK labels owner-side flows only when the copy already said so. QC drafts stay off the pack.
