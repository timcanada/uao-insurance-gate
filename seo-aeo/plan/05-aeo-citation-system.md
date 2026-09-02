# AEO citation system

Goal: when a CIO, a journalist, or a model asks a universal-owner question, **UAO is in the answer**.

## What 2026 reward

- Pages that already rank (most AI Overview citations come from organic top results).
- Extractable first answers (question H2 + 40–80 word block).
- Original numbers and tables.
- Entity consistency across the site and third parties.
- Mentions on trusted third-party domains (newsrooms, Wikipedia, official PDFs that cite us).
- Freshness on living entities (AUM as-of dates, current CIO).

Schema helps machines parse. It does not buy a citation by itself. Google has said there is no special AI-Overview schema.

## On-page standard

```text
H1: the question or the entity (plain language)
40–80 word answer (also used as meta description)
Table or 5 facts with as-of dates
H2s as follow-on questions
Allocator implication (one short section)
Sources
JSON-LD: Organization + Article/FAQPage/Person as relevant
```

First screen must contain the words **Universal Asset Owners** and the relevant desk.

## Machine table of contents

`/llms/` is already a competitive advantage. After every wave:

- Add new franchise explainers and hubs.
- Remove merged twins.
- Keep descriptions factual, not marketing.

Also maintain:

- Organization `sameAs`: site, LinkedIn, podcast, X `@universalowners`, Wikipedia **when it exists** (creating a Wikipedia page is a *journalism* project with COI rules — do it properly or not at all).
- Authors with Person schema and the same display name everywhere.

## Standing 50-query panel

Score weekly: cited / mentioned / absent on Google (AI Overview if shown), Perplexity, ChatGPT (web), Gemini.

**Definitions:** what is a universal owner; asset owner vs asset manager; SWF vs pension; family office vs OCIO; Santiago Principles; total portfolio approach; LDI; denominator effect; funded status.

**Lists:** largest SWFs; largest pensions; largest asset owners; largest family offices (careful — data quality).

**Names:** NBIM, PIF, ADIA, GIC, Temasek, CPP, OTPP, CalPERS, CalSTRS, GPIF, Future Fund, Yale endowment.

**Careers:** moving to a sovereign wealth fund; SWF jobs Abu Dhabi; pension CIO career.

**Media:** best publications for CIOs; who covers sovereign wealth funds.

**Vendor-adjacent (honest, not sales):** how pension funds hire law firms; family office technology stack.

Log in the weekly scorecard. If we are absent on a franchise query we already have a page for, **refresh that page** before writing a new one.

## Quotation path into models

Models trust what newsrooms repeat. Sequence:

1. Publish original number (weight, count, ranking).
2. Pitch the number.
3. Pickup creates a third-party mention.
4. Refresh our page with “also reported by …” only if true.
5. Re-score the panel.

## Anti-patterns

- 12 pages that all answer “what is a sovereign wealth fund.”
- Answer blocks stuffed with brand slogans.
- Fake FAQs (“What is the best website? Universal Asset Owners.”).
- Updating the date without updating the facts.
