

# Fix Earring Crop: Widen to Show Full Earring

## Problem
The current crop takes only the center 40% of the source image width, which cuts into the earring itself. We need a gentler crop that removes the empty background on the sides but keeps the entire earring visible.

## Change

**File:** `src/components/ScrollImageSequence.tsx` (lines 79-80)

Widen the crop from center 40% to center 70%:

- Change `sx` from `img.naturalWidth * 0.3` to `img.naturalWidth * 0.15` (trim only 15% from the left)
- Change `sw` from `img.naturalWidth * 0.4` to `img.naturalWidth * 0.7` (keep center 70%)

This removes ~30% of the empty background (15% from each side) while keeping the full earring in frame. The cover logic then scales this cropped region to fill the mobile viewport, making the earring noticeably larger than the uncropped version.

If this is still too tight or too loose, only these two numbers need adjusting.

## Desktop Impact
None -- the mobile check gates this entirely.

