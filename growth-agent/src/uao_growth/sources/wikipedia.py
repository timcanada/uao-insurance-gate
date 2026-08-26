"""Named leaders from Wikipedia via the official MediaWiki API.

Used for public-only inventory. No emails are taken from these pages.
"""

from __future__ import annotations

import re
from typing import Any

from uao_growth.http import HttpClient, encode_query
from uao_growth.normalize import normalize_org

WIKI_API = "https://en.wikipedia.org/w/api.php"
MINISTER_PAGE = "List of current finance ministers"

WIKILINK = re.compile(r"\[\[([^\[\]]+)\]\]")
REF = re.compile(r"<ref\b[^>]*>.*?</ref>|<ref\b[^/]*/>", re.I | re.S)
COMMENT = re.compile(r"<!--.*?-->", re.S)
CIK_SUFFIX = re.compile(r"\s*\(CIK\s+\d+\)\s*$", re.I)

TITLE_ALIASES = {
    "ceo": "Chief Executive Officer",
    "chief executive": "Chief Executive Officer",
    "chief executive officer": "Chief Executive Officer",
    "cio": "Chief Investment Officer",
    "chief investment officer": "Chief Investment Officer",
    "cfo": "Chief Financial Officer",
    "chief financial officer": "Chief Financial Officer",
    "coo": "Chief Operating Officer",
    "chief operating officer": "Chief Operating Officer",
    "chairman": "Chairperson",
    "chairwoman": "Chairperson",
    "chairperson": "Chairperson",
    "chair": "Chairperson",
    "chairman and ceo": "Chief Executive Officer",
    "chairwoman and ceo": "Chief Executive Officer",
    "president and ceo": "President and CEO",
    "president & ceo": "President and CEO",
    "governor": "Governor",
    "managing director": "Managing Director",
    "executive director": "Executive Director",
    "board president": "Board Chair",
    "chancellor of the exchequer": "Chancellor of the Exchequer",
    "secretary of the treasury": "Secretary of the Treasury",
}

SKIP_PAGES = re.compile(
    r"^(list of|minister of|ministry of|department of|secretary of finance)",
    re.I,
)


def fetch_wikipedia(client: HttpClient, orgs: list[dict[str, Any]] | None = None) -> dict[str, list[dict[str, Any]]]:
    people: list[dict[str, Any]] = []
    try:
        people.extend(fetch_current_ministers(client))
    except Exception:
        pass
    if orgs:
        try:
            people.extend(fetch_org_leaders(client, orgs))
        except Exception:
            pass
    return {"organizations": [], "people": people}


def fetch_current_ministers(client: HttpClient) -> list[dict[str, Any]]:
    payload = client.get_json(
        encode_query(
            WIKI_API,
            {
                "action": "parse",
                "page": MINISTER_PAGE,
                "prop": "wikitext",
                "format": "json",
                "redirects": 1,
            },
        )
    )
    text = ((payload or {}).get("parse") or {}).get("wikitext") or {}
    wikitext = text.get("*") or ""
    return ministers_from_wikitext(wikitext)


def ministers_from_wikitext(wikitext: str) -> list[dict[str, Any]]:
    people: list[dict[str, Any]] = []
    seen: set[str] = set()
    for row in re.split(r"\n\|-\n", wikitext):
        flag = re.search(r"\{\{flag\|([^}|]+)(?:\|name=([^}]+))?", row)
        if not flag:
            continue
        country = (flag.group(2) or flag.group(1)).strip()
        name = _person_from_minister_row(row)
        if not name:
            continue
        key = f"{normalize_org(name)}|{normalize_org(country)}"
        if key in seen:
            continue
        seen.add(key)
        title = "Minister of Finance"
        if re.search(r"\(acting\)", row, re.I):
            title = "Minister of Finance (acting)"
        org_name = f"Government of {country}"
        people.append(
            {
                "name": name,
                "title": title,
                "org_name": org_name,
                "org_type": "government",
                "org_key": normalize_org(org_name),
                "country": country,
                "source": "wikipedia",
                "source_url": f"https://en.wikipedia.org/wiki/{MINISTER_PAGE.replace(' ', '_')}",
                "status": "discovered",
                "extra_json": {"list": MINISTER_PAGE},
            }
        )
    return people


def fetch_org_leaders(client: HttpClient, orgs: list[dict[str, Any]]) -> list[dict[str, Any]]:
    people: list[dict[str, Any]] = []
    for org in orgs:
        name = org.get("name") or ""
        if not name:
            continue
        try:
            title = _search_page(client, name)
            if not title:
                continue
            wikitext = _page_lead(client, title)
            if not wikitext or _is_bad_page(wikitext):
                continue
            people.extend(
                people_from_infobox(
                    wikitext,
                    org_name=name,
                    org_type=org.get("org_type") or org.get("type"),
                    country=org.get("country"),
                    page_title=title,
                )
            )
        except Exception:
            continue
    return people


def people_from_infobox(
    wikitext: str,
    *,
    org_name: str,
    org_type: str | None,
    country: str | None = None,
    page_title: str = "",
) -> list[dict[str, Any]]:
    fields = _infobox_fields(wikitext)
    found: list[tuple[str, str]] = []
    if fields.get("key_people"):
        found.extend(_people_from_key_people(fields["key_people"]))
    for idx in [""] + [str(i) for i in range(1, 10)]:
        leader = fields.get(f"leader_name{idx}")
        title = fields.get(f"leader_title{idx}")
        if leader:
            person = _plain_name(leader)
            role = normalize_title(title) if title else "Chief Executive Officer"
            if person:
                found.append((person, role))
        chief = fields.get(f"chief{idx}_name") if idx else None
        if idx and chief:
            person = _plain_name(chief)
            role = normalize_title(fields.get(f"chief{idx}_position") or "") or "Chief Executive Officer"
            if person:
                found.append((person, role))
    people: list[dict[str, Any]] = []
    seen: set[str] = set()
    for person_name, title in found:
        key = f"{normalize_org(person_name)}|{normalize_org(org_name)}"
        if key in seen or not looks_like_person_name(person_name):
            continue
        seen.add(key)
        people.append(
            {
                "name": person_name,
                "title": title,
                "org_name": org_name,
                "org_type": org_type,
                "org_key": normalize_org(org_name),
                "country": country,
                "source": "wikipedia",
                "source_url": f"https://en.wikipedia.org/wiki/{page_title.replace(' ', '_')}" if page_title else "",
                "status": "discovered",
                "extra_json": {"page": page_title},
            }
        )
    return people


def normalize_title(raw: str | None) -> str:
    text = _plain_name(raw or "")
    folded = re.sub(r"\s+", " ", text).strip().lower()
    folded = folded.replace("[[", "").replace("]]", "")
    if folded in TITLE_ALIASES:
        return TITLE_ALIASES[folded]
    for alias, title in TITLE_ALIASES.items():
        if alias in folded and len(alias) > 3:
            return title
    return text or "Senior Executive"


def looks_like_person_name(name: str) -> bool:
    text = (name or "").strip()
    if len(text) < 4 or len(text) > 90:
        return False
    lowered = text.lower()
    if lowered in {"list", "ceo", "cio", "cfo", "chairman", "n/a", "unknown", "tba", "vacant"}:
        return False
    if "{{" in text or "}}" in text or "|" in text:
        return False
    if not re.search(r"[A-Za-z]", text):
        return False
    tokens = [tok for tok in re.split(r"\s+", text) if tok]
    if len(tokens) < 2:
        return False
    return True


def _search_page(client: HttpClient, name: str) -> str | None:
    payload = client.get_json(
        encode_query(
            WIKI_API,
            {
                "action": "query",
                "list": "search",
                "srsearch": name,
                "srlimit": 3,
                "format": "json",
            },
        )
    )
    hits = ((payload or {}).get("query") or {}).get("search") or []
    for hit in hits:
        title = hit.get("title") or ""
        if "disambiguation" in title.lower():
            continue
        return title
    return None


def _page_lead(client: HttpClient, title: str) -> str:
    payload = client.get_json(
        encode_query(
            WIKI_API,
            {
                "action": "parse",
                "page": title,
                "prop": "wikitext",
                "section": 0,
                "format": "json",
                "redirects": 1,
            },
        )
    )
    text = ((payload or {}).get("parse") or {}).get("wikitext") or {}
    return text.get("*") or ""


def _is_bad_page(wikitext: str) -> bool:
    start = wikitext[:400].lower()
    return "{{disambiguation" in start or "may refer to:" in start


def _infobox_fields(wikitext: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    current: str | None = None
    chunks: list[str] = []
    for line in wikitext.splitlines():
        match = re.match(r"^\|\s*([A-Za-z][A-Za-z0-9_]*)\s*=\s*(.*)$", line)
        if match:
            if current:
                fields[current] = "\n".join(chunks).strip()
            current = match.group(1)
            chunks = [match.group(2)]
        elif current and (line.startswith(" ") or line.startswith("\t") or line.startswith("|")):
            if re.match(r"^\|\s*[A-Za-z]", line):
                fields[current] = "\n".join(chunks).strip()
                current = None
                chunks = []
            else:
                chunks.append(line)
        elif current and not line.startswith("}"):
            chunks.append(line)
        elif current and line.startswith("}}"):
            fields[current] = "\n".join(chunks).strip()
            current = None
            chunks = []
    if current:
        fields[current] = "\n".join(chunks).strip()
    return fields


def _people_from_key_people(value: str) -> list[tuple[str, str]]:
    items = _split_key_people(value)
    found: list[tuple[str, str]] = []
    for item in items:
        item = _plain_name(item)
        if not item:
            continue
        match = re.match(r"(.+?)\s*\((.+)\)\s*$", item)
        if match:
            name = _plain_name(match.group(1))
            title = normalize_title(match.group(2))
        else:
            name = item
            title = "Chief Executive Officer"
        if name:
            found.append((name, title))
    return found


def _split_key_people(value: str) -> list[str]:
    text = COMMENT.sub("", value)
    text = REF.sub("", text)
    template = re.search(
        r"\{\{\s*(ubl|unbulleted[ _]?list|plainlist)\s*\|(.*)\}\}\s*$",
        text,
        re.I | re.S,
    )
    if template:
        return [part.strip() for part in _split_template_args(template.group(2)) if part.strip()]
    text = re.sub(r"<br\s*/?>", "|", text, flags=re.I)
    return [part.strip() for part in re.split(r"\s*\|\s*", text) if part.strip()]


def _split_template_args(body: str) -> list[str]:
    parts: list[str] = []
    buf: list[str] = []
    brace = 0
    square = 0
    index = 0
    while index < len(body):
        if body.startswith("[[", index):
            square += 1
            buf.append("[[")
            index += 2
            continue
        if body.startswith("]]", index):
            square = max(0, square - 1)
            buf.append("]]")
            index += 2
            continue
        char = body[index]
        if char == "{":
            brace += 1
            buf.append(char)
        elif char == "}":
            brace = max(0, brace - 1)
            buf.append(char)
        elif char == "|" and brace == 0 and square == 0:
            parts.append("".join(buf))
            buf = []
        else:
            buf.append(char)
        index += 1
    if buf:
        parts.append("".join(buf))
    return parts


def _person_from_minister_row(row: str) -> str | None:
    inter = re.search(r"\{\{Interlanguage link\|([^|}]+)", row)
    if inter and looks_like_person_name(inter.group(1).strip()):
        return inter.group(1).strip()
    sortname = re.search(r"\{\{Sortname\|([^|}]+)\|([^|}]+)", row)
    if sortname:
        name = f"{sortname.group(1).strip()} {sortname.group(2).strip()}"
        if looks_like_person_name(name):
            return name
    for match in WIKILINK.finditer(row):
        inner = match.group(1)
        page, _, display = inner.partition("|")
        label = (display or page).strip()
        if label.lower() == "list":
            continue
        if SKIP_PAGES.match(page.strip()):
            continue
        if looks_like_person_name(label):
            return label
    return None


def _plain_name(value: str) -> str:
    text = COMMENT.sub("", value or "")
    text = REF.sub("", text)
    text = WIKILINK.sub(lambda m: (m.group(1).split("|")[-1]).strip(), text)
    text = re.sub(r"\{\{[^}]*\}\}", " ", text)
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.replace("'''", "").replace("''", "")
    text = CIK_SUFFIX.sub("", text)
    return re.sub(r"\s+", " ", text).strip(" ,;:-")
