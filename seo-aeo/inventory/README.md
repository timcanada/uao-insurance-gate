# Inventory

`priority-slugs.csv` is the production backlog for Super Prompt v4. It is **not** a publish button.

- Wave 1 rows are drafted in `../publish/wave-1/`.
- Wave 2+ rows require a researcher and the quality gate.
- `status=live-check` means a similar URL may already exist — pull the sitemap before drafting.
- Never create a twin of a live slug.

Scale targets (stock, not this file): 10,000–30,000 indexable pages across the entity graph. This file is the first ~600 *priority* nodes — Wave 1 drafted, Wave 2–3 researched next.

Regenerate with:

```bash
python3 seo-aeo/inventory/generate_priority_slugs.py
```
