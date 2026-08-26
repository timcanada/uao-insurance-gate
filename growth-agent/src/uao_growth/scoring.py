"""Seniority and ICP scoring. Junior titles never become exportable."""

from __future__ import annotations

import re
from dataclasses import dataclass

REJECT_PATTERNS = (
    r"\bintern\b",
    r"\bstudent\b",
    r"\banalyst\b",
    r"\bassociate\b",
    r"\bcoordinator\b",
    r"\bassistant\b",
    r"\bspecialist\b",
    r"\bjunior\b",
    r"\bjr\.?\b",
    r"\bexecutive assistant\b",
    r"\badmin(istrative)?\b",
    r"\breceptionist\b",
    r"\bmarketing coordinator\b",
    r"\bsales development\b",
    r"\bsdr\b",
    r"\btrainee\b",
)

# Highest matching rule wins.
TITLE_RULES: tuple[tuple[int, str, str], ...] = (
    (100, "finance_minister", r"\b(minister of finance|finance minister|treasury secretary|secretary of the treasury|chancellor of the exchequer|minister of economy|minister of finance and economy)\b"),
    (98, "central_bank_governor", r"\bgovernor\b"),
    (96, "cio", r"\b(chief investment officer|\bcio\b|group cio|global cio)\b"),
    (95, "ceo_owner", r"\b(chief executive|\bceo\b|managing director general|director general|president & ceo|president and ceo)\b"),
    (94, "swf_executive", r"\b(executive director|managing director|chief executive director)\b"),
    (93, "deputy_cio", r"\b(deputy (chief investment officer|cio)|co-cio|associate cio|head of investments?)\b"),
    (92, "investment_committee_chair", r"\b(chair(man|woman|person)? of the investment committee|investment committee chair)\b"),
    (90, "family_principal", r"\b(principal|patriarch|matriarch|family principal|beneficial owner)\b"),
    (89, "managing_partner", r"\b(managing partner|senior managing director|general partner|\bgp\b)\b"),
    (88, "president", r"\b(?<!vice )president\b"),
    (88, "head_private_markets", r"\b(head|director) of (private markets|private equity|alternatives|real assets|infrastructure|private credit|external managers)\b"),
    (86, "head_allocation", r"\b(head|director) of (asset allocation|total portfolio|portfolio construction|public markets|capital markets)\b"),
    (85, "cro_cso", r"\b(chief risk officer|\bcro\b|chief strategy officer|chief investment strategist|head of stewardship)\b"),
    (84, "cfo_owner", r"\b(chief financial officer|\bcfo\b|finance director)\b"),
    (83, "event_principal", r"\b(founder|conference chair|managing director, events|head of (partnerships|delegates|institutional relationships))\b"),
    (82, "ic_member", r"\b(investment committee|trustee|board (chair|chairman|member)|chairperson|chairman|chairwoman)\b"),
    (80, "c_suite", r"\b(chief operating officer|\bcoo\b|chief of staff|deputy chief executive|deputy ceo)\b"),
    (78, "partner", r"\b(partner|principal consultant|executive vice president|\bevp\b)\b"),
    (70, "director", r"\b(director|head of|vice president|\bvp\b)\b"),
    (55, "manager", r"\b(manager|vice chair|councillor)\b"),
)

OWNER_ORG_TYPES = {
    "swf",
    "pension",
    "family_office",
    "endowment",
    "insurer",
    "pe",
    "government",
}
COMMERCIAL_ORG_TYPES = {"accounting", "event", "consultant", "bank", "legal", "search"}


@dataclass(frozen=True)
class Score:
    seniority: int
    tier: str
    fit: int
    exportable: bool
    reasons: tuple[str, ...]


def title_score(title: str | None) -> tuple[int, str]:
    text = (title or "").strip().lower()
    if not text:
        return 0, "unknown"
    if re.search(r"\b(executive assistant|assistant to|admin assistant)\b", text):
        return 0, "reject"
    for pattern in REJECT_PATTERNS:
        if re.search(pattern, text):
            if not re.search(r"\b(chief|head of|minister|secretary|cio|ceo|partner)\b", text):
                return 0, "reject"
    best = (0, "unknown")
    for score, tier, pattern in TITLE_RULES:
        if re.search(pattern, text) and score > best[0]:
            best = (score, tier)
    return best


def content_fit(org_type: str | None, title: str | None, extra_tags: list[str] | None = None) -> tuple[int, tuple[str, ...]]:
    reasons: list[str] = []
    score = 40
    org = (org_type or "").lower()
    text = (title or "").lower()
    if org in OWNER_ORG_TYPES:
        score += 30
        reasons.append(f"owner_desk:{org}")
    elif org in COMMERCIAL_ORG_TYPES:
        score += 18
        reasons.append(f"commercial_desk:{org}")
    if re.search(r"investment|cio|allocator|sovereign|pension|family office|private market", text):
        score += 12
        reasons.append("investment_mandate")
    if re.search(r"finance minister|treasury|central bank", text):
        score += 10
        reasons.append("finance_official")
    for tag in extra_tags or []:
        if tag:
            score += 2
            reasons.append(tag)
    return min(score, 100), tuple(reasons)


def score_person(
    *,
    title: str | None,
    org_type: str | None = None,
    extra_tags: list[str] | None = None,
    min_seniority: int = 78,
) -> Score:
    seniority, tier = title_score(title)
    fit, reasons = content_fit(org_type, title, extra_tags)
    exportable = seniority >= min_seniority and tier != "reject"
    return Score(
        seniority=seniority,
        tier=tier,
        fit=fit,
        exportable=exportable,
        reasons=reasons,
    )
