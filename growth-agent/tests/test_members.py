from pathlib import Path

from uao_growth.members.suppress import SuppressionIndex, import_members
from uao_growth.pipeline import apply_suppression, discover
from uao_growth.store import Store

FIXTURE = Path(__file__).parent / "fixtures" / "members.csv"


def test_import_counts_unique_emails(tmp_path):
    store = Store(tmp_path / "t.db")
    stats = import_members(store, FIXTURE)
    assert stats["inserted"] == 4
    assert stats["total"] == 4
    again = import_members(store, FIXTURE)
    assert again["inserted"] == 0
    assert again["updated"] == 4


def test_members_are_blocked_by_email_and_name_org(tmp_path):
    store = Store(tmp_path / "t.db")
    import_members(store, FIXTURE)
    index = SuppressionIndex(store)
    assert index.match({"email": "existing.cio@otpp.com"}) == "email"
    assert (
        index.match(
            {
                "name": "Alex Rivera",
                "org_name": "Ontario Teachers' Pension Plan",
            }
        )
        == "name_org"
    )
    assert index.match({"email": "new.cio@calpers.ca.gov", "name": "Pat Morgan"}) is None
    assert index.match({"name": "Alex Rivera"}) == "name"


def test_discover_never_keeps_a_loaded_member(tmp_path, monkeypatch):
    from uao_growth.config import load_settings
    from uao_growth.http import HttpClient

    settings = load_settings(Path(__file__).resolve().parents[1])
    store = Store(tmp_path / "t.db")
    import_members(store, FIXTURE)

    def fake_sources(settings, client, selected=None):
        return {
            "organizations": [],
            "people": [
                {
                    "name": "Alex Rivera",
                    "title": "Chief Investment Officer",
                    "org_name": "Ontario Teachers' Pension Plan",
                    "org_type": "pension",
                    "org_key": "ontario teachers pension plan",
                    "source": "seeds",
                    "status": "discovered",
                    "email": "existing.cio@otpp.com",
                },
                {
                    "name": "New Sovereign CIO",
                    "title": "Chief Investment Officer",
                    "org_name": "Public Investment Fund",
                    "org_type": "swf",
                    "org_key": "public investment fund",
                    "source": "seeds",
                    "status": "discovered",
                    "email": "new.cio@pif.gov.sa",
                },
            ],
            "errors": {},
        }

    monkeypatch.setattr("uao_growth.pipeline.run_sources", fake_sources)
    stats = discover(settings, store, HttpClient("test"), ["seeds"])
    assert stats["suppressed"] == 1
    assert stats["kept"] == 1
    statuses = {row["email"]: row["status"] for row in store.fetchall("SELECT email, status FROM people")}
    assert statuses["existing.cio@otpp.com"] == "suppressed"
    assert statuses["new.cio@pif.gov.sa"] in {"discovered", "exportable"}


def test_later_member_import_suppresses_existing_people(tmp_path):
    store = Store(tmp_path / "t.db")
    store.insert_person(
        {
            "name": "Alex Rivera",
            "name_key": "alex rivera",
            "title": "Chief Investment Officer",
            "seniority": 96,
            "org_name": "Ontario Teachers' Pension Plan",
            "person_org_key": "alex rivera|ontario teachers pension plan",
            "email": "existing.cio@otpp.com",
            "email_hash": "x",
            "source": "wikidata",
            "status": "exportable",
        }
    )
    import_members(store, FIXTURE)
    blocked = apply_suppression(store)
    assert blocked == 1
    row = store.fetchone("SELECT status, member_match FROM people WHERE email = ?", ("existing.cio@otpp.com",))
    assert row["status"] == "suppressed"
    assert row["member_match"] == "email"
