#!/usr/bin/env python3
"""One-off: extract transparent product cutouts from the red-backdrop photos.

Border-seeded flood fill (not global chroma keying) so red that appears
INSIDE a garment print survives — only background-connected red is removed.
Never runs in CI; re-run manually if source photos change:

    python3 scripts/cutout.py
"""
from PIL import Image, ImageDraw, ImageFilter
import os

SRC = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')
OUT = os.path.join(SRC, 'cutouts')

# thresh: flood-fill color distance — high enough to eat the soft shadow
# cast on the red backdrop, low enough to stop at the garment edge.
JOBS = {
    'rb-002-a.webp': {'thresh': 165},
    'rb-004-a.webp': {'thresh': 165},
    'rb-004-b.webp': {'thresh': 165},
}

SENTINEL = (0, 255, 0)      # not present in any source photo
FEATHER = 1.5
PAD_FRAC = 0.04
SIZES = {'': 1600, '-sm': 800}


def is_red(px):
    r, g, b = px
    return r > 90 and r > g * 1.5 and r > b * 1.5


def border_seeds(img, step=40):
    # Only seed on red backdrop pixels — a garment cropped at the frame edge
    # (rb-004-b's hood fills the bottom border) must not seed the fill.
    w, h = img.size
    for x in range(0, w, step):
        for y in (0, h - 1):
            if is_red(img.getpixel((x, y))):
                yield (x, y)
    for y in range(0, h, step):
        for x in (0, w - 1):
            if is_red(img.getpixel((x, y))):
                yield (x, y)


def cut(name, thresh):
    img = Image.open(os.path.join(SRC, name)).convert('RGB')
    w, h = img.size

    flood = img.copy()
    for seed in border_seeds(img):
        if flood.getpixel(seed) != SENTINEL:
            ImageDraw.floodfill(flood, seed, SENTINEL, thresh=thresh)

    # alpha mask: opaque where NOT flooded
    mask = flood.point(lambda *_: 0).convert('L')
    px_f, px_m = flood.load(), mask.load()
    for y in range(h):
        for x in range(w):
            if px_f[x, y] != SENTINEL:
                px_m[x, y] = 255

    # purge residual shadow slivers: reddish pixels near the cut boundary
    # (in-print reds sit deep inside the garment and are untouched)
    near_edge = mask.filter(ImageFilter.MinFilter(13))  # 0 within ~6px of cut
    px_img, px_ne = img.load(), near_edge.load()
    for y in range(h):
        for x in range(w):
            if px_m[x, y] and not px_ne[x, y]:
                r, g, b = px_img[x, y]
                if r > 60 and r > g * 1.4 and r > b * 1.4:
                    px_m[x, y] = 0

    mask = mask.filter(ImageFilter.GaussianBlur(FEATHER))

    rgba = img.convert('RGBA')
    rgba.putalpha(mask)

    # despill: on semi-transparent edge pixels, clamp red channel
    px = rgba.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if 0 < a < 255 and r > max(g, b) + 30:
                px[x, y] = (max(g, b) + 30, g, b, a)

    bbox = rgba.getchannel('A').getbbox()
    if bbox:
        pad = int(max(bbox[2] - bbox[0], bbox[3] - bbox[1]) * PAD_FRAC)
        bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad),
                min(w, bbox[2] + pad), min(h, bbox[3] + pad))
        rgba = rgba.crop(bbox)

    stem = os.path.splitext(name)[0]
    for suffix, max_dim in SIZES.items():
        out = rgba.copy()
        out.thumbnail((max_dim, max_dim), Image.LANCZOS)
        path = os.path.join(OUT, f'{stem}{suffix}.webp')
        out.save(path, 'WEBP', quality=88)
        kb = os.path.getsize(path) // 1024
        print(f'{path.split("public/")[-1]}  {out.size[0]}x{out.size[1]}  {kb}KB')


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, cfg in JOBS.items():
        cut(name, cfg['thresh'])
