"""Optional Ghost Admin API pull for the live member suppression list."""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
import time
from typing import Any

from uao_growth.http import HttpClient
from uao_growth.normalize import email_hash, normalize_email, normalize_name, person_org_key
from uao_growth.store import Store, utcnow


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def ghost_jwt(admin_api_key: str) -> str:
    key_id, secret_hex = admin_api_key.split(":", 1)
    header = _b64(json.dumps({"alg": "HS256", "typ": "JWT", "kid": key_id}).encode())
    now = int(time.time())
    payload = _b64(json.dumps({"iat": now, "exp": now + 300, "aud": "/admin/"}).encode())
    signing_input = f"{header}.{payload}".encode()
    secret = bytes.fromhex(secret_hex)
    signature = _b64(hmac.new(secret, signing_input, hashlib.sha256).digest())
    return f"{header}.{payload}.{signature}"


def pull_ghost_members(store: Store, http: HttpClient, ghost_url: str, admin_api_key: str) -> dict[str, int]:
    token = ghost_jwt(admin_api_key)
    headers = {"Authorization": f"Ghost {token}"}
    page = 1
    inserted = 0
    updated = 0
    now = utcnow()
    while True:
        payload = http.get_json(
            f"{ghost_url}/ghost/api/admin/members/?limit=100&page={page}",
            headers=headers,
        )
        members = (payload or {}).get("members") if isinstance(payload, dict) else None
        if not members:
            break
        for member in members:
            email = normalize_email(member.get("email"))
            if not email:
                continue
            name = member.get("name") or ""
            labels = ",".join(
                label.get("name", "")
                for label in member.get("labels") or []
                if isinstance(label, dict)
            )
            row = store.fetchone("SELECT id FROM members WHERE email = ?", (email,))
            values: tuple[Any, ...] = (
                email_hash(email),
                name or None,
                normalize_name(name) or None,
                None,
                None,
                person_org_key(name, None) or None,
                None,
                labels or None,
                "ghost_api",
                now,
                email,
            )
            if row:
                store.execute(
                    """
                    UPDATE members
                    SET email_hash=?, name=?, name_key=?, org_name=?, org_key=?,
                        person_org_key=?, linkedin_key=?, labels=?, source=?, imported_at=?
                    WHERE email=?
                    """,
                    values,
                )
                updated += 1
            else:
                store.execute(
                    """
                    INSERT INTO members
                    (email_hash, name, name_key, org_name, org_key, person_org_key,
                     linkedin_key, labels, source, imported_at, email)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    values,
                )
                inserted += 1
        meta = (payload or {}).get("meta", {}).get("pagination", {})
        if page >= int(meta.get("pages") or 1):
            break
        page += 1
        token = ghost_jwt(admin_api_key)
        headers = {"Authorization": f"Ghost {token}"}
    store.commit()
    return {"inserted": inserted, "updated": updated, "total": store.count("members")}
