from __future__ import annotations

from typing import Any, Callable

from uao_growth.config import Settings
from uao_growth.http import HttpClient
from uao_growth.sources.sec_edgar import fetch_iapd, fetch_sec
from uao_growth.sources.seeds import load_seed_orgs, seed_people_from_orgs
from uao_growth.sources.wikidata import fetch_wikidata

SOURCE_NAMES = ("seeds", "wikidata", "sec_edgar", "sec_iapd")


def run_sources(
    settings: Settings,
    client: HttpClient,
    selected: list[str] | None = None,
) -> dict[str, list[dict[str, Any]]]:
    wanted = set(selected or SOURCE_NAMES)
    orgs: list[dict[str, Any]] = []
    people: list[dict[str, Any]] = []

    runners: dict[str, Callable[[], dict[str, list[dict[str, Any]]]]] = {
        "seeds": lambda: {
            "organizations": load_seed_orgs(settings.seeds_dir),
            "people": seed_people_from_orgs(load_seed_orgs(settings.seeds_dir)),
        },
        "wikidata": lambda: fetch_wikidata(client),
        "sec_edgar": lambda: fetch_sec(client),
        "sec_iapd": lambda: fetch_iapd(client),
    }
    errors: dict[str, str] = {}
    for name in SOURCE_NAMES:
        if name not in wanted:
            continue
        try:
            batch = runners[name]()
            orgs.extend(batch.get("organizations") or [])
            people.extend(batch.get("people") or [])
        except Exception as exc:
            errors[name] = str(exc)
    return {"organizations": orgs, "people": people, "errors": errors}
