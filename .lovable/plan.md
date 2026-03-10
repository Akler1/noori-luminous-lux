

## Fix: Raw image on left, cards on right — no box/padding

**Problem**: The `cardRef` placeholder creates a styled box (border-radius, shadow, fixed height) that the canvas is forced into, causing padding and visual artifacts.

**Solution**: Remove the card placeholder. The canvas fills the entire sticky viewport as background. The cards stay on the right side via the grid overlay — but the left column is simply empty (canvas shows through). No box, no shadow, no border-radius on the canvas.

### Changes in `src/components/ScrollImageSequence.tsx`

1. **Remove `cardRef`** (line 33) — delete the ref entirely.

2. **Simplify `positionCanvas`** (lines 109-137) — remove all desktop card-positioning logic. Canvas always fills the sticky container (full width/height, no border-radius, no box-shadow). Only the mobile branch remains (which is already `100%/100%`). Essentially this function becomes a no-op or is removed.

3. **Remove the placeholder div** (lines 194-197) — delete the `cardRef` div from the grid. The left column becomes empty, letting the canvas (which is behind the grid at `z-[15]`) show through.

4. **Desktop grid** (line 192) — keep two columns but the left column is just an empty spacer `<div />`. Cards remain on the right. Canvas renders full-screen behind everything as background.

5. **Canvas** (line 189) — remove `z-[15]`, set to `z-[5]`. It's a background layer. Remove `pointer-events-none` since it's behind the grid.

6. **`drawFrame` desktop** (lines 97-105) — use cover-fit (original behavior) so the image fills the viewport nicely as a background. No background fill color needed.

### Result
- Full-bleed earring animation as background
- Info cards float on the right with frosted glass styling
- No box, no padding, no shadow on the image
- Cards are interactive, image is purely visual

