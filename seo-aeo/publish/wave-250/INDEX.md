# Wave 250 — leftover-unique 2025 house endowments (California Lutheran, Portland State University Foundation, Southern Oregon University Foundation)

Date: 28 August 2026
Desk: research
Editor status: draft

Three leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these three slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | California Lutheran University and Affiliate | `/california-lutheran-endowment/` | https://www.callutheran.edu/president/documents/Audited-Financial-Statements-May-2025.pdf | Endowment NA **$154,635,785**; printed Total investment return **$14,723,689**; Appropriation **$6,652,359** | Logo-only Los Angeles **24 Sep 2025**. FY ends **31 May 2025** |
| 2 | Portland State University Foundation and its Subsidiary | `/portland-state-university-foundation/` | https://psuf.org/files/galleries/FY25_Audited_Financial_Statements.pdf | Endowment NA **$131,661,168**; printed Investment return, net **$10,317,296**; Appropriation **$3,476,065** | Logo-only Portland **31 Oct 2025**. Not leftover Whittier **$131,581,620**. Never remint `/psu/` |
| 3 | Southern Oregon University Foundation | `/southern-oregon-university-foundation/` | https://giving.sou.edu/wp-content/uploads/2026/01/FINAL-Southern-Oregon-University-Foundation-6-30-25_FS.pdf | Total Endowment Fund **$42,517,893**; printed Investment returns **$5,104,964**; Appropriated expenditures **$1,436,475** | Jones & Roth Eugene **22 Dec 2025** |

## Official sources (independently re-GET this wake)

- California Lutheran University and Affiliate FY2025 consolidated financial statements (logo-only, Los Angeles, California, 24 September 2025): https://www.callutheran.edu/president/documents/Audited-Financial-Statements-May-2025.pdf
- House PDF GET **200** `application/pdf` **1,265,860** bytes. Listing `https://www.callutheran.edu/president/annual-reports.html` GET **200**. House PDF GET **200** is the card. FY ends **31 May 2025**.
- Portland State University Foundation FY2025 consolidated financial statements (logo-only, Portland, Oregon, 31 October 2025): https://psuf.org/files/galleries/FY25_Audited_Financial_Statements.pdf
- House PDF independently GET **200** `application/pdf` **881,943** bytes this wake. Listing `https://psuf.org/about/financials` independently GET **000**. House `https://psuf.org/` independently GET **000**. Later same-URL retries independently GET **000** (SSL timeout). House PDF GET **200** this wake is the card.
- Southern Oregon University Foundation FY2025 financial statements (Jones & Roth, P.C., Eugene, Oregon, 22 December 2025): https://giving.sou.edu/wp-content/uploads/2026/01/FINAL-Southern-Oregon-University-Foundation-6-30-25_FS.pdf
- House PDF GET **200** `application/pdf` **311,590** bytes. Listing `https://giving.sou.edu/about/financials/` GET **200**. House PDF GET **200** is the card.

## What this wave is not

- Not a remint of Wave 249 RISD, SCSU Foundation, WCSU Foundation, Unity Environmental, or New England College of Optometry.
- Not leftover Whittier after that keeper already ships as Wave 240 (card **$131,581,620** is a close dollar to PSUF **$131,661,168** — do not flatten).
- Not leftover University of Portland after that keeper already ships as Wave 228.
- Not leftover Pacific Lutheran after that keeper already ships as Wave 230.
- Not leftover Oregon State University Foundation / leftover University of Oregon Foundation / leftover Western Oregon University Foundation after those keepers already ship as Waves 232–233.
- Not leftover Penn State after that keeper already ships as Wave 202. **Never remint `/psu/`.**
- Not leftover Simmons after the 2025 house FS independently GET **200** but leftover named Investment income + leftover Net appreciation and **no labeled Total**.
- Not leftover Western New England after leftover named Interest and dividends + leftover Realized/unrealized and **no labeled Total**.
- Not leftover Elms after leftover named Investment Income + leftover Realized and Unrealized Gain and **no labeled Total**.
- Not leftover CCSU Foundation after leftover named Investment income, net **$5,517,769** + leftover Net realized and unrealized appreciation **$3,563,322** and **no labeled Total**.
- Not leftover UVM Foundation / leftover UNH Foundation after leftover split return and **no labeled Total**.
- Not leftover Cal Poly Foundation SLO after the 2025 house FS independently GET **200** `application/pdf` **749,747** bytes but the book is GASB and prints leftover endowment investments **$329,733,414** vs leftover restricted endowments NP **$177,080,722** and leftover MD&A **13.2%** with **no labeled Total return and no labeled appropriation dollars**.
- Not leftover Long Beach State Foundation / leftover East Bay Educational Foundation / leftover Tower Foundation SJSU / leftover UFSS Sacramento / leftover Cal Poly Pomona Philanthropic Foundation / leftover Humboldt Foundation after leftover GASB books with **no labeled change-table appropriation**.
- Not leftover Fresno after the annual report independently GET **200** but is image-only.
- Not leftover WKU university GASB after leftover College Heights is a discrete component and Note 20 is leftover **31 December 2024**.
- Not leftover Gonzaga after `gonzaga.azureedge.net` independently GET **000** and the listing independently GET **403**. WebSearch extract is not a lock. Never remint `/bulldogs/`.
- Not leftover CSUN / leftover LMU / leftover Pacific University Forest Grove after those 2025 house FS paths are Box only.
- Not leftover Saint Mary’s CA after public hrefs stop ~2022. Not leftover La Verne after the listing independently GET **403**.
- Not leftover Oregon Tech Foundation after the latest public house FS is leftover **FY2024**. Not leftover EOU after the “2025 Annual Financial Report” is leftover Flipsnack.

## Short-slug reservations

- Never mint `/clu/` or `/cal-lutheran/`.
- Never remint `/psu/`. `/psu/` is already the reserved twin of Wave 202 `/penn-state-endowment/`.
- Never mint `/psuf/`.
- Never mint `/sou/` or `/souf/`.
- Never mint `/risd/`, `/scsu/`, `/wcsu/`, `/unity/`, `/neco/`, `/nec/`, `/optometry/`.
- Never remint `/huskies/`, `/holy-cross/`, `/yellow-jackets/`, `/beavers/`, `/bulldogs/`, `/rams/`.
- Never mint `/anna-maria/`, `/amc/`, `/dean/`, `/suffolk/`, `/wheaton/`, `/olin/`, `/wentworth/`, `/lesley/`, `/mcla/`, `/nichols/`, `/gordon/`, `/curry/`, `/assumption/`, `/stonehill/`, `/springfield/`, `/clark/`, `/aic/`, `/babson/`, `/emerson/`, `/mcphs/`, `/hellenic/`, `/hchc/`, `/bac/`, `/berklee/`, `/jwu/`, `/uri/`, `/uconn/`, `/ucf/`, `/ccsu/`, `/unh/`, `/unhf/`, `/uvm/`, `/uvmf/`, `/ecsu/`, `/lu/`, `/lasers/`, `/cu/`, `/greyhounds/`, `/cougars/`, `/lclark/`, `/wwu/`, `/plu/`, `/wesleyan/`, or `/fwolin/`.
