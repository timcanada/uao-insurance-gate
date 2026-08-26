from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from uao_growth.config import Settings, load_settings
from uao_growth.export.csv_export import write_report
from uao_growth.http import HttpClient
from uao_growth.learning import apply_feedback
from uao_growth.pipeline import (
    discover,
    enrich,
    ingest_ghost,
    ingest_members,
    mark_exportable,
    validate_emails,
    weekly,
)
from uao_growth.store import Store


def _http(settings: Settings) -> HttpClient:
    return HttpClient(user_agent=settings.sec_user_agent, min_interval=0.25)


def _store(settings: Settings) -> Store:
    settings.private_dir.mkdir(parents=True, exist_ok=True)
    settings.exports_dir.mkdir(parents=True, exist_ok=True)
    return Store(settings.db_path)


def cmd_status(settings: Settings, store: Store) -> int:
    payload = {
        "db": str(store.path),
        "members_suppressed": store.count("members"),
        "organizations": store.count("organizations"),
        "people": store.count("people"),
        "suppressed_people": store.count("people", "status = 'suppressed'"),
        "exportable": store.count("people", "status = 'exportable'"),
        "exported": store.count("people", "status = 'exported'"),
        "role_targets": store.count("people", "status = 'role_target'"),
        "members_drop_present": settings.members_drop_path.exists(),
        "apollo_configured": bool(settings.apollo_api_key),
        "neverbounce_configured": bool(settings.neverbounce_api_key),
        "ghost_configured": bool(settings.ghost_admin_api_key),
        "weekly_quota": settings.weekly_quota,
        "min_seniority_score": settings.min_seniority_score,
    }
    print(json.dumps(payload, indent=2))
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="UAO senior-audience research agent. Current members are never sourced or exported."
    )
    parser.add_argument("--root", help="growth-agent root (defaults to this package)")
    sub = parser.add_subparsers(dest="cmd", required=True)

    sub.add_parser("init-db", help="Create the local sqlite store")
    sub.add_parser("status", help="Counts, including the member suppression list")

    p_imp = sub.add_parser("import-members", help="Load a Ghost/CSV member export into the exclusion list")
    p_imp.add_argument("csv_path", nargs="?", help="Defaults to private/members.csv")

    sub.add_parser("pull-ghost-members", help="Pull members from Ghost Admin API into the exclusion list")

    p_disc = sub.add_parser("discover", help="Find institutions and named senior roles from public records")
    p_disc.add_argument("--sources", default="seeds,wikidata,sec_edgar,sec_iapd")

    p_en = sub.add_parser("enrich", help="Fill names/work emails via the official Apollo API")
    p_en.add_argument("--limit", type=int, default=200)

    p_val = sub.add_parser("validate", help="Validate emails via the official Neverbounce API")
    p_val.add_argument("--limit", type=int, default=500)

    p_week = sub.add_parser("weekly", help="Import members, discover, enrich, export one week of new prospects")
    p_week.add_argument("--sources", default="seeds,wikidata,sec_edgar,sec_iapd")
    p_week.add_argument("--members", help="Ghost/CSV member export used as the exclusion list")
    p_week.add_argument(
        "--public-only",
        action="store_true",
        help="Skip Apollo and Neverbounce; build named public-record inventory first",
    )

    p_learn = sub.add_parser("learn", help="Adjust source weights from outreach feedback")
    p_learn.add_argument("csv_path")

    sub.add_parser("report", help="Write a standalone HTML report from the current store")

    args = parser.parse_args(argv)
    settings = load_settings(Path(args.root) if args.root else None)
    store = _store(settings)
    http = _http(settings)
    try:
        if args.cmd == "init-db":
            print(json.dumps({"db": str(store.path), "ok": True}))
            return 0
        if args.cmd == "status":
            return cmd_status(settings, store)
        if args.cmd == "import-members":
            path = Path(args.csv_path) if args.csv_path else None
            print(json.dumps(ingest_members(settings, store, path), indent=2))
            return 0
        if args.cmd == "pull-ghost-members":
            print(json.dumps(ingest_ghost(settings, store, http), indent=2))
            return 0
        if args.cmd == "discover":
            sources = [s.strip() for s in args.sources.split(",") if s.strip()]
            print(json.dumps(discover(settings, store, http, sources), indent=2))
            return 0
        if args.cmd == "enrich":
            print(json.dumps(enrich(settings, store, http, args.limit), indent=2))
            return 0
        if args.cmd == "validate":
            print(json.dumps(validate_emails(settings, store, http, args.limit), indent=2))
            return 0
        if args.cmd == "weekly":
            sources = [s.strip() for s in args.sources.split(",") if s.strip()]
            members = Path(args.members) if args.members else None
            print(
                json.dumps(
                    weekly(
                        settings,
                        store,
                        http,
                        sources,
                        members,
                        public_only=args.public_only,
                    ),
                    indent=2,
                )
            )
            return 0
        if args.cmd == "learn":
            print(json.dumps(apply_feedback(store, Path(args.csv_path)), indent=2))
            return 0
        if args.cmd == "report":
            path = settings.exports_dir / "current-report.html"
            write_report(store, path, {"command": "report"})
            print(json.dumps({"report": str(path)}))
            return 0
        return 1
    finally:
        store.close()


if __name__ == "__main__":
    sys.exit(main())
