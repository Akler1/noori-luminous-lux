

# Earring Scroll Animation: Crop to Earring on Mobile

## Problem
On mobile, the earring frames are shown using "contain" mode which fits the entire wide image into the viewport. This makes the earring small because the frames have a lot of empty background on both sides.

## Approach
Instead of showing the full frame, crop into the center of the source image on mobile so only the earring is drawn. This is done purely in the canvas `drawImage` call using the **source rectangle** parameters -- no need to modify any image files.

The `drawImage` 9-argument form lets us specify which portion of the source image to sample: `ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)`.

## Changes

**File:** `src/components/ScrollImageSequence.tsx` (lines 75-83, the mobile branch of `drawFrame`)

Replace the current mobile "contain" logic with a "crop then cover" approach:

1. Define a crop factor (e.g., crop to the center 40% of the image width). This removes the excess background on both sides while keeping the earring centered.
2. Calculate the source crop rectangle: `sx = naturalWidth * 0.3`, `sw = naturalWidth * 0.4` (center 40%), full height.
3. Use the cropped source dimensions to compute a new aspect ratio, then apply standard "cover" logic to fill the canvas with this cropped region.
4. Fill the canvas background with black first (in case of any gaps).

```text
// Pseudocode for mobile branch:
cropLeft  = 0.3  (trim 30% from left)
cropWidth = 0.4  (keep center 40%)

sx = img.naturalWidth * cropLeft
sw = img.naturalWidth * cropWidth
sy = 0
sh = img.naturalHeight

croppedRatio = sw / sh
// Then standard cover logic using croppedRatio
// Draw with: ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
```

Desktop branch (lines 84-91) remains completely untouched.

The crop percentages (30% / 40%) can be tuned. 40% of the width should frame the earring tightly while keeping some breathing room. If it needs adjustment, only these two numbers change.

## Desktop Impact
None. The mobile check (`window.innerWidth < 768`) gates this logic entirely.

