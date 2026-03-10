

## Fix: White padding and black bar in earring card

**Problems identified:**

1. **White padding below/above image**: `drawFrame` uses contain-fit on desktop, which leaves empty space when the image aspect ratio doesn't match the card's. Fix: switch to **cover-fit** (crop-to-fill) on desktop so the earring fills the entire card with no gaps.

2. **Black bar on the right**: The canvas `boxShadow` and positioning can create visual artifacts at edges. Will clean up shadow and ensure canvas clips cleanly within the card bounds.

### Changes — `src/components/ScrollImageSequence.tsx`

1. **`drawFrame` — desktop branch (lines 97-105)**: Replace contain-fit with cover-fit logic. Instead of fitting the image inside the canvas (leaving empty space), scale the image to cover the full canvas area and crop overflow. This is the same logic but with the ratio comparison flipped.

2. **`positionCanvas` (lines 116-128)**: Remove `boxShadow` from canvas inline styles — it's causing the dark edge artifact. Apply `overflow-hidden` clipping from the parent instead.

3. **Card placeholder (line 196)**: Add `shadow-lg` to the `cardRef` div itself for the subtle card shadow, and ensure `overflow-hidden` clips the canvas content cleanly. Change from `bg-transparent` to `bg-[#faf9f7]` so any sub-pixel gaps match the section background.

**Cover-fit logic for desktop:**
```ts
// Cover-fit: image fills entire canvas, crops overflow
if (imgRatio > canvasRatio) {
  dh = h; dw = h * imgRatio; dx = (w - dw) / 2; dy = 0;
} else {
  dw = w; dh = w / imgRatio; dx = 0; dy = (h - dh) / 2;
}
```

Single file, three small edits.

