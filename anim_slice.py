#!/usr/bin/env python3
"""Turn a pixel sprite sheet (row or grid) into an ALIGNED sprite strip.
- supports grids: ncols x nrows (row-major frame order)
- removes disconnected stray lines / specks (keeps figure + attached parts)
- aligns frames by bottom-center so only the moving part moves
Usage: python3 anim_slice.py <sheet> <ncols> <name> [nrows=1] [anchor=bottom]
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

def clean_frame(cell):
    """Drop disconnected thin lines and tiny specks; keep figure + blobs (bulb/heart)."""
    SC=1  # full-res detection so thin 1-2px lines are caught reliably
    dw,dh=max(1,cell.width//SC),max(1,cell.height//SC)
    a=cell.split()[3].resize((dw,dh),Image.NEAREST); px=a.load()
    mask=bytearray(dw*dh)
    for y in range(dh):
        for x in range(dw):
            if px[x,y]>40: mask[y*dw+x]=1
    seen=bytearray(dw*dh); comps=[]
    for y in range(dh):
        for x in range(dw):
            if mask[y*dw+x] and not seen[y*dw+x]:
                st=[(x,y)]; seen[y*dw+x]=1; minx=maxx=x; miny=maxy=y; area=0
                while st:
                    cx,cy=st.pop(); area+=1
                    if cx<minx:minx=cx
                    if cx>maxx:maxx=cx
                    if cy<miny:miny=cy
                    if cy>maxy:maxy=cy
                    for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
                        nx,ny=cx+dx,cy+dy
                        if 0<=nx<dw and 0<=ny<dh and mask[ny*dw+nx] and not seen[ny*dw+nx]:
                            seen[ny*dw+nx]=1; st.append((nx,ny))
                comps.append((area,minx,miny,maxx,maxy))
    if not comps: return cell
    figure=max(comps,key=lambda c:c[0])
    drop=[]
    for c in comps:
        if c is figure: continue
        area,minx,miny,maxx,maxy=c
        w=maxx-minx+1; h=maxy-miny+1
        if min(w,h)<=4 or area<=12 or w>=4*h or h>=4*w:  # thin line (H or V) / speck → remove
            drop.append(c)
    if drop:
        d=ImageDraw.Draw(cell)
        for _,minx,miny,maxx,maxy in drop:
            d.rectangle([minx*SC-2,miny*SC-2,(maxx+1)*SC+2,(maxy+1)*SC+2],fill=(0,0,0,0))
    # harden alpha: crisp pixel edges, remove faint semi-transparent halos/specks
    al=cell.split()[3].point(lambda a: 255 if a>=110 else 0)
    cell.putalpha(al)
    return cell

def main():
    sheet,ncols,name=sys.argv[1],int(sys.argv[2]),sys.argv[3]
    nrows=int(sys.argv[4]) if len(sys.argv)>4 else 1
    anchor=sys.argv[5] if len(sys.argv)>5 else "bottom"
    import os; os.makedirs("assets/anim", exist_ok=True)
    im=Image.open(sheet).convert("RGBA"); W,H=im.size
    cw=W/ncols; ch=H/nrows
    ix=round(cw*0.045); iy=round(ch*0.015)   # inset to drop faint frame-separator lines at cell edges
    frames=[]
    for r in range(nrows):
        for c in range(ncols):
            cell=make_transparent(im.crop((round(c*cw)+ix,round(r*ch)+iy,round((c+1)*cw)-ix,round((r+1)*ch)-iy)))
            cell=clean_frame(cell)
            bb=cell.getbbox()
            if bb: cell=cell.crop(bb)
            frames.append(cell)
    n=len(frames)
    fw=max(f.width for f in frames); fh=max(f.height for f in frames)
    PAD=4; cw2,ch2=fw+PAD*2,fh+PAD*2
    strip=Image.new("RGBA",(cw2*n,ch2),(0,0,0,0))
    for i,f in enumerate(frames):
        x=i*cw2+(cw2-f.width)//2
        y=(ch2-f.height) if anchor=="bottom" else (ch2-f.height)//2
        strip.alpha_composite(f,(x,y))
    target_h=256; scale=target_h/ch2
    strip=strip.resize((round(cw2*n*scale),target_h),Image.NEAREST)
    strip.save(f"assets/anim/{name}.webp","WEBP",quality=92,method=6)
    print(f"{name}: frames={n} frame={round(cw2*scale)}x{target_h} ratio={cw2/ch2:.3f}")

main()
