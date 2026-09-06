from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from uao_growth.config import Settings
from uao_growth.store import Store

SNAPSHOT_NAME = "progress_snapshot.json"
DEFAULT_EMAIL_TO = "tim@herofund.ca"


def _breakdown(store: Store, table: str, column: str) -> dict[str, int]:
    rows = store.fetchall(
        f"""
        SELECT COALESCE({column}, '') AS key, COUNT(*) AS n
        FROM {table}
        GROUP BY 1
        ORDER BY n DESC
        """
    )
    return {str(row["key"] or "unknown"): int(row["n"]) for row in rows}


def _last_run(store: Store) -> dict[str, Any] | None:
    row = store.fetchone("SELECT started_at, finished_at, command, stats_json FROM runs ORDER BY id DESC LIMIT 1")
    if not row:
        return None
    stats: Any = None
    raw = row["stats_json"]
    if raw:
        try:
            stats = json.loads(raw)
        except json.JSONDecodeError:
            stats = None
    return {
        "started_at": row["started_at"],
        "finished_at": row["finished_at"],
        "command": row["command"],
        "stats": stats,
    }


def load_snapshot(settings: Settings) -> dict[str, Any] | None:
    path = settings.seeds_dir.parent / SNAPSHOT_NAME
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def collect_status(settings: Settings, store: Store) -> dict[str, Any]:
    named_not_member = store.count(
        "people",
        "name IS NOT NULL AND name != '' AND status != 'suppressed'",
    )
    empty_seats = store.count(
        "people",
        "status = 'role_target' AND (name IS NULL OR name = '')",
    )
    with_email = store.count(
        "people",
        "email IS NOT NULL AND email != '' AND status != 'suppressed'",
    )
    live_empty = store.count("members") == 0 and store.count("organizations") == 0 and store.count("people") == 0
    snapshot = load_snapshot(settings)
    payload = {
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "email_to": DEFAULT_EMAIL_TO,
        "db": str(store.path),
        "live_store_empty": live_empty,
        "members_suppressed": store.count("members"),
        "organizations": store.count("organizations"),
        "people": store.count("people"),
        "people_not_suppressed": store.count("people", "status != 'suppressed'"),
        "named_people": store.count("people", "name IS NOT NULL AND name != ''"),
        "named_not_on_ghost": named_not_member,
        "empty_senior_seats": empty_seats,
        "suppressed_people": store.count("people", "status = 'suppressed'"),
        "role_targets": store.count("people", "status = 'role_target'"),
        "exportable": store.count("people", "status = 'exportable'"),
        "exported": store.count("people", "status = 'exported'"),
        "work_emails_on_new_people": with_email,
        "org_mix": _breakdown(store, "organizations", "org_type"),
        "people_by_org_type": _breakdown(store, "people", "org_type"),
        "members_drop_present": settings.members_drop_path.exists(),
        "apollo_configured": bool(settings.apollo_api_key),
        "neverbounce_configured": bool(settings.neverbounce_api_key),
        "ghost_configured": bool(settings.ghost_admin_api_key),
        "weekly_quota": settings.weekly_quota,
        "min_seniority_score": settings.min_seniority_score,
        "last_run": _last_run(store),
        "last_known": snapshot,
        "policy": {
            "auto_subscribe_ghost": False,
            "consent_status": "prospect_not_subscribed",
            "include_member_pii": False,
        },
        "next_step": _next_step(settings, live_empty),
    }
    return payload


def _next_step(settings: Settings, live_empty: bool) -> str:
    if live_empty:
        return (
            "Restore private/members.csv (Drive Ghost export) and re-run "
            "`weekly --public-only` so this environment has the 25k+ seat graph."
        )
    if not settings.apollo_api_key or not settings.neverbounce_api_key:
        return (
            "Public-record inventory is ready. Add APOLLO_API_KEY and "
            "NEVERBOUNCE_API_KEY to fill named work emails on empty senior seats, "
            "then drop anyone already on the Ghost list."
        )
    return (
        "Keys are present. Enrich empty senior seats via official Apollo, "
        "verify with Neverbounce, suppress current members, and export a named week file."
    )


def render_email(payload: dict[str, Any]) -> tuple[str, str, str]:
    """Return (to, subject, body) with no member or prospect PII."""
    generated = str(payload.get("generated_at", ""))[:10] or datetime.now(timezone.utc).strftime("%Y-%m-%d")
    subject = f"UAO growth agent — daily progress ({generated})"
    last = payload.get("last_known") or {}
    live_empty = bool(payload.get("live_store_empty"))
    if live_empty and last:
        orgs = last.get("organizations", 0)
        people = last.get("people_not_suppressed", 0)
        named = last.get("named_not_on_ghost", 0)
        seats = last.get("empty_senior_seats", 0)
        suppressed = last.get("suppressed_as_members", 0)
        members = last.get("ghost_members_imported", 0)
        emails = last.get("work_emails_on_new_people", 0)
        counts_label = f"Last completed run ({last.get('as_of', 'unknown date')}; this VM is empty)"
    else:
        orgs = payload.get("organizations", 0)
        people = payload.get("people_not_suppressed", 0)
        named = payload.get("named_not_on_ghost", 0)
        seats = payload.get("empty_senior_seats", 0)
        suppressed = payload.get("suppressed_people", 0)
        members = payload.get("members_suppressed", 0)
        emails = payload.get("work_emails_on_new_people", 0)
        counts_label = "Live store on this environment"

    keys = []
    keys.append("Apollo: set" if payload.get("apollo_configured") else "Apollo: missing")
    keys.append("Neverbounce: set" if payload.get("neverbounce_configured") else "Neverbounce: missing")
    keys.append("Ghost Admin: set" if payload.get("ghost_configured") else "Ghost Admin: missing")
    members_file = "present" if payload.get("members_drop_present") else "missing"

    body = f"""Tim —

Daily progress on the Universal Asset Owners senior-audience research agent.

Goal
- Build a list of very senior people at the top owner desks (CIO / CEO / principal / minister / event chairs).
- Current Ghost members stay out. Nobody is auto-subscribed.
- Export is outreach inventory only (`consent_status=prospect_not_subscribed`).

{counts_label}
- Ghost members on the exclusion list: {members:,}
- Organizations: {orgs:,}
- Senior seats / people (not suppressed): {people:,}
- Named people not on Ghost: {named:,}
- Empty senior seats waiting for a name/email: {seats:,}
- Already on Ghost and suppressed: {suppressed:,}
- Work emails on new people: {emails:,}

This environment
- Member CSV: {members_file}
- Keys: {", ".join(keys)}
- Weekly quota: {payload.get("weekly_quota")}
- Seniority floor: {payload.get("min_seniority_score")}

Next step
{payload.get("next_step")}

Policy reminder
- No Ghost subscribe from this agent.
- No member names, emails, or prospect CSVs in this email.

— UAO growth agent
"""
    return DEFAULT_EMAIL_TO, subject, body.strip() + "\n"
