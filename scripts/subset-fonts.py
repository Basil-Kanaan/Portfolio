"""Subset the self-hosted variable fonts into public/fonts.

Archivo (display, labels, figures) and Newsreader (prose) are trimmed to the Latin
characters the site uses and to the axis ranges it uses, so the preloaded file stays small.

Usage: python scripts/subset-fonts.py
"""
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
FS = ROOT / "node_modules" / "@fontsource-variable"
OUT = ROOT / "public" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

# Basic Latin, Latin-1 (for "Areté"), typographic quotes, en dash, ellipsis, middle dot,
# arrows, multiplication sign, thin/non-breaking spaces, bullet, minus.
UNICODES = (
    list(range(0x20, 0x7F))
    + list(range(0xA0, 0x100))
    + [0x2009, 0x200A, 0x2013, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026,
       0x2190, 0x2191, 0x2192, 0x2193, 0x2212]
)


def build(src: Path, dst: Path, limits: dict) -> None:
    font = TTFont(src)
    axes = {a.axisTag: (a.minValue, a.maxValue) for a in font["fvar"].axes}
    keep = {tag: rng for tag, rng in limits.items() if tag in axes}
    if keep:
        font = instancer.instantiateVariableFont(font, keep)
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "calt", "tnum", "lnum", "case", "ccmp", "locl", "mark", "mkmk"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=UNICODES)
    sub.subset(font)
    font.flavor = "woff2"
    font.save(dst)
    print(f"{dst.name}: axes {axes} -> {keep or 'unchanged'}, {dst.stat().st_size / 1024:.1f} KB")


build(FS / "archivo" / "files" / "archivo-latin-standard-normal.woff2", OUT / "archivo.woff2",
      {"wght": (400, 700), "wdth": (88, 100)})
build(FS / "newsreader" / "files" / "newsreader-latin-opsz-normal.woff2", OUT / "newsreader.woff2",
      {"wght": (400, 500), "opsz": (12, 48)})
