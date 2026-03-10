

## Fix: Image on LEFT, cards on RIGHT — side by side, no background

**What you want**: A two-column layout where the earring animation is on the left side and the info cards are on the right side. The image is NOT a background — it's contained in its own column. No padding, no box, no border-radius around the image.

**What's wrong now**: The canvas fills the entire viewport as a background, and the grid sits on top of it. That's not what you asked for.

### Changes in `src/components/ScrollImageSequence.tsx`

1. **Restructure the sticky container** — Replace the current "canvas as background + grid overlay" with a proper two-column grid where:
   - Left column: contains the canvas directly (not absolute-positioned, just `w-full h-full`)
   - Right column: contains the info cards

2. **Canvas positioning** — Remove `absolute inset-0` from canvas. Place it inside the left grid column as a regular element. It fills that column naturally.

3. **Desktop `drawFrame`** — Use contain-fit centered within the left column (not cover-fit which was for full-screen background). No background fill — transparent canvas.

4. **Remove `positionCanvas`** — No longer needed. Canvas lives in the grid column naturally.

5. **Grid markup**:
```text
┌──────────────────────────────────────────┐
│  sticky container (h-screen, grid 2-col) │
│  ┌──────────────┐  ┌──────────────┐      │
│  │   canvas      │  │  card 1      │      │
│  │   (earring    │  │  card 2      │      │
│  │    animation) │  │  card 3      │      │
│  └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────┘
```

6. **Mobile** — unchanged (full-screen canvas + bottom overlay).

