
# Fix Hero Sketch Reveal - Image Alignment and Interaction Coverage

## Issues Identified

1. **Right side of image cut off**: The `drawImageCover` function centers the crop, cutting content from both sides. Since the left side has empty space, we need to use `object-position: right` behavior instead of centering.

2. **Reveal effect only works in one spot**: The coordinate systems between the mask canvas and the sketch rendering are misaligned. The mask stamps at raw coordinates, but the image is drawn with an offset from `drawImageCover`. This mismatch causes the reveal to only appear correct in a specific area where both coordinate systems happen to overlap.

## Solution

### 1. Replace Sketch Image with New Asset

Copy the new user-provided sketch image:
- `user-uploads://hf_20260207_014030_f17ac16e-a32c-4c84-ad00-669397a759ba.png` → `src/assets/hero-sketch.png`

### 2. Fix Image Positioning - Crop from Left, Not Center

Modify `drawImageCover` to use `object-position: right` behavior so the right side (where the jewelry is) stays visible and only the empty left side gets cropped.

```text
Current (centered crop):
┌─────────────────────────────┐
│ cropped │  visible  │ cropped │
│  left   │   area    │  right  │
└─────────────────────────────┘

Fixed (right-aligned crop):
┌─────────────────────────────┐
│ cropped empty │   visible   │
│   left side   │   content   │
└─────────────────────────────┘
```

### 3. Fix Coordinate Alignment Between Mask and Sketch

The root cause of "only works in one spot" is that:
- The mask canvas stamps shapes at raw `(x * dpr, y * dpr)` coordinates
- The sketch image is drawn with an offset from `drawImageCover`
- When compositing with `destination-in`, only the intersection shows

Both must use the same coordinate space. The fix is to NOT use `drawImageCover` offset for the sketch, and instead scale/position the canvas content identically to how CSS `object-cover` positions the base image. 

Actually, the real fix is simpler: **both the base `<img>` and the sketch canvas must be drawn identically**. Since the images are now the same size, we should:

1. Draw the sketch to fill the entire canvas (no offset)
2. Apply the same CSS positioning to both the `<img>` and canvas
3. Use `object-position: right` on the base image to keep the right side visible

### 4. Updated Implementation

**Base image**: Add `object-position: right` class to crop from left
**Sketch canvas**: Draw image to fill canvas completely (both images same size = perfect alignment)
**Mask**: No changes needed - coordinates are correct relative to canvas

## File Changes

| File | Action |
|------|--------|
| `src/assets/hero-sketch.png` | Replace with new image |
| `src/components/HeroSketchReveal.tsx` | Fix image positioning and drawing |

## Code Changes

### HeroSketchReveal.tsx

1. **Remove the complex `drawImageCover` offset logic** for sketch - since both images are now identical size, just draw to fill
2. **Add `object-right` positioning** to base image so it crops from left
3. **Ensure canvas draws sketch in same position** as base image

```typescript
// Base image - crop from left by positioning to right
<img
  src={heroReal}
  className="absolute inset-0 w-full h-full object-cover object-right"
/>

// In animation loop - draw sketch to match object-cover object-right behavior
const drawImageRight = (ctx, img, canvasWidth, canvasHeight) => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  
  let drawWidth, drawHeight, offsetX, offsetY;
  
  if (imgRatio > canvasRatio) {
    // Image is wider - crop from LEFT only
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    offsetX = canvasWidth - drawWidth; // Align to right edge
    offsetY = 0;
  } else {
    // Image is taller - crop top/bottom equally
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    offsetX = 0;
    offsetY = (canvasHeight - drawHeight) / 2;
  }
  
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
};
```

## Expected Result

After these changes:
- The right side of both images (where the jewelry is) will be fully visible
- Empty space on the left will be cropped when the container is narrower than the image
- The reveal effect will work across the entire hero area because both layers use identical positioning
- Mouse movement anywhere on the hero will correctly reveal the sketch underneath
