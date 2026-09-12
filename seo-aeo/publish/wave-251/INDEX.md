# Wave 251 — leftover-unique 2025 house endowments (Worcester Polytechnic Institute, Montana Technological University Foundation, Minnesota State University Mankato Foundation, Boise State University Foundation)

Date: 28 August 2026
Desk: research
Editor status: draft

Four leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these four slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Worcester Polytechnic Institute | `/worcester-polytechnic-endowment/` | https://www.wpi.edu/sites/default/files/2025-12/2025-Worcester-Polytechnic-Institute-FS.pdf | Endowment and similar funds **$731,422 thousand**; printed Investment return **$69,755 thousand**; Appropriated for expenditure **$28,697 thousand** | Grant Thornton LLP Boston **5 Nov 2025**. Figures in thousands. First same-host GET **403**; browser UA plus Referer independently GET **200** |
| 2 | Montana Technological University Foundation | `/montana-technological-university-foundation/` | https://foundation.mtech.edu/about/docs/2024-fiscal-year-audit.pdf | Endowment NA **$101,555,317**; printed Net Appreciation **$8,861,836**; Appropriation for Expenditure (4%) **$2,641,597** | CliftonLarsonAllen LLP **2 Oct 2025**. Filename says 2024; body is YE **30 Jun 2025** |
| 3 | Minnesota State University, Mankato Foundation, Inc. and Subsidiaries | `/minnesota-state-mankato-foundation/` | https://mankato.mnsu.edu/globalassets/foundation/end-of-year-reports/foun028re_msu-foundationfinancials-fy25.pdf | Endowment NA **$90,721,026**; printed Net Investment Return **$11,487,948**; Appropriation pursuant to spending-rate policy **$2,484,744** | CliftonLarsonAllen LLP **25 Sep 2025**. Never remint `/msu/` |
| 4 | Boise State University Foundation (discrete FASB component) | `/boise-state-university-foundation/` | https://www.boisestate.edu/financeandoperations/wp-content/uploads/sites/356/2025/12/FY25-Boise-State-University-Audited-Financial-Statements-10-07-25-Final-1.pdf | Endowment NA **$193,520,444**; printed Investment return, net **$21,073,025**; Appropriation **$6,503,524** | University opinion CliftonLarsonAllen LLP **1 Oct 2025**; Foundation audited by other auditors. Never remint `/broncos/` |

## Official sources (independently re-GET this wake)

- Worcester Polytechnic Institute FY2025 consolidated financial statements (Grant Thornton LLP, Boston, 5 November 2025): https://www.wpi.edu/sites/default/files/2025-12/2025-Worcester-Polytechnic-Institute-FS.pdf
- House PDF independently GET **200** `application/pdf` **328,764** bytes this wake after a first same-host attempt independently GET **403**. Listing `https://www.wpi.edu/offices/finance-operations` GET **200**. Controller listing `https://www.wpi.edu/offices/controller` GET **200**. House PDF GET **200** is the card. Figures print in thousands.
- Montana Technological University Foundation FY2025 financial statements (CliftonLarsonAllen LLP, 2 October 2025): https://foundation.mtech.edu/about/docs/2024-fiscal-year-audit.pdf
- House PDF GET **200** `application/pdf` **519,590** bytes. Listing `https://foundation.mtech.edu/about/` GET **200**. House `https://foundation.mtech.edu/` GET **200**. Filename says 2024; body is years ended **30 June 2025 and 2024**. House PDF GET **200** is the card.
- Minnesota State University, Mankato Foundation FY2025 consolidated financial statements (CliftonLarsonAllen LLP, 25 September 2025): https://mankato.mnsu.edu/globalassets/foundation/end-of-year-reports/foun028re_msu-foundationfinancials-fy25.pdf
- House PDF GET **200** `application/pdf` **1,617,494** bytes. Listing `https://mankato.mnsu.edu/foundation/` GET **200**. House PDF GET **200** is the card.
- Boise State University FY2025 financial statements, including discrete Foundation FASB statements (university opinion CliftonLarsonAllen LLP, 1 October 2025; Foundation audited by other auditors): https://www.boisestate.edu/financeandoperations/wp-content/uploads/sites/356/2025/12/FY25-Boise-State-University-Audited-Financial-Statements-10-07-25-Final-1.pdf
- House PDF GET **200** `application/pdf` **10,078,699** bytes. Listing `https://www.boisestate.edu/finance/` GET **200**. House PDF GET **200** is the card.

## What this wave is not

- Not a remint of Wave 250 California Lutheran, Portland State University Foundation, or Southern Oregon University Foundation.
- Not leftover Wentworth after that keeper already ships as Wave 245.
- Not leftover Clark after that keeper already ships as Wave 244.
- Not leftover Holy Cross after that keeper already ships as Wave 207.
- Not leftover Montana State University Foundation after that keeper already ships as Wave 222. **Never remint `/msu/`.**
- Not leftover University of Montana Foundation after that keeper already ships as Wave 235.
- Not leftover University of Minnesota Foundation after that keeper already ships as Wave 223.
- Not leftover University of Idaho Foundation / leftover Idaho State University Foundation after those keepers already ship as Wave 234.
- Not leftover College of Western Idaho Foundation after that keeper already ships as Wave 235.
- Not leftover Colorado Mesa University Foundation after the 2025 house FS independently GET **200** `application/pdf` **231,288** bytes but leftover named Investment Income - Net of Fees **$1,406,129** + leftover Net Appreciation **$6,173,399** and **no labeled Total**. Leftover endowment NA **$69,984,123** / leftover Amounts Appropriated for Expenditure **$2,388,790** stay leftover.
- Not leftover Lewis-Clark State College Foundation after the university FS independently GET **200** but leftover Foundation entity-wide NA **$21,577,263** / leftover unrealized appreciation **$1,793,024** / leftover 4% spending narrative and **no labeled change-table Total return and no labeled appropriation dollars**.
- Not leftover UNM Foundation after leftover GASB CIF share **$515,437,552** / leftover distributions **$47,975,781** and **no labeled FASB change-table Total return and no labeled appropriation**.
- Not leftover New England Conservatory after the named house PDF independently GET **403**. **Never mint `/nec/`.**
- Not leftover Bryant after the named house PDF independently GET **403**.
- Not leftover Simmons / Western New England / Elms / CCSU Foundation leftover named income + leftover appreciation and **no labeled Total**.
- Not leftover UVM Foundation / leftover UNH Foundation leftover split return and **no labeled Total**.

## Short-slug reservations

- Never mint `/wpi/`.
- Never mint `/mtech/` or `/montana-tech/`.
- Never mint `/mankato/`.
- Never remint `/msu/`. `/msu/` is already reserved against leftover Mississippi State / leftover Missouri State / leftover Montana State flatten.
- Never mint `/boisestate/` or `/bsu/`.
- Never remint `/broncos/`. `/broncos/` is already the reserved twin of Wave 226 `/santa-clara-endowment/`.
- Never remint `/nec/`. `/nec/` remains reserved against leftover New England College of Optometry flatten.
- Never remint `/psu/`, `/yellow-jackets/`, `/beavers/`, `/holy-cross/`, `/huskies/`, `/bulldogs/`, `/rams/`, `/clu/`, `/cal-lutheran/`, `/psuf/`, `/sou/`, `/souf/`.
- Never mint `/cmu/` for Colorado Mesa. `/cmu/` remains the reserved twin of Wave 197 `/carnegie-mellon-endowment/`.
