
Goal: fix the mobile earring animation framing so the full earring is always visible (no clipping / over-zoom), while still trimming side background.

What I found:
- The current mobile branch in `src/components/ScrollImageSequence.tsx` crops source width (`sx=0.15`, `sw=0.7`) and then applies a **cover** fit to the cropped area.
- That creates a double-zoom effect on narrow/tall mobile viewports:  
  1) crop narrows the source, then  
  2) cover scales it again to fill canvas.
- Result: still too zoomed for mobile, which matches what you’re seeing.

Implementation plan:
1. Update only the mobile drawing path in `drawFrame` (`if (isMobile)`), keep desktop logic untouched.
2. Change mobile fit from **crop + cover** to **crop + contain**:
   - Keep a horizontal crop to remove side background.
   - Render that cropped source with contain math so the full cropped content always remains visible.
3. Widen the crop window so we don’t cut into the earring:
   - Move from aggressive crop to a gentler crop (center-focused, wider source window).
   - Example target: trim ~10–12% per side (keep ~76–80% width), then tune if needed.
4. Keep black background fill before draw (already present) so any letterboxing looks intentional.
5. Add clearly named mobile crop constants near the draw math (instead of magic numbers) to allow fast future tuning without touching logic.

Technical details (exact code behavior to implement):
- In mobile branch:
  - Define:
    - `const mobileCropLeft = 0.10` (or 0.12)
    - `const mobileCropWidth = 0.80` (or 0.76)
  - Compute source rect:
    - `sx = img.naturalWidth * mobileCropLeft`
    - `sw = img.naturalWidth * mobileCropWidth`
    - `sy = 0`
    - `sh = img.naturalHeight`
  - Compute `croppedRatio = sw / sh`
  - Use **contain** destination sizing:
    - If `croppedRatio > canvasRatio`: fit width (`dw = w`, `dh = w / croppedRatio`)
    - Else: fit height (`dh = h`, `dw = h * croppedRatio`)
    - Center with `dx`, `dy`
  - Draw with 9-arg `drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)`

Why this solves your request:
- “Full earring visible”: contain prevents further forced zoom/cropping.
- “Crop left/right background”: source crop still removes side whitespace.
- Mobile-only: guarded by `window.innerWidth < 768`; desktop remains unchanged.

Validation steps after implementation:
1. Check on mobile viewport (390x844) through the scroll sequence.
2. Confirm top/bottom/edges of the earring never clip at any frame.
3. Confirm side background is reduced vs original uncropped contain.
4. Confirm desktop behavior remains exactly as before.

If the framing still feels slightly off after this, only two constants (`mobileCropLeft`, `mobileCropWidth`) need minor adjustment.
