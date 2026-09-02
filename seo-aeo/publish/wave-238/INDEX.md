# Wave 238 — leftover-unique 2025 house endowments (Wichita State University Foundation, Beloit College, Carthage College, Edgewood College, Luther College)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Wichita State University Foundation | `/wichita-state-university-foundation/` | https://foundation.wichita.edu/wpcms/wp-content/uploads/2025/10/Audited-Financial-Statement-WSUF-2025.pdf | Endowment NA **$315,339,621**; printed **Total** investment return **$21,145,313**; appropriation of endowment assets for expenditure **$13,910,474** | Logo-only Wichita **29 Sep 2025** |
| 2 | Beloit College | `/beloit-endowment/` | https://www.beloit.edu/live/files/1084-beloit-college25-fsfinalpdf | Endowment assets **$81,236,983**; printed Investment return **$6,287,578**; appropriation of endowment assets **$6,471,627** | Logo-only Chicago **24 Nov 2025** |
| 3 | Carthage College | `/carthage-endowment/` | https://www.carthage.edu/live/files/6917-2024-25-financial-statement | Endowment NA **$183,785,685**; printed Investment Return, Net **$23,345,883**; Actual Endowment Assets Spent **$6,795,799** | CliftonLarsonAllen LLP **24 Oct 2025** |
| 4 | Edgewood College | `/edgewood-college-endowment/` | https://www.edgewood.edu/wp-content/uploads/Financial-Statements-2024-2025.pdf | Endowment NA **$60,582,756**; printed Investment return, net **$5,445,496**; appropriation of endowment assets for expenditure **$2,107,500** | Baker Tilly Milwaukee **10 Nov 2025** |
| 5 | Luther College | `/luther-college-endowment/` | https://www.luther.edu/wp-content/uploads/2025/10/Luther-College-Audit-5-31-2025-FS-Final.pdf | Endowment NA **$214,837,714**; printed **Total** investment return **$19,683,327**; appropriation of endowment assets for expenditure **$13,247,436** | Baker Tilly Minneapolis **19 Sep 2025** |

## Official sources (independently re-GET this wake)

- Wichita State University Foundation and Subsidiary FY2025 consolidated financial statements (logo-only Wichita, Kansas, 29 September 2025): https://foundation.wichita.edu/wpcms/wp-content/uploads/2025/10/Audited-Financial-Statement-WSUF-2025.pdf
- House PDF GET **200** `application/pdf` **370,428** bytes. Listing `https://foundation.wichita.edu/financial-filings/` GET **200** with href `Audited-Financial-Statement-WSUF-2025.pdf`.
- Beloit College FY2025 financial statements (logo-only Chicago, Illinois, 24 November 2025): https://www.beloit.edu/live/files/1084-beloit-college25-fsfinalpdf
- House PDF GET **200** `application/pdf` **324,663** bytes after redirect to `/live/files/1084-financial-statement-fiscal-year-2024-2025`. Listing `https://www.beloit.edu/offices/financial-services/finance-planning/reports/` GET **403** this wake; house PDF GET **200** is enough.
- Carthage College FY2025 financial statements (CliftonLarsonAllen LLP, 24 October 2025): https://www.carthage.edu/live/files/6917-2024-25-financial-statement
- House PDF GET **200** `application/pdf` **14,304,713** bytes. Listing `https://www.carthage.edu/about/offices-services/finance-administrative-services/financial-accounting-information/` GET **200** with href `/live/files/6917-2024-25-financial-statement`.
- Edgewood College, Inc. FY2025 financial statements (Baker Tilly Milwaukee, 10 November 2025): https://www.edgewood.edu/wp-content/uploads/Financial-Statements-2024-2025.pdf
- House PDF GET **200** `application/pdf` **574,046** bytes. Listing `https://www.edgewood.edu/federal-compliance/` GET **200**.
- Luther College FY2025 consolidated financial statements (Baker Tilly Minneapolis, 19 September 2025): https://www.luther.edu/wp-content/uploads/2025/10/Luther-College-Audit-5-31-2025-FS-Final.pdf
- House PDF GET **200** `application/pdf` **435,210** bytes. House listing with a dedicated PDF href not independently required; house PDF GET **200** is enough. Fiscal year ends **31 May**.

## What this wave is not

- Not a remint of Wave 237 University of Central Missouri Foundation, Southeast Missouri University Foundation, Washburn University Foundation, Missouri Western State University Foundation, or Emporia State University Foundation.
- Not leftover Kansas State University Foundation (`/kansas-state-university-foundation/`, **$1,047,320,258**). Not leftover Kansas University Endowment Association. Not leftover Washburn **$126,485,053**. Not leftover Emporia **$111,481,193**.
- Not leftover University of Wisconsin Foundation (`/university-of-wisconsin-foundation/`). Not leftover University of Iowa Center for Advancement. Not leftover Pacific Lutheran University. Not leftover Lawrence University. Not leftover Knox College.
- Not leftover Iowa State University Foundation (Salesforce listing names FY 2025 PDF; no leftover-unique house PDF independently GET **200** this wake). **Never mint `/uif/`.**
- Not leftover UWM Foundation (listing names a 2025 audit; statement link is empty / data-attribute). Leftover glossy annual report / leftover 990 are not the card.
- Not leftover Wayne State Foundation Nebraska (Cloudflare **403**). Not leftover Wayne State University Detroit.
- Not leftover Cornell College Iowa (listing Incapsula; no leftover-unique house PDF independently GET **200**). **Never mint `/cornell/`.**
- Not leftover Pittsburg State University Foundation (university AFR still says Foundation statements “have not been audited”). Not leftover Northwest Foundation (newest public signed FS still FY2024). Not leftover UNI Foundation (listing still 2024 FS).
- Not leftover Fort Hays State University Foundation (listing **406**). Not leftover Truman State University Foundation (blended university AFR / request-only). Not leftover Lincoln University Missouri (Cloudflare **403**).
- Not leftover Wheaton College (house PDF GET **403**). Not leftover CSU system-wide Foundation (GET **403**). Not leftover WIU Foundation (scan-only).
- Not leftover Ripon College (glossy / 990). Not leftover Carroll University (990 / IPEDS). Not leftover Concordia University Wisconsin (990). Not leftover Drake (990 / listing **404**).
- Not leftover Oshkosh Area Community Foundation. Not leftover UW-Oshkosh Foundation 990. Not leftover UW-Stevens Point Foundation 990. Not leftover Chadron / Peru / Wayne State College Nebraska inside the Nebraska State College System AFR.

## Short-slug reservations

- Never mint `/wichita/`, `/wsuf/`, or `/shockers/`. **Never mint `/wsu/`.** `/wsu/` would flatten leftover Washington State / leftover Wichita State / leftover Wayne State.
- Never mint `/beloit/`.
- Never mint `/carthage/`.
- Never mint `/edgewood/`. **Never mint `/eagles/`.** `/eagles/` remains reserved against leftover American University / leftover Boston College.
- Never mint `/luther/` or `/norse/`. **Never mint `/plu/`.** `/plu/` remains Pacific Lutheran University.
- Never mint `/msu/` or `/msuf/`. Never mint `/uif/`. Never mint `/uw/`. Never mint `/uwf/`. Never mint `/isu/` or `/isuf/`. Never mint `/cornell/`.

## Related-link flatten (Wave 223 / Wave 237 leftover Kansas peers)

- `/washburn-university-foundation/` related: Kansas State University Foundation → Wichita State University Foundation (leftover Wichita; do not flatten Wichita onto `/wsu/`).
- `/emporia-state-university-foundation/` related: Kansas State University Foundation → Wichita State University Foundation (leftover Wichita).
- `/kansas-state-university-foundation/` related: Washburn University Foundation → Wichita State University Foundation (leftover Wichita; `/ksu/` remains Kansas State).
