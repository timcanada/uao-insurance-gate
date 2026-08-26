from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from typing import Any


class HttpError(RuntimeError):
    def __init__(self, message: str, status: int | None = None, body: str = ""):
        super().__init__(message)
        self.status = status
        self.body = body


class HttpClient:
    def __init__(self, user_agent: str, min_interval: float = 0.2, timeout: int = 45):
        self.user_agent = user_agent
        self.min_interval = min_interval
        self.timeout = timeout
        self._last_at = 0.0

    def _pace(self) -> None:
        wait = self.min_interval - (time.time() - self._last_at)
        if wait > 0:
            time.sleep(wait)
        self._last_at = time.time()

    def request(
        self,
        url: str,
        *,
        method: str = "GET",
        headers: dict[str, str] | None = None,
        data: dict[str, Any] | bytes | None = None,
        retries: int = 3,
    ) -> Any:
        payload: bytes | None
        req_headers = {"User-Agent": self.user_agent, "Accept": "application/json"}
        if headers:
            req_headers.update(headers)
        if isinstance(data, dict):
            payload = json.dumps(data).encode("utf-8")
            req_headers.setdefault("Content-Type", "application/json")
        else:
            payload = data

        last_error: Exception | None = None
        for attempt in range(retries):
            self._pace()
            req = urllib.request.Request(url, data=payload, headers=req_headers, method=method)
            try:
                with urllib.request.urlopen(req, timeout=self.timeout) as resp:
                    raw = resp.read()
                    if not raw:
                        return None
                    content_type = resp.headers.get("Content-Type", "")
                    text = raw.decode("utf-8", errors="replace")
                    if "json" in content_type or text[:1] in "{[":
                        return json.loads(text)
                    return text
            except urllib.error.HTTPError as exc:
                body = exc.read().decode("utf-8", errors="replace") if exc.fp else ""
                if exc.code in {429, 500, 502, 503, 504} and attempt < retries - 1:
                    time.sleep(1.5 * (attempt + 1))
                    last_error = HttpError(f"{exc.code} {url}", exc.code, body)
                    continue
                raise HttpError(f"{exc.code} {url}: {body[:300]}", exc.code, body) from exc
            except urllib.error.URLError as exc:
                last_error = exc
                if attempt < retries - 1:
                    time.sleep(1.5 * (attempt + 1))
                    continue
                raise HttpError(f"network error {url}: {exc}") from exc
        raise HttpError(f"failed {url}: {last_error}")

    def get_json(self, url: str, **kwargs: Any) -> Any:
        return self.request(url, **kwargs)


def encode_query(url: str, params: dict[str, Any]) -> str:
    return f"{url}?{urllib.parse.urlencode(params, doseq=True)}"
