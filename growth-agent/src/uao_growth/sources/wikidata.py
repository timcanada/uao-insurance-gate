from __future__ import annotations

from typing import Any

from uao_growth.http import HttpClient, encode_query
from uao_growth.normalize import normalize_org

SPARQL = "https://query.wikidata.org/sparql"

QUERIES = {
    "swf": """
        SELECT ?item ?itemLabel ?countryLabel ?inception ?website ?ceoLabel WHERE {
          ?item wdt:P31/wdt:P279* wd:Q1076818 .
          OPTIONAL { ?item wdt:P17 ?country. }
          OPTIONAL { ?item wdt:P571 ?inception. }
          OPTIONAL { ?item wdt:P856 ?website. }
          OPTIONAL { ?item wdt:P169 ?ceo. }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 200
    """,
    "pension": """
        SELECT ?item ?itemLabel ?countryLabel ?website WHERE {
          ?item wdt:P31/wdt:P279* wd:Q1551796 .
          OPTIONAL { ?item wdt:P17 ?country. }
          OPTIONAL { ?item wdt:P856 ?website. }
          ?item wikibase:sitelinks ?links .
          FILTER(?links >= 8)
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 200
    """,
    "finance_minister": """
        SELECT ?person ?personLabel ?countryLabel ?positionLabel WHERE {
          ?person p:P39 ?stmt .
          ?stmt ps:P39 ?position .
          ?position wdt:P31/wdt:P279* wd:Q7614320 .
          FILTER NOT EXISTS { ?stmt pq:P582 ?end. }
          OPTIONAL { ?position wdt:P17 ?country. }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 250
    """,
}


def _bindings(payload: dict[str, Any]) -> list[dict[str, str]]:
    rows = []
    for binding in payload.get("results", {}).get("bindings", []):
        rows.append({key: value.get("value", "") for key, value in binding.items()})
    return rows


def fetch_wikidata(client: HttpClient) -> dict[str, list[dict[str, Any]]]:
    orgs: list[dict[str, Any]] = []
    people: list[dict[str, Any]] = []
    for kind, query in QUERIES.items():
        url = encode_query(SPARQL, {"query": query, "format": "json"})
        payload = client.get_json(
            url,
            headers={"Accept": "application/sparql-results+json"},
        )
        rows = _bindings(payload if isinstance(payload, dict) else {})
        if kind == "finance_minister":
            for row in rows:
                name = row.get("personLabel") or ""
                if not name or name.startswith("http"):
                    continue
                country = row.get("countryLabel") or ""
                title = row.get("positionLabel") or "Minister of Finance"
                people.append(
                    {
                        "name": name,
                        "title": title,
                        "org_name": f"Government of {country}" if country else "National government",
                        "org_type": "government",
                        "org_key": normalize_org(f"government {country}"),
                        "country": country,
                        "source": "wikidata",
                        "source_url": row.get("person"),
                        "status": "discovered",
                        "extra_json": {"wikidata": row.get("person")},
                    }
                )
        else:
            org_type = "swf" if kind == "swf" else "pension"
            for row in rows:
                name = row.get("itemLabel") or ""
                if not name or name.startswith("Q") and name[1:].isdigit():
                    continue
                website = row.get("website") or ""
                orgs.append(
                    {
                        "name": name,
                        "org_key": normalize_org(name),
                        "org_type": org_type,
                        "country": row.get("countryLabel"),
                        "domain": website,
                        "source": "wikidata",
                        "source_url": row.get("item"),
                        "external_id": row.get("item"),
                        "priority": 70 if org_type == "swf" else 60,
                    }
                )
                ceo = row.get("ceoLabel")
                if ceo and not ceo.startswith("http"):
                    people.append(
                        {
                            "name": ceo,
                            "title": "Chief Executive Officer",
                            "org_name": name,
                            "org_type": org_type,
                            "org_key": normalize_org(name),
                            "country": row.get("countryLabel"),
                            "source": "wikidata",
                            "source_url": row.get("item"),
                            "status": "discovered",
                        }
                    )
    return {"organizations": orgs, "people": people}
