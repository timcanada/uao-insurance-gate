from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any

from uao_growth.config import Settings
from uao_growth.enrichers.apollo import ApolloClient
from uao_growth.enrichers.neverbounce import NeverBounceClient
from uao_growth.export.csv_export import (
    export_named_inventory,
    export_pipeline_inventory,
    export_week,
    write_report,
)
from uao_growth.http import HttpClient
from uao_growth.learning import recompute_weights
from uao_growth.members.ghost import pull_ghost_members
from uao_growth.members.suppress import SuppressionIndex, import_members
from uao_growth.normalize import (
    email_hash,
    linkedin_key,
    normalize_email,
    normalize_name,
    normalize_org,
    person_org_key,
)

PRIORITY_ORG_TYPES = (
    "swf",
    "pension",
    "family_office",
    "endowment",
    "government",
    "accounting",
    "insurer",
)
from uao_growth.scoring import score_person
from uao_growth.sources.registry import SOURCE_NAMES, run_sources
from uao_growth.sources.seeds import default_titles
from uao_growth.store import Store, utcnow


def ingest_members(settings: Settings, store: Store, path: Path | None = None) -> dict[str, int]:
    target = path or settings.members_drop_path
    if not target.exists():
        return {"inserted": 0, "updated": 0, "total": store.count("members"), "missing": 1}
    stats = import_members(store, target)
    apply_suppression(store)
    return stats


def ingest_ghost(settings: Settings, store: Store, http: HttpClient) -> dict[str, int]:
    if not settings.ghost_admin_api_key:
        raise RuntimeError("GHOST_ADMIN_API_KEY is not set")
    stats = pull_ghost_members(store, http, settings.ghost_url, settings.ghost_admin_api_key)
    apply_suppression(store)
    return stats


def apply_suppression(store: Store) -> int:
    index = SuppressionIndex(store)
    blocked = 0
    rows = store.fetchall("SELECT * FROM people WHERE status != 'suppressed'")
    for row in rows:
        match = index.match(dict(row))
        if match:
            store.update_person(int(row["id"]), status="suppressed", member_match=match)
            blocked += 1
    return blocked


def _prepare_person(raw: dict[str, Any], org_id: int | None, min_seniority: int) -> dict[str, Any]:
    name = raw.get("name")
    title = raw.get("title")
    org_name = raw.get("org_name")
    scored = score_person(
        title=title,
        org_type=raw.get("org_type"),
        extra_tags=list((raw.get("extra_json") or {}).keys()) if isinstance(raw.get("extra_json"), dict) else None,
        min_seniority=min_seniority,
    )
    email = normalize_email(raw.get("email")) or None
    return {
        **raw,
        "name": name,
        "name_key": normalize_name(name) if name else None,
        "org_id": org_id,
        "person_org_key": person_org_key(name, org_name) if name else None,
        "email": email,
        "email_hash": email_hash(email) if email else None,
        "linkedin_key": raw.get("linkedin_key") or linkedin_key(raw.get("linkedin_url")),
        "seniority": scored.seniority,
        "seniority_tier": scored.tier,
        "fit_score": scored.fit,
        "status": raw.get("status") or "discovered",
    }


def _existing_person(store: Store, person: dict[str, Any]) -> int | None:
    if person.get("email"):
        row = store.fetchone("SELECT id FROM people WHERE email = ?", (person["email"],))
        if row:
            return int(row["id"])
    if person.get("linkedin_key"):
        row = store.fetchone("SELECT id FROM people WHERE linkedin_key = ?", (person["linkedin_key"],))
        if row:
            return int(row["id"])
    if person.get("name_key") and person.get("person_org_key"):
        row = store.fetchone(
            "SELECT id FROM people WHERE name_key = ? AND person_org_key = ?",
            (person["name_key"], person["person_org_key"]),
        )
        if row:
            return int(row["id"])
    if person.get("status") == "role_target" and person.get("org_key") and person.get("title"):
        row = store.fetchone(
            "SELECT id FROM people WHERE org_key = ? AND title = ? AND status = 'role_target'",
            (person["org_key"], person["title"]),
        )
        if row:
            return int(row["id"])
    return None


def discover(settings: Settings, store: Store, http: HttpClient, sources: list[str] | None = None) -> dict[str, Any]:
    index = SuppressionIndex(store)
    batch = run_sources(settings, http, sources)
    kept = 0
    suppressed = 0
    rejected = 0
    org_ids: dict[tuple[str, str], int] = {}
    by_source: dict[str, dict[str, int]] = {}

    for org in batch["organizations"]:
        org_id = store.upsert_org(org)
        org_ids[(org["org_key"], org["source"])] = org_id

    for raw in batch["people"]:
        source = raw.get("source") or "unknown"
        by_source.setdefault(source, {"attempts": 0, "kept": 0, "suppressed": 0})
        by_source[source]["attempts"] += 1
        org_id = org_ids.get((raw.get("org_key") or "", raw.get("source") or ""))
        person = _prepare_person(raw, org_id, settings.min_seniority_score)
        if person["seniority_tier"] == "reject" or (
            person.get("name") and person["seniority"] < settings.min_seniority_score
        ):
            rejected += 1
            continue
        match = index.match(person)
        if match:
            person["status"] = "suppressed"
            person["member_match"] = match
            suppressed += 1
            by_source[source]["suppressed"] += 1
        elif person.get("name") and person["seniority"] >= settings.min_seniority_score:
            person["status"] = "exportable"
            kept += 1
            by_source[source]["kept"] += 1
        else:
            person["status"] = "role_target"
            kept += 1
            by_source[source]["kept"] += 1
        existing = _existing_person(store, person)
        if existing:
            store.update_person(existing, **{k: v for k, v in person.items() if k != "source"})
        else:
            store.insert_person(person)

    for source, counts in by_source.items():
        store.bump_source(source, **counts)
    recompute_weights(store)
    return {
        "organizations": len(batch["organizations"]),
        "people_seen": len(batch["people"]),
        "kept": kept,
        "suppressed": suppressed,
        "rejected": rejected,
        "errors": batch.get("errors") or {},
        "members_on_file": len(index),
        "sources": sources or list(SOURCE_NAMES),
    }


def _row_domain(row: Any) -> str | None:
    extra = row["extra_json"] if row["extra_json"] else None
    if not extra:
        return None
    parsed = json.loads(extra) if isinstance(extra, str) else extra
    domain = (parsed or {}).get("domain")
    return domain or None


def _apply_apollo_person(
    store: Store,
    index: SuppressionIndex,
    raw: dict[str, Any],
    row: Any,
    min_seniority: int,
) -> str:
    person = _prepare_person(
        {**raw, "org_type": row["org_type"], "org_key": row["org_key"], "org_name": raw.get("org_name") or row["org_name"]},
        row["org_id"],
        min_seniority,
    )
    match = index.match(person)
    if match:
        person["status"] = "suppressed"
        person["member_match"] = match
        outcome = "blocked"
    elif person["seniority"] < min_seniority:
        return "rejected"
    else:
        person["status"] = "exportable" if person.get("email") else "enriched"
        outcome = "kept"
    existing = _existing_person(store, person)
    if existing:
        store.update_person(existing, **{k: v for k, v in person.items() if k != "source"})
    else:
        store.insert_person(person)
    return outcome


def enrich(settings: Settings, store: Store, http: HttpClient, limit: int = 200) -> dict[str, int]:
    if not settings.apollo_api_key:
        return {"enriched": 0, "skipped_no_key": 1}
    apollo = ApolloClient(http, settings.apollo_api_key)
    index = SuppressionIndex(store)
    named_limit = min(limit, 500)
    named = store.fetchall(
        """
        SELECT * FROM people
        WHERE name IS NOT NULL AND name != ''
          AND (email IS NULL OR email = '')
          AND status NOT IN ('suppressed', 'below_bar', 'invalid_email')
          AND (member_match IS NULL OR member_match = '')
        ORDER BY seniority DESC, id ASC
        LIMIT ?
        """,
        (named_limit,),
    )
    matched = 0
    named_blocked = 0
    named_failed = 0
    for row in named:
        try:
            found = apollo.match(
                name=row["name"] or "",
                organization_name=row["org_name"] or "",
                domain=_row_domain(row) or "",
                reveal_personal_emails=False,
                reveal_phone_number=False,
            )
        except Exception:
            named_failed += 1
            continue
        if not found:
            named_failed += 1
            continue
        outcome = _apply_apollo_person(store, index, found, row, settings.min_seniority_score)
        if outcome == "blocked":
            named_blocked += 1
        elif outcome == "kept":
            matched += 1
            if row["status"] in {"role_target", "discovered", "exportable", "enriched"}:
                store.update_person(int(row["id"]), status="enriched_slot")

    seat_limit = max(0, limit - len(named))
    placeholders = ",".join("?" for _ in PRIORITY_ORG_TYPES)
    seats = store.fetchall(
        f"""
        SELECT * FROM people
        WHERE status IN ('role_target', 'discovered')
          AND (member_match IS NULL OR member_match = '')
          AND org_type IN ({placeholders})
        ORDER BY seniority DESC, id ASC
        LIMIT ?
        """,
        (*PRIORITY_ORG_TYPES, seat_limit),
    )
    created = 0
    updated = 0
    blocked = 0
    for row in seats:
        titles = [row["title"]] if row["title"] else default_titles(row["org_type"])
        try:
            found = apollo.search_org(
                row["org_name"] or "",
                titles=titles,
                domain=_row_domain(row),
                org_type=row["org_type"],
            )
        except Exception:
            continue
        for raw in found:
            outcome = _apply_apollo_person(store, index, raw, row, settings.min_seniority_score)
            if outcome == "blocked":
                blocked += 1
            elif outcome == "kept":
                created += 1
        if row["status"] == "role_target":
            store.update_person(int(row["id"]), status="enriched_slot")
    return {
        "named_matched": matched,
        "named_blocked_members": named_blocked,
        "named_unmatched": named_failed,
        "named_attempted": len(named),
        "created": created,
        "updated": updated,
        "blocked_members": blocked,
        "slots": len(seats),
    }


def import_inventory_csv(store: Store, path: Path) -> dict[str, int]:
    """Reload a previous public-only export into the store. Does not invent emails."""
    inserted = 0
    skipped = 0
    orgs = 0
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        for raw in reader:
            org_name = (raw.get("organization") or raw.get("org_name") or "").strip()
            name = (raw.get("name") or "").strip() or None
            title = (raw.get("title") or "").strip() or None
            source = (raw.get("source") or "inventory").strip()
            org_type = (raw.get("org_type") or "").strip() or None
            if not org_name and not name:
                skipped += 1
                continue
            org_key = normalize_org(org_name) if org_name else ""
            org_id = None
            if org_key:
                org_id = store.upsert_org(
                    {
                        "name": org_name,
                        "org_key": org_key,
                        "org_type": org_type,
                        "country": (raw.get("country") or "").strip() or None,
                        "source": source,
                    }
                )
                orgs += 1
            person = {
                "name": name,
                "name_key": normalize_name(name) if name else None,
                "title": title,
                "seniority": int(raw["seniority"]) if raw.get("seniority") else 0,
                "seniority_tier": (raw.get("tier") or raw.get("seniority_tier") or "").strip() or None,
                "fit_score": int(raw["fit_score"]) if raw.get("fit_score") else 0,
                "org_id": org_id,
                "org_name": org_name or None,
                "org_type": org_type,
                "org_key": org_key or None,
                "person_org_key": person_org_key(name, org_name) if name else None,
                "country": (raw.get("country") or "").strip() or None,
                "email": normalize_email(raw.get("email")) or None,
                "email_hash": email_hash(raw.get("email")) if raw.get("email") else None,
                "email_status": (raw.get("email_status") or "").strip() or None,
                "linkedin_url": (raw.get("linkedin_url") or "").strip() or None,
                "linkedin_key": linkedin_key(raw.get("linkedin_url")),
                "source": source,
                "status": (raw.get("status") or ("exportable" if name else "role_target")),
            }
            if _existing_person(store, person):
                skipped += 1
                continue
            store.insert_person(person)
            inserted += 1
    blocked = apply_suppression(store)
    return {"inserted": inserted, "skipped": skipped, "org_upserts": orgs, "suppressed": blocked}


def validate_emails(settings: Settings, store: Store, http: HttpClient, limit: int = 500) -> dict[str, int]:
    if not settings.neverbounce_api_key:
        return {"checked": 0, "skipped_no_key": 1}
    client = NeverBounceClient(http, settings.neverbounce_api_key)
    rows = store.fetchall(
        """
        SELECT id, email FROM people
        WHERE email IS NOT NULL AND email != ''
          AND (email_status IS NULL OR email_status = '')
          AND status != 'suppressed'
        LIMIT ?
        """,
        (limit,),
    )
    counts = {"valid": 0, "invalid": 0, "other": 0}
    for row in rows:
        result = client.check(row["email"])
        status = "exportable" if result == "valid" else "invalid_email" if result == "invalid" else "discovered"
        store.update_person(int(row["id"]), email_status=result, status=status)
        if result in counts:
            counts[result] += 1
        else:
            counts["other"] += 1
    counts["checked"] = len(rows)
    return counts


def mark_exportable(settings: Settings, store: Store) -> int:
    apply_suppression(store)
    rows = store.fetchall(
        """
        SELECT * FROM people
        WHERE status IN ('discovered', 'enriched', 'exportable')
          AND name IS NOT NULL AND name != ''
          AND (member_match IS NULL OR member_match = '')
        """
    )
    marked = 0
    for row in rows:
        scored = score_person(
            title=row["title"],
            org_type=row["org_type"],
            min_seniority=settings.min_seniority_score,
        )
        if scored.exportable:
            store.update_person(
                int(row["id"]),
                status="exportable",
                seniority=scored.seniority,
                seniority_tier=scored.tier,
                fit_score=scored.fit,
            )
            marked += 1
        else:
            store.update_person(int(row["id"]), status="below_bar", seniority=scored.seniority)
    return marked


def weekly(
    settings: Settings,
    store: Store,
    http: HttpClient,
    sources: list[str] | None = None,
    members_path: Path | None = None,
    public_only: bool = False,
) -> dict[str, Any]:
    started = utcnow()
    member_stats = ingest_members(settings, store, members_path)
    discovery = discover(settings, store, http, sources)
    if public_only:
        enrichment = {"skipped_public_only": 1, "note": "Apollo left for later contact fill"}
        validation = {"skipped_public_only": 1, "note": "Neverbounce left for later verification"}
    else:
        enrichment = enrich(settings, store, http, limit=min(settings.weekly_quota, 400))
        validation = validate_emails(settings, store, http, limit=min(settings.weekly_quota, 800))
    marked = mark_exportable(settings, store)
    stamp = started.replace(":", "").replace("-", "")[:15]
    csv_path = settings.exports_dir / f"week-{stamp}-prospects.csv"
    if public_only:
        exported = export_named_inventory(store, csv_path, settings.weekly_quota)
        inventory_path = settings.exports_dir / "public-named-inventory.csv"
        export_named_inventory(store, inventory_path, settings.weekly_quota)
        seats_path = settings.exports_dir / "public-pipeline-inventory.csv"
        seats = export_pipeline_inventory(store, seats_path, max(settings.weekly_quota, 30000))
        exported["inventory"] = str(inventory_path)
        exported["pipeline"] = seats
    else:
        exported = export_week(store, csv_path, settings.weekly_quota)
    stats = {
        "started": started,
        "members": member_stats,
        "discover": discovery,
        "enrich": enrichment,
        "validate": validation,
        "marked_exportable": marked,
        "export": exported,
        "finished": utcnow(),
    }
    report_path = settings.exports_dir / f"week-{stamp}-report.html"
    write_report(store, report_path, stats)
    store.execute(
        "INSERT INTO runs (started_at, finished_at, command, stats_json) VALUES (?, ?, ?, ?)",
        (started, stats["finished"], "weekly", json.dumps(stats)),
    )
    store.commit()
    stats["report"] = str(report_path)
    return stats
