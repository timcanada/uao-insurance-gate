"""Deterministic identity keys used for member suppression."""

from __future__ import annotations

import hashlib
import re
import unicodedata

_HONORIFICS = re.compile(
    r"^\s*(the\s+)?(hon\.?|rt\.?\s*hon\.?|sir|dame|lord|lady|dr\.?|prof\.?|"
    r"mr\.?|mrs\.?|ms\.?|mx\.?)\s+",
    re.I,
)
_SUFFIXES = re.compile(r",?\s+(jr\.?|sr\.?|ii|iii|iv|phd|cfa|caia|frm|mba|esq\.?)\s*$", re.I)
_NON_ALNUM = re.compile(r"[^a-z0-9]+")
_ORG_NOISE = re.compile(
    r"\b(the|inc|incorporated|llc|ltd|limited|plc|corp|corporation|company|"
    r"co|group|holdings|partners|lp|llp|ag|sa|nv|bv|pty|gmbh)\b",
    re.I,
)


def fold(value: str) -> str:
    text = unicodedata.normalize("NFKD", value or "")
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    return text.strip()


def normalize_email(email: str | None) -> str:
    return (email or "").strip().lower()


def email_hash(email: str | None) -> str:
    normalized = normalize_email(email)
    if not normalized:
        return ""
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest()


def email_parts(email: str | None) -> tuple[str, str]:
    normalized = normalize_email(email)
    if "@" not in normalized:
        return "", ""
    local, _, domain = normalized.partition("@")
    return local, domain


def normalize_name(name: str | None) -> str:
    text = fold(name).lower()
    text = _HONORIFICS.sub("", text)
    text = _SUFFIXES.sub("", text)
    text = _NON_ALNUM.sub(" ", text)
    return " ".join(text.split())


def name_tokens(name: str | None) -> list[str]:
    return [tok for tok in normalize_name(name).split() if tok]


def normalize_org(name: str | None) -> str:
    text = fold(name).lower()
    text = _ORG_NOISE.sub(" ", text)
    text = _NON_ALNUM.sub(" ", text)
    return " ".join(text.split())


def normalize_domain(value: str | None) -> str:
    text = (value or "").strip().lower()
    text = re.sub(r"^https?://", "", text)
    text = text.split("/")[0]
    text = text.removeprefix("www.")
    return text


def person_org_key(name: str | None, org: str | None) -> str:
    person = normalize_name(name)
    organization = normalize_org(org)
    if not person:
        return ""
    return f"{person}|{organization}"


def linkedin_key(url: str | None) -> str:
    if not url:
        return ""
    text = url.strip().lower().rstrip("/")
    text = re.sub(r"^https?://(www\.)?", "", text)
    if "linkedin.com/in/" not in text:
        return ""
    slug = text.split("linkedin.com/in/", 1)[1]
    slug = slug.split("?")[0].strip("/")
    return f"linkedin:{slug}"
