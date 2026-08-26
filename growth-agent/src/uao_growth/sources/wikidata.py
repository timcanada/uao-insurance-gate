from __future__ import annotations

from typing import Any
from urllib.parse import quote

from uao_growth.http import HttpClient, encode_query
from uao_growth.normalize import normalize_org

SPARQL = "https://query.wikidata.org/sparql"
WIKI_API = "https://www.wikidata.org/w/api.php"

# Q1061648 = sovereign wealth fund; Q182103 = pension fund.
# Country finance-minister posts are usually *subclasses* of Q7614320, not instances.
QUERIES = {
    "swf": """
        SELECT ?item ?itemLabel ?countryLabel ?website ?ceoLabel WHERE {
          ?item wdt:P31/wdt:P279* wd:Q1061648 .
          OPTIONAL { ?item wdt:P17 ?country. }
          OPTIONAL { ?item wdt:P856 ?website. }
          OPTIONAL { ?item wdt:P169 ?ceo. }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 250
    """,
    "pension": """
        SELECT ?item ?itemLabel ?countryLabel ?website WHERE {
          ?item wdt:P31/wdt:P279* wd:Q182103 .
          OPTIONAL { ?item wdt:P17 ?country. }
          OPTIONAL { ?item wdt:P856 ?website. }
          ?item wikibase:sitelinks ?links .
          FILTER(?links >= 6)
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 250
    """,
    "finance_minister": """
        SELECT DISTINCT ?person ?personLabel ?countryLabel ?positionLabel WHERE {
          {
            ?position wdt:P279* wd:Q7614320 .
          } UNION {
            VALUES ?position { wd:Q14465706 wd:Q531471 wd:Q22575092 }
          }
          ?person p:P39 ?stmt .
          ?stmt ps:P39 ?position .
          ?stmt a wikibase:BestRank .
          FILTER NOT EXISTS { ?stmt pq:P582 ?end }
          FILTER NOT EXISTS { ?person wdt:P570 ?dod }
          OPTIONAL { ?position wdt:P17 ?country }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 400
    """,
}

LEADERSHIP_PROPS = {
    "P169": "Chief Executive Officer",
    "P488": "Chairperson",
    "P1037": "Director",
    "P3320": "Board member",
}


def _bindings(payload: dict[str, Any]) -> list[dict[str, str]]:
    rows = []
    for binding in payload.get("results", {}).get("bindings", []):
        rows.append({key: value.get("value", "") for key, value in binding.items()})
    return rows


def _label(entity: dict[str, Any]) -> str:
    labels = entity.get("labels") or {}
    english = labels.get("en") or {}
    return english.get("value") or ""


def _qid(claim: dict[str, Any]) -> str | None:
    try:
        value = claim["mainsnak"]["datavalue"]["value"]
        return value.get("id")
    except (KeyError, TypeError):
        return None


def fetch_wikidata(client: HttpClient, seed_names: list[str] | None = None) -> dict[str, list[dict[str, Any]]]:
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
            continue
        org_type = "swf" if kind == "swf" else "pension"
        for row in rows:
            name = row.get("itemLabel") or ""
            if not name or (name.startswith("Q") and name[1:].isdigit()):
                continue
            orgs.append(
                {
                    "name": name,
                    "org_key": normalize_org(name),
                    "org_type": org_type,
                    "country": row.get("countryLabel"),
                    "domain": row.get("website") or "",
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
    if seed_names:
        people.extend(leadership_for_names(client, seed_names[:40]))
    return {"organizations": orgs, "people": people}


def leadership_for_names(client: HttpClient, names: list[str]) -> list[dict[str, Any]]:
    people: list[dict[str, Any]] = []
    for name in names:
        search = client.get_json(
            encode_query(
                WIKI_API,
                {
                    "action": "wbsearchentities",
                    "search": name,
                    "language": "en",
                    "format": "json",
                    "limit": 1,
                },
            )
        )
        hits = (search or {}).get("search") if isinstance(search, dict) else []
        if not hits:
            continue
        qid = hits[0].get("id")
        if not qid:
            continue
        entity_payload = client.get_json(
            encode_query(
                WIKI_API,
                {
                    "action": "wbgetentities",
                    "ids": qid,
                    "props": "claims|labels",
                    "languages": "en",
                    "format": "json",
                },
            )
        )
        entity = ((entity_payload or {}).get("entities") or {}).get(qid) or {}
        claims = entity.get("claims") or {}
        org_label = _label(entity) or name
        for prop, title in LEADERSHIP_PROPS.items():
            if prop == "P3320":
                continue
            for claim in claims.get(prop) or []:
                person_id = _qid(claim)
                if not person_id:
                    continue
                person_payload = client.get_json(
                    encode_query(
                        WIKI_API,
                        {
                            "action": "wbgetentities",
                            "ids": person_id,
                            "props": "labels",
                            "languages": "en",
                            "format": "json",
                        },
                    )
                )
                person_entity = ((person_payload or {}).get("entities") or {}).get(person_id) or {}
                person_name = _label(person_entity)
                if not person_name:
                    continue
                people.append(
                    {
                        "name": person_name,
                        "title": title,
                        "org_name": org_label,
                        "org_type": "swf",
                        "org_key": normalize_org(org_label),
                        "source": "wikidata",
                        "source_url": f"https://www.wikidata.org/wiki/{person_id}",
                        "status": "discovered",
                        "extra_json": {"org_qid": qid, "person_qid": person_id},
                    }
                )
    return people


def entity_url(qid: str) -> str:
    return f"https://www.wikidata.org/wiki/{quote(qid)}"
