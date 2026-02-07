
# Hero "Random Reveal" Sketch Mask Effect

## Overview

Create an interactive hero experience where the real photo is visible by default, but moving the cursor "paints" random irregular shapes that temporarily reveal a pencil sketch version underneath. When the cursor stops, the revealed areas fade back to the real photo.

## Assets Required

The user has provided two images:
1. **Real photo**: Color jewelry on marble (to be copied as `hero-real.png`)
2. **Sketch version**: Pencil drawing of the same scene (to be copied as `hero-sketch.png`)

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│  HeroSplitEditorial.tsx                                 │
│  ├── HeroSketchReveal (new component)                   │
│  │   ├── <img> real photo (base layer, always visible)  │
│  │   ├── <canvas> sketch overlay (masked by alpha)      │
│  │   └── <canvas> offscreen mask (tracks reveal areas)  │
│  ├── Text content overlay (unchanged)                   │
│  └── Scroll cue (unchanged)                             │
└─────────────────────────────────────────────────────────┘
```

## Implementation Details

### New Component: `HeroSketchReveal.tsx`

**State & Refs:**
- `canvasRef`: Main visible canvas for sketch overlay
- `maskCanvasRef`: Offscreen canvas storing alpha mask
- `lastMoveTime`: Tracks when cursor last moved (for idle detection)
- `hasInteracted`: Controls hint visibility

**Core Logic:**

1. **On pointer move:**
   - Stamp 3-7 random blob/shard shapes onto the mask canvas near cursor
   - Each shape has random offset (±40px), size (60-160px), rotation
   - Shapes use soft edges (blur) for premium feel
   - Update `lastMoveTime`

2. **Animation frame loop:**
   - Fade mask canvas slightly each frame:
     - Active movement: slow fade (accumulates)
     - Idle (>150ms): faster fade (returns to normal)
   - Render sketch image to visible canvas
   - Apply mask as alpha (destination-in compositing)

3. **On mouse leave:**
   - Continue fading until mask clears completely

**Mobile behavior:**
- On tap: briefly reveal sketch (1.2s) then fade back
- No continuous cursor tracking

### Shape Generation

```text
Blob shapes:
- Use bezier curves to create organic, irregular outlines
- Apply gaussian blur (8-12px) for soft edges

Shard shapes:
- 5-8 point polygons with random vertex positions
- Slight rotation for variety
```

### Hint Overlay

- Shows "Move to reveal" on first hover
- Fades out after 1.5s or after user moves
- Only appears once per session

## File Changes

| File | Action |
|------|--------|
| `src/assets/hero-real.png` | Copy from user upload |
| `src/assets/hero-sketch.png` | Copy from user upload |
| `src/components/HeroSketchReveal.tsx` | **New** - Canvas-based reveal effect |
| `src/components/HeroSplitEditorial.tsx` | Update to use new component |

## Technical Notes

### Canvas Compositing

```text
Main canvas rendering (each frame):
1. Clear canvas
2. Draw sketch image full-size
3. Set globalCompositeOperation = 'destination-in'
4. Draw maskCanvas (only sketch pixels where mask has alpha remain)
```

### Fade Algorithm

```text
Each frame:
- Get mask image data
- Multiply each alpha value by decay factor:
  - Active: 0.98 (slow, accumulates)
  - Idle: 0.92 (fast, clears in ~2s)
- Put modified image data back
```

### Performance Considerations

- Use `requestAnimationFrame` for smooth 60fps
- Only process mask when needed (skip if fully transparent)
- Debounce resize handler
- Use `will-change: transform` on canvas for GPU acceleration

## Visual Tuning

| Parameter | Value |
|-----------|-------|
| Shape count per move | 3-7 |
| Shape size range | 60-160px |
| Offset range | ±40px |
| Blur radius | 10px |
| Sketch opacity | 0.85 (slightly translucent) |
| Active fade factor | 0.98 |
| Idle fade factor | 0.92 |
| Idle threshold | 150ms |
| Mobile reveal duration | 1.2s |
