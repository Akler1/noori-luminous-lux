

# Mobile Hero - Final Focal Point Adjustment and Canvas Fix

## Problem
1. The pendant is visible but still slightly off from the user's reference screenshot -- needs to shift from 55% to ~50% to center on the specific middle pendant
2. The stale comment on line 34 says "65%" but the multiplier is 0.55 -- needs updating
3. The sketch canvas overlay may still misalign on mobile due to the offset calculation

## What stays the same
- All desktop behavior untouched (md:object-right, 16:9 aspect ratio, pointer-move reveal)
- Text content, CTAs, scroll cue -- unchanged

## Changes

### 1. Shift focal point from 55% to 50% (`HeroSketchReveal.tsx`, line 413)
- Change `object-[55%_center]` to `object-[50%_center]`
- This centers the crop exactly on the middle pendant shown in the user's reference
- Desktop stays at `md:object-right`

### 2. Update canvas offset to match (`HeroSketchReveal.tsx`, line 37)
- Change `0.55` to `0.50` so the sketch overlay canvas aligns with the new image position

### 3. Fix stale comment (`HeroSketchReveal.tsx`, line 34)
- Update comment from "65% from left" to "50% from left"

