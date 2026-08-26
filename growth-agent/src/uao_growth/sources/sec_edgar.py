from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from datetime import date, timedelta
from typing import Any

from uao_growth.http import HttpClient, encode_query
from uao_growth.normalize import normalize_org

EFTS = "https://efts.sec.gov/LATEST/search-index"
TICKERS = "https://www.sec.gov/files/company_tickers.json"
CIK_SUFFIX = re.compile(r"\s*\(CIK\s+\d+\)\s*$", re.I)

# 13F managers are the public record of who actually runs large pools of capital.
SEARCHES = (
    ('"retirement system"', "pension"),
    ('"teachers retirement"', "pension"),
    ('"employees retirement"', "pension"),
    ('"pension fund"', "pension"),
    ('"family office"', "family_office"),
    ("endowment", "endowment"),
    ('"investment authority"', "swf"),
    ('"permanent fund"', "swf"),
    ('"state board of administration"', "pension"),
    ('"superannuation"', "pension"),
)

OWNER_HINTS = (
    "retirement",
    "pension",
    "teachers",
    "endowment",
    "sovereign",
    "family office",
    "investment authority",
    "investment board",
    "superannuation",
    "permanent fund",
    "future fund",
    "retirement system",
    "retirement fund",
    "state board",
)
REJECT_HINTS = (
    "wealth management",
    "wealth advisors",
    "financial advisor",
    "financial advisers",
    "broker",
)


def is_owner_filer(name: str, intended_type: str) -> bool:
    text = name.lower()
    if any(hint in text for hint in REJECT_HINTS) and not any(hint in text for hint in OWNER_HINTS):
        return False
    if intended_type == "family_office":
        return "family" in text
    if intended_type == "swf":
        return any(hint in text for hint in ("sovereign", "investment authority", "permanent fund", "future fund"))
    return any(hint in text for hint in OWNER_HINTS)


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


def clean_filer_name(name: str) -> str:
    return CIK_SUFFIX.sub("", (name or "").strip()).strip()


def fetch_sec(
    client: HttpClient,
    limit_per_query: int = 80,
    signer_limit: int = 120,
) -> dict[str, list[dict[str, Any]]]:
    orgs: list[dict[str, Any]] = []
    seen: set[str] = set()
    latest: dict[str, dict[str, Any]] = {}
    end = date.today()
    start = end - timedelta(days=548)
    for query, org_type in SEARCHES:
        url = encode_query(
            EFTS,
            {
                "q": query,
                "forms": "13F-HR,13F-HR/A",
                "from": 0,
                "size": limit_per_query,
                "dateRange": "custom",
                "startdt": start.isoformat(),
                "enddt": end.isoformat(),
            },
        )
        try:
            payload = client.get_json(url)
        except Exception:
            continue
        for hit in (payload or {}).get("hits", {}).get("hits", []) if isinstance(payload, dict) else []:
            src = hit.get("_source") or {}
            name = (
                src.get("display_names", [None])[0]
                if isinstance(src.get("display_names"), list)
                else src.get("entity")
            ) or src.get("display_name")
            if isinstance(name, list):
                name = name[0] if name else None
            name = clean_filer_name(str(name)) if name else ""
            if not name or not is_owner_filer(name, org_type):
                continue
            key = normalize_org(name)
            if not key:
                continue
            ciks = src.get("ciks") or src.get("cik")
            cik = ciks[0] if isinstance(ciks, list) and ciks else ciks
            if key not in seen:
                seen.add(key)
                orgs.append(
                    {
                        "name": name,
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
            if not cik:
                continue
            file_id = str(hit.get("_id") or "")
            prev = latest.get(str(cik))
            if not prev or str(src.get("file_date") or "") > str(prev.get("file_date") or ""):
                latest[str(cik)] = {
                    "cik": str(cik),
                    "adsh": src.get("adsh") or "",
                    "file_id": file_id,
                    "file_date": src.get("file_date"),
                    "org_name": name,
                    "org_type": org_type,
                    "org_key": key,
                }
    people = fetch_13f_signers(client, list(latest.values()), limit=signer_limit)
    return {"organizations": orgs, "people": people}


def fetch_13f_signers(
    client: HttpClient,
    filings: list[dict[str, Any]],
    limit: int = 120,
) -> list[dict[str, Any]]:
    people: list[dict[str, Any]] = []
    for filing in filings[:limit]:
        cik = str(filing.get("cik") or "").lstrip("0") or "0"
        adsh = str(filing.get("adsh") or "").replace("-", "")
        file_id = str(filing.get("file_id") or "")
        filename = file_id.split(":", 1)[1] if ":" in file_id else "primary_doc.xml"
        if not adsh:
            continue
        url = f"https://www.sec.gov/Archives/edgar/data/{cik}/{adsh}/{filename}"
        try:
            raw = client.request(url, headers={"Accept": "application/xml"}, retries=4)
        except Exception:
            continue
        text = raw if isinstance(raw, str) else ""
        parsed = parse_13f_signature(text)
        if not parsed.get("name"):
            continue
        org_name = parsed.get("org_name") or filing.get("org_name") or ""
        people.append(
            {
                "name": parsed["name"],
                "title": parsed.get("title") or "Chief Investment Officer",
                "org_name": org_name,
                "org_type": filing.get("org_type"),
                "org_key": filing.get("org_key") or normalize_org(org_name),
                "country": "US",
                "source": "sec_13f",
                "source_url": url,
                "status": "discovered",
                "extra_json": {"cik": filing.get("cik"), "adsh": filing.get("adsh"), "file_date": filing.get("file_date")},
            }
        )
    return people


def parse_13f_signature(xml_text: str) -> dict[str, str]:
    if not xml_text or "<" not in xml_text:
        return {}
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return {}
    name = title = org_name = ""
    for parent in root.iter():
        tag = parent.tag.rsplit("}", 1)[-1]
        if tag == "filingManager":
            for child in parent:
                if child.tag.rsplit("}", 1)[-1] == "name" and child.text:
                    org_name = clean_filer_name(child.text)
        if tag == "signatureBlock":
            for child in parent:
                local = child.tag.rsplit("}", 1)[-1]
                if local == "name" and child.text:
                    name = child.text.strip()
                if local == "title" and child.text:
                    title = child.text.strip()
    return {"name": name, "title": title, "org_name": org_name}


def fetch_iapd(client: HttpClient, queries: list[str] | None = None) -> dict[str, list[dict[str, Any]]]:
    queries = queries or [
        "family office",
        "sovereign",
        "pension",
        "private equity",
        "endowment",
        "teachers retirement",
        "superannuation",
        "sovereign wealth",
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
