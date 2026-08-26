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
    "swf_leaders": """
        SELECT DISTINCT ?person ?personLabel ?orgLabel ?countryLabel ?role WHERE {
          ?org wdt:P31/wdt:P279* wd:Q1061648 .
          {
            ?org wdt:P169 ?person . BIND("Chief Executive Officer" AS ?role)
          } UNION {
            ?org wdt:P488 ?person . BIND("Chairperson" AS ?role)
          } UNION {
            ?org wdt:P1037 ?person . BIND("Director" AS ?role)
          }
          FILTER NOT EXISTS { ?person wdt:P570 ?dod }
          OPTIONAL { ?org wdt:P17 ?country }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 400
    """,
    "pension_leaders": """
        SELECT DISTINCT ?person ?personLabel ?orgLabel ?countryLabel ?role WHERE {
          ?org wdt:P31/wdt:P279* wd:Q182103 .
          {
            ?org wdt:P169 ?person . BIND("Chief Executive Officer" AS ?role)
          } UNION {
            ?org wdt:P488 ?person . BIND("Chairperson" AS ?role)
          } UNION {
            ?org wdt:P1037 ?person . BIND("Director" AS ?role)
          }
          FILTER NOT EXISTS { ?person wdt:P570 ?dod }
          OPTIONAL { ?org wdt:P17 ?country }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 400
    """,
    "central_bank": """
        SELECT DISTINCT ?person ?personLabel ?orgLabel ?countryLabel WHERE {
          ?org wdt:P31/wdt:P279* wd:Q66344 .
          ?org wdt:P169 ?person .
          FILTER NOT EXISTS { ?person wdt:P570 ?dod }
          OPTIONAL { ?org wdt:P17 ?country }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 250
    """,
    "cio": """
        SELECT DISTINCT ?person ?personLabel ?orgLabel ?countryLabel WHERE {
          ?person wdt:P106 wd:Q1072304 .
          ?person wdt:P108 ?org .
          FILTER NOT EXISTS { ?person wdt:P570 ?dod }
          OPTIONAL { ?org wdt:P17 ?country }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        LIMIT 300
    """,
}

PEOPLE_QUERIES = {
    "finance_minister",
    "swf_leaders",
    "pension_leaders",
    "central_bank",
    "cio",
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


def fetch_wikidata(
    client: HttpClient,
    seed_names: list[str] | None = None,
    seed_orgs: list[dict[str, Any]] | None = None,
) -> dict[str, list[dict[str, Any]]]:
    orgs: list[dict[str, Any]] = []
    people: list[dict[str, Any]] = []
    for kind, query in QUERIES.items():
        url = encode_query(SPARQL, {"query": query, "format": "json"})
        try:
            payload = client.get_json(
                url,
                headers={"Accept": "application/sparql-results+json"},
                retries=2,
            )
        except Exception:
            continue
        rows = _bindings(payload if isinstance(payload, dict) else {})
        if kind in PEOPLE_QUERIES:
            people.extend(_people_from_leader_rows(kind, rows))
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
    seeds = seed_orgs or [{"name": name} for name in (seed_names or [])]
    if seeds:
        people.extend(leadership_for_orgs(client, seeds[:120]))
    people.extend(_cios_from_cirrus(client))
    return {"organizations": orgs, "people": people}


def _people_from_leader_rows(kind: str, rows: list[dict[str, str]]) -> list[dict[str, Any]]:
    people: list[dict[str, Any]] = []
    for row in rows:
        name = row.get("personLabel") or ""
        if not name or name.startswith("http") or (name.startswith("Q") and name[1:].isdigit()):
            continue
        country = row.get("countryLabel") or ""
        if kind == "finance_minister":
            title = row.get("positionLabel") or "Minister of Finance"
            org_name = f"Government of {country}" if country else "National government"
            org_type = "government"
        elif kind == "central_bank":
            title = "Governor"
            org_name = row.get("orgLabel") or "Central bank"
            org_type = "government"
        elif kind == "cio":
            title = "Chief Investment Officer"
            org_name = row.get("orgLabel") or ""
            org_type = "pension"
        else:
            title = row.get("role") or "Chief Executive Officer"
            org_name = row.get("orgLabel") or ""
            org_type = "swf" if kind == "swf_leaders" else "pension"
        if not org_name:
            continue
        people.append(
            {
                "name": name,
                "title": title,
                "org_name": org_name,
                "org_type": org_type,
                "org_key": normalize_org(org_name),
                "country": country,
                "source": "wikidata",
                "source_url": row.get("person"),
                "status": "discovered",
                "extra_json": {"wikidata": row.get("person"), "query": kind},
            }
        )
    return people


def leadership_for_names(client: HttpClient, names: list[str]) -> list[dict[str, Any]]:
    return leadership_for_orgs(client, [{"name": name} for name in names])


def leadership_for_orgs(client: HttpClient, orgs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    wanted: list[tuple[str, str, str]] = []
    for org in orgs:
        name = org.get("name") or ""
        if not name:
            continue
        qid = org.get("external_id") or org.get("wikidata") or ""
        if not str(qid).startswith("Q"):
            qid = _search_qid(client, name) or ""
        if qid:
            wanted.append((name, str(qid), org.get("org_type") or org.get("type") or "swf"))
    if not wanted:
        return []
    entities = _get_entities(client, [qid for _, qid, _ in wanted], "claims|labels")
    person_ids: list[str] = []
    jobs: list[tuple[str, str, str, str, str]] = []
    for seed_name, qid, org_type in wanted:
        entity = entities.get(qid) or {}
        claims = entity.get("claims") or {}
        org_label = _label(entity) or seed_name
        for prop, title in LEADERSHIP_PROPS.items():
            if prop == "P3320":
                continue
            for claim in claims.get(prop) or []:
                person_id = _qid(claim)
                if not person_id:
                    continue
                person_ids.append(person_id)
                jobs.append((person_id, title, org_label, org_type, qid))
    people_entities = _get_entities(client, list(dict.fromkeys(person_ids)), "labels")
    people: list[dict[str, Any]] = []
    for person_id, title, org_label, org_type, qid in jobs:
        person_name = _label(people_entities.get(person_id) or {})
        if not person_name:
            continue
        people.append(
            {
                "name": person_name,
                "title": title,
                "org_name": org_label,
                "org_type": org_type,
                "org_key": normalize_org(org_label),
                "source": "wikidata",
                "source_url": f"https://www.wikidata.org/wiki/{person_id}",
                "status": "discovered",
                "extra_json": {"org_qid": qid, "person_qid": person_id},
            }
        )
    return people


def _search_qid(client: HttpClient, name: str) -> str | None:
    try:
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
    except Exception:
        return None
    hits = (search or {}).get("search") if isinstance(search, dict) else []
    if not hits:
        return None
    return hits[0].get("id")


def _get_entities(client: HttpClient, qids: list[str], props: str) -> dict[str, Any]:
    entities: dict[str, Any] = {}
    unique = [qid for qid in qids if qid]
    for index in range(0, len(unique), 50):
        chunk = unique[index : index + 50]
        try:
            payload = client.get_json(
                encode_query(
                    WIKI_API,
                    {
                        "action": "wbgetentities",
                        "ids": "|".join(chunk),
                        "props": props,
                        "languages": "en",
                        "format": "json",
                    },
                )
            )
        except Exception:
            continue
        entities.update((payload or {}).get("entities") or {})
    return entities


def _cios_from_cirrus(client: HttpClient) -> list[dict[str, Any]]:
    try:
        payload = client.get_json(
            encode_query(
                WIKI_API,
                {
                    "action": "query",
                    "list": "search",
                    "srsearch": "haswbstatement:P106=Q1072304",
                    "format": "json",
                    "srlimit": 50,
                },
            )
        )
    except Exception:
        return []
    qids = [hit.get("title") for hit in ((payload or {}).get("query") or {}).get("search") or [] if hit.get("title")]
    entities = _get_entities(client, qids, "labels|claims")
    employer_ids: list[str] = []
    rows: list[tuple[str, str, str]] = []
    for qid, entity in entities.items():
        name = _label(entity)
        if not name:
            continue
        claims = entity.get("claims") or {}
        employers = claims.get("P108") or []
        employer_id = _qid(employers[0]) if employers else None
        if employer_id:
            employer_ids.append(employer_id)
        rows.append((qid, name, employer_id or ""))
    employers = _get_entities(client, employer_ids, "labels")
    people: list[dict[str, Any]] = []
    for qid, name, employer_id in rows:
        org_name = _label(employers.get(employer_id) or {}) if employer_id else ""
        if not org_name:
            continue
        people.append(
            {
                "name": name,
                "title": "Chief Investment Officer",
                "org_name": org_name,
                "org_type": "pension",
                "org_key": normalize_org(org_name),
                "source": "wikidata",
                "source_url": f"https://www.wikidata.org/wiki/{qid}",
                "status": "discovered",
                "extra_json": {"person_qid": qid, "query": "cio_cirrus"},
            }
        )
    return people


def entity_url(qid: str) -> str:
    return f"https://www.wikidata.org/wiki/{quote(qid)}"
