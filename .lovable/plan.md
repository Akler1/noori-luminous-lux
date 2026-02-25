

# Simplify Best Sellers to a Single Row of Products

## Overview

Remove the lifestyle/model images from the Best Sellers grid and display only product tiles in a single horizontal row. Keep only the 3 products mentioned: Round Brilliant Stud, Princess Pendant (necklace), and a larger bracelet, displayed as a clean 3-column (or 4-column if a 4th is desired) row.

## Changes

**File: `src/components/Product3DCarousel.tsx`**

1. **Remove lifestyle image tiles**: Delete the two `model-image` and `product-image` entries from `gridProducts` (index 0: hero-lifestyle image, index 6: hero-product-shot image)
2. **Keep only 3 products**:
   - `stud-round-14k` (Round Brilliant Stud) - 3D iframe
   - `necklace-princess` (Princess Necklace/Pendant) - 3D iframe
   - `bracelet-five-9k` (Five-Solitaire Bracelet, the larger one) - 3D iframe
3. **Remove all other products** (Emerald Earrings, Princess Earrings, Round Necklace, Emerald Necklace, 3 Stone Bracelet)
4. **Update grid**: Change from `grid-cols-2 md:grid-cols-4` to `grid-cols-1 md:grid-cols-3` for a single row of 3
5. **Remove image-related code**: Remove the `heroLifestyle` and `heroProductShot` imports, the image branch in the render, and the `getCardBackground` helper since all tiles will be 3D (black background)
6. **Uniform aspect ratio**: All tiles use `aspect-[3/4]` since there are no image tiles needing the taller `aspect-[3/5]`
7. **Show product info for all tiles**: Remove the `product.type === "3d"` condition on the info block so all products show name/price

## Technical Details

The `gridProducts` array will be reduced to 3 entries, all of type `"3d"`. The Round Brilliant Stud currently uses `model-image` type with a lifestyle photo -- it will be changed to `"3d"` type using an iframe URL (the same 3D viewer pattern as the other products). If no iframe URL exists for it yet, we can use a placeholder or the existing round gold iframe URL.

The grid simplifies to:
```
Desktop: [Round Stud] [Princess Pendant] [Larger Bracelet]
Mobile:  stacked vertically
```

