# Page architecture — the entity graph

Tens of thousands of pages are a **stock of nouns**, not a stack of adjectives.

## URL law

- One real-world entity → one canonical URL.
- English slug, stable, no date unless it is a dated edition (briefs, charts, moves).
- Twins 301 to the stronger URL. Add the loser to a `merged` column in the inventory.
- Do not create `/tag/` sprawl. Tags are navigation, not strategy. The live tag sitemap is already duplicated (`probability-desk`, `probability-desk-2`, `long-horizon-capital-2`). Clean in Ghost; do not add more.

## Recommended information architecture

```text
/                           desks + proof of room
/intelligence/              morning brief editions
/probability-desk/          afternoon editions
/research/                  deep dives
/careers/                   jobs + hiring
/careers/intelligence/      playbooks
/careers/cities/{city}/     relocation (new)
/people/                    hub
/people/allocator-class/{slug}/
/registry/                  institution database
/registry/institutions/{slug}/
/registry/people/{slug}/
/registry/leadership-moves/{yyyy-mm-dd-slug}/
/directory/                 service-provider hub (new)
/directory/{category}/
/directory/{category}/{firm}/
/answers/{slug}/            AEO Q&A (migrate twins here over time)
/geo/{country}/             country hub
/advertise/                 packages (upgrade)
/press-desk/                quotation kit
/llms/                      machine TOC
```

Ghost today parks many explainers at the root (`/what-is-a-family-office/`). That is fine for winners. **New** Q&A should go under `/answers/` or stay root only if it is a franchise URL. Do not start a third pattern.

## Templates (see `/seo-aeo/templates/`)

1. **Institution** — legal name, owner type, HQ, AUM as-of, mandate, governance, leadership (linked), careers module, last UAO coverage, sources.
2. **Person** — role, institution, previous seats, public votes/speeches, UAO coverage, sources. No unsourced childhood colour.
3. **City** — why owners sit there, visa/tax *as public rules*, desk density, schools/neighbourhoods at a high level, open roles module, sources.
4. **Q&A** — answer block, table, “what it means for an allocator,” sources, schema.
5. **Firm (directory)** — category, HQ, what owners hire them for, labelled if paid, no puffery.
6. **Leadership move** — who, from, to, date, source, allocator read (two sentences).

## Internal linking (the graph must connect)

Every institution page links: people, country, owner-type hub, careers portal, last three UAO stories.  
Every person page links: institution, predecessor/successor if sourced, theme they are known for.  
Every city page links: institutions with offices there, open roles, relevant playbooks.  
Every Q&A links: two institutions as examples, one desk story, one related question.  
Desks link **out** to entity pages when a name appears — that is how new nodes inherit authority.

## Scale math

| Layer | Wave 1 | Wave 2 | Wave 3–4 stock |
| --- | --- | --- | --- |
| Hubs (type, theme, directory, press) | 15 | 40 | 80 |
| Institutions | 0 new (map existing) | 200 | 2,500 |
| People | 2 samples | 400 | 8,000 |
| Cities | 6 | 25 | 80 × ~8 supporting = 600+ |
| Q&A (net new after merges) | 6 | 150 | 2,000 |
| Directory firms | 1 hub + 4 category | 100 | 4,000 |
| Moves | process only | 4/week | archive |
| **Indexable total (order of mag.)** | **~30** | **~900** | **15,000–30,000** |

Wave 1 is quality and pipes. Volume comes after the templates survive contact with readers.

## Merge list (start this week)

Known twins / near-twins from sitemap prefixes — editor to confirm canonical:

- `santiago-principles` vs `santiago-principles-explained`
- `total-portfolio-approach` vs `total-portfolio-approach-investing` vs `what-is-the-total-portfolio-approach`
- `reference-portfolio` vs `reference-portfolio-explained`
- `uss-universities-superannuation-scheme` and `-explained` / `-uk-explained`
- `wisconsin-swib` / `wisconsin-investment-board-swib` / `-explained`
- `what-is-a-sovereign-wealth-fund-definition` vs `sovereign-wealth-fund`
- `vintage-year-diversification` vs `vintage-year-diversification-private-equity`
- `urbanisation-investment-theme` vs `-institutional`
- Tag duplicates (`*-2`, `*-3`) — keep one public tag, unindex the rest

## Robots / IA hygiene

`robots.txt` already blocks `/ghost/`, `/email/`, `/r/`. Keep member interiors (`/members-*`) out of growth campaigns. Do not noindex the brief archive — it is the brand. Do noindex true thin tags after cleanup.
