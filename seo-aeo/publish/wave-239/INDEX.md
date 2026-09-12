# Wave 239 — leftover-unique 2025 house endowments (Grand View University, Concordia University St. Paul, Ohio Wesleyan University, Hampshire College, Washington College)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Grand View University | `/grand-view-university-endowment/` | https://www.grandview.edu/filesimages/About/About%20GV/Financial%20Reports/Grand%20View%20University_25%20GAS%20Short%20FS_Final.pdf | Endowment NA **$39,980,597**; printed **Total** investment return **$3,290,170**; appropriation of endowment funds for expenditure **$1,472,962** | Logo-only Des Moines **14 Nov 2025** |
| 2 | Concordia University, St. Paul | `/concordia-university-st-paul-endowment/` | https://www.csp.edu/wp-content/uploads/2025/10/Concordia-University-St-Paul-Financial-Statements-24-25.pdf | Total endowment funds **$60,534,050**; printed **Total Earnings** **$6,282,408**; Appropriations **$1,332,081** | CliftonLarsonAllen LLP Minneapolis **20 Oct 2025** |
| 3 | Ohio Wesleyan University | `/ohio-wesleyan-endowment/` | https://www.owu.edu/files/resources/fiscal-year-2025.pdf | Endowment assets **$325,330,091**; printed **Total** investment return **$32,012,874**; appropriation of endowment assets for expenditure **$16,903,604** | Logo-only Cleveland **2 Dec 2025** |
| 4 | Hampshire College | `/hampshire-college-endowment/` | https://www.hampshire.edu/sites/default/files/2025-12/Signed%20Final%20Report%20and%20Financial%20Statements%20UNPROTECTED.pdf | Endowment funds **$24,038,015**; printed Investment Return **$2,575,901**; Appropriated to Operations **$3,872,086** | CliftonLarsonAllen LLP Boston **25 Nov 2025** |
| 5 | Washington College | `/washington-college-endowment/` | https://www.washcoll.edu/offices/business-office/_files/financal-statements/2025-wc-financial-statement.pdf | Endowment NA **$370,994,636**; printed Investment Return* **$36,687,439**; Income Distributed or Drawn on Endowments **$28,880,278** | CliftonLarsonAllen LLP **26 Nov 2025** |

## Official sources (independently re-GET this wake)

- Grand View University FY2025 financial statements (logo-only Des Moines, Iowa, 14 November 2025): https://www.grandview.edu/filesimages/About/About%20GV/Financial%20Reports/Grand%20View%20University_25%20GAS%20Short%20FS_Final.pdf
- House PDF GET **200** `application/pdf` **349,325** bytes. Listing `https://www.grandview.edu/about/about-gv/financial-reports` GET **200**. Leftover “GAS Short” filename is stationery, not a GASB university AFR — the PDF prints FASB statements of financial position and a printed endowment change table.
- Concordia University, St. Paul FY2025 financial statements (CliftonLarsonAllen LLP, Minneapolis, Minnesota, 20 October 2025): https://www.csp.edu/wp-content/uploads/2025/10/Concordia-University-St-Paul-Financial-Statements-24-25.pdf
- House PDF GET **200** `application/pdf` **533,213** bytes. Listing `https://www.csp.edu/university-finances/` GET **200** with href `Concordia-University-St-Paul-Financial-Statements-24-25.pdf`.
- Ohio Wesleyan University and Subsidiaries FY2025 consolidated financial report (logo-only Cleveland, Ohio, 2 December 2025): https://www.owu.edu/files/resources/fiscal-year-2025.pdf
- House PDF GET **200** `application/pdf` **389,841** bytes. Listing `https://www.owu.edu/about/offices-services-directory/office-of-finance-administration/accounting-office/audited-financial-statements-990-tax-returns/` GET **200**.
- Hampshire College FY2025 financial statements (CliftonLarsonAllen LLP, Boston, Massachusetts, 25 November 2025): https://www.hampshire.edu/sites/default/files/2025-12/Signed%20Final%20Report%20and%20Financial%20Statements%20UNPROTECTED.pdf
- House PDF GET **200** `application/pdf` **482,102** bytes. Listing `https://www.hampshire.edu/offices/finance/departments/business/financial-reports` GET **200**. House PDF GET **200** is the card.
- Washington College FY2025 financial statements (CliftonLarsonAllen LLP, 26 November 2025): https://www.washcoll.edu/offices/business-office/_files/financal-statements/2025-wc-financial-statement.pdf
- House PDF GET **200** `application/pdf` **808,416** bytes. Listing `https://www.washcoll.edu/offices/business-office/` GET **200**. House PDF GET **200** is the card.

## What this wave is not

- Not a remint of Wave 238 Wichita State University Foundation, Beloit College, Carthage College, Edgewood College, or Luther College.
- Not leftover Iowa State University Foundation (Salesforce listing still names FY 2025 PDF; no leftover-unique house PDF independently GET **200** this wake). **Never mint `/uif/`.** Leftover glossy Order of the Knoll **$222.8 million** / leftover P&I **10.6%** are not a card.
- Not leftover UWM Foundation as a Wave 239 keeper. House 2025 FS independently GET **200** `application/pdf` **614,679** bytes at `https://uwm.foundation/wp-content/uploads/2026/02/2025-UWM-Foundation-Audited-Financial-Statements.pdf` (Wipfli LLP Milwaukee, 9 December 2025; listing `https://uwm.foundation/financials/reports/` GET **200**). Change table prints leftover named Interest and dividend income **$4,936,302** / leftover Net appreciation **$12,800,718** and leftover Appropriation for expenditures **$8,047,011** / leftover total endowment net assets **$190,017,922**. This PDF does **not** print a Total investment return on that change table. Do not homemade-sum the named return lines. Leftover entity-wide Total investment income **$27,070,604** / leftover entity-wide NA **$271,046,795** / leftover **4.00%** / leftover glossy annual report / leftover 990 are not the card. Next wake may ship `/uwm-foundation/` only if a leftover-unique printed total return locks — never mint `/uw/` or `/uwf/`.
- Not leftover Wayne State Foundation Nebraska (house PDF still Cloudflare **403**). WebSearch extract is not an independent GET **200**. Nebraska State College System AFR GET **200** is a blended AFR, not a house source. Not leftover Wayne State Detroit.
- Not leftover Cornell College Iowa (listing still Incapsula; guessed PDF URLs still not leftover-unique `application/pdf` GET **200**). **Never mint `/cornell/`.**
- Not leftover UNI Foundation (listing still 2024 FS; guessed 2025 paths **404**). Not leftover Northwest Foundation (newest public signed FS still FY2024). Not leftover Pittsburg State University Foundation (university AFR / glossy). Not leftover Fort Hays (listing **406** / Cloudflare). Not leftover Truman (blended AFR / request-only). Not leftover Lincoln University Missouri (Cloudflare **403**).
- Not leftover North Central College (listing / guessed PDFs Cloudflare **403**). Not leftover Wheaton (**403**). Not leftover CSU system-wide Foundation (**403**). Not leftover WIU (scan-only).
- Not leftover Ripon / leftover Carroll / leftover Concordia Wisconsin / leftover Drake (990 / glossy / listing **404**). Not leftover Coe / leftover Wartburg / leftover Simpson / leftover Central College Iowa / leftover Morningside / leftover Dordt / leftover Loras / leftover St. Ambrose.
- Not leftover University of Wisconsin Foundation. Not leftover University of Iowa Center for Advancement. Not leftover Pacific Lutheran. Not leftover Lawrence. Not leftover Knox. Not leftover St. Olaf. Not leftover College of Saint Benedict overwrite. Not leftover Xavier University overwrite. Not leftover Wesleyan University overwrite. Not leftover University of Washington overwrite. Not leftover New Hampshire Retirement System overwrite.

## Short-slug reservations

- Never mint `/grand-view/`, `/gvu/`, or `/vikings/`. `/vikings/` would flatten leftover Portland State / leftover Cleveland State.
- Never mint `/csp/` or `/concordia/`. `/concordia/` would flatten leftover Concordia Wisconsin / leftover Concordia Nebraska / leftover Concordia Chicago / leftover Concordia Texas.
- Never mint `/owu/` or `/ohio-wesleyan/`. **Never mint `/wesleyan/`.** `/wesleyan/` remains Wave 206 Wesleyan University.
- Never mint `/hampshire/`. Not leftover New Hampshire Retirement System.
- Never mint `/washington-college/`, `/washcoll/`, or `/wc/`. **Never mint `/washington/`.** `/washington/` remains reserved against leftover University of Washington. **Never mint `/uw/`.** **Never mint `/wsu/`.**
- Never mint `/msu/` or `/msuf/`. Never mint `/uif/`. Never mint `/uwf/`. Never mint `/isu/` or `/isuf/`. Never mint `/cornell/`. Never mint `/eagles/`. Never mint `/plu/`.

## Related-link flatten (Wave 238 leftover Iowa peer; leftover Ohio / leftover Minnesota peers)

- `/luther-college-endowment/` related: add Grand View University endowment (leftover Grand View; do not flatten Grand View onto leftover Iowa State / leftover `/uif/`).
- `/xavier-university-endowment/` related: University of Dayton endowment → Ohio Wesleyan University endowment (leftover Ohio Wesleyan; do not flatten Ohio Wesleyan onto `/wesleyan/`).
- `/college-of-saint-benedict-endowment/` related: add Concordia University St. Paul endowment (leftover CSP; do not flatten CSP onto `/concordia/`).
