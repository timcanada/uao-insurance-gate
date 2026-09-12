from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator

SCHEMA = """
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    email_hash TEXT NOT NULL,
    name TEXT,
    name_key TEXT,
    org_name TEXT,
    org_key TEXT,
    person_org_key TEXT,
    linkedin_key TEXT,
    labels TEXT,
    source TEXT NOT NULL,
    imported_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_members_hash ON members(email_hash);
CREATE INDEX IF NOT EXISTS idx_members_name_org ON members(person_org_key);
CREATE INDEX IF NOT EXISTS idx_members_linkedin ON members(linkedin_key);

CREATE TABLE IF NOT EXISTS organizations (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    org_key TEXT NOT NULL,
    org_type TEXT,
    country TEXT,
    domain TEXT,
    source TEXT NOT NULL,
    source_url TEXT,
    external_id TEXT,
    priority INTEGER NOT NULL DEFAULT 50,
    extra_json TEXT,
    created_at TEXT NOT NULL,
    UNIQUE(org_key, source)
);
CREATE INDEX IF NOT EXISTS idx_orgs_type ON organizations(org_type);

CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY,
    name TEXT,
    name_key TEXT,
    first_name TEXT,
    last_name TEXT,
    title TEXT,
    seniority INTEGER NOT NULL DEFAULT 0,
    seniority_tier TEXT,
    fit_score INTEGER NOT NULL DEFAULT 0,
    org_id INTEGER,
    org_name TEXT,
    org_type TEXT,
    org_key TEXT,
    person_org_key TEXT,
    country TEXT,
    email TEXT,
    email_hash TEXT,
    email_status TEXT,
    linkedin_url TEXT,
    linkedin_key TEXT,
    apollo_id TEXT,
    source TEXT NOT NULL,
    source_url TEXT,
    status TEXT NOT NULL,
    member_match TEXT,
    extra_json TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_people_email_hash ON people(email_hash);
CREATE INDEX IF NOT EXISTS idx_people_person_org ON people(person_org_key);
CREATE INDEX IF NOT EXISTS idx_people_status ON people(status);
CREATE INDEX IF NOT EXISTS idx_people_seniority ON people(seniority);

CREATE TABLE IF NOT EXISTS source_weights (
    source TEXT PRIMARY KEY,
    weight REAL NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    kept INTEGER NOT NULL DEFAULT 0,
    suppressed INTEGER NOT NULL DEFAULT 0,
    converted INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS title_weights (
    pattern TEXT PRIMARY KEY,
    weight REAL NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    converted INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS runs (
    id INTEGER PRIMARY KEY,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    command TEXT NOT NULL,
    stats_json TEXT
);
"""


def utcnow() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


class Store:
    def __init__(self, path: Path):
        self.path = Path(path)
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self._conn = sqlite3.connect(self.path)
        self._conn.row_factory = sqlite3.Row
        self._conn.execute("PRAGMA foreign_keys = ON")
        self._conn.executescript(SCHEMA)
        self._conn.commit()

    def close(self) -> None:
        self._conn.close()

    @contextmanager
    def transaction(self) -> Iterator[sqlite3.Connection]:
        try:
            yield self._conn
            self._conn.commit()
        except Exception:
            self._conn.rollback()
            raise

    def execute(self, sql: str, params: tuple[Any, ...] = ()) -> sqlite3.Cursor:
        return self._conn.execute(sql, params)

    def executemany(self, sql: str, rows: list[tuple[Any, ...]]) -> sqlite3.Cursor:
        return self._conn.executemany(sql, rows)

    def commit(self) -> None:
        self._conn.commit()

    def fetchall(self, sql: str, params: tuple[Any, ...] = ()) -> list[sqlite3.Row]:
        return list(self._conn.execute(sql, params).fetchall())

    def fetchone(self, sql: str, params: tuple[Any, ...] = ()) -> sqlite3.Row | None:
        return self._conn.execute(sql, params).fetchone()

    def count(self, table: str, where: str = "1=1", params: tuple[Any, ...] = ()) -> int:
        row = self.fetchone(f"SELECT COUNT(*) AS n FROM {table} WHERE {where}", params)
        return int(row["n"]) if row else 0

    def upsert_org(self, org: dict[str, Any]) -> int:
        existing = self.fetchone(
            "SELECT id FROM organizations WHERE org_key = ? AND source = ?",
            (org["org_key"], org["source"]),
        )
        now = utcnow()
        extra = org.get("extra_json")
        if isinstance(extra, dict):
            extra = json.dumps(extra, sort_keys=True)
        if existing:
            self.execute(
                """
                UPDATE organizations
                SET name=?, org_type=?, country=?, domain=?, source_url=?,
                    external_id=?, priority=?, extra_json=?
                WHERE id=?
                """,
                (
                    org["name"],
                    org.get("org_type"),
                    org.get("country"),
                    org.get("domain"),
                    org.get("source_url"),
                    org.get("external_id"),
                    org.get("priority", 50),
                    extra,
                    existing["id"],
                ),
            )
            self.commit()
            return int(existing["id"])
        cur = self.execute(
            """
            INSERT INTO organizations
            (name, org_key, org_type, country, domain, source, source_url,
             external_id, priority, extra_json, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                org["name"],
                org["org_key"],
                org.get("org_type"),
                org.get("country"),
                org.get("domain"),
                org["source"],
                org.get("source_url"),
                org.get("external_id"),
                org.get("priority", 50),
                extra,
                now,
            ),
        )
        self.commit()
        return int(cur.lastrowid)

    def insert_person(self, person: dict[str, Any]) -> int:
        now = utcnow()
        extra = person.get("extra_json")
        if isinstance(extra, dict):
            extra = json.dumps(extra, sort_keys=True)
        cur = self.execute(
            """
            INSERT INTO people
            (name, name_key, first_name, last_name, title, seniority, seniority_tier,
             fit_score, org_id, org_name, org_type, org_key, person_org_key, country,
             email, email_hash, email_status, linkedin_url, linkedin_key, apollo_id,
             source, source_url, status, member_match, extra_json, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                person.get("name"),
                person.get("name_key"),
                person.get("first_name"),
                person.get("last_name"),
                person.get("title"),
                person.get("seniority", 0),
                person.get("seniority_tier"),
                person.get("fit_score", 0),
                person.get("org_id"),
                person.get("org_name"),
                person.get("org_type"),
                person.get("org_key"),
                person.get("person_org_key"),
                person.get("country"),
                person.get("email"),
                person.get("email_hash"),
                person.get("email_status"),
                person.get("linkedin_url"),
                person.get("linkedin_key"),
                person.get("apollo_id"),
                person["source"],
                person.get("source_url"),
                person.get("status", "discovered"),
                person.get("member_match"),
                extra,
                now,
                now,
            ),
        )
        self.commit()
        return int(cur.lastrowid)

    def update_person(self, person_id: int, **fields: Any) -> None:
        if not fields:
            return
        fields["updated_at"] = utcnow()
        if "extra_json" in fields and isinstance(fields["extra_json"], dict):
            fields["extra_json"] = json.dumps(fields["extra_json"], sort_keys=True)
        assignments = ", ".join(f"{key}=?" for key in fields)
        values = list(fields.values()) + [person_id]
        self.execute(f"UPDATE people SET {assignments} WHERE id=?", tuple(values))
        self.commit()

    def bump_source(self, source: str, *, attempts: int = 0, kept: int = 0, suppressed: int = 0, converted: int = 0) -> None:
        now = utcnow()
        row = self.fetchone("SELECT * FROM source_weights WHERE source=?", (source,))
        if not row:
            self.execute(
                """
                INSERT INTO source_weights
                (source, weight, attempts, kept, suppressed, converted, updated_at)
                VALUES (?, 1.0, ?, ?, ?, ?, ?)
                """,
                (source, attempts, kept, suppressed, converted, now),
            )
        else:
            self.execute(
                """
                UPDATE source_weights
                SET attempts = attempts + ?,
                    kept = kept + ?,
                    suppressed = suppressed + ?,
                    converted = converted + ?,
                    updated_at = ?
                WHERE source = ?
                """,
                (attempts, kept, suppressed, converted, now, source),
            )
        self.commit()

    def source_weight(self, source: str) -> float:
        row = self.fetchone("SELECT weight FROM source_weights WHERE source=?", (source,))
        return float(row["weight"]) if row else 1.0
