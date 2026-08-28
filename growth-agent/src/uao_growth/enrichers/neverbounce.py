"""Official Neverbounce single-check wrapper."""

from __future__ import annotations

from uao_growth.http import HttpClient, encode_query

CHECK_URL = "https://api.neverbounce.com/v4/single/check"


class NeverBounceClient:
    def __init__(self, http: HttpClient, api_key: str):
        self.http = http
        self.api_key = api_key

    def check(self, email: str) -> str:
        url = encode_query(CHECK_URL, {"key": self.api_key, "email": email})
        data = self.http.get_json(url)
        if not isinstance(data, dict):
            return "unknown"
        return str(data.get("result") or "unknown")
