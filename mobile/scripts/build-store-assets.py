#!/usr/bin/env python3
"""Build UAO App Store / Play icons and framed screenshots."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

NAVY = (11, 31, 58, 255)
NAVY2 = (18, 38, 63, 255)
GOLD = (201, 162, 75, 255)
GOLD2 = (230, 199, 90, 255)
CREAM = (245, 241, 230, 255)
MUTED = (138, 155, 176, 255)
LINE = (29, 46, 68, 255)

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets" / "images"
STORE = ROOT / "store"
SHOTS = Path("/tmp/uao-shots")

SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"
SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SANS_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def draw_centered(draw: ImageDraw.ImageDraw, xy, text, fnt, fill):
    bbox = draw.textbbox((0, 0), text, font=fnt)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((xy[0] - w / 2, xy[1] - h / 2), text, font=fnt, fill=fill)


def make_icon(size=1024) -> Image.Image:
    im = Image.new("RGBA", (size, size), NAVY)
    d = ImageDraw.Draw(im)
    inset = int(size * 0.055)
    d.rectangle([inset, inset, size - inset, size - inset], outline=GOLD, width=max(2, size // 170))
    inner = inset + int(size * 0.035)
    d.rectangle([inner, inner, size - inner, size - inner], outline=LINE, width=max(1, size // 340))
    draw_centered(d, (size / 2, size * 0.46), "UAO", font(SERIF, int(size * 0.24)), GOLD)
    draw_centered(d, (size / 2, size * 0.68), "UNIVERSAL", font(SANS, int(size * 0.045)), GOLD2)
    draw_centered(d, (size / 2, size * 0.74), "ASSET OWNERS", font(SANS, int(size * 0.045)), GOLD2)
    return im


def make_foreground(size=1024) -> Image.Image:
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    draw_centered(d, (size / 2, size * 0.46), "UAO", font(SERIF, int(size * 0.22)), GOLD)
    draw_centered(d, (size / 2, size * 0.68), "UNIVERSAL", font(SANS, int(size * 0.04)), GOLD2)
    draw_centered(d, (size / 2, size * 0.74), "ASSET OWNERS", font(SANS, int(size * 0.04)), GOLD2)
    return im


def make_monochrome(size=1024) -> Image.Image:
    im = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    draw_centered(d, (size / 2, size * 0.52), "UAO", font(SERIF, int(size * 0.26)), (255, 255, 255, 255))
    return im


def make_splash_mark(size=512) -> Image.Image:
    return make_foreground(size)


def make_feature() -> Image.Image:
    w, h = 1024, 500
    im = Image.new("RGBA", (w, h), NAVY)
    d = ImageDraw.Draw(im)
    d.rectangle([24, 24, w - 24, h - 24], outline=GOLD, width=2)
    d.line([(48, 86), (420, 86)], fill=LINE, width=1)
    d.text((48, 48), "UNIVERSAL ASSET OWNERS", font=font(SANS, 18), fill=GOLD)
    d.text((48, 120), "The terminal", font=font(SERIF, 52), fill=CREAM)
    d.text((48, 186), "for long-horizon capital.", font=font(SERIF, 36), fill=GOLD2)
    d.text((48, 280), "Morning brief  ·  Probability Desk  ·  Live YouTube", font=font(SANS_REG, 16), fill=MUTED)
    d.text((48, 320), "The same intelligence as the website — on a phone.", font=font(SANS_REG, 16), fill=MUTED)
    d.rounded_rectangle([700, 90, 976, 410], radius=28, outline=GOLD, width=2, fill=NAVY2)
    d.text((730, 130), "UAO", font=font(SERIF, 54), fill=GOLD)
    d.text((730, 210), "STANDBY", font=font(SANS, 16), fill=MUTED)
    d.text((730, 250), "TERM   BRIEFS   DESK", font=font(SANS, 12), fill=GOLD2)
    d.text((730, 320), "LIVE when you go on air", font=font(SANS_REG, 13), fill=MUTED)
    return im


def save_rgb(im: Image.Image, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.convert("RGB").save(path, "PNG", optimize=True)


def save_rgba(im: Image.Image, path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "PNG", optimize=True)


def frame_shot(src: Path, size: tuple[int, int], kicker: str, headline: str) -> Image.Image:
    canvas = Image.new("RGB", size, NAVY[:3])
    d = ImageDraw.Draw(canvas)
    W, H = size
    pad = int(W * 0.055)
    header_h = int(H * 0.16)
    d.rectangle([0, 0, W, header_h], fill=NAVY2[:3])
    d.line([(0, header_h), (W, header_h)], fill=GOLD[:3], width=4)
    d.text((pad, int(header_h * 0.22)), kicker.upper(), font=font(SANS, max(18, W // 38)), fill=GOLD)
    # wrap headline
    words = headline.split()
    lines, cur = [], ""
    fnt = font(SERIF, max(28, W // 18))
    for word in words:
        trial = (cur + " " + word).strip()
        if d.textlength(trial, font=fnt) < W - pad * 2:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    y = int(header_h * 0.42)
    for line in lines[:3]:
        d.text((pad, y), line, font=fnt, fill=CREAM)
        y += int(W / 16)

    phone = Image.open(src).convert("RGB")
    avail_w = W - pad * 2
    avail_h = H - header_h - pad
    scale = min(avail_w / phone.width, avail_h / phone.height)
    new = phone.resize((int(phone.width * scale), int(phone.height * scale)), Image.Resampling.LANCZOS)
    x = (W - new.width) // 2
    y0 = header_h + (avail_h - new.height) // 2
    # gold hairline around the phone
    d.rectangle([x - 3, y0 - 3, x + new.width + 2, y0 + new.height + 2], outline=GOLD[:3], width=3)
    canvas.paste(new, (x, y0))
    return canvas


SHOT_COPY = [
    ("term.png", "The desk", "The same morning intelligence as the website."),
    ("briefs.png", "Daily briefs", "The Universal Owner, on the phone."),
    ("desk.png", "Probability Desk", "Base, upside and tail — every afternoon."),
    ("charts.png", "Charts", "One print a day from each desk."),
    ("brief-popup.png", "When the brief drops", "A card in the app the moment it goes out."),
]


def write_icons():
    icon = make_icon(1024)
    save_rgb(icon, ASSETS / "icon.png")
    save_rgb(icon, STORE / "icon" / "app-icon-1024.png")
    save_rgba(make_foreground(1024), ASSETS / "android-icon-foreground.png")
    save_rgb(Image.new("RGBA", (1024, 1024), NAVY), ASSETS / "android-icon-background.png")
    save_rgba(make_monochrome(1024), ASSETS / "android-icon-monochrome.png")
    splash = make_splash_mark(512)
    save_rgba(splash, ASSETS / "splash-icon.png")
    fav = make_icon(192).resize((48, 48), Image.Resampling.LANCZOS)
    save_rgb(fav, ASSETS / "favicon.png")
    save_rgb(make_feature(), STORE / "android" / "feature-graphic-1024x500.png")


def write_screenshots():
    ios_sizes = {
        "6.7": (1290, 2796),
        "6.5": (1284, 2778),
    }
    android_size = (1080, 1920)
    ipad_size = (2048, 2732)
    n = 0
    for i, (name, kicker, headline) in enumerate(SHOT_COPY, start=1):
        src = SHOTS / name
        if not src.exists():
            print("missing", src)
            continue
        for label, size in ios_sizes.items():
            out = STORE / "ios" / f"{i:02d}-{label}-{name.replace('.png', '')}.png"
            save_rgb(frame_shot(src, size, kicker, headline), out)
            n += 1
        out_a = STORE / "android" / f"{i:02d}-{name}"
        save_rgb(frame_shot(src, android_size, kicker, headline), out_a)
        n += 1
        out_p = STORE / "ios" / f"{i:02d}-ipad13-{name.replace('.png', '')}.png"
        save_rgb(frame_shot(src, ipad_size, kicker, headline), out_p)
        n += 1
    print(f"wrote {n} framed screenshots")


if __name__ == "__main__":
    write_icons()
    write_screenshots()
    print("icons ->", ASSETS)
    print("store ->", STORE)
