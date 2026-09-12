import json
from pathlib import Path

from uao_growth.cli import main

ROOT = Path(__file__).resolve().parents[1]


def test_init_and_import_and_status(tmp_path, capsys, monkeypatch):
    db = tmp_path / "uao.db"
    monkeypatch.setenv("UAO_GROWTH_DB", str(db))
    assert main(["--root", str(ROOT), "init-db"]) == 0
    members = Path(__file__).parent / "fixtures" / "members.csv"
    assert main(["--root", str(ROOT), "import-members", str(members)]) == 0
    assert main(["--root", str(ROOT), "status"]) == 0
    out = capsys.readouterr().out
    assert "members_suppressed" in out
    assert '"members_suppressed": 4' in out


def test_import_inventory_then_status(tmp_path, capsys, monkeypatch):
    db = tmp_path / "uao.db"
    monkeypatch.setenv("UAO_GROWTH_DB", str(db))
    inventory = Path(__file__).parent / "fixtures" / "inventory.csv"
    assert main(["--root", str(ROOT), "import-inventory", str(inventory)]) == 0
    out = json.loads(capsys.readouterr().out)
    assert out["inserted"] == 2
    assert main(["--root", str(ROOT), "status"]) == 0
    status = json.loads(capsys.readouterr().out)
    assert status["organizations"] >= 1
    assert status["people"] == 2
    assert status["named_people"] == 1


def test_weekly_seeds_loads_members_exclusion_list(tmp_path, monkeypatch, capsys):
    db = tmp_path / "uao.db"
    monkeypatch.setenv("UAO_GROWTH_DB", str(db))
    members = Path(__file__).parent / "fixtures" / "members.csv"
    assert main(["--root", str(ROOT), "weekly", "--public-only", "--sources", "seeds", "--members", str(members)]) == 0
    out = capsys.readouterr().out
    assert '"total": 4' in out
    assert "existing.cio@otpp.com" not in out or "suppressed" in out
