# Wave 242 — leftover-unique 2025 house endowments (Whitworth University, Baldwin Wallace University, Linfield University, Heidelberg University, Goucher College)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Whitworth University | `/whitworth-university-endowment/` | https://www.whitworth.edu/cms/media/whitworth/documents/administration/business-affairs/consolidated-financial-statements-2025.pdf | Endowment NA **$215,251 thousand**; printed Total investment return **$19,487 thousand**; Appropriation of endowment assets for expenditure **$11,805 thousand** | Baker Tilly San Francisco **8 Oct 2025** |
| 2 | Baldwin Wallace University | `/baldwin-wallace-university-endowment/` | https://www.bw.edu/about/offices/finance/_files/financial-statement-2024-25.pdf | Endowment NA **$184,857,814**; printed Investment income and gains **$14,754,380**; Distributions and expenses **$7,168,167** | Forvis Mazars, LLP Fort Wayne **26 Nov 2025** |
| 3 | Linfield University | `/linfield-university-endowment/` | https://www.linfield.edu/assets/files/general/2025-Linfield-University-FINAL-FS-short.pdf | Endowment NA **$128,308,313**; printed Total investment return **$14,387,949**; Appropriation of endowment assets for expenditure **$7,284,262** | Forvis Mazars, LLP Fort Wayne **26 Jan 2026** |
| 4 | Heidelberg University | `/heidelberg-university-endowment/` | https://inside.heidelberg.edu/sites/default/files/2025-12/2025_-_heidelberg_university_final_short_form_fs.pdf | Endowment NA **$78,103,625**; printed Investment return **$7,863,565**; Appropriation of endowment assets for expenditures **$4,391,526** | Forvis Mazars, LLP Fort Wayne **18 Nov 2025** |
| 5 | Goucher College | `/goucher-college-endowment/` | https://www.goucher.edu/controller/documents/Goucher-College-Audited-Financial-Statements-2025.pdf | Endowment NA **$300,094 thousand**; printed Investment return, net **$29,991 thousand**; Appropriation of endowment assets for expenditure **$26,480 thousand** | Baker Tilly Philadelphia **7 Nov 2025** |

## Official sources (independently re-GET this wake)

- Whitworth University FY2025 consolidated financial statements (Baker Tilly, San Francisco, California, 8 October 2025): https://www.whitworth.edu/cms/media/whitworth/documents/administration/business-affairs/consolidated-financial-statements-2025.pdf
- House PDF GET **200** `application/pdf` **476,995** bytes. Listing `https://www.whitworth.edu/cms/administration/business-affairs/audit-statements/` GET **200**. Listing is JS-thin; house PDF GET **200** is the card. Figures print in thousands.
- Baldwin Wallace University FY2025 consolidated financial statements (Forvis Mazars, LLP, Fort Wayne, Indiana, 26 November 2025): https://www.bw.edu/about/offices/finance/_files/financial-statement-2024-25.pdf
- House PDF GET **200** `application/pdf` **297,443** bytes. Listing `https://www.bw.edu/about/offices/finance/` GET **200** with href `/about/offices/finance/_files/financial-statement-2024-25.pdf`. House PDF GET **200** is the card.
- Linfield University FY2025 consolidated financial statements (Forvis Mazars, LLP, Fort Wayne, Indiana, 26 January 2026): https://www.linfield.edu/assets/files/general/2025-Linfield-University-FINAL-FS-short.pdf
- House PDF GET **200** `application/pdf` **902,422** bytes. Listing `https://www.linfield.edu/financial-services/financial-statements.html` GET **200**. House PDF GET **200** is the card. Change table excludes split-interest agreement funds.
- Heidelberg University FY2025 financial statements (Forvis Mazars, LLP, Fort Wayne, Indiana, 18 November 2025): https://inside.heidelberg.edu/sites/default/files/2025-12/2025_-_heidelberg_university_final_short_form_fs.pdf
- House PDF GET **200** `application/pdf` **556,115** bytes. House PDF GET **200** is the card. Composition prints donor-restricted endowment only.
- Goucher College FY2025 financial statements (Baker Tilly, Philadelphia, Pennsylvania, 7 November 2025): https://www.goucher.edu/controller/documents/Goucher-College-Audited-Financial-Statements-2025.pdf
- House PDF GET **200** `application/pdf` **663,516** bytes. Listing `https://www.goucher.edu/controller/` GET **200**. House PDF GET **200** is the card. Figures print in thousands.

## What this wave is not

- Not a remint of Wave 241 Central Washington University Foundation, Wright State University Foundation, Northern Michigan University Foundation, Lake Superior State University Foundation, or Ferris Foundation.
- Not leftover UWM Foundation as a Wave 242 keeper. House 2025 FS independently re-GET **200** `application/pdf` **614,679** bytes at `https://uwm.foundation/wp-content/uploads/2026/02/2025-UWM-Foundation-Audited-Financial-Statements.pdf`. Change table still prints leftover named Interest and dividend income **$4,936,302** / leftover Net appreciation **$12,800,718**. This PDF does **not** print a Total investment return on that change table. Do not homemade-sum the named return lines. Leftover entity-wide Total investment income **$27,070,604** / leftover glossy annual report / leftover 990 / leftover **4.00%** are not the card. Never mint `/uw/` or `/uwf/`.
- Not leftover Saint Martin’s University as a Wave 242 keeper after the 2025 house FS independently GET **200** `application/pdf` **968,264** bytes at `https://www.stmartin.edu/documents/fiscal-2025-annual-financial-report`. Change table prints leftover named Investment income, net **$961,782** / leftover Net appreciation **$5,406,217** and an unlabeled **$6,367,999**. This PDF does **not** print a labeled Total investment return. Do not homemade-sum the named return lines. Leftover endowment NA **$54,216,871** / leftover Expenditures appropriated and other **$1,293,400** stay leftover until a labeled printed total locks. Logo-only Yakima **19 February 2026**. Never mint `/wwu/`.
- Not leftover Capital University as a Wave 242 keeper after the 2025 house FS independently GET **200** `application/pdf` **397,824** bytes at `https://www.capital.edu/media/epzha4yj/2025-financial-statements.pdf`. Cap five. Next wake can lock the change table.
- Not leftover Iowa State University Foundation (Salesforce listing still GET **200** and still names FY 2025 PDF; no leftover-unique house PDF independently GET **200**). **Never mint `/uif/`.**
- Not leftover Cornell College Iowa (listing still Incapsula-thin). **Never mint `/cornell/`.**
- Not leftover Wheaton College (house PDF still GET **403**). WebSearch extract is not an independent GET **200**.
- Not leftover College of Wooster (2025 FS is SharePoint). Not leftover Pacific University (Box).
- Not leftover Walla Walla University (listing GET **200** and names FY 2025 FS; page is JS-thin; guessed PDFs **404**). **Never mint `/wwu/`.** `/wwu/` would flatten leftover Western Washington.
- Not leftover Western Washington University AFR (GET **200**; university GASB AFR is not a leftover-unique Foundation letterhead FASB change table).
- Not leftover University of Puget Sound (already Wave **213**). Not leftover Whitman (already Wave **211**). Not leftover Seattle University (already Wave **228**). Not leftover Pacific Lutheran. Not leftover Northwest University (already Wave **240**). Not leftover Willamette (already Wave **227**). Not leftover University of Portland (already Wave **228**). Not leftover Lewis & Clark (already Wave **212**). Not leftover University of Dayton (already Wave **225**). Not leftover Xavier (already Wave **225**). Not leftover Ohio Wesleyan (already Wave **239**). Not leftover Wright State University Foundation (already Wave **241**). Not leftover Washington College (already Wave **239**). Not leftover American University (already Wave **230**).
- Not leftover Portland State University Foundation (independent curl still times out). WebSearch extract is not a lock.
- Not leftover UNI Foundation. Not leftover Northwest Foundation (newest public still FY2024). Not leftover Pittsburg State / leftover Truman / leftover Fort Hays / leftover Lincoln Missouri / leftover North Central / leftover CSU system-wide / leftover WIU / leftover Gonzaga / leftover Mercer / leftover LMU.

## Short-slug reservations

- Never mint `/whitworth/` or `/pirates/`. **Never mint `/wsu/`.** `/wsu/` would flatten leftover Washington State / leftover Wichita State / leftover Wayne State / leftover Wright State. Not leftover Whitman. Not leftover University of Puget Sound. Not leftover Walla Walla.
- Never mint `/baldwin-wallace/`, `/baldwin/`, `/bw/`, or `/yellow-jackets/`. Not leftover Case Western. Not leftover Wright State. Not leftover Ohio Wesleyan.
- Never mint `/linfield/` or `/lu/`. `/lu/` would flatten leftover Liberty / leftover Lehigh. **Never mint `/wildcats/`.** `/wildcats/` remains reserved against leftover CSU Chico Foundation.
- Never mint `/heidelberg/`, `/hu/`, or `/student-princes/`. `/hu/` would flatten leftover Howard. Not leftover Heidelberg, Germany.
- Never mint `/goucher/`. **Never mint `/gophers/`.** `/gophers/` remains reserved against leftover University of Minnesota Foundation.
- Never mint `/cwu/`, `/central-washington/`, `/wildcats/`, `/wsu/`, `/wright/`, `/wright-state/`, `/nmu/`, `/northern-michigan/`, `/lssu/`, `/lake-superior/`, `/lakers/`, `/ferris/`, `/fsu/`, `/bulldogs/`, `/wayne/`, `/wayne-state/`, `/wsc/`, `/washington-state/`, `/cougars/`, `/washington/`, `/uw/`, `/lake-forest/`, `/lfc/`, `/northwest/`, `/nwu/`, `/nu/`, `/whittier/`, `/msu/`, `/msuf/`, `/uif/`, `/uwf/`, `/isu/`, `/isuf/`, `/cornell/`, `/eagles/`, `/plu/`, `/wesleyan/`, `/concordia/`, `/washington-college/`, `/vikings/`, or `/wwu/`.

## Related-link flatten (Wave 241 leftover Washington / Ohio / Oregon / Maryland peers)

- `/northwest-university-endowment/` related: add Whitworth University endowment (leftover-unique WA private peer; do **not** flatten Whitworth **$215,251 thousand** onto Northwest University **$9,368 thousand**; never mint `/whitworth/` or `/wsu/`).
- `/puget-sound-endowment/` related: add Whitworth University endowment (leftover-unique WA private peer; do **not** flatten Whitworth onto Puget Sound **$507,671 thousand**).
- `/whitman-endowment/` related: add Whitworth University endowment (leftover-unique WA private peer; do **not** flatten Whitworth onto Whitman **$815,630 thousand**).
- `/university-of-dayton-endowment/` related: add Baldwin Wallace University endowment and Heidelberg University endowment (leftover-unique OH peers; do **not** flatten Baldwin Wallace **$184,857,814** or Heidelberg **$78,103,625** onto Dayton **$937,402 thousand**).
- `/xavier-university-endowment/` related: add Baldwin Wallace University endowment and Heidelberg University endowment (leftover-unique OH peers; do **not** flatten those books onto Xavier **$300,653 thousand**).
- `/ohio-wesleyan-endowment/` related: add Baldwin Wallace University endowment and Heidelberg University endowment (leftover-unique OH peers; do **not** flatten those books onto Ohio Wesleyan **$325,330,091**).
- `/wright-state-university-foundation/` related: add Baldwin Wallace University endowment and Heidelberg University endowment (leftover-unique OH peers; do **not** flatten those books onto Wright State University Foundation **$126,828,285**; never mint `/wsu/`).
- `/willamette-endowment/` related: add Linfield University endowment (leftover-unique OR peer; do **not** flatten Linfield **$128,308,313** onto Willamette **$331,819 thousand**).
- `/university-of-portland-endowment/` related: add Linfield University endowment (leftover-unique OR peer; do **not** flatten Linfield onto University of Portland **$378,482 thousand**).
- `/lewis-clark-endowment/` related: add Linfield University endowment (leftover-unique OR peer; do **not** flatten Linfield onto Lewis & Clark **$331,958,818**).
- `/washington-college-endowment/` related: add Goucher College endowment (leftover-unique Mid-Atlantic peer; do **not** flatten Goucher **$300,094 thousand** onto Washington College **$370,994,636**; never mint `/gophers/` or `/washington/`).
