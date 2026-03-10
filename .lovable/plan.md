

## Fix: Opaque card hiding the canvas

**Root cause**: The desktop grid container is `z-10`. Inside it, `cardRef` has `bg-[hsl(var(--background))]` (opaque white). The canvas is `z-[5]` — below the grid. The card covers the canvas completely.

### Changes — `src/components/ScrollImageSequence.tsx`

1. **`cardRef` (line 196)**: Remove opaque background and shadow. This div is only a positioning reference — it must be fully transparent: `bg-transparent` only, no shadow.

2. **Canvas z-index (line 189)**: Raise to `z-[15]` so it renders above the `z-10` grid layout. Add `pointer-events-none` so it doesn't block clicking the info cards.

3. **`positionCanvas` (line 127-128)**: Add `boxShadow` back to canvas for the card aesthetic (subtle, not black-bar-causing). Keep `borderRadius`.

4. **Info cards container (line 200)**: Add `pointer-events-auto` so clicks still work despite canvas overlay.

Four small line edits, same file.

