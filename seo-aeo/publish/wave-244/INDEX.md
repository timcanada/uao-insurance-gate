# Wave 244 — leftover-unique 2025 house endowments (Curry College, Assumption University, Stonehill College, Springfield College, Clark University)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Curry College | `/curry-college-endowment/` | https://www.curry.edu/assets/Documents/About-Us/Curry-College-Financial-Statements-May-31-2025-and-2024.pdf | Endowment NA **$83,240,168**; printed Total Investment Gain **$8,292,052**; Endowment Spending Draw **$4,285,000** | CliftonLarsonAllen LLP Quincy **17 Oct 2025** |
| 2 | Assumption University | `/assumption-university-endowment/` | https://www.assumption.edu/wp-content/uploads/2025/12/Assumption-University_25-FS_Final.pdf | Endowment NA **$107,357,442**; printed Investment return, net **$9,676,611**; Appropriation of endowment assets for expenditure **$13,118,407** | Logo-only Boston **28 Oct 2025** |
| 3 | Stonehill College | `/stonehill-college-endowment/` | https://stonehill-website.s3.amazonaws.com/files/resources/stonehill-college-inc-2025-financial-statements.pdf | Endowment NA **$326,474,328**; printed Total investment return **$29,167,745**; Distribution of endowment assets for expenditure **$12,290,361** | CBIZ CPAs P.C. Boston **24 Nov 2025** |
| 4 | Springfield College | `/springfield-college-endowment/` | https://springfield.edu/sites/default/files/springfield-college-reports-2025-final-financial.pdf | Endowment NA **$109,474,750**; printed Investment returns, net **$9,413,547**; Appropriation for expenditure **$4,499,458** | Logo-only New York **9 Dec 2025** |
| 5 | Clark University | `/clark-university-endowment/` | https://cdn.clarku.edu/business-and-financial-services/wp-content/uploads/sites/126/2025-Clark-University-FS.pdf | Endowment NA **$501,327 thousand**; printed Investment returns, net **$37,885 thousand**; Appropriations of endowment assets for expenditure (draw) **$28,228 thousand** | Logo-only Boston **30 Oct 2025** |

## Official sources (independently re-GET this wake)

- Curry College FY2025 financial statements (CliftonLarsonAllen LLP, Quincy, Massachusetts, 17 October 2025): https://www.curry.edu/assets/Documents/About-Us/Curry-College-Financial-Statements-May-31-2025-and-2024.pdf
- House PDF GET **200** `application/pdf` **483,746** bytes. Listing `https://www.curry.edu/about-us/why-curry/financial-standing` GET **200** with href `assets/Documents/About-Us/Curry-College-Financial-Statements-May-31-2025-and-2024.pdf`. House PDF GET **200** is the card. FY ends **31 May 2025**.
- Assumption University FY2025 financial statements (logo-only Boston, Massachusetts, 28 October 2025): https://www.assumption.edu/wp-content/uploads/2025/12/Assumption-University_25-FS_Final.pdf
- House PDF GET **200** `application/pdf` **371,311** bytes. House PDF GET **200** is the card. FY ends **31 May 2025**.
- Stonehill College FY2025 financial statements (CBIZ CPAs P.C., Boston, Massachusetts, 24 November 2025): https://stonehill-website.s3.amazonaws.com/files/resources/stonehill-college-inc-2025-financial-statements.pdf
- House PDF GET **200** `application/pdf` **2,218,386** bytes. Listing `https://www.stonehill.edu/offices-and-services/finance/financial-statements/` GET **200**. House PDF GET **200** is the card. ProPublica FAC download independently GET **403**; house S3 PDF GET **200** is the card.
- Springfield College FY2025 financial statements (logo-only New York, New York, 9 December 2025): https://springfield.edu/sites/default/files/springfield-college-reports-2025-final-financial.pdf
- House PDF GET **200** `application/pdf` **1,014,717** bytes. House PDF GET **200** is the card.
- Clark University FY2025 consolidated financial statements (logo-only Boston, Massachusetts, 30 October 2025): https://cdn.clarku.edu/business-and-financial-services/wp-content/uploads/sites/126/2025-Clark-University-FS.pdf
- House PDF GET **200** `application/pdf` **276,985** bytes. House PDF GET **200** is the card. Figures print in thousands. FY ends **31 May 2025**.

## What this wave is not

- Not a remint of Wave 243 Capital University, Regis College, Mississippi University for Women Foundation, Endicott College, or Lasell University.
- Not leftover Simmons University as a Wave 244 keeper after the 2025 house FS independently GET **200** `application/pdf` **1,928,257** bytes. Change table prints leftover named Investment income **$4,550 thousand** / leftover Net appreciation **$21,836 thousand**. This PDF does **not** print a labeled Total investment return. Do not homemade-sum the named return lines. Leftover endowment NA **$252,387 thousand** / leftover Amounts appropriated **$29,081 thousand** stay leftover until a labeled printed total locks. CBIZ Boston **17 October 2025**. Figures print in thousands.
- Not leftover Western New England University as a Wave 244 keeper after the 2025 house FS independently GET **200** `application/pdf` **1,577,705** bytes. Change table prints leftover named Interest and dividends, net of fees **$309 thousand** / leftover Realized/unrealized gains **$10,547 thousand**. This PDF does **not** print a labeled Total investment return. Do not homemade-sum. Leftover endowment NA **$92,391 thousand** / leftover Distributions **$2,965 thousand** stay leftover. Figures print in thousands.
- Not leftover Pacific Lutheran (already Wave **230**). Not leftover Wesleyan University (already Wave **206**). Not leftover Holy Cross (already Wave **207**). Not leftover Hampshire College (already Wave **239**). Not leftover Wheaton Illinois after the house PDF independently GET **200** but the change table prints leftover named Interest and dividends / leftover Realized gains / leftover Unrealized gains and does **not** print a labeled Total.
- Not leftover Wentworth / leftover Lesley / leftover MCLA Foundation after those house PDFs independently GET **200** this wake; cap five. Next wake can lock leftover-unique labeled totals.
- Not leftover Saint Martin’s University (unlabeled sum). Not leftover UWM Foundation (no printed Total). Not leftover Iowa State Foundation (no leftover-unique house PDF GET **200**). Not leftover Cornell College Iowa. Not leftover Wheaton listing **403** path. Not leftover College of Wooster SharePoint. Not leftover Pacific University Box. Not leftover Walla Walla JS-thin. **Never mint `/wwu/`.**

## Short-slug reservations

- Never mint `/curry/` or `/curry-college/` or `/colonels/`. Not leftover leftover food-search flatten. Not leftover Hampshire.
- Never mint `/assumption/` or `/assumption-university/`. **Never remint `/greyhounds/`.** `/greyhounds/` remains reserved against leftover Loyola Maryland. Not leftover Holy Cross. Not leftover Clark.
- Never mint `/stonehill/` or `/stonehill-college/` or `/skyhawks/`. Not leftover Notre Dame Endowment Pool. Not leftover Endicott.
- Never mint `/springfield/` or `/springfield-college/` or `/pride/`. `/springfield/` would flatten leftover Springfield Police Illinois / leftover UMass Springfield / leftover Springfield, Illinois. Not leftover Hampshire.
- Never mint `/clark/` or `/clark-university/`. `/clark/` would flatten leftover Clark Atlanta / leftover Clark County / leftover Lewis & Clark. **Never remint `/cougars/`.** `/cougars/` remains reserved against leftover College of Charleston Foundation. **Never remint `/lclark/`.**
- Never mint `/capital/`, `/regis/`, `/muw/`, `/endicott/`, `/lasell/`, `/cu/`, `/lu/`, `/lasers/`, `/wwu/`, `/whitworth/`, `/pirates/`, `/wsu/`, `/baldwin/`, `/bw/`, `/yellow-jackets/`, `/linfield/`, `/heidelberg/`, `/hu/`, `/student-princes/`, `/goucher/`, `/gophers/`, `/cwu/`, `/wildcats/`, `/wright/`, `/nmu/`, `/lssu/`, `/ferris/`, `/fsu/`, `/wayne/`, `/washington/`, `/uw/`, `/northwest/`, `/whittier/`, `/msu/`, `/msuf/`, `/uif/`, `/uwf/`, `/isu/`, `/cornell/`, `/eagles/`, `/plu/`, `/wesleyan/`, `/concordia/`, `/washington-college/`, `/vikings/`, `/holy-cross/`, or `/hampshire/`.

## Related-link flatten (Wave 243 leftover Massachusetts peers)

- `/hampshire-college-endowment/` related: add Curry, Assumption, Stonehill, Springfield, and Clark (leftover-unique MA private peers; do **not** flatten those books onto Hampshire **$24,038,015**; never mint `/hampshire/` or `/springfield/`).
- `/regis-college-endowment/` related: add Curry, Assumption, Stonehill, Springfield, and Clark (do **not** flatten those books onto Regis **$53,952,632**; never mint `/regis/`).
- `/endicott-college-endowment/` related: add Curry, Assumption, Stonehill, Springfield, and Clark (do **not** flatten those books onto Endicott **$163,509,484**; never mint `/endicott/`).
- `/lasell-university-endowment/` related: add Curry, Assumption, Stonehill, Springfield, and Clark (do **not** flatten those books onto Lasell **$46,142,514**; never remint `/lu/`).
- `/holy-cross-endowment/` related: add Assumption University endowment and Clark University endowment (leftover-unique Worcester peers; do **not** flatten Assumption **$107,357,442** or Clark **$501,327 thousand** onto Holy Cross **$1,207,691 thousand**; never mint `/clark/` or `/holy-cross/`).
