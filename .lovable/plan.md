
# Fix Hero Sketch Reveal - Image Alignment and Interaction Coverage

## Issues Identified

1. **Effect only works in the right corner**: The canvas and mask coordinate system is misaligned with the visible container area. The DPR (device pixel ratio) scaling is applied multiple times, causing coordinates to be off.

2. **Images don't overlap exactly**: The base `<img>` uses `object-cover` (which centers and crops the image to fill the container), but the canvas uses `drawImage(sketchImg, 0, 0, width, height)` (which stretches to fill). These produce different visual results when images don't match the container's aspect ratio.

3. **Need to swap images**: Replace current `hero-real.png` and `hero-sketch.png` with the user's newly provided images.

## Technical Analysis

### Current Image Rendering Mismatch

```text
<img> with object-cover:
┌─────────────────────────────┐
│   (cropped left/right)      │
│ ╔═══════════════════════╗   │  ← Image centers and crops
│ ║     Visible Area      ║   │     to maintain aspect ratio
│ ╚═══════════════════════╝   │
│                             │
└─────────────────────────────┘

Canvas with drawImage(0, 0, width, height):
┌─────────────────────────────┐
│ Image stretches to fit      │  ← Distorts or misaligns
│ the full canvas area        │     if aspect ratio differs
└─────────────────────────────┘
```

### Canvas Coordinate Bug

The `updateCanvasSize` function scales the context by DPR, but this scaling persists and compounds when `stampShapes` also applies DPR scaling via `maskCtx.setTransform` and `scale(dpr, dpr)`. This causes coordinates to drift.

## Solution

### 1. Replace Images with New Assets

Copy the user-provided images to replace the existing ones:
- New real photo: `user-uploads://hf_20260205_223400_e8d6ee3c-16dd-4980-a377-4f6c983732fa-2.png` → `src/assets/hero-real.png`
- New sketch: `user-uploads://hf_20260207_003219_a9092a6d-952b-4ccb-b27d-e97745eceaaf_1.png` → `src/assets/hero-sketch.png`

### 2. Fix Canvas Image Drawing to Match object-cover

Implement a custom `drawImageCover` function that replicates CSS `object-cover` behavior:

```typescript
const drawImageCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  
  let drawWidth, drawHeight, offsetX, offsetY;
  
  if (imgRatio > canvasRatio) {
    // Image is wider - crop horizontally
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
    offsetY = 0;
  } else {
    // Image is taller - crop vertically
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  }
  
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
};
```

### 3. Fix DPR/Coordinate Handling

Simplify the coordinate system by:
- Resetting transforms before each operation
- Using consistent scaling
- Not double-applying DPR in multiple places

| Location | Current | Fixed |
|----------|---------|-------|
| `updateCanvasSize` | Scales context by DPR (persists) | Only set canvas dimensions |
| `stampShapes` | Resets and re-scales by DPR | Use simple coordinates without extra scaling |
| Animation loop | Resets and re-scales by DPR | Handle DPR only when drawing final output |

### 4. Add Performance Optimization

Add `willReadFrequently: true` to the mask canvas context to fix the console warning.

## File Changes

| File | Action |
|------|--------|
| `src/assets/hero-real.png` | Replace with new image |
| `src/assets/hero-sketch.png` | Replace with new image |
| `src/components/HeroSketchReveal.tsx` | Fix canvas drawing and coordinate handling |

## Code Changes Summary

### HeroSketchReveal.tsx

1. **Add `drawImageCover` helper function** to replicate `object-cover` CSS behavior on canvas
2. **Fix canvas sizing** - don't scale context during resize, handle DPR properly
3. **Fix `stampShapes`** - use canvas-relative coordinates without extra DPR transforms
4. **Fix animation loop** - use `drawImageCover` for sketch image, handle transforms correctly
5. **Add `willReadFrequently: true`** option to mask canvas context

### Expected Result

After these changes:
- The sketch reveal effect will work across the entire hero area, not just the corner
- The real photo and sketch will overlap pixel-perfectly since both use the same `object-cover` logic
- Movement anywhere on the hero will reveal the sketch
- The transition will be smooth and seamless
