#!/usr/bin/env python3
"""Re-slice the mascot sheet using connected-component detection so each
figure keeps its parts (e.g. the lightbulb) and tiny stray specks are dropped."""
from PIL import Image, ImageDraw

SHEET = "assets/mascot-sheet.png"
NAMES = ["stand", "wave", "laptop", "heart", "idea"]
SC = 4  # downscale factor for detection

def make_transparent(im):
    im = im.convert("RGBA")
    w, h = im.size
    seeds = [(0,0),(w-1,0),(0,h-1),(w-1,h-1),(w//2,0),(w//2,h-1),(0,h//2),(w-1,h//2)]
    for s in seeds:
        try: ImageDraw.floodfill(im, s, (0,0,0,0), thresh=42)
        except Exception: pass
    return im

def components(mask, dw, dh, min_area):
    seen = bytearray(dw*dh)
    comps = []
    for y in range(dh):
        base = y*dw
        for x in range(dw):
            if mask[base+x] and not seen[base+x]:
                stack = [(x,y)]; seen[base+x] = 1
                minx=maxx=x; miny=maxy=y; area=0; sx=0
                while stack:
                    cx,cy = stack.pop(); area+=1; sx+=cx
                    if cx<minx:minx=cx
                    if cx>maxx:maxx=cx
                    if cy<miny:miny=cy
                    if cy>maxy:maxy=cy
                    for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                        nx,ny=cx+dx,cy+dy
                        if 0<=nx<dw and 0<=ny<dh:
                            i=ny*dw+nx
                            if mask[i] and not seen[i]:
                                seen[i]=1; stack.append((nx,ny))
                comps.append({"area":area,"bbox":(minx,miny,maxx,maxy),"cx":sx/area})
    return [c for c in comps if c["area"]>=min_area]

def main():
    sheet = Image.open(SHEET).convert("RGBA")
    W,H = sheet.size
    clean = make_transparent(sheet)
    dw,dh = W//SC, H//SC
    alpha = clean.split()[3].resize((dw,dh), Image.NEAREST)
    px = alpha.load()
    mask = bytearray(dw*dh)
    for y in range(dh):
        for x in range(dw):
            if px[x,y] > 40: mask[y*dw+x] = 1
    comps = components(mask, dw, dh, min_area=120)
    comps.sort(key=lambda c: c["cx"])
    print("components kept:", len(comps), "areas:", sorted(c["area"] for c in comps))
    # split into 5 groups at the 4 largest x-gaps
    if len(comps) > 5:
        gaps = sorted(((comps[i+1]["cx"]-comps[i]["cx"], i) for i in range(len(comps)-1)), reverse=True)
        cut = set(i for _,i in gaps[:4])
    else:
        cut = set(range(len(comps)-1))
    groups=[]; cur=[comps[0]]
    for i in range(1,len(comps)):
        if (i-1) in cut: groups.append(cur); cur=[]
        cur.append(comps[i])
    groups.append(cur)
    print("groups:", len(groups))
    for gi,g in enumerate(groups[:5]):
        minx=min(c["bbox"][0] for c in g); miny=min(c["bbox"][1] for c in g)
        maxx=max(c["bbox"][2] for c in g); maxy=max(c["bbox"][3] for c in g)
        x0=max(0,(minx-1)*SC); y0=max(0,(miny-1)*SC)
        x1=min(W,(maxx+2)*SC); y1=min(H,(maxy+2)*SC)
        crop = clean.crop((x0,y0,x1,y1))
        bb = crop.getbbox()
        if bb: crop = crop.crop(bb)
        w,h = crop.size; side=int(max(w,h)*1.16)
        canvas = Image.new("RGBA",(side,side),(0,0,0,0))
        canvas.paste(crop, ((side-w)//2,(side-h)//2), crop)
        canvas.resize((256,256), Image.NEAREST).save(f"assets/mascot/{NAMES[gi]}.webp","WEBP",quality=92,method=6)
        print(f"  {NAMES[gi]}: crop {w}x{h}")
    print("done")

main()
