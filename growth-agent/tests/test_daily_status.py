import json
from pathlib import Path

from uao_growth.cli import main
from uao_growth.daily_status import collect_status, render_email
from uao_growth.store import Store, utcnow

ROOT = Path(__file__).resolve().parents[1]


def test_daily_status_email_uses_snapshot_when_store_is_empty(tmp_path, monkeypatch, capsys):
    db = tmp_path / "uao.db"
    monkeypatch.setenv("UAO_GROWTH_DB", str(db))
    assert main(["--root", str(ROOT), "daily-status", "--format", "email"]) == 0
    payload = json.loads(capsys.readouterr().out)
    assert payload["to"] == "tim@herofund.ca"
    assert "UAO growth agent — daily progress" in payload["subject"]
    body = payload["body"]
    assert "11,160" in body
    assert "39,713" in body
    assert "57,885" in body
    assert "tim@herofund.ca" not in body or "Goal" in body
    assert "fink" not in body.lower()
    assert "consent_status=prospect_not_subscribed" in body
    assert "Nobody is auto-subscribed" in body


def test_daily_status_json_reports_live_counts(tmp_path, monkeypatch):
    db = tmp_path / "uao.db"
    monkeypatch.setenv("UAO_GROWTH_DB", str(db))
    store = Store(db)
    store.upsert_org(
        {
            "name": "Example SWF",
            "org_key": "example-swf",
            "org_type": "swf",
            "source": "test",
        }
    )
    store.insert_person(
        {
            "name": "Ada Example",
            "name_key": "ada example",
            "title": "Chief Investment Officer",
            "seniority": 96,
            "org_name": "Example SWF",
            "org_type": "swf",
            "source": "test",
            "status": "discovered",
        }
    )
    store.insert_person(
        {
            "name": None,
            "title": "Chief Investment Officer",
            "seniority": 96,
            "org_name": "Example SWF",
            "org_type": "swf",
            "source": "test",
            "status": "role_target",
        }
    )
    store.execute(
        "INSERT INTO members (email, email_hash, name, name_key, org_name, org_key, person_org_key, linkedin_key, labels, source, imported_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
        (
            "member@example.com",
            "hash",
            "Existing Member",
            "existing member",
            "Example SWF",
            "example-swf",
            "existing member|example-swf",
            "",
            "",
            "test",
            utcnow(),
        ),
    )
    store.commit()
    from uao_growth.config import load_settings

    settings = load_settings(ROOT)
    payload = collect_status(settings, store)
    store.close()
    assert payload["live_store_empty"] is False
    assert payload["organizations"] == 1
    assert payload["named_not_on_ghost"] == 1
    assert payload["empty_senior_seats"] == 1
    assert payload["members_suppressed"] == 1
    to, subject, body = render_email(payload)
    assert to == "tim@herofund.ca"
    assert "Live store on this environment" in body
    assert "1" in body
    assert "Ada Example" not in body
    assert "member@example.com" not in subject
