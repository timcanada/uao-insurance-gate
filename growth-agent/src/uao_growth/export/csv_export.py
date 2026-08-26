from __future__ import annotations

import csv
import json
from datetime import datetime, timezone
from pathlib import Path

from uao_growth.store import Store


def export_week(
    store: Store,
    path: Path,
    limit: int,
    *,
    mark_exported: bool = True,
    include_exported: bool = False,
) -> dict[str, int]:
    statuses = "('exportable', 'exported')" if include_exported else "('exportable')"
    rows = store.fetchall(
        f"""
        SELECT * FROM people
        WHERE status IN {statuses}
          AND name IS NOT NULL AND name != ''
          AND (member_match IS NULL OR member_match = '')
        ORDER BY seniority DESC, fit_score DESC, id ASC
        LIMIT ?
        """,
        (limit,),
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "id",
        "name",
        "title",
        "organization",
        "org_type",
        "country",
        "email",
        "email_status",
        "linkedin_url",
        "seniority",
        "tier",
        "fit_score",
        "source",
        "status",
        "consent_status",
    ]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        for row in rows:
            writer.writerow(
                {
                    "id": row["id"],
                    "name": row["name"],
                    "title": row["title"],
                    "organization": row["org_name"],
                    "org_type": row["org_type"],
                    "country": row["country"],
                    "email": row["email"],
                    "email_status": row["email_status"],
                    "linkedin_url": row["linkedin_url"],
                    "seniority": row["seniority"],
                    "tier": row["seniority_tier"],
                    "fit_score": row["fit_score"],
                    "source": row["source"],
                    "status": row["status"],
                    "consent_status": "prospect_not_subscribed",
                }
            )
            if mark_exported:
                store.update_person(int(row["id"]), status="exported")
    return {"exported": len(rows), "path": str(path), "marked_exported": int(mark_exported)}


def export_named_inventory(store: Store, path: Path, limit: int) -> dict[str, int]:
    """Write named seniors without consuming them. Used for public-only runs."""
    return export_week(store, path, limit, mark_exported=False, include_exported=True)


def write_report(store: Store, path: Path, stats: dict) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    generated = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    members = store.count("members")
    people = store.count("people")
    suppressed = store.count("people", "status = 'suppressed'")
    exportable = store.count("people", "status = 'exportable'")
    exported = store.count("people", "status = 'exported'")
    named = store.count("people", "name IS NOT NULL AND name != ''")
    orgs = store.count("organizations")
    weights = store.fetchall("SELECT * FROM source_weights ORDER BY weight DESC")
    top = store.fetchall(
        """
        SELECT name, title, org_name, org_type, country, seniority, status, member_match, source
        FROM people
        WHERE status IN ('exportable', 'exported', 'discovered', 'enriched', 'role_target')
          AND (member_match IS NULL OR member_match = '')
        ORDER BY seniority DESC, fit_score DESC
        LIMIT 25
        """
    )
    weight_rows = "".join(
        f"<tr><td>{w['source']}</td><td>{w['weight']}</td><td>{w['attempts']}</td>"
        f"<td>{w['kept']}</td><td>{w['suppressed']}</td></tr>"
        for w in weights
    ) or "<tr><td colspan='5'>No runs yet</td></tr>"
    people_rows = "".join(
        f"<tr><td>{_safe(r['name']) or '—'}</td><td>{_safe(r['title'])}</td>"
        f"<td>{_safe(r['org_name'])}</td><td>{_safe(r['org_type'])}</td>"
        f"<td>{r['seniority']}</td><td>{r['status']}</td><td>{r['source']}</td></tr>"
        for r in top
    ) or "<tr><td colspan='7'>No non-member people yet</td></tr>"
    html = f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>UAO senior research report</title>
<style>
body{{font-family:Inter,system-ui,sans-serif;background:#0e1b2c;color:#f5f1e6;margin:0;padding:32px}}
h1,h2{{color:#e6c75a;margin:0 0 12px}}
p,td,th{{color:#f5f1e6}}
.muted{{color:#8a9bb0}}
.cards{{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}}
.card{{background:#13243a;border:1px solid #1d2e44;border-radius:12px;padding:16px 18px;min-width:140px}}
.card b{{display:block;font-size:28px;color:#e6c75a}}
table{{width:100%;border-collapse:collapse;margin:16px 0 28px;background:#13243a}}
th,td{{border-bottom:1px solid #1d2e44;text-align:left;padding:8px 10px;font-size:13px}}
.warn{{border:1px solid #c9a44c;padding:12px 14px;border-radius:10px;margin:18px 0}}
</style></head>
<body>
<h1>UAO senior research report</h1>
<p class="muted">Generated {generated}. Current members are excluded from scrape, enrich, and export.</p>
<div class="warn">This file is a prospect inventory. Nobody is added to the Ghost list from this agent. Outreach still needs a lawful basis and an opt-in.</div>
<div class="cards">
  <div class="card"><span class="muted">Members suppressed</span><b>{members:,}</b></div>
  <div class="card"><span class="muted">Organizations</span><b>{orgs:,}</b></div>
  <div class="card"><span class="muted">People / roles</span><b>{people:,}</b></div>
  <div class="card"><span class="muted">Blocked as members</span><b>{suppressed:,}</b></div>
  <div class="card"><span class="muted">Named people</span><b>{named:,}</b></div>
  <div class="card"><span class="muted">Exportable</span><b>{exportable:,}</b></div>
  <div class="card"><span class="muted">Exported</span><b>{exported:,}</b></div>
</div>
<h2>Last run</h2>
<pre class="muted">{json.dumps(stats, indent=2)}</pre>
<h2>Source weights</h2>
<table><thead><tr><th>Source</th><th>Weight</th><th>Attempts</th><th>Kept</th><th>Suppressed</th></tr></thead>
<tbody>{weight_rows}</tbody></table>
<h2>Highest-seniority non-members</h2>
<table><thead><tr><th>Name</th><th>Title</th><th>Organization</th><th>Type</th><th>Score</th><th>Status</th><th>Source</th></tr></thead>
<tbody>{people_rows}</tbody></table>
</body></html>"""
    path.write_text(html, encoding="utf-8")
    return path


def _safe(value: object) -> str:
    return str(value or "").replace("<", "&lt;")
