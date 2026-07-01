#!/usr/bin/env python3
"""Turn a horizontal multi-frame pixel sheet into an ALIGNED sprite strip.
Frames are aligned by bottom-center (feet planted) so only the moving part
moves when played. Outputs one horizontal webp strip + prints frame size.
Usage: python3 anim_slice.py <sheet> <ncols> <outname> [anchor]
 anchor: 'bottom' (default, feet) or 'center'
"""
import sys
from PIL import Image, ImageDraw

def make_transparent(im):
    im = im.convert("RGBA"); w,h = im.size
    seeds=[(0,0),(w-1,0),(0,h-1),(w-1,h-1),(w//2,0),(w//2,h-1),(0,h//2),(w-1,h//2)]
    for s in seeds:
        try: ImageDraw.floodfill(im, s, (0,0,0,0), thresh=42)
        except Exception: pass
    return im

def main():
    sheet, n, name = sys.argv[1], int(sys.argv[2]), sys.argv[3]
    anchor = sys.argv[4] if len(sys.argv)>4 else "bottom"
    import os; os.makedirs("assets/anim", exist_ok=True)
    im = Image.open(sheet).convert("RGBA")
    W,H = im.size; cw = W/n
    frames=[]
    for c in range(n):
        cell = make_transparent(im.crop((round(c*cw),0,round((c+1)*cw),H)))
        bb = cell.getbbox()
        if bb: cell = cell.crop(bb)
        frames.append(cell)
    fw = max(f.width for f in frames); fh = max(f.height for f in frames)
    PAD = 6
    cw2, ch2 = fw+PAD*2, fh+PAD*2
    strip = Image.new("RGBA",(cw2*n, ch2),(0,0,0,0))
    for i,f in enumerate(frames):
        x = i*cw2 + (cw2 - f.width)//2          # horizontal center
        y = (ch2 - f.height) if anchor=="bottom" else (ch2 - f.height)//2
        strip.alpha_composite(f,(x,y))
    # scale whole strip so each frame is 256 tall (keeps crisp ratio)
    target_h = 256
    scale = target_h/ch2
    strip = strip.resize((round(cw2*n*scale), target_h), Image.NEAREST)
    strip.save(f"assets/anim/{name}.webp","WEBP",quality=92,method=6)
    print(f"{name}: frames={n} frame={round(cw2*scale)}x{target_h} ratio={cw2/ch2:.3f}")

main()
