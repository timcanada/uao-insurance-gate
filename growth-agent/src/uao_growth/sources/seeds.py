from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from uao_growth.normalize import normalize_domain, normalize_org


def load_seed_orgs(seeds_dir: Path) -> list[dict[str, Any]]:
    path = seeds_dir / "organizations.json"
    payload = json.loads(path.read_text(encoding="utf-8"))
    orgs = []
    for raw in payload:
        orgs.append(
            {
                "name": raw["name"],
                "org_key": normalize_org(raw["name"]),
                "org_type": raw.get("type"),
                "country": raw.get("country"),
                "domain": normalize_domain(raw.get("domain")),
                "source": "seeds",
                "source_url": raw.get("url"),
                "external_id": raw.get("wikidata"),
                "priority": int(raw.get("priority", 80)),
                "extra_json": {"notes": raw.get("notes"), "titles": raw.get("titles", [])},
            }
        )
    return orgs


OWNER_ORG_TYPES = {
    "swf",
    "pension",
    "family_office",
    "endowment",
    "insurer",
    "pe",
    "government",
}


def role_targets_from_orgs(orgs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Named people come later. These slots are the senior seats we still need."""
    return seed_people_from_orgs(
        [org for org in orgs if (org.get("org_type") or "") in OWNER_ORG_TYPES or org.get("source") == "seeds"]
    )


def seed_people_from_orgs(orgs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Role targets, not invented people. Enrichment fills the actual names."""
    people: list[dict[str, Any]] = []
    for org in orgs:
        titles = (org.get("extra_json") or {}).get("titles") or default_titles(org.get("org_type"))
        for title in titles:
            people.append(
                {
                    "name": None,
                    "title": title,
                    "org_name": org["name"],
                    "org_type": org.get("org_type"),
                    "org_key": org["org_key"],
                    "country": org.get("country"),
                    "source": "seeds",
                    "source_url": org.get("source_url"),
                    "status": "role_target",
                    "extra_json": {"domain": org.get("domain"), "needs_name": True},
                }
            )
    return people


def default_titles(org_type: str | None) -> list[str]:
    mapping = {
        "swf": ["Chief Investment Officer", "Chief Executive Officer", "Deputy Chief Investment Officer", "Head of Private Markets"],
        "pension": ["Chief Investment Officer", "Deputy Chief Investment Officer", "Head of Asset Allocation", "Chair of the Investment Committee"],
        "family_office": ["Chief Investment Officer", "Principal", "Chief Executive Officer"],
        "pe": ["Managing Partner", "Chief Investment Officer", "Head of Investor Relations"],
        "insurer": ["Chief Investment Officer", "Chief Executive Officer", "Chief Risk Officer"],
        "endowment": ["Chief Investment Officer", "Chief Investment Officer, Endowment"],
        "accounting": ["Global CEO", "Global Head of Asset and Wealth Management", "Managing Partner"],
        "event": ["Founder", "Managing Director", "Head of Institutional Relationships"],
        "government": ["Minister of Finance", "Deputy Minister of Finance", "Secretary of the Treasury"],
        "bank": ["Head of Asset Management", "Vice Chairman, Investment Banking"],
        "consultant": ["Managing Partner", "Global Head of Investments"],
        "legal": ["Managing Partner", "Head of Asset Management"],
    }
    return mapping.get(org_type or "", ["Chief Investment Officer", "Chief Executive Officer"])
