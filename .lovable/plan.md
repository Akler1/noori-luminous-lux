

## Remove extra padding between Best Sellers and earring animation

The product card text areas use `p-4 md:p-6` which adds bottom padding. To tighten the gap without affecting the card layout, we'll reduce the bottom padding on the product info text area inside each card.

### Change in `src/components/Product3DCarousel.tsx`

**Line 124**: Change `p-4 md:p-6` to `px-4 pt-4 pb-1 md:px-6 md:pt-6 md:pb-2` — keeps horizontal and top padding but reduces bottom padding significantly.

