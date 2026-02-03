
# Hero Image: Full Display with Seamless White Background

## Overview

Adjust the hero image so that:
1. The full image is displayed (including the hand on the right side)
2. The white areas of the image blend seamlessly with the white page background
3. The image stays in the same position with the bleed effect

---

## Current Issue

The current implementation uses:
- `lg:pr-20` on the container - this creates padding that cuts off the right side of the image
- `object-cover` - this crops the image to fill the container, potentially cutting off the hand

---

## Technical Changes

### File: `src/components/CinematicHero.tsx`

**Image Container (line 83):**
| Property | Current | New |
|----------|---------|-----|
| Right padding | `lg:pr-20` | Remove (no padding) |

**Image Element (line 88):**
| Property | Current | New |
|----------|---------|-----|
| Object fit | `object-cover object-left` | `object-contain object-left` |

---

## Implementation Details

### Changes:

1. **Remove right padding** - The `lg:pr-20` is cutting off the right side of the image. Removing this allows the full image (including the hand) to display.

2. **Switch to `object-contain`** - Instead of `object-cover` (which crops to fill), use `object-contain` which displays the entire image without cropping. Combined with `object-left`, it will anchor the image to the left side.

3. **White background alignment** - Since the page background is already `bg-white`, the white areas in the image will naturally blend with the page background when using `object-contain`.

---

## Result

- Full image visible including the hand
- Image bleeds into the text area on the left (maintained)
- White background in the image seamlessly matches the page white background
- No cropping on any side of the image
