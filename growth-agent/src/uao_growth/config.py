from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path


def _load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


@dataclass(frozen=True)
class Settings:
    root: Path
    db_path: Path
    seeds_dir: Path
    private_dir: Path
    exports_dir: Path
    apollo_api_key: str
    neverbounce_api_key: str
    ghost_url: str
    ghost_admin_api_key: str
    sec_user_agent: str
    weekly_quota: int
    min_seniority_score: int

    @property
    def members_drop_path(self) -> Path:
        return self.private_dir / "members.csv"


def package_root() -> Path:
    return Path(__file__).resolve().parents[2]


def load_settings(root: Path | None = None) -> Settings:
    root = Path(root) if root else package_root()
    _load_dotenv(root / ".env")
    _load_dotenv(root.parent / ".env")
    db = os.environ.get("UAO_GROWTH_DB", str(root / "private" / "uao_growth.db"))
    return Settings(
        root=root,
        db_path=Path(db),
        seeds_dir=root / "data" / "seeds",
        private_dir=root / "private",
        exports_dir=root / "exports",
        apollo_api_key=os.environ.get("APOLLO_API_KEY", "").strip(),
        neverbounce_api_key=os.environ.get("NEVERBOUNCE_API_KEY", "").strip(),
        ghost_url=os.environ.get("GHOST_URL", "https://www.universalassetowners.com").rstrip("/"),
        ghost_admin_api_key=os.environ.get("GHOST_ADMIN_API_KEY", "").strip(),
        sec_user_agent=os.environ.get(
            "SEC_USER_AGENT",
            "Universal Asset Owners info@universalassetowners.com",
        ),
        weekly_quota=int(os.environ.get("WEEKLY_QUOTA", "10000")),
        min_seniority_score=int(os.environ.get("MIN_SENIORITY_SCORE", "78")),
    )
