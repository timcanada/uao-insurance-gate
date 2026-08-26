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
