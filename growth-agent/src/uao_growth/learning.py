from __future__ import annotations

import csv
from pathlib import Path

from uao_growth.store import Store, utcnow


def recompute_weights(store: Store) -> dict[str, float]:
    """Sources that keep senior non-members get heavier next week."""
    updated: dict[str, float] = {}
    for row in store.fetchall("SELECT * FROM source_weights"):
        attempts = max(int(row["attempts"]), 1)
        kept_rate = int(row["kept"]) / attempts
        suppress_rate = int(row["suppressed"]) / attempts
        convert_rate = int(row["converted"]) / max(int(row["kept"]), 1)
        # Finding existing members is useful intelligence but not new inventory.
        weight = 0.4 + (kept_rate * 1.4) + (convert_rate * 0.8) - (suppress_rate * 0.15)
        weight = max(0.15, min(weight, 3.0))
        store.execute(
            "UPDATE source_weights SET weight=?, updated_at=? WHERE source=?",
            (round(weight, 4), utcnow(), row["source"]),
        )
        updated[row["source"]] = round(weight, 4)
    store.commit()
    return updated


def apply_feedback(store: Store, path: Path) -> dict[str, int]:
    """
    Feedback CSV columns: email, outcome
    outcome in: subscribed, opened, clicked, bounced, unsubscribed, ignored, junior
    """
    counts = {"rows": 0, "matched": 0}
    with path.open(newline="", encoding="utf-8-sig") as handle:
        reader = csv.DictReader(handle)
        for raw in reader:
            counts["rows"] += 1
            email = (raw.get("email") or "").strip().lower()
            outcome = (raw.get("outcome") or "").strip().lower()
            if not email or not outcome:
                continue
            person = store.fetchone("SELECT id, source FROM people WHERE email = ?", (email,))
            if not person:
                continue
            counts["matched"] += 1
            converted = 1 if outcome in {"subscribed", "opened", "clicked"} else 0
            store.bump_source(person["source"], converted=converted)
            store.update_person(int(person["id"]), extra_json={"feedback": outcome})
    recompute_weights(store)
    return counts
