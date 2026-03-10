

## Fix: White box hiding the earring animation

**Root cause**: The `cardRef` div (line 193-196) has `bg-[#faf9f7]` and sits at `z-10`, while the canvas is at `z-0`. The opaque card covers the canvas entirely, producing a white box.

**Fix in `src/components/ScrollImageSequence.tsx`**:

1. Remove `bg-[#faf9f7]` and `shadow-lg` from the `cardRef` div — it's only a layout reference for `positionCanvas()` to read dimensions. It must be transparent.
2. Move the canvas `z-index` to `z-[5]` so it renders above the transparent card placeholder but below the right-column info cards.
3. Keep the `shadow-lg` and rounded appearance on the canvas itself via `positionCanvas()` (already sets `borderRadius: 1rem`). Add a subtle `box-shadow` inline style to the canvas on desktop for the card effect.

Single file change, three lines affected.

