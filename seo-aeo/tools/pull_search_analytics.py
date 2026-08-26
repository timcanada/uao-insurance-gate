#!/usr/bin/env python3
"""Pull first-party Search Console + GA4 into seo-aeo/tracking/.

Requires environment secrets (never commit these):
  GOOGLE_SERVICE_ACCOUNT_JSON  — full service-account JSON
  GSC_SITE_URL                 — default sc-domain:universalassetowners.com
  GA4_PROPERTY_ID              — default 399677697 (UAO site property)

The service account must be added as a user on the Search Console property
and as a Viewer on the GA4 property. Enable Search Console API and
Google Analytics Data API on the GCP project.
"""

from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "tracking"
DEFAULT_GSC = "sc-domain:universalassetowners.com"
DEFAULT_GA4 = "399677697"


def service_account_token(scopes: list[str]) -> str:
    raw = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON", "").strip()
    if not raw:
        raise SystemExit(
            "GOOGLE_SERVICE_ACCOUNT_JSON is missing. Add a GCP service-account "
            "JSON key to this environment, then share the client_email with "
            "Search Console (Owner/Full) and GA4 property 399677697 (Viewer)."
        )
    try:
        from google.oauth2 import service_account
        from google.auth.transport.requests import Request
    except ImportError:
        raise SystemExit("Install google-auth: pip install google-auth")
    info = json.loads(raw)
    creds = service_account.Credentials.from_service_account_info(info, scopes=scopes)
    creds.refresh(Request())
    return creds.token


def http_json(method: str, url: str, token: str, payload: dict | None = None) -> dict:
    data = None if payload is None else json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            body = resp.read().decode()
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        raise SystemExit(f"HTTP {e.code} {url}\n{err}") from e


def pull_gsc(token: str, site: str, start: str, end: str) -> dict:
    base = "https://searchconsole.googleapis.com/webmasters/v3"
    encoded = urllib.request.quote(site, safe="")
    queries = http_json(
        "POST",
        f"{base}/sites/{encoded}/searchAnalytics/query",
        token,
        {
            "startDate": start,
            "endDate": end,
            "dimensions": ["query"],
            "rowLimit": 50,
        },
    )
    pages = http_json(
        "POST",
        f"{base}/sites/{encoded}/searchAnalytics/query",
        token,
        {
            "startDate": start,
            "endDate": end,
            "dimensions": ["page"],
            "rowLimit": 50,
        },
    )
    totals = http_json(
        "POST",
        f"{base}/sites/{encoded}/searchAnalytics/query",
        token,
        {"startDate": start, "endDate": end, "rowLimit": 1},
    )
    return {"site": site, "start": start, "end": end, "totals": totals, "queries": queries, "pages": pages}


def pull_ga4(token: str, property_id: str, start: str, end: str) -> dict:
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{property_id}:runReport"
    return http_json(
        "POST",
        url,
        token,
        {
            "dateRanges": [{"startDate": start, "endDate": end}],
            "metrics": [
                {"name": "activeUsers"},
                {"name": "sessions"},
                {"name": "screenPageViews"},
                {"name": "averageSessionDuration"},
            ],
            "dimensions": [{"name": "pagePath"}],
            "limit": 25,
            "orderBys": [{"metric": {"metricName": "screenPageViews"}, "desc": True}],
        },
    )


def main() -> None:
    site = os.environ.get("GSC_SITE_URL", DEFAULT_GSC).strip()
    ga4 = os.environ.get("GA4_PROPERTY_ID", DEFAULT_GA4).strip()
    end = date.today() - timedelta(days=2)  # GSC delay
    start = end - timedelta(days=27)
    start_s, end_s = start.isoformat(), end.isoformat()

    token = service_account_token(
        [
            "https://www.googleapis.com/auth/webmasters.readonly",
            "https://www.googleapis.com/auth/analytics.readonly",
        ]
    )
    gsc = pull_gsc(token, site, start_s, end_s)
    ga = pull_ga4(token, ga4, start_s, end_s)
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "gsc-latest.json").write_text(json.dumps(gsc, indent=2))
    (OUT / "ga-latest.json").write_text(json.dumps(ga, indent=2))
    print(f"wrote {OUT / 'gsc-latest.json'} and {OUT / 'ga-latest.json'}  {start_s} → {end_s}")
    rows = (gsc.get("totals") or {}).get("rows") or []
    if rows:
        k = rows[0].get("keys") or []
        print("GSC totals", rows[0].get("clicks"), "clicks", rows[0].get("impressions"), "impr", k)


if __name__ == "__main__":
    sys.exit(main())
