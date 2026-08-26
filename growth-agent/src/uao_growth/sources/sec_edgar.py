from __future__ import annotations

from typing import Any

from uao_growth.http import HttpClient, encode_query
from uao_growth.normalize import normalize_org

EFTS = "https://efts.sec.gov/LATEST/search-index"
TICKERS = "https://www.sec.gov/files/company_tickers.json"

# 13F managers are the public record of who actually runs large pools of capital.
SEARCHES = (
    ("sovereign wealth", "swf"),
    ("pension fund", "pension"),
    ("employees retirement", "pension"),
    ("family office", "family_office"),
    ("endowment", "endowment"),
)


def _hits(payload: Any) -> list[dict[str, Any]]:
    if not isinstance(payload, dict):
        return []
    hits = payload.get("hits", {})
    inner = hits.get("hits", []) if isinstance(hits, dict) else []
    rows = []
    for hit in inner:
        src = hit.get("_source") or {}
        rows.append(src)
    return rows


def fetch_sec(client: HttpClient, limit_per_query: int = 80) -> dict[str, list[dict[str, Any]]]:
    orgs: list[dict[str, Any]] = []
    seen: set[str] = set()
    for query, org_type in SEARCHES:
        url = encode_query(
            EFTS,
            {
                "q": query,
                "forms": "13F-HR,13F-HR/A,ADV",
                "from": 0,
                "size": limit_per_query,
            },
        )
        try:
            payload = client.get_json(url)
        except Exception:
            continue
        for src in _hits(payload):
            name = (
                src.get("display_names", [None])[0]
                if isinstance(src.get("display_names"), list)
                else src.get("entity")
            ) or src.get("display_name")
            if isinstance(name, list):
                name = name[0] if name else None
            if not name:
                continue
            key = normalize_org(str(name))
            if not key or key in seen:
                continue
            seen.add(key)
            ciks = src.get("ciks") or src.get("cik")
            cik = ciks[0] if isinstance(ciks, list) and ciks else ciks
            orgs.append(
                {
                    "name": str(name),
                    "org_key": key,
                    "org_type": org_type,
                    "country": "US",
                    "domain": None,
                    "source": "sec_edgar",
                    "source_url": f"https://www.sec.gov/edgar/search/#/q={query}",
                    "external_id": str(cik) if cik else None,
                    "priority": 65,
                    "extra_json": {"form": src.get("root_forms") or src.get("form")},
                }
            )
    return {"organizations": orgs, "people": []}


def fetch_iapd(client: HttpClient, queries: list[str] | None = None) -> dict[str, list[dict[str, Any]]]:
    queries = queries or [
        "family office",
        "sovereign",
        "pension",
        "private equity",
        "endowment",
    ]
    orgs: list[dict[str, Any]] = []
    seen: set[str] = set()
    for query in queries:
        url = encode_query(
            "https://api.adviserinfo.sec.gov/search/firm",
            {"query": query, "hl": "true", "nrows": 50, "start": 0, "wt": "json"},
        )
        try:
            payload = client.get_json(url)
        except Exception:
            continue
        hits = (
            payload.get("hits", {}).get("hits", [])
            if isinstance(payload, dict)
            else []
        )
        for hit in hits:
            src = hit.get("_source") or {}
            name = src.get("org_name") or src.get("firm_name") or src.get("name")
            if not name:
                continue
            key = normalize_org(str(name))
            if key in seen:
                continue
            seen.add(key)
            org_type = "family_office" if "family" in query else "pe" if "private" in query else "pension"
            if "sovereign" in query:
                org_type = "swf"
            if "endowment" in query:
                org_type = "endowment"
            orgs.append(
                {
                    "name": str(name),
                    "org_key": key,
                    "org_type": org_type,
                    "country": (src.get("country") or "US"),
                    "domain": None,
                    "source": "sec_iapd",
                    "source_url": "https://adviserinfo.sec.gov/",
                    "external_id": str(src.get("org_crd") or src.get("crd") or ""),
                    "priority": 60,
                    "extra_json": {"query": query},
                }
            )
    return {"organizations": orgs, "people": []}
