

## Fix: Duplicate canvas ref causes animation to not render

**Root cause**: Two `<canvas ref={canvasRef}>` elements exist — desktop (line 154) and mobile (line 185). React assigns the ref to the last one (mobile). On desktop, that canvas is hidden via `lg:hidden`, so it has zero dimensions and `drawFrame` silently exits.

### Solution

Use a **single canvas** element placed once, and wrap the layout around it:

**In `src/components/ScrollImageSequence.tsx`:**

1. Place ONE canvas as the first child of the sticky container, absolutely positioned to fill it (`absolute inset-0 w-full h-full`).

2. Desktop layout (`hidden lg:grid lg:grid-cols-2`): left column is an empty spacer div, right column has the info cards. The canvas shows through the left column.

3. Mobile layout (`lg:hidden`): the overlay content sits on top of the canvas as before.

4. The canvas is NOT inside either layout div — it's a sibling that sits behind both.

```text
sticky container
├── <canvas>  (absolute, fills container, single ref)
├── desktop grid (hidden lg:grid)
│   ├── empty spacer (canvas visible behind)
│   └── info cards
└── mobile overlay (lg:hidden)
    └── bottom text + chips
```

This is essentially the same two-column layout with image on left and cards on right — but using one canvas element that actually works.

