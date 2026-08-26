#!/usr/bin/env python3
"""Publish seo-aeo/publish/*.md drafts to Ghost via the Admin API.

Requires:
  GHOST_ADMIN_API_KEY  — custom integration Admin API Key (id:secret)
  GHOST_URL            — optional, default https://www.universalassetowners.com

Usage:
  python3 seo-aeo/tools/publish_to_ghost.py --wave 1
  python3 seo-aeo/tools/publish_to_ghost.py --wave 1 --wave 2 --wave 3 --wave 4 --wave 5 --wave 6 --wave 7 --wave 8 --wave 9 --wave 10 --wave 11 --wave 12 --wave 13 --wave 14 --wave 15 --wave 16 --live
Without --live, posts are created as drafts in Ghost (safe test).
"""

from __future__ import annotations

import argparse
import html
import os
import re
import sys
import time
from pathlib import Path

try:
    import jwt
except ImportError:
    jwt = None

ROOT = Path(__file__).resolve().parents[1]
PUBLISH = ROOT / "publish"
SKIP = {"INDEX.md", "llms-patch.md", "llms-canonical-patch.md", "merge-brief.md"}


def token(admin_key: str) -> str:
    if jwt is None:
        raise SystemExit("Install PyJWT: pip install pyjwt")
    key_id, secret = admin_key.split(":", 1)
    now = int(time.time())
    return jwt.encode(
        {"iat": now, "exp": now + 5 * 60, "aud": "/admin/"},
        bytes.fromhex(secret),
        algorithm="HS256",
        headers={"kid": key_id},
    )


def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    meta: dict[str, str] = {}
    for line in parts[1].splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        meta[k.strip()] = v.strip().strip('"')
    return meta, parts[2].strip()


def md_to_html(md: str) -> str:
    """Small Markdown subset → HTML. Good enough for our drafts."""
    lines = md.splitlines()
    out: list[str] = []
    in_table = False
    in_ul = False
    in_ol = False
    in_code = False
    code_buf: list[str] = []

    def close_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    def inline(s: str) -> str:
        s = html.escape(s)
        s = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", s)
        s = re.sub(r"`([^`]+)`", r"<code>\1</code>", s)
        s = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", r'<a href="\2">\1</a>', s)
        return s

    i = 0
    while i < len(lines):
        line = lines[i]
        if line.strip().startswith("```"):
            if in_code:
                out.append("<pre><code>" + html.escape("\n".join(code_buf)) + "</code></pre>")
                code_buf = []
                in_code = False
            else:
                close_lists()
                in_code = True
            i += 1
            continue
        if in_code:
            code_buf.append(line)
            i += 1
            continue
        if line.strip().startswith("<script"):
            close_lists()
            chunk = [line]
            while i + 1 < len(lines) and "</script>" not in lines[i]:
                i += 1
                chunk.append(lines[i])
            out.append("\n".join(chunk))
            i += 1
            continue
        if re.match(r"^[-*] ", line):
            if not in_ul:
                close_lists()
                out.append("<ul>")
                in_ul = True
            out.append("<li>" + inline(re.sub(r"^[-*] ", "", line)) + "</li>")
            i += 1
            continue
        if re.match(r"^\d+\. ", line):
            if not in_ol:
                close_lists()
                out.append("<ol>")
                in_ol = True
            out.append("<li>" + inline(re.sub(r"^\d+\. ", "", line)) + "</li>")
            i += 1
            continue
        if "|" in line and line.strip().startswith("|"):
            if re.match(r"^\|?\s*-+", line.replace(" ", "")):
                i += 1
                continue
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if not in_table:
                close_lists()
                out.append("<table>")
                out.append("<thead><tr>" + "".join(f"<th>{inline(c)}</th>" for c in cells) + "</tr></thead><tbody>")
                in_table = True
            else:
                out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in cells) + "</tr>")
            i += 1
            if i >= len(lines) or "|" not in lines[i]:
                out.append("</tbody></table>")
                in_table = False
            continue
        close_lists()
        if line.startswith("# "):
            out.append("<h1>" + inline(line[2:]) + "</h1>")
        elif line.startswith("## "):
            out.append("<h2>" + inline(line[3:]) + "</h2>")
        elif line.startswith("### "):
            out.append("<h3>" + inline(line[4:]) + "</h3>")
        elif line.startswith("> "):
            out.append("<blockquote><p>" + inline(line[2:]) + "</p></blockquote>")
        elif line.strip() == "":
            pass
        else:
            out.append("<p>" + inline(line) + "</p>")
        i += 1
    close_lists()
    if in_table:
        out.append("</tbody></table>")
    return "\n".join(out)


def ghost_request(method: str, url: str, admin_key: str, payload: dict | None = None) -> tuple[int, dict | str]:
    import json
    import urllib.error
    import urllib.request

    req = urllib.request.Request(
        url,
        data=None if payload is None else json.dumps(payload).encode(),
        headers={
            "Authorization": f"Ghost {token(admin_key)}",
            "Content-Type": "application/json",
            "Accept-Version": "v5.0",
        },
        method=method,
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            body = resp.read().decode()
            return resp.status, json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def find_post(base: str, admin_key: str, slug: str) -> dict | None:
    status, body = ghost_request(
        "GET",
        f"{base}/ghost/api/admin/posts/?filter=slug:{slug}&limit=1",
        admin_key,
    )
    if status != 200 or not isinstance(body, dict):
        return None
    posts = body.get("posts") or []
    return posts[0] if posts else None


def upsert(base: str, admin_key: str, path: Path, live: bool) -> None:
    meta, body = split_frontmatter(path.read_text())
    slug = meta.get("slug", "").strip().strip("/")
    title = meta.get("title", "").strip() or path.stem
    if not slug or slug.startswith("_"):
        print(f"skip  {path.name} (no public slug)")
        return
    excerpt = meta.get("answer_block", "")[:300]
    html_body = md_to_html(body)
    post = {
        "title": title,
        "slug": slug.split("/")[-1],
        "custom_excerpt": excerpt,
        "html": html_body,
        "status": "published" if live else "draft",
        "meta_title": title,
        "meta_description": excerpt[:160],
    }
    existing = find_post(base, admin_key, post["slug"])
    if existing:
        post["updated_at"] = existing["updated_at"]
        status, body = ghost_request(
            "PUT",
            f"{base}/ghost/api/admin/posts/{existing['id']}/?source=html",
            admin_key,
            {"posts": [post]},
        )
        action = "updated"
    else:
        status, body = ghost_request(
            "POST",
            f"{base}/ghost/api/admin/posts/?source=html",
            admin_key,
            {"posts": [post]},
        )
        action = "created"
    ok = status in (200, 201)
    print(f"{'ok' if ok else 'FAIL'} {action} {status} /{post['slug']}/  {title[:60]}")
    if not ok:
        print(body)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--wave", action="append", default=[])
    parser.add_argument("--live", action="store_true", help="Publish (default is Ghost draft)")
    args = parser.parse_args()
    admin_key = os.environ.get("GHOST_ADMIN_API_KEY", "").strip()
    base = os.environ.get("GHOST_URL", "https://www.universalassetowners.com").rstrip("/")
    if not admin_key or ":" not in admin_key:
        raise SystemExit(
            "GHOST_ADMIN_API_KEY is missing. In Ghost Admin: Settings → Integrations → "
            "Add custom integration → copy Admin API Key into this environment."
        )
    waves = args.wave or ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16"]
    files: list[Path] = []
    for w in waves:
        d = PUBLISH / f"wave-{w}"
        if not d.is_dir():
            print(f"no folder {d}")
            continue
        files.extend(sorted(p for p in d.glob("*.md") if p.name not in SKIP))
    if not files:
        raise SystemExit("No draft files found.")
    print(f"{'LIVE' if args.live else 'GHOST DRAFT'}  {len(files)} files  →  {base}")
    for p in files:
        upsert(base, admin_key, p, args.live)


if __name__ == "__main__":
    main()
