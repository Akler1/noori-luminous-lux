

# Fix Solitaires Grid: No Gaps + Updated Product Catalog (8 Products)

## Overview

Ensure truly zero gaps between cards and update the product list to 3 earrings, 3 pendants, and 2 bracelets -- all using the Round Brilliant placeholder iframe for the 3D animation.

## Product Catalog Update

The 8 products will be:

**Earrings (3):**
1. Round Brilliant Stud -- $1,599 (existing iframe)
2. Emerald Earrings -- $2,299 (existing iframe)
3. Princess Earrings -- $1,899 (existing iframe)

**Pendants (3):**
4. Round Pendant -- $2,599
5. Princess Pendant -- $3,299
6. Emerald Pendant -- $3,599

**Bracelets (2):**
7. Solitaire Bracelet 1ct -- $2,499
8. Solitaire Bracelet 2ct -- $3,499

All pendants and bracelets will use the Round Brilliant placeholder iframe URL since they don't have their own 3D models yet.

## Gap Fix

The grid already has `gap-0`, but there may be residual spacing from card padding/margins or the `Link` wrapper. Will ensure the card component has no outer margin or padding leaking outside the card boundary.

## Files Modified

- `src/pages/Solitaires.tsx` -- Replace the 7-product array with the new 8-product array (3 earrings, 3 pendants, 2 bracelets). Rename "necklace" references to "pendant."
- `src/components/Solitaire3DCard.tsx` -- Minor check to ensure no outer spacing causes gaps between cards.

