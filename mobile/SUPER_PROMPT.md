# SUPER PROMPT — Universal Asset Owners Terminal

Paste this into the next agent (or any rebuild). If a line here conflicts with a feature request, **this file wins** unless Tim explicitly overrides it.

You are building the phone terminal for **Universal Asset Owners** (`universalassetowners.com`) — a house that writes for people who allocate at the scale of the world. Tim Peters is the marketer and owner. Site and support: `info@universalassetowners.com`.

This is not a news app. It is not fintech. It is not LinkedIn with a navy theme. It is a **desk** with a **walled garden**.

---

## One sentence

The brief is complimentary. The room is not open.

## Who we serve

Seats, not users:

- Sovereign wealth (PIF, ADIA, GIC, NBIM, CIC, Temasek and peers)
- Public pensions (CPP, CalPERS, OTPP, ABP, CalSTRS and peers)
- Endowments, foundations, insurers
- Multi-generational family offices
- The small number of consultants, OCIOs and GPs who already sit across from them

Not retail. Not a twenty-eight-year-old with a brokerage app. Not a growth-loop community. Membership is a **liability the house accepts**, not a vanity metric.

## What the product is

Two desks, four formats, a live official-print wire, and a members’ room:

| Surface | Who may enter | What it is |
|---|---|---|
| **TERM** | Anyone | Morning edition. Manifesto. Cover brief. Probability Desk. Charts. Partner plate. |
| **WIRE** | Anyone | Streaming UAO desk + Fed / ECB / SEC / BIS + allocator scan. JUST IN. |
| **DESK** | Anyone | Afternoon scenario book. Base / upside / tail. |
| **WATCH** | Anyone | Saved briefs, institutions, advertise. |
| **ROOM** | Invite or desk review | Four chambers. Desk spine + member notes. Chatham House. |

Complimentary intelligence stays open. The garden is **The Room**, not the newspaper.

---

## Non-negotiables

1. Editorial is firewalled from commercial. Sponsored items are labelled. If a sponsor asks for influence, the relationship ends.
2. No Bloomberg / Aladdin / MandateWire cosplay. Do not fake an IBOR, last-looks, RFPs, or manager searches we did not report.
3. No general world-news firehose. Funds read names they hold ~5× more than names they do not.
4. No public usernames, likes, follows, streaks, badges, or “247 members online.”
5. Do not invent named CIOs. Roster is by **mandate**, never by person.
6. **Chatham House Rule** in every chamber: members may use the information; they may not name who said it, or their institution, outside the garden.
7. Work email, institution, role, why this desk. Consumer inboxes (`gmail`, `yahoo`, `hotmail`, `outlook`, `icloud`) are reviewed last — warn, do not mock, do not auto-seat.
8. **Application does not seat.** Application = `pending`. Only a house or peer invite (or a later desk approval) sets `seated`. Pending may *see* the chambers and the desk spine. Pending may **not** post.
9. Brand: navy `#0B1F3A` / `#07131f`, gold `#C9A24B`, cream `#F4EFE6`. Serif headlines. Terminal density. Print quality. Institutional, dry, specific.
10. Same Ghost Content API and YouTube live probe as the website.
11. Subscribe = request the daily brief via the Ghost portal. Advertise = disclosed briefing-partner inventory, `info@universalassetowners.com`.
12. Chat without a house server is **on this device**. Never pretend a note reached Oslo, NBIM, or another phone. Say so in the composer.
13. Escape every member note. No HTML in the book.
14. Voice: “Nineteen basis points from the number that reprices every liability.” Not “Markets are volatile — here’s what you need to know.”

---

## Access — three doors, one garden

House codes (seat immediately):

- `UAO-DESK`
- `UAO-BOOK`
- `UAO-IC-2026`

Peer codes (seat immediately, format-valid until a server can revoke):

- `UAO-PEER-` + four chars from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789`
- A seated member may mint **one** peer code to pass by hand. The desk can revoke later.

Application (does **not** seat):

- Work email, institution, role, why this desk
- Status `pending`
- Copy: “The desk will write. The brief stays complimentary.”

URL admit: `?invite=UAO-DESK` seats and opens ROOM.

Garden overlay appears when someone without a record tries **ROOM** or **THE ROOM**. It must offer:

1. Enter with an invite
2. Request a seat (pending)
3. **Continue with the complimentary brief** (close garden, stay on TERM)

Do **not** hide TERM / WIRE / DESK on first launch. That would lie about “the brief is complimentary.”

---

## The Room

Not Slack. Not Twitter. A **members’ book**.

Chambers:

1. **The Book** — what the house is holding this morning. Not a trade idea.
2. **Probability Desk** — scenario weights. Challenge the house. Do not perform.
3. **Private Markets** — pacing, vintage, the unquoted sleeve.
4. **Official Prints** — Fed, ECB, SEC, BIS. If it is not a primary, it does not belong.

Rules of speech:

- Desk posts are the spine. Members annotate. Short notes, not dunking.
- Attribution stays in the room. Display name = `institution · role`, never an email.
- No DMs in v1. No file dumps of unreleased IC papers.
- Seed the desk so the room is never an empty restaurant.
- Persist notes at `uao.room.{chamberId}`. Cap ~80. Max 400 characters.
- Composer footer, always: “Notes stay on this device until the house server exists.”

---

## Information architecture

- **TERM** — edition, manifesto, morning cover, Probability Desk, charts, Room teaser, partner plate, access.
- **WIRE** — UAO + official prints + allocator scan. 30s tick. JUST IN < 30 minutes.
- **ROOM** — garden or chambers as above.
- **DESK** — afternoon scenario book.
- **WATCH / HOUSE** — watchlist, institutions, advertise, application status, peer invite once seated.

Native tabs: TERM · WIRE · BRIEF · DESK · ROOM. Charts stay reachable, not a sixth tab.

## Live and subscribe (already shipped — keep)

- Ghost: `https://universal-asset-owners.ghost.io/ghost/api/content` key `4cb0118527b7b2a473e665856a`
- Filters: `hash-daily-brief`, `hash-probability-desk`, `hash-research`, `hash-chart`, `hash-video-briefing`, `hash-podcast`
- Live probe: `https://uao-live-production.up.railway.app/` → `youtube-nocookie.com/embed/{videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
- Daily-brief toast: first id silent; next id pops. `?demo=brief` for preview.
- Bundle id: `com.universalassetowners.app`
- Preview the human taps: `mobile/public/app.html` copied to `mobile/dist/app.html` **and** `mobile/dist/index.html`. Serve `dist` on :8080. Public URL is a Cloudflare quick tunnel, not Cursor Ports.

## What not to build next

Do not fake Bloomberg IBOR. Do not add a CNN tab. Do not add likes. Do not add public profiles. Do not auto-seat Gmail. Do not claim cross-device chat until Tim has a house server.

Next intelligence (from `FEATURES.md`, only after The Room is honest): name-level wire, H.15 / discount-rate tape, live PD weights.

---

## Success

A CIO of a public pension opens TERM at 07:10 ET for the brief, WIRE at 14:05 for the official print, and ROOM once after the IC to see whether the house added anything the pack missed. A briefing partner pays to sit *next* to that, disclosed. The person without a seat can still read the newspaper. They cannot speak in the house.

## Build order

1. Write / obey this file.
2. Complimentary TERM + garden only on ROOM.
3. Invite seats. Application pends. Peer code format-valid.
4. Four chambers, desk seed, on-device notes, Chatham House, honest composer.
5. Keep WIRE / live / brief toast / partner plate.
6. Then the FEATURES.md intelligence — not another social surface.
