

# Mobile Hero - Refine Pendant Focus and Fix Sketch Effect

## Problem
1. The pendant focal point at 65% is slightly off -- the two main pendants sit closer to 55% from the left based on the reference image
2. The sketch reveal effect on mobile doesn't work well because `handlePointerMove` returns early for mobile (`if (isMobile) return`), and the tap handler only fires on explicit taps, making the effect feel unresponsive

## What stays the same
- All desktop behavior is completely untouched (md: breakpoints, 16:9 aspect ratio, pointer-move reveal)
- Text content, CTAs, scroll cue -- unchanged

## Changes

### 1. Adjust focal point from 65% to 55% (`HeroSketchReveal.tsx`, line 415)
- Change `object-[65%_center]` to `object-[55%_center]`
- This shifts the crop point left, centering the two main pendants as shown in the reference image
- Desktop stays at `md:object-right`

### 2. Match canvas offset to new focal point (`HeroSketchReveal.tsx`, line 37)
- Change the mobile offset multiplier from `0.65` to `0.55` so the sketch overlay canvas aligns with the updated image position

### 3. Improve mobile sketch effect (`HeroSketchReveal.tsx`, lines 347-358, 379-400)
- Allow `touchmove` / `pointermove` events to work on mobile instead of blocking them entirely. Currently line 348 has `if (isMobile) return` which kills the drag-to-reveal experience
- Remove the early return so mobile users can drag their finger to reveal the sketch, same as desktop mouse movement
- Keep the tap handler as a fallback for quick taps, but also allow continuous touch-drag interaction
- This makes the effect feel natural and responsive on mobile

### Technical Details

**Image position (`line 415`)**:
```
object-[55%_center] md:object-right
```

**Canvas offset (`line 37`)**:
```
x: -(maxShift * 0.55)
```

**Mobile pointer move (`line 348`)**:
Remove the `if (isMobile) return;` guard so touch-drag reveals the sketch on mobile. The `pointerMove` event already fires for touch input, making the experience consistent across devices.

