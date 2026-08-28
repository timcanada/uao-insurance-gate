"""Hard exclusion of current members. These people are never sourced or exported."""

from __future__ import annotations

import csv
from pathlib import Path
from typing import Any, Iterable

from uao_growth.normalize import (
    email_hash,
    linkedin_key,
    normalize_email,
    normalize_name,
    normalize_org,
    person_org_key,
)
from uao_growth.store import Store, utcnow

EMAIL_FIELDS = ("email", "e-mail", "email address", "work email", "member email")
NAME_FIELDS = ("name", "full name", "fullname", "member name")
FIRST_FIELDS = ("first_name", "first name", "firstname")
LAST_FIELDS = ("last_name", "last name", "lastname")
ORG_FIELDS = ("organization", "organisation", "company", "org", "employer")
LABEL_FIELDS = ("labels", "label", "tags", "tier")
LINKEDIN_FIELDS = ("linkedin", "linkedin_url", "linkedin url")


def _header_map(fieldnames: list[str] | None) -> dict[str, str]:
    mapping = {}
    for raw in fieldnames or []:
        mapping[raw.strip().lower()] = raw
    return mapping


def _pick(row: dict[str, str], aliases: tuple[str, ...], headers: dict[str, str]) -> str:
    for alias in aliases:
        key = headers.get(alias)
        if key and row.get(key):
            return str(row[key]).strip()
    return ""


def iter_member_rows(path: Path) -> Iterable[dict[str, str]]:
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        headers = _header_map(reader.fieldnames)
        if not any(alias in headers for alias in EMAIL_FIELDS):
            raise ValueError(
                f"{path} has no email column. Found: {reader.fieldnames}"
            )
        for row in reader:
            email = normalize_email(_pick(row, EMAIL_FIELDS, headers))
            if not email or "@" not in email:
                continue
            first = _pick(row, FIRST_FIELDS, headers)
            last = _pick(row, LAST_FIELDS, headers)
            name = _pick(row, NAME_FIELDS, headers) or " ".join(p for p in (first, last) if p)
            yield {
                "email": email,
                "name": name,
                "org_name": _pick(row, ORG_FIELDS, headers),
                "labels": _pick(row, LABEL_FIELDS, headers),
                "linkedin": _pick(row, LINKEDIN_FIELDS, headers),
            }


def import_members(store: Store, path: Path, source: str = "ghost_csv") -> dict[str, int]:
    inserted = 0
    updated = 0
    now = utcnow()
    with store.transaction():
        for row in iter_member_rows(path):
            payload = (
                row["email"],
                email_hash(row["email"]),
                row["name"] or None,
                normalize_name(row["name"]) or None,
                row["org_name"] or None,
                normalize_org(row["org_name"]) or None,
                person_org_key(row["name"], row["org_name"]) or None,
                linkedin_key(row["linkedin"]) or None,
                row["labels"] or None,
                source,
                now,
            )
            existing = store.fetchone("SELECT id FROM members WHERE email = ?", (row["email"],))
            if existing:
                store.execute(
                    """
                    UPDATE members
                    SET email_hash=?, name=?, name_key=?, org_name=?, org_key=?,
                        person_org_key=?, linkedin_key=?, labels=?, source=?, imported_at=?
                    WHERE email=?
                    """,
                    payload[1:] + (row["email"],),
                )
                updated += 1
            else:
                store.execute(
                    """
                    INSERT INTO members
                    (email, email_hash, name, name_key, org_name, org_key,
                     person_org_key, linkedin_key, labels, source, imported_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    payload,
                )
                inserted += 1
    store.commit()
    return {"inserted": inserted, "updated": updated, "total": store.count("members")}


class SuppressionIndex:
    def __init__(self, store: Store):
        self.emails = {row["email"] for row in store.fetchall("SELECT email FROM members")}
        self.hashes = {row["email_hash"] for row in store.fetchall("SELECT email_hash FROM members")}
        self.person_org = {
            row["person_org_key"]
            for row in store.fetchall(
                "SELECT person_org_key FROM members WHERE person_org_key IS NOT NULL AND person_org_key != ''"
            )
        }
        self.linkedin = {
            row["linkedin_key"]
            for row in store.fetchall(
                "SELECT linkedin_key FROM members WHERE linkedin_key IS NOT NULL AND linkedin_key != ''"
            )
        }
        self.name_keys = {
            row["name_key"]
            for row in store.fetchall(
                "SELECT name_key FROM members WHERE name_key IS NOT NULL AND name_key != ''"
            )
        }

    def match(self, person: dict[str, Any]) -> str | None:
        email = normalize_email(person.get("email"))
        if email and email in self.emails:
            return "email"
        hashed = person.get("email_hash") or email_hash(email)
        if hashed and hashed in self.hashes:
            return "email_hash"
        li = person.get("linkedin_key") or linkedin_key(person.get("linkedin_url"))
        if li and li in self.linkedin:
            return "linkedin"
        key = person.get("person_org_key") or person_org_key(person.get("name"), person.get("org_name"))
        if key and key in self.person_org:
            return "name_org"
        name_key = person.get("name_key") or normalize_name(person.get("name"))
        if name_key and " " in name_key and name_key in self.name_keys:
            return "name"
        return None

    def __len__(self) -> int:
        return len(self.emails)
