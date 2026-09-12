import json
from pathlib import Path

from uao_growth.config import load_settings
from uao_growth.export.csv_export import export_week
from uao_growth.http import HttpClient
from uao_growth.learning import apply_feedback, recompute_weights
from uao_growth.members.suppress import import_members
from uao_growth.pipeline import discover, mark_exportable
from uao_growth.store import Store

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = Path(__file__).parent / "fixtures"


def test_seed_discover_creates_role_targets_and_skips_members(tmp_path):
    settings = load_settings(ROOT)
    store = Store(tmp_path / "t.db")
    import_members(store, FIXTURE / "members.csv")
    stats = discover(settings, store, HttpClient("test"), ["seeds"])
    assert stats["organizations"] >= 50
    assert stats["kept"] > 0
    assert store.count("people", "status = 'role_target'") > 0
    assert store.count("members") == 4


def test_export_omits_suppressed_members(tmp_path):
    settings = load_settings(ROOT)
    store = Store(tmp_path / "t.db")
    import_members(store, FIXTURE / "members.csv")
    store.insert_person(
        {
            "name": "Alex Rivera",
            "title": "Chief Investment Officer",
            "seniority": 96,
            "org_name": "Ontario Teachers' Pension Plan",
            "email": "existing.cio@otpp.com",
            "source": "seeds",
            "status": "suppressed",
            "member_match": "email",
        }
    )
    store.insert_person(
        {
            "name": "New Minister",
            "title": "Minister of Finance",
            "seniority": 100,
            "fit_score": 90,
            "org_name": "Government of Norway",
            "org_type": "government",
            "email": "minister@example.gov",
            "source": "wikidata",
            "status": "exportable",
        }
    )
    out = tmp_path / "week.csv"
    result = export_week(store, out, limit=50)
    assert result["exported"] == 1
    text = out.read_text(encoding="utf-8")
    assert "minister@example.gov" in text
    assert "existing.cio@otpp.com" not in text
    assert "prospect_not_subscribed" in text


def test_mark_exportable_respects_seniority_floor(tmp_path):
    settings = load_settings(ROOT)
    store = Store(tmp_path / "t.db")
    store.insert_person(
        {
            "name": "Junior Person",
            "title": "Analyst",
            "org_name": "CalPERS",
            "org_type": "pension",
            "source": "sec_edgar",
            "status": "discovered",
        }
    )
    store.insert_person(
        {
            "name": "Senior Person",
            "title": "Chief Investment Officer",
            "org_name": "CalPERS",
            "org_type": "pension",
            "source": "sec_edgar",
            "status": "discovered",
        }
    )
    marked = mark_exportable(settings, store)
    assert marked == 1
    rows = {r["name"]: r["status"] for r in store.fetchall("SELECT name, status FROM people")}
    assert rows["Senior Person"] == "exportable"
    assert rows["Junior Person"] == "below_bar"


def test_learning_raises_weight_for_converting_source(tmp_path):
    store = Store(tmp_path / "t.db")
    store.bump_source("wikidata", attempts=10, kept=8, converted=4)
    store.bump_source("sec_edgar", attempts=10, kept=1, converted=0)
    weights = recompute_weights(store)
    assert weights["wikidata"] > weights["sec_edgar"]


def test_feedback_file(tmp_path):
    store = Store(tmp_path / "t.db")
    store.insert_person(
        {
            "name": "New Minister",
            "title": "Minister of Finance",
            "email": "minister@example.gov",
            "source": "wikidata",
            "status": "exported",
        }
    )
    store.bump_source("wikidata", attempts=1, kept=1)
    counts = apply_feedback(store, FIXTURE / "feedback.csv")
    assert counts["matched"] == 1
    row = store.fetchone("SELECT converted FROM source_weights WHERE source='wikidata'")
    assert int(row["converted"]) == 1
