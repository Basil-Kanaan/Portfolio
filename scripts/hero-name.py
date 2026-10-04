"""Draw the hero name as an inline SVG, from the font itself.

The hero intro draws the name the way a type designer builds it: metric guides, then each
outline traced with its points and handles, then the fill. This script makes that drawing:
it instantiates Archivo at the hero's settings (weight 640, width 92), lays out "Basil" and
"Kanaan" with the font's own kerning and the hero's tracking, and writes the SVG into
index.html between the hero-name markers. Coordinates are font units, so the drawing scales
with the hero's font size. Each distinct letter is defined once and placed with <use>.
It also writes public/favicon.svg from the same B.

Usage: python scripts/hero-name.py
"""
import re
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
LINES = ["Basil", "Kanaan"]
TRACK = -47  # letter-spacing, font units (-0.047em)
LEADING = 880  # line height, font units (0.88em)
NODE = 24  # on-curve square, font units
HANDLE_R = 9.5  # off-curve circle radius, font units
REACH = (-8000, 12000)  # guides run off both edges of the page

font = instancer.instantiateVariableFont(TTFont(ROOT / "public" / "fonts" / "archivo.woff2"), {"wght": 640, "wdth": 92})
cmap = font.getBestCmap()
glyf = font["glyf"]
hmtx = font["hmtx"]
hhea = font["hhea"]
os2 = font["OS/2"]
upm = font["head"].unitsPerEm
assert upm == 1000
X_HEIGHT, CAP = os2.sxHeight, os2.sCapHeight
# First baseline as the browser places it in a 0.88em line box: half-leading plus ascent.
BASE = round((LEADING - (hhea.ascent - hhea.descent)) / 2 + hhea.ascent)

kern_lookup = font["GPOS"].table.LookupList.Lookup[0]


def kern(left: str, right: str) -> int:
    """GPOS pair kerning: glyph pairs first, then class pairs, as a shaper applies them."""
    for st in kern_lookup.SubTable:
        if left not in st.Coverage.glyphs:
            continue
        if st.Format == 1:
            pairs = st.PairSet[st.Coverage.glyphs.index(left)].PairValueRecord
            for rec in pairs:
                if rec.SecondGlyph == right:
                    return getattr(rec.Value1, "XAdvance", 0) or 0
            continue
        c1 = st.ClassDef1.classDefs.get(left, 0)
        c2 = st.ClassDef2.classDefs.get(right, 0)
        v = st.Class1Record[c1].Class2Record[c2].Value1
        return (getattr(v, "XAdvance", 0) or 0) if v else 0
    return 0


def fmt(v: float) -> str:
    return f"{v:.1f}".rstrip("0").rstrip(".")


def contours(ch: str):
    coords, ends, flags = glyf[cmap[ord(ch)]].getCoordinates(glyf)
    out, start = [], 0
    for end in ends:
        # Font y runs up; SVG y runs down from the baseline.
        out.append([(coords[i][0], -coords[i][1], bool(flags[i] & 1)) for i in range(start, end + 1)])
        start = end + 1
    return out


def contour_d(pts) -> str:
    """One closed TrueType contour: quadratic segments, implied on-curve midpoints."""
    n = len(pts)
    s = next((i for i, p in enumerate(pts) if p[2]), 0)
    ring = pts[s:] + pts[:s]
    d = [f"M{fmt(ring[0][0])} {fmt(ring[0][1])}"]
    i = 1
    while i <= n:
        p = ring[i % n]
        if p[2]:
            d.append(f"L{fmt(p[0])} {fmt(p[1])}")
            i += 1
            continue
        q = ring[(i + 1) % n]
        if q[2]:
            d.append(f"Q{fmt(p[0])} {fmt(p[1])} {fmt(q[0])} {fmt(q[1])}")
            i += 2
        else:
            d.append(f"Q{fmt(p[0])} {fmt(p[1])} {fmt((p[0] + q[0]) / 2)} {fmt((p[1] + q[1]) / 2)}")
            i += 1
    return "".join(d) + "Z"


def glyph_defs(ch: str) -> tuple[str, str]:
    cs = contours(ch)
    fill = f'<path d="{"".join(contour_d(c) for c in cs)}"/>'
    outlines = "".join(f'<path class="draft__outline" pathLength="1" d="{contour_d(c)}"/>' for c in cs)
    handles, on, off = [], [], []
    h = NODE / 2
    for c in cs:
        for i, a in enumerate(c):
            b = c[(i + 1) % len(c)]
            if not (a[2] and b[2]):
                handles.append(f"M{fmt(a[0])} {fmt(a[1])}L{fmt(b[0])} {fmt(b[1])}")
            if a[2]:
                on.append(f"M{fmt(a[0] - h)} {fmt(a[1] - h)}h{NODE}v{NODE}h-{NODE}Z")
            else:
                r = HANDLE_R
                off.append(f"M{fmt(a[0] - r)} {fmt(a[1])}a{r} {r} 0 1 0 {fmt(2 * r)} 0a{r} {r} 0 1 0 -{fmt(2 * r)} 0Z")
    build = (
        outlines
        + (f'<path class="draft__handles" d="{"".join(handles)}"/>' if handles else "")
        + (f'<path class="draft__off" d="{"".join(off)}"/>' if off else "")
        + f'<path class="draft__on" d="{"".join(on)}"/>'
    )
    return fill, build


# Layout: pen positions with kerning and tracking, per line.
placed = []  # (ch, x, baseline, index)
widths = []
index = 0
for li, text in enumerate(LINES):
    base = BASE + li * LEADING
    x = 0
    for k, ch in enumerate(text):
        placed.append((ch, x, base, index))
        index += 1
        adv = hmtx[cmap[ord(ch)]][0]
        x += adv + TRACK + (kern(cmap[ord(ch)], cmap[ord(text[k + 1])]) if k + 1 < len(text) else 0)
    widths.append(x - TRACK)  # the last letter's tracking hangs outside the line
width = max(widths)
height = LEADING * len(LINES)

defs = []
for ch in dict.fromkeys("".join(LINES)):
    f, b = glyph_defs(ch)
    defs.append(f'<g id="draft-{ch}-f">{f}</g><g id="draft-{ch}-b">{b}</g>')

guides = []
for li in range(len(LINES)):
    base = BASE + li * LEADING
    ys = [base, base - X_HEIGHT, base - CAP]
    h_d = "".join(f"M{REACH[0]} {y}H{REACH[1]}" for y in ys)
    top, bottom = base - CAP - 110, base + 130
    v_d = "".join(
        f"M{x0} {top}V{bottom}M{x0 + hmtx[cmap[ord(ch)]][0]} {top}V{bottom}"
        for ch, x0, b, _ in placed
        if b == base
    )
    guides.append(f'<path class="draft__h" style="--r:{li}" d="{h_d}"/><path class="draft__v" style="--r:{li}" d="{v_d}"/>')

uses_f = "".join(f'<use href="#draft-{ch}-f" x="{x}" y="{b}" style="--i:{i}"/>' for ch, x, b, i in placed)
uses_b = "".join(f'<use href="#draft-{ch}-b" x="{x}" y="{b}" style="--i:{i}"/>' for ch, x, b, i in placed)
box = f'x="{REACH[0]}" y="-2000" width="{REACH[1] - REACH[0]}" height="{height + 4000}"'

svg = (
    f'<svg class="draft" viewBox="0 0 {width} {height}" width="{width / 1000:.3f}em" height="{height / 1000:.3f}em" '
    f'aria-hidden="true" focusable="false" data-draft>'
    f"<defs>{''.join(defs)}"
    '<radialGradient id="draft-lens"><stop offset="0.96" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>'
    '<radialGradient id="draft-lens-cut"><stop offset="0.96" stop-color="#000"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>'
    f'<mask id="draft-hide" maskUnits="userSpaceOnUse" {box}><rect {box} fill="#fff"/><circle class="draft__lens" r="0" fill="url(#draft-lens-cut)"/></mask>'
    f'<mask id="draft-show" maskUnits="userSpaceOnUse" {box}><circle class="draft__lens" r="0" fill="url(#draft-lens)"/></mask>'
    "</defs>"
    f'<g class="draft__guides" data-draft-guides>{"".join(guides)}</g>'
    f'<g class="draft__fill" data-draft-fill>{uses_f}</g>'
    f'<g class="draft__build" data-draft-build><g id="draft-build">{uses_b}</g></g>'
    '<g class="draft__loupe" data-draft-loupe><use href="#draft-build"/></g>'
    "</svg>"
)

html_path = ROOT / "index.html"
html = html_path.read_text(encoding="utf-8")
pattern = re.compile(r"(<!-- hero-name:start -->).*?(<!-- hero-name:end -->)", re.S)
assert pattern.search(html), "hero-name markers missing in index.html"
html = pattern.sub(lambda m: m.group(1) + svg + m.group(2), html)
html_path.write_text(html, encoding="utf-8", newline="\n")

# Favicon: the same B, filled, with one on-curve point marked in brass, as in the drawing.
b_contours = contours("B")
b_xs = [p[0] for c in b_contours for p in c]
b_ys = [p[1] for c in b_contours for p in c]
b_w, b_h = max(b_xs) - min(b_xs), max(b_ys) - min(b_ys)
scale = 38 / b_h  # cap height 38 of 64
tx = 32 - (min(b_xs) + b_w / 2) * scale
ty = 32 - (min(b_ys) + b_h / 2) * scale
corner = min((p for c in b_contours for p in c if p[2]), key=lambda p: (-p[1], p[0]))  # bottom-left point
cx, cy = corner[0] * scale + tx, corner[1] * scale + ty
favicon = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    '<rect width="64" height="64" rx="14" fill="#100F0D"/>'
    f'<path transform="translate({tx:.2f} {ty:.2f}) scale({scale:.5f})" fill="#ECEAE5" d="{"".join(contour_d(c) for c in b_contours)}"/>'
    f'<rect x="{cx - 3.5:.2f}" y="{cy - 3.5:.2f}" width="7" height="7" fill="#C99A6B"/>'
    "</svg>\n"
)
(ROOT / "public" / "favicon.svg").write_text(favicon, encoding="utf-8", newline="\n")

print(f"baseline {BASE}, lines {widths} -> {width} x {height} units, svg {len(svg) / 1024:.1f} KB")
for ch, x, b, i in placed:
    print(ch, x, b)
