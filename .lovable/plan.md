

# Scroll-Driven Image Sequence (Apple-Style)

## Overview

Add a premium scroll-linked earring animation between the Best Sellers grid and the story section. As the user scrolls, 49 pre-uploaded frames play in sequence on a canvas. On the final frame, annotated callouts animate in to highlight product details.

## Placement

The current Index page order is:

```text
HeroSplitEditorial
Product3DCarousel  (Best Sellers)
  -- NEW: ScrollImageSequence --
StickyStoryRefined
SocialFeed
FinalCTAForm
Footer
```

Only `Index.tsx` layout changes; no existing sections are moved or restyled.

## New Component: `src/components/ScrollImageSequence.tsx`

### Props

| Prop | Default | Purpose |
|------|---------|---------|
| `basePath` | required | Folder path, e.g. `/earing_frames` |
| `frameCount` | required | Total frames (49) |
| `ext` | `"webp"` | File extension |
| `pad` | `4` | Zero-padding width for filenames |
| `scrollVh` | `180` | Total scroll height of the wrapper in vh units |
| `maxWidth` | `1800` | Max canvas width in px |

### Frame Preloading

- On mount, create 49 `Image()` objects and set their `src` to each frame URL.
- Store them in a `useRef` array. No loading UI -- the canvas simply starts rendering once any frame is loaded.

### Canvas Rendering

- A `<canvas>` element inside a sticky container (`position: sticky; top: 0; height: 100vh`).
- The outer wrapper div has `height: ${scrollVh}vh` to create the scroll range.
- On every scroll tick (via `requestAnimationFrame`):
  1. Compute `t` = scroll progress within the wrapper section (0 to 1).
  2. `frameIndex = Math.round(t * (frameCount - 1))`
  3. Draw that frame to canvas using `drawImage`.
- Canvas resolution uses `devicePixelRatio` (capped at 2) for sharpness.
- A `resize` listener redraws at the correct size.

### Last-Frame Callouts

When `frameIndex === frameCount - 1`, an HTML overlay fades in with 3 callouts:

1. **Main Stone** -- label pointing to the center diamond
2. **Pave Stones** -- label pointing to the surrounding stones
3. **Earring Post** -- label pointing to the post/back

Each callout consists of:
- A small dot at the anchor point (percentage-positioned)
- A thin leader line (animates `scaleX` from 0 to 1)
- A rounded info box with backdrop blur and soft shadow

Positions are defined as editable constants at the top of the file:

```ts
const CALLOUTS = [
  { label: "Main Stone", anchorX: 50, anchorY: 35, boxX: 72, boxY: 30 },
  { label: "Pave Stones", anchorX: 45, anchorY: 55, boxX: 20, boxY: 58 },
  { label: "Earring Post", anchorX: 52, anchorY: 78, boxX: 75, boxY: 80 },
];
```

Animation behavior:
- **In**: fade + slight translateY, line draws via `scaleX(0 -> 1)`, staggered 120ms apart, ~500ms total
- **Out**: reverse when scrolling back off the last frame

### Styling

- Tailwind utilities throughout
- Callout boxes: `bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full px-4 py-1.5 text-sm text-white/90`
- Leader lines: `h-px bg-white/40`
- Dots: `w-2 h-2 rounded-full bg-white/60`
- No loud colors, no sparkles

## File Changes

### 1. Create `src/components/ScrollImageSequence.tsx`

New component with all logic described above (~180 lines).

### 2. Edit `src/pages/Index.tsx`

- Add import for `ScrollImageSequence`
- Insert between `Product3DCarousel` and `StickyStoryRefined`:

```tsx
<Product3DCarousel />
<ScrollImageSequence
  basePath="/earing_frames"
  frameCount={49}
  ext="webp"
  scrollVh={180}
  maxWidth={1800}
/>
<StickyStoryRefined />
```

No other files are modified.
