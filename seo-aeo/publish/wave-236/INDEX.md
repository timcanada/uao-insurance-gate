# Wave 236 — leftover-unique 2025 house endowments (Northeastern Illinois University Foundation, Illinois State University Foundation, Eastern Illinois University Foundation, Northern Illinois University Foundation, SIUE Foundation)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. university-foundation endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Northeastern Illinois University Foundation | `/northeastern-illinois-university-foundation/` | https://www.neiu.edu/sites/default/files/documents/2025/10/22/Northeastern-Illinois-University-Foundation-Short-FINAL-06.30.25.pdf | Endowment NA **$21,985,823**; printed Investment Income **$2,505,535**; appropriation of endowment assets for expenditure **$470,491** | Warady Davis LLP Deerfield **21 Oct 2025** |
| 2 | Illinois State University Foundation | `/illinois-state-university-foundation/` | https://advancement.illinoisstate.edu/downloads/tax/FY2025%20Illinois%20State%20University%20Foundation%20Audit%20Report.pdf | Endowment investments **$248,656,916**; named return lines investment income **$549,316** / net appreciation **$24,617,805**; appropriations of endowment assets for expenditure **$8,182,017** | Logo-only Springfield **10 Oct 2025** |
| 3 | Eastern Illinois University Foundation | `/eastern-illinois-university-foundation/` | https://www.eiu.edu/found/docs/Foundation_Audit_2025.pdf | Endowment investments **$121,932,969**; named return lines investment income **$2,928,255** / net appreciation **$9,356,251**; appropriations of endowment assets for expenditure **$992,663** | CliftonLarsonAllen LLP Charleston **30 Oct 2025** |
| 4 | Northern Illinois University Foundation | `/northern-illinois-university-foundation/` | https://foundation.myniu.com/images.html?file_id=nHtj3es3TmQ%3D | Endowment NA **$131,487,795**; printed total investment return **$11,785,169**; endowment spending allocation **$3,658,648** | Logo-only **8 Oct 2025** |
| 5 | Southern Illinois University Edwardsville Foundation | `/siue-foundation/` | https://www.siue.edu/give/about/pdf/FY25-Audited-Financial-Statements.pdf | Endowment NA **$45,501,233**; printed Investment income **$5,134,762**; appropriated for expenditure **$1,922,252** | Logo-only Springfield **17 Oct 2025** |

## Official sources (independently re-GET this wake)

- Northeastern Illinois University Foundation FY2025 financial statements (Warady Davis LLP Deerfield, 21 October 2025): https://www.neiu.edu/sites/default/files/documents/2025/10/22/Northeastern-Illinois-University-Foundation-Short-FINAL-06.30.25.pdf
- House PDF GET **200** `application/pdf` **215,984** bytes. Listing with PDF href not found this wake; house PDF GET **200** is enough (Texas State pattern).
- Illinois State University Foundation FY2025 financial statements (logo-only Springfield, 10 October 2025): https://advancement.illinoisstate.edu/downloads/tax/FY2025%20Illinois%20State%20University%20Foundation%20Audit%20Report.pdf
- House PDF GET **200** `application/pdf` **2,583,270** bytes. Advancement tax listing **403/404**; house PDF GET **200** is enough.
- Eastern Illinois University Foundation FY2025 financial statements (CliftonLarsonAllen LLP Charleston, 30 October 2025): https://www.eiu.edu/found/docs/Foundation_Audit_2025.pdf
- Eastern Illinois University Foundation listing: https://www.eiu.edu/found/ (GET **200** with href `docs/Foundation_Audit_2025.pdf`)
- Northern Illinois University Foundation FY2025 financial statements (logo-only, 8 October 2025): https://foundation.myniu.com/images.html?file_id=nHtj3es3TmQ%3D
- House PDF GET **200** `application/pdf` **440,104** bytes. Listing `https://foundation.myniu.com/financials` GET **200**.
- Southern Illinois University Edwardsville Foundation FY2025 financial statements (logo-only Springfield, 17 October 2025): https://www.siue.edu/give/about/pdf/FY25-Audited-Financial-Statements.pdf
- SIUE Foundation listing: https://www.siue.edu/give/about/financial-information.shtml (GET **200** with href `pdf/FY25-Audited-Financial-Statements.pdf`)

## What this wave is not

- Not a remint of Wave 235 College of Western Idaho Foundation, Cal State Fullerton Philanthropic Foundation, University of Montana Foundation, CSUSB Philanthropic Foundation, or CSU San Marcos Foundation.
- Not leftover University of Illinois Foundation (`/uif/`). Not leftover SIU Foundation (`/siu-foundation/`). Not leftover Northeastern University (Boston).
- Not leftover Wheaton College (house PDF GET **403**). Not leftover CSU system-wide Foundation (GET **403**). Not leftover UWM Foundation (empty flipbook). Not leftover CSUN Foundation (Box-only).
- Not leftover University of Maine Foundation (listing still **31 Dec 2024**). Not leftover WIU Foundation (scan-only PDF; thin extract is not a lock). Not leftover Chicago State Foundation (newest public house FS still FY2024 / GASB).
- Not leftover Governors State University Foundation (request-only). Not leftover North Central College (Cloudflare **403**). Not leftover UCM Foundation 990 / leftover Issuu glossy.
- Not leftover Portland State University Foundation (house PDF curl **000**). Not leftover Boise State University Foundation after the university AFR names only “other auditors.”
- Not leftover Auburn AUF after the university AFR still lacks a named AUF endowment change table.
- Not leftover UNM Foundation GASB. Not leftover Gonzaga (listing still **403**). Not leftover Mercer / leftover LMU / leftover Iowa State / leftover LSU / leftover Cincinnati / leftover DePaul / leftover Fairfield / leftover Seton Hall / leftover Providence / leftover John Carroll.
- Not leftover Long Beach State Foundation GASB. Not leftover Sacramento State Foundation GASB. Not leftover Cal Poly Pomona Philanthropic Foundation GASB. Not leftover Cal Poly Humboldt Foundation GASB.
- Not leftover Ball State 990s. Not leftover Texas Tech FY2024. Not leftover UNI 2024 FS. Not leftover WWU university AFR “other auditors.”

## Short-slug reservations

- Never mint `/neiu/`, `/northeastern/`, or `/golden-eagles/`. `/northeastern/` remains reserved against leftover Northeastern University (Boston). `/golden-eagles/` remains reserved against leftover Marquette.
- Never mint `/isu/`, `/isuf/`, `/illinois-state/`, or `/redbirds/`. `/isu/` / `/isuf/` remain Idaho State.
- Never mint `/eiu/`, `/eastern-illinois/`, or `/panthers/`. `/panthers/` remains reserved against leftover Chapman.
- Never mint `/niu/`, `/northern-illinois/`, or `/huskies/`. `/huskies/` would flatten leftover University of Washington / leftover Northeastern University.
- Never mint `/siue/`, `/edwardsville/`, `/siu/`, `/siuf/`, or `/cougars/`. `/siu/` / `/siuf/` remain the SIU Foundation. `/cougars/` remains reserved against leftover College of Charleston Foundation.

## Related-link flatten (Wave 235 / leftover Illinois peers)

- `/idaho-state-university-foundation/` related: add Illinois State University Foundation (leftover Illinois State; `/isu/` remains Idaho State).
- `/siu-foundation/` related: Eastern Washington University Foundation → SIUE Foundation (leftover SIUE; do not flatten SIUE onto SIU numbers).
- `/eastern-washington-university-foundation/` related: University of Wyoming Foundation → Eastern Illinois University Foundation (leftover Eastern Illinois).
