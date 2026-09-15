#!/usr/bin/env python3
"""Four-frame navy/gold GIF for the 15 Sep 2026 edition. Target ≤500KB."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[2] / "assets" / "2026-09-15" / "allocation-nobody-voted-on.gif"
NAVY = (11, 31, 58)
NAVY2 = (19, 45, 74)
GOLD = (197, 162, 83)
GOLD2 = (230, 199, 90)
CREAM = (244, 239, 230)
MUTED = (138, 155, 176)
W, H = 1200, 675


def font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def card(draw, xy, fill=NAVY2, outline=GOLD):
    x0, y0, x1, y1 = xy
    draw.rounded_rectangle(xy, radius=18, fill=fill, outline=outline, width=2)


def label(draw, xy, text, size=18, fill=CREAM, bold=True, anchor="mm"):
    draw.text(xy, text, font=font(size, bold=bold), fill=fill, anchor=anchor)


def frame_base(kicker="UAO DAILY · 15 SEP 2026"):
    im = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 8), fill=GOLD)
    d.rectangle((0, H - 8, W, H), fill=GOLD)
    d.text((48, 36), kicker, font=font(16, True), fill=GOLD)
    return im, d


def f1():
    im, d = frame_base()
    d.text((48, 72), "The allocation nobody voted on", font=font(36, True), fill=CREAM)
    d.text((48, 122), "Three sleeves. Three committees. One idea.", font=font(20), fill=MUTED)
    nodes = [
        (220, 360, "INDEX\nEQUITY"),
        (600, 360, "CREDIT\nSLEEVE"),
        (980, 360, "PRIVATE\nMARKETS"),
    ]
    for x, y, t in nodes:
        card(d, (x - 130, y - 70, x + 130, y + 70))
        label(d, (x, y), t.replace("\n", "  "), 20)
        d.ellipse((x - 10, y - 120, x + 10, y - 100), fill=GOLD)
    d.text((W // 2, 560), "A market bought for diversification acquired a sector.", font=font(18), fill=MUTED, anchor="mm")
    return im


def f2():
    im, d = frame_base()
    d.text((48, 72), "Look-through", font=font(36, True), fill=CREAM)
    d.text((48, 122), "Seniority rose as quality fell. 23% → 46% negative EBITDA.", font=font(20), fill=MUTED)
    nodes = [(220, 250, "INDEX"), (600, 250, "CREDIT"), (980, 360 - 110, "PRIVATE")]
    # reuse x
    xs = [220, 600, 980]
    for x, name in zip(xs, ["INDEX EQUITY", "CREDIT SLEEVE", "PRIVATE MARKETS"]):
        card(d, (x - 120, 200, x + 120, 300), fill=NAVY2)
        label(d, (x, 250), name, 16)
        d.line((x, 300, 600, 430), fill=GOLD, width=3)
    card(d, (360, 430, 840, 560), fill=(18, 38, 58), outline=GOLD2)
    label(d, (600, 480), "SOFTWARE REVENUE ASSUMPTIONS", 18)
    label(d, (600, 518), "2021 VINTAGE  ·  44% OF PRIVATE CREDIT", 16, fill=GOLD2)
    return im


def f3():
    im, d = frame_base()
    d.text((48, 72), "Base case, not a forecast", font=font(36, True), fill=CREAM)
    d.text((48, 122), "Concentration is a composition fact until a supervisor, a gate, or a renewal makes it an event.", font=font(18), fill=MUTED)
    boxes = [
        (80, 210, 390, 520, "IT STAYS A FACT IF", "Defaults stay in healthcare\nand industrials. Allocators\nre-measure look-through\nand adjust pacing, not\npositions."),
        (430, 210, 770, 520, "IT ESCALATES IF", "A supervisor cites the BIS\nshare. PIK clusters in software.\nGates stay at 2× the cap.\nAI exclusions become standard."),
        (810, 210, 1120, 520, "IT DE-ESCALATES IF", "Equity-financed funds hold\nin a real drawdown.\nJanuary renewals add\nAI cover. Tech borrowers\nrefinance into public markets."),
    ]
    for x0, y0, x1, y1, title, body in boxes:
        card(d, (x0, y0, x1, y1))
        d.text((x0 + 24, y0 + 24), title, font=font(16, True), fill=GOLD)
        d.multiline_text((x0 + 24, y0 + 70), body, font=font(18), fill=CREAM, spacing=8)
    return im


def f4():
    im, d = frame_base()
    d.text((48, 90), "Four rooms. One portfolio.", font=font(40, True), fill=CREAM)
    d.text((48, 160), "Basel measured it. Vienna named the seller.\nToronto opened the shop window. Sacramento has to choose.", font=font(22), fill=MUTED)
    card(d, (48, 300, 1152, 500), fill=(18, 38, 58), outline=GOLD)
    d.text((80, 340), "THE INVESTMENT-COMMITTEE QUESTION", font=font(16, True), fill=GOLD)
    d.text(
        (80, 380),
        "Which bodies outside this room can change the composition of this\nportfolio without our consent — and when did we last measure that?",
        font=font(24, True),
        fill=CREAM,
    )
    d.text((48, 560), "Open the navigator  →  universalassetowners.com/brief-20260915", font=font(18, True), fill=GOLD2)
    d.text((48, 600), "Scenario DS-20260915-the-allocation-nobody-voted-on", font=font(14), fill=MUTED)
    return im


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames = [f1(), f2(), f3(), f4()]
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=[2200, 2400, 2800, 3000],
        loop=0,
        optimize=True,
        disposal=2,
    )
    kb = OUT.stat().st_size / 1024
    print(f"wrote {OUT}  {kb:.1f} KB")
    if kb > 500:
        raise SystemExit(f"GIF too large: {kb:.1f} KB")


if __name__ == "__main__":
    main()
