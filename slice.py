#!/usr/bin/env python3
"""Slice a generated pixel-art sheet into individual transparent assets.
Usage: python3 slice.py <sheet.png> <cols> <rows> <outdir> <prefix>
- edge flood-fills exterior near-white to transparent (keeps inner highlights)
- trims each cell to content, pads to square, resizes to 256
"""
import sys
from PIL import Image, ImageDraw

def make_transparent(im):
    im = im.convert("RGBA")
    w, h = im.size
    # flood fill exterior white from several edge seed points
    seeds = [(0,0),(w-1,0),(0,h-1),(w-1,h-1),(w//2,0),(w//2,h-1),(0,h//2),(w-1,h//2)]
    for s in seeds:
        try:
            ImageDraw.floodfill(im, s, (0,0,0,0), thresh=40)
        except Exception:
            pass
    return im

def trim_pad(im, pad_ratio=0.1, size=256):
    bbox = im.getbbox()
    if not bbox:
        return im.resize((size,size))
    im = im.crop(bbox)
    w,h = im.size
    side = int(max(w,h)*(1+pad_ratio*2))
    canvas = Image.new("RGBA",(side,side),(0,0,0,0))
    canvas.paste(im, ((side-w)//2,(side-h)//2), im)
    return canvas.resize((size,size), Image.NEAREST)

def main():
    sheet, cols, rows, outdir, prefix = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4], sys.argv[5]
    names = sys.argv[6].split(",") if len(sys.argv) > 6 and sys.argv[6] else None
    import os; os.makedirs(outdir, exist_ok=True)
    im = Image.open(sheet).convert("RGBA")
    W,H = im.size
    cw, ch = W/cols, H/rows
    n = 0
    for r in range(rows):
        for c in range(cols):
            cell = im.crop((round(c*cw), round(r*ch), round((c+1)*cw), round((r+1)*ch)))
            cell = make_transparent(cell)
            cell = trim_pad(cell)
            fname = names[n] if names and n < len(names) else f"{prefix}{n+1:02d}"
            cell.save(f"{outdir}/{fname}.webp", "WEBP", quality=92, method=6)
            n += 1
    print(f"sliced {n} tiles -> {outdir}/")

main()
