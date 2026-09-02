# Wave 241 — leftover-unique 2025 house endowments (Central Washington University Foundation, Wright State University Foundation, Northern Michigan University Foundation, Lake Superior State University Foundation, Ferris Foundation)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Central Washington University Foundation | `/central-washington-university-foundation/` | https://www.cwu.edu/about/offices/advancement/foundation/_documents/cwuf-audited-financial-statement-fy2025.pdf | Endowment NA **$47,591,168**; printed Total investment return **$5,273,596**; Appropriation of endowment assets for expenditure and redesignation **$2,297,054** | Logo-only Yakima **23 Oct 2025** |
| 2 | Wright State University Foundation | `/wright-state-university-foundation/` | https://www.wright.edu/sites/www.wright.edu/files/2026-07/Wright_State_University_Foundation_Inc._25_Report.pdf | Endowment NA **$126,828,285**; printed Total investment return **$14,211,076**; Appropriation of assets for expenditure **$5,865,543** | Forvis Mazars LLP Dayton **8 Oct 2025** |
| 3 | Northern Michigan University Foundation | `/northern-michigan-university-foundation/` | https://foundation.nmu.edu/sites/foundation.nmu.edu/files/2025-10/2025-NMUF-Financial-Statement-FINAL.pdf | Endowment NA **$61,207,917**; printed Investment return, net **$5,463,699**; Amounts appropriated for expenditure **$1,452,220** | Logo-only **4 Sep 2025** |
| 4 | Lake Superior State University Foundation | `/lake-superior-state-university-foundation/` | https://www.lssu.edu/wp-content/uploads/2025/12/Final-LSSU-AFS-FY25.pdf | Endowment NA with donor restrictions **$26,916,419**; printed Investment return, net **$3,212,928**; Appropriation of endowment assets for expenditures **$955,517** | Logo-only **4 Dec 2025** |
| 5 | Ferris Foundation | `/ferris-foundation/` | https://www.ferris.edu/administration/adminandfinance/finance/FerrisFoundationFINAL.pdf | Endowment NA **$131,936,968**; printed Total investment return **$9,803,784**; Appropriation of endowment assets for expenditures, net of administrative expenses **$6,182,748** | Logo-only **18 Sep 2025** |

## Official sources (independently re-GET this wake)

- Central Washington University Foundation and Alumni Association FY2025 combined financial statements (logo-only Yakima, Washington, 23 October 2025): https://www.cwu.edu/about/offices/advancement/foundation/_documents/cwuf-audited-financial-statement-fy2025.pdf
- House PDF GET **200** `application/pdf` **845,168** bytes. Listing `https://www.cwu.edu/about/offices/advancement/foundation/` GET **200**. House PDF GET **200** is the card.
- Wright State University Foundation, Inc. FY2025 consolidated financial statements (Forvis Mazars, LLP, Dayton, Ohio, 8 October 2025): https://www.wright.edu/sites/www.wright.edu/files/2026-07/Wright_State_University_Foundation_Inc._25_Report.pdf
- House PDF GET **200** `application/pdf` **801,932** bytes. Listing `https://www.wright.edu/giving` GET **200**. Guessed `/about/offices/advancement` **404**; house PDF GET **200** is the card.
- Northern Michigan University Foundation FY2025 financial statements (logo-only, 4 September 2025): https://foundation.nmu.edu/sites/foundation.nmu.edu/files/2025-10/2025-NMUF-Financial-Statement-FINAL.pdf
- House PDF GET **200** `application/pdf` **418,953** bytes. Listing `https://foundation.nmu.edu/` GET **200**. House PDF GET **200** is the card.
- Lake Superior State University FY2025 annual financial statements, Foundation FASB change table discretely presented (logo-only, 4 December 2025): https://www.lssu.edu/wp-content/uploads/2025/12/Final-LSSU-AFS-FY25.pdf
- House PDF GET **200** `application/pdf` **2,866,246** bytes. Guessed listing `https://www.lssu.edu/about/offices/finance/` **404**; house PDF GET **200** is the card. Foundation reports under FASB. Board voted May 2025 to dissolve; the **30 Jun 2025** change table still locks. Do not invent a post-dissolution card.
- Ferris Foundation FY2025 financial statements (logo-only, 18 September 2025): https://www.ferris.edu/administration/adminandfinance/finance/FerrisFoundationFINAL.pdf
- House PDF GET **200** `application/pdf` **604,112** bytes. Listing `https://www.ferris.edu/administration/adminandfinance/finance/financial-reports.htm` GET **200** with href `/administration/adminandfinance/finance/FerrisFoundationFINAL.pdf`. House PDF GET **200** is the card. University AFR glossy leftover **$131.9 million** is not the card source.

## What this wave is not

- Not a remint of Wave 240 Wayne State Foundation Nebraska, Washington State University Foundation, Lake Forest College, Northwest University, or Whittier College.
- Not leftover UWM Foundation as a Wave 241 keeper. House 2025 FS independently re-GET **200** `application/pdf` **614,679** bytes at `https://uwm.foundation/wp-content/uploads/2026/02/2025-UWM-Foundation-Audited-Financial-Statements.pdf`. Change table still prints leftover named Interest and dividend income **$4,936,302** / leftover Net appreciation **$12,800,718**. This PDF does **not** print a Total investment return on that change table. Do not homemade-sum the named return lines. Leftover entity-wide Total investment income **$27,070,604** / leftover glossy annual report / leftover 990 / leftover **4.00%** are not the card. Never mint `/uw/` or `/uwf/`.
- Not leftover Iowa State University Foundation (Salesforce listing still GET **200** and still names FY 2025 PDF; href still JS-rendered; guessed PDFs failed). **Never mint `/uif/`.**
- Not leftover Cornell College Iowa (listing GET **200** still Incapsula-thin). **Never mint `/cornell/`.**
- Not leftover Wheaton College (house PDF still GET **403**). WebSearch extract is not an independent GET **200**.
- Not leftover College of Wooster (2025 FS is SharePoint, not independent `application/pdf` GET **200**).
- Not leftover Pacific University (2024–2025 FS is Box, not independent PDF GET **200**).
- Not leftover Eastern Washington University Foundation (already Wave **232**, endowment NA **$44,172,986**). Do not remint.
- Not leftover Portland State University Foundation (WebSearch extract exists; independent curl still times out). WebSearch extract is **not** a lock.
- Not leftover UNH Foundation (PDF GET **200** but **GASB**). Not leftover FAU Foundation (PDF GET **200** but **GASB**). Not leftover USF / FAMU / FSU Research Foundation GASB DSOs.
- Not leftover SVSU Foundation (university AFR GET **200**; Foundation FASB SFP / SOA print entity-wide Investment income, net **$13,145,634** / disbursements **$4,650,019** / NA **$124,392,089** — no endowment change table with printed endowment NA + printed return + printed appropriation).
- Not leftover UNI Foundation. Not leftover Northwest Foundation (newest public still FY2024). Not leftover Pittsburg State / leftover Truman / leftover Fort Hays / leftover Lincoln Missouri / leftover North Central / leftover CSU system-wide / leftover WIU / leftover Gonzaga / leftover Mercer / leftover LMU.
- Not leftover Washington State University Foundation overwrite. Not leftover Wichita State University Foundation overwrite. Not leftover Wayne State overwrite. Not leftover University of Dayton overwrite. Not leftover Xavier overwrite. Not leftover Marquette overwrite. Not leftover Florida State.

## Short-slug reservations

- Never mint `/cwu/` or `/central-washington/`. **Never mint `/wildcats/`.** `/wildcats/` remains reserved against leftover CSU Chico Foundation. Not leftover Eastern Washington. Not leftover Washington State. Not leftover CSU.
- Never mint `/wright/` or `/wright-state/`. **Never mint `/wsu/`.** `/wsu/` would flatten leftover Washington State / leftover Wichita State / leftover Wayne State / leftover Wright State.
- Never mint `/nmu/` or `/northern-michigan/`. **Never mint `/msu/` or `/msuf/`.** Not leftover Marquette University. Not leftover Michigan State.
- Never mint `/lssu/`, `/lake-superior/`, or `/lakers/`. Not leftover NMU. Not leftover University of Michigan. Not leftover SVSU.
- Never mint `/ferris/`, `/fsu/`, or `/bulldogs/`. `/fsu/` remains reserved against leftover Florida State. Not leftover Ferris State university AFR glossy.
- Never mint `/wayne/`, `/wayne-state/`, `/wsc/`, `/washington-state/`, `/cougars/`, `/washington/`, `/uw/`, `/lake-forest/`, `/lfc/`, `/northwest/`, `/nwu/`, `/nu/`, `/whittier/`, `/uif/`, `/uwf/`, `/isu/`, `/isuf/`, `/cornell/`, `/eagles/`, `/plu/`, `/wesleyan/`, `/concordia/`, `/washington-college/`, or `/vikings/`.

## Related-link flatten (Wave 240 leftover Washington / Ohio / Michigan peers)

- `/washington-state-university-foundation/` related: add Central Washington University Foundation endowment (leftover-unique WA Foundation peer; do **not** flatten CWU **$47,591,168** onto Washington State University Foundation **$716,750,667** as if they are the same book; never mint `/wsu/`).
- `/eastern-washington-university-foundation/` related: add Central Washington University Foundation endowment (leftover-unique WA Foundation peer; do **not** flatten CWU onto Eastern Washington **$44,172,986**).
- `/university-of-dayton-endowment/` related: add Wright State University Foundation endowment (leftover-unique OH peer; do **not** flatten Wright State **$126,828,285** onto Dayton **$937,402 thousand**).
- `/xavier-university-endowment/` related: add Wright State University Foundation endowment (leftover-unique OH peer; do **not** flatten Wright State onto Xavier **$300,653 thousand**).
- `/marquette-endowment/` related: add Northern Michigan University Foundation endowment (leftover-unique Upper Peninsula peer; do **not** flatten Marquette **$1,138,420 thousand** onto NMU **$61,207,917**).
