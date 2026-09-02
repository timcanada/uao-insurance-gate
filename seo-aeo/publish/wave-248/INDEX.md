# Wave 248 — leftover-unique 2025 house endowments (Boston Architectural College, Berklee, Johnson & Wales, URI Foundation, UConn Foundation)

Date: 28 August 2026
Desk: research
Editor status: draft

Five leftover-unique U.S. endowment cards independently locked this wake from official 2025 house financial statements. None of these five slugs is live. Ghost cannot publish (`GHOST_ADMIN_API_KEY` unset). GSC cannot score ranks (`GOOGLE_SERVICE_ACCOUNT_JSON` unset).

| # | Institution | Slug | Official FS | Locked facts | Auditor |
|---|---|---|---|---|---|
| 1 | Boston Architectural College | `/boston-architectural-college-endowment/` | https://the-bac.edu/Documents/Institutional/Financial%20Statements/2025_BAC_Financial_Statements.pdf | Endowment NA **$12,186,227**; printed Net appreciation **$1,345,707**; Amounts appropriated **$333,203** | Bonadio Pittsford **4 Dec 2025** |
| 2 | Berklee College of Music | `/berklee-college-endowment/` | https://www.berklee.edu/sites/default/files/2025-12/2024-2025_ConsolidatedFinancialStatements.pdf | Total endowed funds **$465,524,411**; printed Total investment return, net **$53,369,871**; Appropriation **$18,658,758** | KPMG Boston **10 Oct 2025** |
| 3 | Johnson & Wales University | `/johnson-wales-endowment/` | https://www3.jwu.edu/files/pdfs/about/jwu-financial-report-fy2025.pdf | Total funds **$374,591 thousand**; printed Investment return, net **$35,528 thousand**; Appropriated for operations **$16,575 thousand** | RSM Boston **5 Nov 2025**. Figures **in thousands** |
| 4 | University of Rhode Island Foundation & Alumni Engagement | `/university-of-rhode-island-foundation/` | https://www.alumni.uri.edu/wp-content/uploads/2025/10/URIFAE-and-Affiliate-6.30.2025-Financial-Statements.pdf | Endowment NA **$345,192,833**; printed Net appreciation **$29,813,651**; Appropriations **$11,966,243** | Logo-only **25 Sep 2025** |
| 5 | University of Connecticut Foundation, Incorporated | `/university-of-connecticut-foundation/` | https://www-foundation.media.uconn.edu/wp-content/uploads/sites/3951/2025/11/2025-University-of-Connecticut-Foundation-FS-Remediated.pdf | Endowment NA **$678,337,565**; printed Net total investment return and other income **$68,778,510**; Spending allocation **$18,331,575** | Grant Thornton Boston **3 Nov 2025** |

## Official sources (independently re-GET this wake)

- Boston Architectural College FY2025 financial statements (Bonadio & Co., LLP, Pittsford, New York, 4 December 2025): https://the-bac.edu/Documents/Institutional/Financial%20Statements/2025_BAC_Financial_Statements.pdf
- House PDF GET **200** `application/pdf` **477,413** bytes. Listing `https://the-bac.edu/compliance/financial-statements` GET **200**. House PDF GET **200** is the card. Leftover listing narrative ~**$12.2 million** is not the card.
- Berklee College of Music FY2025 consolidated financial statements (KPMG LLP, Boston, Massachusetts, 10 October 2025): https://www.berklee.edu/sites/default/files/2025-12/2024-2025_ConsolidatedFinancialStatements.pdf
- House PDF GET **200** `application/pdf` **2,487,371** bytes. Listing `https://www.berklee.edu/administration-and-finance/annual-financial-statements` GET **200**. House PDF GET **200** is the card. Leftover CFO-letter **12.5%** is not the card.
- Johnson & Wales University FY2025 consolidated financial report (RSM US LLP, Boston, Massachusetts, 5 November 2025): https://www3.jwu.edu/files/pdfs/about/jwu-financial-report-fy2025.pdf
- House PDF GET **200** `application/pdf` **860,835** bytes. Listing `https://www3.jwu.edu/campuses/providence/about-jwu-providence/administration/index.html` GET **200**. House PDF GET **200** is the card. Figures print in thousands. Leftover summary **$385.6 million** is not the card.
- University of Rhode Island Foundation & Alumni Engagement FY2025 consolidating financial statements (logo-only, 25 September 2025): https://www.alumni.uri.edu/wp-content/uploads/2025/10/URIFAE-and-Affiliate-6.30.2025-Financial-Statements.pdf
- House PDF GET **200** `application/pdf` **432,446** bytes. Foundation listing `https://www.alumni.uri.edu/about-us/` GET **200**. House PDF GET **200** is the card. Leftover URI controller listing is leftover university GASB.
- University of Connecticut Foundation, Incorporated FY2025 financial statements (Grant Thornton LLP, Boston, Massachusetts, 3 November 2025): https://www-foundation.media.uconn.edu/wp-content/uploads/sites/3951/2025/11/2025-University-of-Connecticut-Foundation-FS-Remediated.pdf
- House PDF GET **200** `application/pdf` **559,715** bytes. Listing `https://www.foundation.uconn.edu/financial-information/` GET **200**. House PDF GET **200** is the card. Leftover glossy **$668 million** is not the card.

## What this wave is not

- Not a remint of Wave 247 AIC, Babson, Emerson, MCPHS, or Hellenic.
- Not leftover Worcester Polytechnic Institute after the named 2025 house PDF independently GET **403**. WebSearch extract is not a lock.
- Not leftover Elms / leftover Simmons / leftover Western New England / leftover University of New England after leftover named income + leftover appreciation and **no labeled Total**.
- Not leftover Bryant after the named house PDF independently GET **403**. WebSearch extract is not a lock.
- Not leftover Salve Regina / leftover Colby / leftover Williams after listings independently GET **403**. WebSearch extract is not a lock.
- Not leftover RIC College after the 2025 house FS independently GET **200** but prints no leftover-unique Foundation FASB endowment change table. Foundation FS is separately issued.
- Not leftover Framingham State University after the 2025 house FS independently GET **200** but prints leftover university GASB / leftover Foundation-obtainable, not a leftover-unique Foundation FASB three-fact lock.
- Not leftover North Shore Community College Foundation after the 2025 house FS independently GET **200** but the change table prints leftover Investment return **$238,430** and **no labeled appropriation**.
- Not leftover Albertus / leftover Husson / leftover Franklin Pierce / leftover Norwich / leftover Saint Anselm / leftover Champlain / leftover Hartford after leftover Form 990 / leftover FAC / leftover reports-upon-request and no leftover-unique 2025 house FASB card independently GET **200**.
- Not leftover Pacific Lutheran / leftover Wesleyan / leftover Holy Cross / leftover Hampshire after those keepers already ship.

## Short-slug reservations

- Never mint `/bac/` or `/boston-architectural/` or `/the-bac/`.
- Never mint `/berklee/` or `/berklee-college/`.
- Never mint `/jwu/` or `/johnson-wales/` or `/jwu-providence/`.
- Never mint `/uri/` or `/uri-foundation/` or `/urifae/` or `/rhody/`. `/uri/` would flatten leftover United Religions Initiative / leftover URI university GASB.
- Never mint `/uconn/` or `/uconn-foundation/` or `/ucf/`. Never remint `/huskies/`. `/huskies/` remains reserved against leftover Northern Illinois / leftover University of Washington / leftover Northeastern. `/ucf/` would flatten leftover University of Central Florida.
- Never mint `/aic/`, `/american-international/`, `/babson/`, `/babson-college/`, `/emerson/`, `/emerson-college/`, `/mcphs/`, `/mcphs-university/`, `/pharmacy/`, `/hellenic/`, `/hellenic-college/`, `/hchc/`, `/anna-maria/`, `/dean/`, `/suffolk/`, `/wheaton/`, `/olin/`, `/wentworth/`, `/lesley/`, `/mcla/`, `/nichols/`, `/gordon/`, `/curry/`, `/assumption/`, `/stonehill/`, `/springfield/`, `/clark/`, `/capital/`, `/regis/`, `/muw/`, `/endicott/`, `/lasell/`, `/hampshire/`, `/holy-cross/`, `/wwu/`, `/lu/`, `/lasers/`, `/greyhounds/`, `/cu/`, `/cougars/`, `/lclark/`, `/plu/`, `/wesleyan/`, `/rams/`, `/bulldogs/`, `/yellow-jackets/`, `/beavers/`, or `/fwolin/`.
