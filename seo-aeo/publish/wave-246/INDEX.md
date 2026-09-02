# Wave 246 — leftover-unique 2025 house endowments (Anna Maria College, Dean College, Suffolk University, Wheaton College Massachusetts, Olin College)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Anna Maria College | `/anna-maria-college-endowment/` | https://annamaria.edu/wp-content/uploads/2026/04/Anna-Maria-College-2025-Final-FS.pdf | Endowment NA **$1,352,402**; printed Total investment return **$50,619**; Appropriation for expenditure **$226,089** | Bollus Lynch, LLP Worcester **13 Apr 2026** |
| 2 | Dean College | `/dean-college-endowment/` | https://dean-www.s3.amazonaws.com/files/resources/dean-college-2025-financial-statements.pdf | Endowment assets **$66,157,000**; printed Investment return, net **$6,440,349**; Amounts appropriated for expenditure **$3,145,300** | CBIZ CPAs P.C. Boston **13 Oct 2025** |
| 3 | Suffolk University | `/suffolk-university-endowment/` | https://www.suffolk.edu/-/media/suffolk/documents/about/directory/senior-vice-president-for-finance-administration-and-treasurer/fy25-docs/fy25-financial-statements.pdf?hash=D288F41962BEE5682235548970CABD536CBAA639&la=en | Endowment funds **$260,495,937**; printed Net investment return **$28,859,926**; Designated for operating expenditures **$23,554,729** | CBIZ CPAs P.C. Boston **30 Oct 2025** |
| 4 | Wheaton College (Norton, MA) | `/wheaton-college-massachusetts-endowment/` | https://wheatoncollege.edu/wp-content/uploads/2025/12/Wheaton-College-Audited-Financial-Statements-for-2025.pdf | Endowment NA **$287,390,267**; printed Net investment return **$26,158,976**; Endowment return utilized for operations **$14,724,083** | Logo-only Boston **3 Nov 2025** |
| 5 | Franklin W. Olin College of Engineering | `/olin-college-endowment/` | https://www.olin.edu/sites/default/files/2025-10/FY25%20Franklin%20W.%20Olin%20College%20-%20Financial%20Statements.pdf | Endowment assets **$438,018 thousand**; printed Investment return, net of expenses **$40,762 thousand**; Expenditures for operations **$24,243 thousand** | CBIZ CPAs P.C. Boston **20 Oct 2025** |

## Official sources (independently re-GET this wake)

- Anna Maria College FY2025 financial statements (Bollus Lynch, LLP, Worcester, Massachusetts, 13 April 2026): https://annamaria.edu/wp-content/uploads/2026/04/Anna-Maria-College-2025-Final-FS.pdf
- House PDF GET **200** `application/pdf` **384,881** bytes. Listing `https://annamaria.edu/audited-financial-statements/` GET **200**. House Final PDF GET **200** is the card. Leftover Draft PDF independently GET **404**.
- Dean College FY2025 financial statements (CBIZ CPAs P.C., Boston, Massachusetts, 13 October 2025): https://dean-www.s3.amazonaws.com/files/resources/dean-college-2025-financial-statements.pdf
- House PDF GET **200** `application/pdf` **1,654,944** bytes. Listing `https://www.dean.edu/about-dean/why-dean/notices-and-disclosures/` GET **200**. House PDF GET **200** is the card. Leftover 2025 summary PDF is not the card.
- Suffolk University FY2025 financial statements (CBIZ CPAs P.C., Boston, Massachusetts, 30 October 2025): https://www.suffolk.edu/-/media/suffolk/documents/about/directory/senior-vice-president-for-finance-administration-and-treasurer/fy25-docs/fy25-financial-statements.pdf?hash=D288F41962BEE5682235548970CABD536CBAA639&la=en
- House PDF GET **200** `application/pdf` **1,302,345** bytes. Listing `https://www.suffolk.edu/about/directory/office-of-the-chief-financial-officer/letter-about-audited-financial-statements` GET **200**. House PDF GET **200** is the card. Leftover CFO letter **12.6%** / leftover **$260 million** is not the card.
- Wheaton College (Norton, Massachusetts) FY2025 financial statements (logo-only Boston, 3 November 2025): https://wheatoncollege.edu/wp-content/uploads/2025/12/Wheaton-College-Audited-Financial-Statements-for-2025.pdf
- House PDF GET **200** `application/pdf` **496,776** bytes. Listing `https://wheatoncollege.edu/about-wheaton-college/offices-services/finance-administration/financial-statements/` GET **200**. House PDF GET **200** is the card. Not leftover Wheaton College Illinois.
- Franklin W. Olin College of Engineering, Inc. FY2025 financial statements (CBIZ CPAs P.C., Boston, Massachusetts, 20 October 2025): https://www.olin.edu/sites/default/files/2025-10/FY25%20Franklin%20W.%20Olin%20College%20-%20Financial%20Statements.pdf
- House PDF GET **200** `application/pdf` **1,518,584** bytes. Listing `https://www.olin.edu/about-offices-and-services-financial-affairs/financial-statements` GET **200**. House PDF GET **200** is the card. Figures print in thousands.

## What this wave is not

- Not a remint of Wave 245 Wentworth, Lesley, MCLA Foundation, Nichols, or Gordon.
- Not leftover Merrimack College after the 2025 house FS independently GET **200** `application/pdf` **8,047,621** bytes. `pdftotext` extracted **0** lines this wake — image-only is not a lock. Leftover glossy Financial Statement Review is not the card.
- Not leftover Emmanuel College Boston after the 2025 house FS independently GET **200** `application/pdf` **5,790,489** bytes. `pdftotext` extracted **0** lines — image-only is not a lock.
- Not leftover Elms College after the 2025 house FS independently GET **200** `application/pdf` **548,269** bytes. Change table prints leftover named Investment Income **$784,720** / leftover Realized and Unrealized Gain **$2,265,857** / leftover Investment Fees **$(52,081)** and does **not** print a labeled Total. Do not homemade-sum. Leftover endowment NA **$27,187,011** / leftover appropriation **$934,315** stay leftover.
- Not leftover Bay Path University after the listed house S3 PDF independently GET **200** `application/pdf` **6,945,367** bytes but `pdftotext` extracted **6** lines — image-only is not a lock. Leftover Cambridge-hosted text copy prints leftover NA **$89,265,065** / leftover Investment return, net **$9,749,844** / leftover Distributions **$699,956** / leftover Transfers **$(4,935,106)** / leftover SOA utilized **$3,700,905** and does **not** print a labeled appropriation. Stay leftover until a labeled payout locks.
- Not leftover American International College after the 2025 house FS independently GET **200** `application/pdf` **392,528** bytes. Leftover NA **$22,662,806** / leftover Investment return **$3,444,561** / leftover Amounts appropriated **$1,865,091** / leftover Withdrawals **$9,200,000** stay leftover this wake because the five-page cap is full.
- Not leftover Simmons University after no labeled Total. Not leftover Western New England University after no labeled Total. Not leftover Saint Martin’s University after unlabeled sum. Not leftover Wheaton Illinois after no labeled Total last wakes.
- Not leftover Pacific Lutheran (already Wave **230**). Not leftover Wesleyan University (already Wave **206**). Not leftover Holy Cross (already Wave **207**). Not leftover Hampshire College (already Wave **239**).

## Short-slug reservations

- Never mint `/anna-maria/` or `/anna-maria-college/` or `/amc/` or `/amcats/`.
- Never mint `/dean/` or `/dean-college/` or `/bulldogs/`. `/bulldogs/` remains reserved against leftover Ferris.
- Never mint `/suffolk/` or `/suffolk-university/` or `/rams/`. `/rams/` remains reserved against leftover Colorado State University Foundation.
- Never mint `/wheaton/` or `/wheaton-college/`. `/wheaton/` would flatten leftover Wheaton College Illinois.
- Never mint `/olin/` or `/olin-college/` or `/fwolin/`. `/olin/` would flatten leftover Olin Corporation.
- Never mint `/wentworth/`, `/lesley/`, `/mcla/`, `/nichols/`, `/gordon/`, `/curry/`, `/assumption/`, `/stonehill/`, `/springfield/`, `/clark/`, `/capital/`, `/regis/`, `/muw/`, `/endicott/`, `/lasell/`, `/cu/`, `/lu/`, `/lasers/`, `/greyhounds/`, `/cougars/`, `/lclark/`, `/plu/`, `/wesleyan/`, `/holy-cross/`, `/hampshire/`, or `/wwu/`.
