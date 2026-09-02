# Wave 230 — leftover-unique 2025 house endowments (Denver, American, Catholic University, Detroit Mercy, Pacific Lutheran)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. university endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | University of Denver | `/university-of-denver-endowment/` | https://www.du.edu/sites/default/files/2025-12/DU%20FY25%20Financial%20Statements.pdf | NA **$1,179,538,534**; printed total investment return **$94,419,474**; appropriation **$53,840,119** | CliftonLarsonAllen LLP Denver **21 Nov 2025** |
| 2 | American University | `/american-university-endowment/` | https://www.american.edu/finance/annual-report/upload/fy2025-au-financial-statements.pdf | NA **$1,102,671 thousand**; printed total investment return **$105,541 thousand**; appropriation **$43,946 thousand** | PricewaterhouseCoopers LLP Washington **14 Nov 2025** |
| 3 | Catholic University of America | `/catholic-university-endowment/` | https://controller.catholic.edu/about/2025-the-catholic-university-of-america-and-subsidiaries-fs.pdf | NA **$399,566 thousand**; printed investment return, net **$27,744 thousand**; investment return designated for current operations **$16,009 thousand** | Grant Thornton LLP Philadelphia **25 Sep 2025** |
| 4 | University of Detroit Mercy | `/detroit-mercy-endowment/` | https://www.udmercy.edu/about/consumer-info/files/UDM-Financial-Report-FY2025.pdf | NA **$128,798 thousand**; named return lines investment income **$1,439 thousand** / net appreciation **$12,556 thousand**; appropriation **$2,935 thousand** | Logo-only / ClearScan; subsequent events **30 Oct 2025** |
| 5 | Pacific Lutheran University | `/pacific-lutheran-endowment/` | https://www.plu.edu/financial-services/wp-content/uploads/sites/707/2026/01/2025-pacific-lutheran-university-sf-fs-1.pdf | NA **$140,495 thousand**; printed total investment return **$10,225 thousand**; appropriation **$6,490 thousand** | Forvis Mazars, LLP Fort Wayne **20 Nov 2025** |

## Official sources (independently re-GET this wake)

- University of Denver FY2025 financial statements (CliftonLarsonAllen LLP Denver, 21 November 2025): https://www.du.edu/sites/default/files/2025-12/DU%20FY25%20Financial%20Statements.pdf
- University of Denver listing: https://www.du.edu/about
- American University FY2025 financial statements (PricewaterhouseCoopers LLP Washington, 14 November 2025): https://www.american.edu/finance/annual-report/upload/fy2025-au-financial-statements.pdf
- American University listing (GET **403** this wake): https://www.american.edu/finance/annual-report/
- Catholic University of America FY2025 financial statements (Grant Thornton LLP Philadelphia, 25 September 2025): https://controller.catholic.edu/about/2025-the-catholic-university-of-america-and-subsidiaries-fs.pdf
- Catholic University listing (GET **403** this wake): https://controller.catholic.edu/about/
- University of Detroit Mercy FY2025 financial report: https://www.udmercy.edu/about/consumer-info/files/UDM-Financial-Report-FY2025.pdf
- University of Detroit Mercy listing: https://www.udmercy.edu/about/consumer-info/
- Pacific Lutheran University FY2025 financial statements (Forvis Mazars, LLP Fort Wayne, 20 November 2025): https://www.plu.edu/financial-services/wp-content/uploads/sites/707/2026/01/2025-pacific-lutheran-university-sf-fs-1.pdf
- Pacific Lutheran listing: https://www.plu.edu/financial-services/

## What this wave is not

- Not a remint of Wave 229 Marquette, University of San Francisco, Saint Louis University, Loyola University Maryland, or Duquesne.
- Not leftover Gonzaga (listing **403** / azureedge DNS fail; leftover presidential **$522.4 million** / leftover **10.7%** are not a card).
- Not leftover Loyola Marymount (listing-only / Box; FDP is not a house source).
- Not leftover Iowa State Foundation (Salesforce listing; no public href). Never mint `/uif/`.
- Not leftover DePaul (internal / Campus Connection). Not leftover Fairfield (listing still stops at 2024). Not leftover Seton Hall / leftover Providence College / leftover John Carroll.
- Not leftover LSU Foundation (same **698,335**-byte file still lacks a named appropriation dollar). Not leftover Toledo Foundation (listing-only; no public PDF href). Not leftover Cincinnati Foundation (university UG is another book).
- Not leftover Saint John’s University Collegeville (house PDF GET **200** but extract too thin to lock three facts).
- Not leftover Denver policy **4.50%** / leftover Colorado College **$1,064,108 thousand**.
- Not leftover American investments **$1,482,226 thousand** / leftover GW **$2,812,559 thousand** / leftover Georgetown Box.
- Not leftover Catholic pool **$387,251 thousand** / leftover other investment return **$18,310 thousand** / leftover GW.
- Not leftover Detroit Mercy **4.00%** / leftover Wayne State / leftover investments **$123,768 thousand**.
- Not leftover Pacific Lutheran **4.5%** / leftover **7%** / leftover Pacific University Oregon / leftover University of the Pacific / leftover Seattle Pacific.

## Short-slug reservations

- Never mint `/du/`, `/denver/`, or `/pioneers/`. `/du/` would flatten leftover Duquesne / leftover University of Dallas.
- Never mint `/au/`, `/american/`, or `/eagles/`. `/au/` would flatten leftover Adelphi. `/american/` would flatten leftover American University of Beirut / leftover American University in Cairo. `/eagles/` would flatten leftover Boston College.
- Never mint `/cua/`, `/catholic/`, or `/cardinals/`. `/catholic/` would flatten leftover other Catholic universities. `/cardinals/` would flatten leftover Louisville / leftover Stanford Cardinal.
- Never mint `/udm/`, `/detroit/`, or `/titans/`. `/detroit/` would flatten leftover Wayne State / leftover Detroit municipal. `/titans/` would flatten leftover Cal State Fullerton.
- Never mint `/plu/`, `/pacific/`, or `/lutes/`. `/pacific/` would flatten leftover University of the Pacific / leftover Pacific University Oregon / leftover Seattle Pacific.

## Related-link flatten (Wave 229)

- `/marquette-endowment/` related: Duquesne → University of Detroit Mercy.
- `/university-of-san-francisco-endowment/` related: Seattle University → University of Denver.
- `/saint-louis-university-endowment/` related: Xavier → Catholic University of America.
- `/loyola-maryland-endowment/` related: Holy Cross → American University.
- `/duquesne-endowment/` related: Fordham → Pacific Lutheran University.
