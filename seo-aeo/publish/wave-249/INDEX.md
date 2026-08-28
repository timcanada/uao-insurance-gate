# Wave 249 — leftover-unique 2025 house endowments (RISD, SCSU Foundation, WCSU Foundation, Unity Environmental, New England College of Optometry)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Rhode Island School of Design | `/risd-endowment/` | https://www.risd.edu/sites/default/files/2025-11/risd-financial-statements-2025.pdf | Total endowment NA **$470,481 thousand**; printed Investment return, net **$53,414 thousand**; Endowment return allocated for spending **$19,985 thousand** | CBIZ Providence **20 Oct 2025**. Figures **in thousands** |
| 2 | Southern Connecticut State University Foundation, Inc. | `/scsu-foundation/` | https://go.southernct.edu/docs/drupal/Financials-Southern-Connecticut-State-University-Foundation-Inc-2025.pdf | Endowment NA **$44,830,695**; printed Net appreciation **$5,411,233**; Appropriation **$1,985,185** | Logo-only Hartford **16 Oct 2025** |
| 3 | Western Connecticut State University Foundation, Inc. | `/wcsu-foundation/` | https://www.wcsu.edu/giving/wp-content/uploads/sites/184/2025/12/Audited-Foundatin-Financial-Statements-FYE2025.pdf | Endowment NA **$29,078,790**; printed Net investment return **$3,260,965**; Appropriation **$1,812,477** | Fiorita Kornhaas Danbury **10 Sep 2025** |
| 4 | Unity Environmental University | `/unity-environmental-endowment/` | https://unity.edu/wp-content/uploads/2025/10/Final-FS-Unity-2025-1.pdf | Endowment NA **$17,453,552**; printed Investment gain, net **$1,910,450**; Appropriation **$984,412** | Logo-only Bangor **21 Oct 2025** |
| 5 | The New England College of Optometry and Affiliate | `/new-england-college-of-optometry-endowment/` | https://www.neco.edu/wp-content/uploads/2025/11/NECO-2025-Consolidated-Financial-Statements-and-Supplemental-Information.pdf | Endowment assets **$12,760,252**; printed Investment return **$1,303,814**; Total expenditures under Amounts appropriated for operations **$430,577** | CBIZ Boston **28 Oct 2025** |

## Official sources (independently re-GET this wake)

- Rhode Island School of Design FY2025 consolidated financial statements (CBIZ CPAs P.C., One Citizens Plaza, Providence, Rhode Island, 20 October 2025): https://www.risd.edu/sites/default/files/2025-11/risd-financial-statements-2025.pdf
- House PDF GET **200** `application/pdf` **1,491,604** bytes. Listing `https://www.risd.edu/giving` GET **200**. House `https://www.risd.edu/` GET **200**. House PDF GET **200** is the card. Figures print in thousands. Leftover giving-page narrative is not the card.
- Southern Connecticut State University Foundation FY2025 financial statements (logo-only, Hartford, Connecticut, 16 October 2025): https://go.southernct.edu/docs/drupal/Financials-Southern-Connecticut-State-University-Foundation-Inc-2025.pdf
- House PDF GET **200** `application/pdf` **968,008** bytes. Guessed listing `https://www.southernct.edu/alumni/foundation` GET **404**. House `https://www.southernct.edu/` GET **200**. House PDF GET **200** is the card.
- Western Connecticut State University Foundation FY2025 financial statements (Fiorita, Kornhaas, & Company, P.C., Danbury, Connecticut, 10 September 2025): https://www.wcsu.edu/giving/wp-content/uploads/sites/184/2025/12/Audited-Foundatin-Financial-Statements-FYE2025.pdf
- House PDF GET **200** `application/pdf` **997,244** bytes. Listing `https://www.wcsu.edu/giving/foundation/annual-reports/` GET **200**. House PDF GET **200** is the card. The house filename prints `Foundatin`.
- Unity Environmental University FY2025 financial statements (logo-only, Bangor, Maine, 21 October 2025): https://unity.edu/wp-content/uploads/2025/10/Final-FS-Unity-2025-1.pdf
- House PDF GET **200** `application/pdf` **520,804** bytes. House `https://unity.edu/` GET **200**. Guessed listing `https://unity.edu/about/financials/` GET **404**. House PDF GET **200** is the card.
- New England College of Optometry FY2025 consolidated financial statements (CBIZ CPAs P.C., 53 State Street, Boston, Massachusetts, 28 October 2025): https://www.neco.edu/wp-content/uploads/2025/11/NECO-2025-Consolidated-Financial-Statements-and-Supplemental-Information.pdf
- House PDF GET **200** `application/pdf` **1,977,580** bytes. Listing `https://www.neco.edu/about/` GET **200**. House `https://www.neco.edu/` GET **200**. House PDF GET **200** is the card.

## What this wave is not

- Not a remint of Wave 248 BAC, Berklee, Johnson & Wales, URI Foundation, or UConn Foundation.
- Not leftover Worcester Polytechnic Institute after the named 2025 house PDF independently GET **403** again. WebSearch extract is not a lock.
- Not leftover New England Conservatory after the named house PDF independently GET **403**.
- Not leftover CCSU Foundation after the 2025 house FS independently GET **200** `application/pdf` **1,009,728** bytes but the change table prints leftover Investment income, net **$5,517,769** / leftover Net realized and unrealized appreciation **$3,563,322** and **no labeled Total**. Leftover NA **$98,809,958** / leftover appropriation **$2,751,858** stay leftover. Do not homemade-sum.
- Not leftover UNH Foundation after the 2025 house FS independently GET **200** but the MD&A change table prints leftover Yield / leftover Realized / leftover Unrealized and **no labeled Total**. Leftover pooled endowment **$347,140 thousand** / leftover Endowment income used for operations **$15,367 thousand** stay leftover.
- Not leftover UVM Foundation after the 2025 house FS independently GET **200** but the change table prints leftover with-donor Investment return, net **$24,684,971** / leftover without-donor **$988,338** and leftover Distributions to spendable **$11,036,716** / leftover **$409,473** and **no labeled Total return and no labeled Total payout**. Leftover card **$312,367,012** stays leftover. Do not homemade-sum.
- Not leftover UMaine Foundation after the latest labeled audit is **31 December 2024**. Leftover glossy endowment **$442,226,057** stays leftover.
- Not leftover Montserrat College of Art after the 2025 house FS independently GET **200** `application/pdf` **766,211** bytes but the change table prints leftover Investment return **$322,667** and leftover Release from restriction **$735,832** and **no labeled appropriation**. Leftover NA **$2,782,520** / leftover liquidity Endowment drawdown **$75,514** stay leftover.
- Not leftover Elms / leftover Simmons / leftover Western New England / leftover University of New England after leftover named income + leftover appreciation and **no labeled Total**.
- Not leftover Bryant after the named house PDF independently GET **403**.
- Not leftover Salve Regina / leftover Colby / leftover Williams after listings independently GET **403**.
- Not leftover Eastern Connecticut State University Foundation after guessed 2025 URLs independently GET **404**. Latest house print is leftover **30 June 2024**. Never mint `/ecsu/` — that would flatten leftover Elizabeth City State.
- Not leftover Portland State University Foundation after the named house URL independently GET **000** this wake. WebSearch extract is not a lock.
- Not leftover Washington College after that keeper already ships as Wave 239.
- Not leftover Pacific Lutheran / leftover Wesleyan / leftover Holy Cross / leftover Hampshire after those keepers already ship.

## Short-slug reservations

- Never mint `/risd/` or `/rhode-island-school/`.
- Never mint `/scsu/`. `/scsu/` would flatten leftover St. Cloud State.
- Never mint `/wcsu/`.
- Never mint `/unity/`.
- Never mint `/neco/` or `/nec/` or `/optometry/`. `/neco/` and `/nec/` would flatten leftover New England Conservatory / leftover New England College Henniker.
- Never mint `/ccsu/`, `/unh/`, `/unhf/`, `/uvm/`, `/uvmf/`, `/ecsu/`.
- Never mint `/bac/`, `/boston-architectural/`, `/the-bac/`, `/berklee/`, `/berklee-college/`, `/jwu/`, `/johnson-wales/`, `/jwu-providence/`, `/uri/`, `/uri-foundation/`, `/urifae/`, `/rhody/`, `/uconn/`, `/uconn-foundation/`, `/ucf/`.
- Never remint `/huskies/`, `/holy-cross/`, `/yellow-jackets/`, `/beavers/`.
- Never mint `/aic/`, `/american-international/`, `/babson/`, `/babson-college/`, `/emerson/`, `/emerson-college/`, `/mcphs/`, `/mcphs-university/`, `/pharmacy/`, `/hellenic/`, `/hellenic-college/`, `/hchc/`, `/anna-maria/`, `/dean/`, `/suffolk/`, `/wheaton/`, `/olin/`, `/wentworth/`, `/lesley/`, `/mcla/`, `/nichols/`, `/gordon/`, `/curry/`, `/assumption/`, `/stonehill/`, `/springfield/`, `/clark/`, `/capital/`, `/regis/`, `/muw/`, `/endicott/`, `/lasell/`, `/hampshire/`, `/wwu/`, `/lu/`, `/lasers/`, `/greyhounds/`, `/cu/`, `/cougars/`, `/lclark/`, `/plu/`, `/wesleyan/`, `/rams/`, `/bulldogs/`, or `/fwolin/`.
