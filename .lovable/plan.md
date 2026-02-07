
# Fix Hero Sketch Reveal Effect - Coordinate Alignment

## Root Cause

The coordinate transformation introduced in the last edit is backwards. By subtracting the (negative) image offset from the mask coordinates, we're pushing stamps **further right** instead of aligning them with the sketch.

### How the Coordinate System Works

```text
Canvas coordinate space:
     -400          0                          canvasWidth
       │           │                              │
       ▼           ▼                              ▼
┌──────┬───────────────────────────────────────────┐
│      │                                           │
│ (off │  Visible canvas area (0 to canvasWidth)   │
│  -   │                                           │
│ scr- │  ← Sketch is drawn starting at x = -400   │
│ een) │                                           │
└──────┴───────────────────────────────────────────┘
       ├───────────────────────────────────────────┤
              Sketch image fills this span
              (drawWidth wider than canvas)
```

When mouse is at container position (100, 300):
- Canvas coords: (100 × dpr, 300 × dpr)
- Sketch has pixels here because it extends from -400 to drawWidth-400
- Mask should stamp at **(100 × dpr, 300 × dpr)** - NO offset adjustment needed!

### Current (Broken) Code
```typescript
const x = (clientX - rect.left) * dpr - offset.x;
// If offset.x = -400, this becomes: 200 - (-400) = 600
// Stamps WAY to the right of where the mouse actually is
```

### Fix
```typescript
const x = (clientX - rect.left) * dpr;
// Simple: 200, which is where the sketch pixels ARE on the canvas
```

## Solution

Remove the offset adjustment from `stampShapes`. The mask and sketch share the same canvas coordinate space - when the sketch is drawn with a negative offset, its pixels still exist at positive canvas coordinates. The mask just needs to stamp at the raw canvas position of the mouse.

## File Changes

| File | Change |
|------|--------|
| `src/components/HeroSketchReveal.tsx` | Remove offset subtraction from mask coordinates in `stampShapes` |

## Code Changes

### stampShapes function (lines 199-248)

Remove the offset adjustment - just use raw canvas coordinates:

```typescript
const stampShapes = useCallback((clientX: number, clientY: number) => {
  const container = containerRef.current;
  const maskCanvas = maskCanvasRef.current;
  
  if (!container || !maskCanvas) return;
  
  const rect = container.getBoundingClientRect();
  const dpr = dprRef.current;
  
  // Convert client coordinates to canvas coordinates
  // No offset adjustment needed - mask and sketch share same coordinate space
  const x = (clientX - rect.left) * dpr;
  const y = (clientY - rect.top) * dpr;
  
  // ... rest of function unchanged
}, []);
```

Also clean up unused refs:
- Remove `imageOffsetRef` from the function since it's no longer needed here
- The offset is still calculated and stored in the animation loop for potential future use, but the mask doesn't need it

## Expected Result

After this fix:
- Moving the mouse anywhere on the hero will reveal the sketch
- The reveal effect will work across the entire hero area, including the left side near the text
- The sketch and mask will align perfectly because they share the same coordinate system
