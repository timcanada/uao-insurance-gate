"""Official Apollo people search + match. No UI scraping."""

from __future__ import annotations

from typing import Any

from uao_growth.http import HttpClient
from uao_growth.normalize import linkedin_key, normalize_domain, normalize_name
from uao_growth.sources.seeds import default_titles

SEARCH_URL = "https://api.apollo.io/api/v1/mixed_people/api_search"
MATCH_URL = "https://api.apollo.io/api/v1/people/match"


class ApolloClient:
    def __init__(self, http: HttpClient, api_key: str):
        self.http = http
        self.api_key = api_key

    def _headers(self) -> dict[str, str]:
        return {
            "x-api-key": self.api_key,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
        }

    def search_org(
        self,
        org_name: str,
        titles: list[str] | None = None,
        domain: str | None = None,
        org_type: str | None = None,
        per_page: int = 25,
    ) -> list[dict[str, Any]]:
        payload: dict[str, Any] = {
            "q_organization_name": org_name,
            "person_titles": titles or default_titles(org_type),
            "person_seniorities": ["owner", "founder", "c_suite", "partner", "vp", "head"],
            "per_page": per_page,
            "page": 1,
        }
        if domain:
            payload["q_organization_domains"] = [normalize_domain(domain)]
        data = self.http.request(SEARCH_URL, method="POST", headers=self._headers(), data=payload)
        people = []
        for raw in (data or {}).get("people", []) if isinstance(data, dict) else []:
            people.append(self._normalize(raw, org_name, org_type))
        return people

    def match(self, **identity: str) -> dict[str, Any] | None:
        payload = {k: v for k, v in identity.items() if v}
        payload.setdefault("reveal_personal_emails", False)
        payload.setdefault("reveal_phone_number", False)
        data = self.http.request(MATCH_URL, method="POST", headers=self._headers(), data=payload)
        person = (data or {}).get("person") if isinstance(data, dict) else None
        if not person:
            return None
        return self._normalize(person, person.get("organization", {}).get("name") if isinstance(person.get("organization"), dict) else None, None)

    def _normalize(self, raw: dict[str, Any], org_name: str | None, org_type: str | None) -> dict[str, Any]:
        org = raw.get("organization") if isinstance(raw.get("organization"), dict) else {}
        name = raw.get("name") or " ".join(p for p in (raw.get("first_name"), raw.get("last_name")) if p)
        return {
            "name": name,
            "name_key": normalize_name(name),
            "first_name": raw.get("first_name"),
            "last_name": raw.get("last_name"),
            "title": raw.get("title"),
            "org_name": org.get("name") or org_name,
            "org_type": org_type,
            "country": raw.get("country") or (org.get("country") if org else None),
            "email": raw.get("email"),
            "linkedin_url": raw.get("linkedin_url"),
            "linkedin_key": linkedin_key(raw.get("linkedin_url")),
            "apollo_id": raw.get("id"),
            "source": "apollo",
            "source_url": raw.get("linkedin_url"),
            "status": "enriched",
            "email_status": raw.get("email_status"),
            "extra_json": {"domain": org.get("website_url") or org.get("primary_domain")},
        }
