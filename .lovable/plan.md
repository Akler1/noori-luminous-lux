
# Fix Hero Text Alignment and Sketch Reveal Coverage

## Issues Identified

### 1. Text Not Hugging Left Edge
The hero text is wrapped in:
- `container-editorial` - has 64px padding on desktop, 20px on mobile
- `max-w-xl` - limits text block width

The text starts at the container's padding boundary, not the actual screen edge.

### 2. Reveal Effect Only Works on Right Side
This is a **coordinate system mismatch**:

```text
Canvas coordinate space:
┌────────────────────────────────────────┐
│ offsetX (negative)                     │
│  ←───────┐                             │
│          │ Sketch image drawn here     │
│          ├────────────────────────────►│
│          │                             │
└────────────────────────────────────────┘

Mask coordinate space:
┌────────────────────────────────────────┐
│ x=0                                    │
│ ↓                                      │
│ Mask stamps at raw (x,y) relative      │
│ to container, starting from left       │
└────────────────────────────────────────┘
```

When the cursor is on the left side of the hero:
- Mask stamps at position (100, 300) for example
- Sketch image was drawn starting at offsetX = -500
- Position (100, 300) in the mask corresponds to empty space in the sketch
- Result: no visible reveal on the left side

## Solution

### Fix 1: Move Text Content Outside Container Padding

Remove the container wrapper from the hero text and position it with explicit left padding to align with the screen edge (or a smaller offset for visual polish).

```text
Current:
┌─────────────────────────────────────────┐
│ [64px padding] │ Text content │ [64px] │
└─────────────────────────────────────────┘

Fixed:
┌─────────────────────────────────────────┐
│[20px]│ Text content                     │
└─────────────────────────────────────────┘
```

### Fix 2: Align Mask Coordinates with Sketch Image Position

When stamping the mask, we need to offset the coordinates by the same amount as the sketch image offset. This way, when you mouse over the left side of the container, the mask stamps at the corresponding position on the sketch.

The fix requires:
1. Calculate the image offset in `drawImageCoverRight`
2. Store this offset in a ref
3. Apply the same offset when stamping shapes to the mask

```typescript
// Store the offset used when drawing the sketch
const imageOffsetRef = useRef({ x: 0, y: 0 });

// In animation loop when drawing sketch:
const offset = getImageCoverRightOffset(sketchImg, canvasWidth, canvasHeight);
imageOffsetRef.current = offset;
ctx.drawImage(sketchImg, offset.x, offset.y, offset.width, offset.height);

// In stampShapes, offset the mask coordinates:
const stampX = (clientX - rect.left) * dpr - imageOffsetRef.current.x;
const stampY = (clientY - rect.top) * dpr - imageOffsetRef.current.y;
```

Wait - this is backwards. The mask needs to stay at raw coordinates, but the sketch needs to be drawn at the same scale. Actually, the issue is simpler:

**Both the mask AND the sketch need to use the same coordinate system.** The mask is already at canvas coordinates. The sketch should be drawn to fill the entire canvas (matching the mask), but then the CSS `object-right` on the base image handles the visual positioning.

The real fix: **Don't use `drawImageCoverRight` for the sketch canvas.** Instead, make the sketch canvas use the same object-cover + object-right positioning via CSS, just like the base image. This way:
- Base `<img>` uses CSS `object-cover object-right`
- Sketch canvas uses CSS `object-cover object-right` on a nested `<img>` that we then copy to canvas

Actually, the cleanest solution is:
1. Draw the sketch to fill the entire canvas (no offset)
2. Use CSS `object-position: right` on the canvas element itself
3. Let CSS handle the cropping, keeping both layers aligned

But canvas doesn't support `object-fit`/`object-position` CSS properties directly on the element.

**Better approach**: Transform the mask coordinates to match the sketch offset.

## File Changes

| File | Action |
|------|--------|
| `src/components/HeroSplitEditorial.tsx` | Remove container padding from text, position at left edge |
| `src/components/HeroSketchReveal.tsx` | Fix mask/sketch coordinate alignment |

## Technical Implementation

### HeroSplitEditorial.tsx

Replace the container-editorial wrapper with explicit positioning:

```tsx
{/* Text content - positioned at left edge */}
<div className="relative z-10 h-full min-h-[100svh] md:min-h-0 md:absolute md:inset-0 flex items-end pb-16 md:pb-24 px-5 md:px-8">
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-xl"
  >
    {/* ... text content unchanged ... */}
  </motion.div>
</div>
```

### HeroSketchReveal.tsx

Fix the coordinate alignment by:
1. Calculate and store the image offset when drawing
2. Transform mask stamp coordinates to match the sketch image position

```typescript
// New ref to store the current image offset
const imageOffsetRef = useRef({ x: 0, y: 0 });

// Modified draw function that returns offset info
const calculateImageCoverRightOffset = (
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) => {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  
  if (imgRatio > canvasRatio) {
    const drawHeight = canvasHeight;
    const drawWidth = canvasHeight * imgRatio;
    return {
      x: canvasWidth - drawWidth, // Negative offset
      y: 0,
      width: drawWidth,
      height: drawHeight
    };
  } else {
    const drawWidth = canvasWidth;
    const drawHeight = canvasWidth / imgRatio;
    return {
      x: 0,
      y: (canvasHeight - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight
    };
  }
};

// In animation loop:
const offset = calculateImageCoverRightOffset(sketchImg, canvasWidth, canvasHeight);
imageOffsetRef.current = { x: offset.x, y: offset.y };
ctx.drawImage(sketchImg, offset.x, offset.y, offset.width, offset.height);

// In stampShapes - transform coordinates to match sketch image space:
// The sketch is drawn at offset.x (which is negative when cropped from left)
// So we need to stamp the mask at the corresponding position
const maskX = (clientX - rect.left) * dpr;
const maskY = (clientY - rect.top) * dpr;

// But we also need to draw the mask at a position that will align
// with where the sketch pixels actually are
// Since sketch is drawn with offset, mask shapes also need offset
const adjustedX = maskX - imageOffsetRef.current.x;
const adjustedY = maskY - imageOffsetRef.current.y;
```

Wait, I need to think about this more carefully. The mask is applied using `destination-in` compositing:
1. Draw sketch image (with offset)
2. Apply mask with `destination-in` (keeps sketch pixels where mask has alpha)

So the mask should be stamped at the **raw canvas coordinates** (not offset), because the sketch image overlaps with the mask at those coordinates. The issue is that when the sketch has a negative offsetX, the left side of the canvas has no sketch pixels there - so even if the mask has alpha, there's nothing to reveal.

The fix is actually: **Draw the mask at the same offset as the sketch**. If the sketch is drawn at offsetX = -500, then a mouse position at x = 100 should stamp the mask at x = 100 - (-500) = 600, which is where the corresponding sketch pixels are.

No wait, that's still wrong. Let me think again...

The sketch is drawn from (offsetX, offsetY) to (offsetX + drawWidth, offsetY + drawHeight).
The mask fills the canvas from (0, 0) to (canvasWidth, canvasHeight).
After `destination-in`, only the overlapping region shows.

For a mouse position at container-relative (px, py):
- Canvas coordinates: (px * dpr, py * dpr)
- We stamp mask at these coordinates
- If px * dpr < -offsetX (the left edge where sketch starts), the mask stamp is outside the sketch drawing area

**The solution**: Stamp the mask at coordinates that correspond to the sketch image.

Actually, the simplest fix is to **NOT offset the sketch image** and instead draw it stretched to fill the canvas entirely. Then use a mask that also fills the canvas. The base `<img>` handles the visual cropping via CSS. The sketch canvas will be slightly distorted, but since both images are identical size and the mask reveals small areas at a time, it won't be noticeable.

But wait - the user said the images are the exact same size. If they're the same size and we draw both to fill the canvas (same distortion), they should still align perfectly.

## Simplified Solution

1. **Text positioning**: Remove container-editorial padding, use explicit smaller padding
2. **Sketch/mask alignment**: Draw sketch to fill entire canvas (simple stretch), no offset. Since base image uses `object-cover object-right`, there will be a slight mismatch, BUT since the user's images are the same size, the mismatch is only in how the image is cropped at edges - the content will still align in the visible area.

Actually no - if the base uses object-cover (crops) and canvas uses stretch, they won't align at all.

## Correct Solution

The issue is that we need the sketch to be drawn with the EXACT same positioning as the base image. Since CSS `object-cover object-right` is complex to replicate perfectly, and the mask needs to work in the same coordinate space, the best approach is:

**Store the offset from `drawImageCoverRight` and adjust the mask coordinates accordingly.**

When stamping shapes:
- Raw mouse position: (mx, my) in CSS pixels
- Canvas position: (mx * dpr, my * dpr)
- Sketch image offset: (offsetX, offsetY) from drawImageCoverRight
- To stamp at the corresponding sketch position: stamp at (mx * dpr, my * dpr) directly

Wait, the mask and sketch share the same canvas coordinate system. The sketch is drawn at an offset. When we apply destination-in, only sketch pixels with mask alpha remain.

If sketch starts at offsetX = -400, then:
- Canvas positions 0-399 have no sketch pixels (blank)
- Canvas positions 400+ have sketch pixels

If user hovers at canvas position 200, mask stamps there, but no sketch to reveal.

**Fix: Also offset the mask.**

Draw the mask at the same offset as the sketch. When compositing, they'll align.

Actually simpler: **Draw the mask AND sketch both at offset 0, and let both stretch to fill.** The base image uses object-cover for display, but for the reveal effect, we use a stretched version. Since the images are identical size, the stretch will be the same for both, and they'll align. The visual mismatch with the base image at the very edges is acceptable since the reveal is meant for the center of the interaction.

Let me go with the proper coordinate fix approach.
