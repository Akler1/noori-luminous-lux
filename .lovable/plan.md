

## Update homepage Best Sellers carousel with correct 3D renderings + fix build error

### 1. Fix build error in `src/components/FeaturedProducts.tsx`
- Line 65: Remove `originalPrice={product.originalPrice}` — the property doesn't exist in the product data.

### 2. Update `src/components/Product3DCarousel.tsx` product data
Replace the `gridProducts` array with the correct iframe URLs matching the Solitaires collection page. The current carousel has 4 products with some using placeholder URLs. Update to use the actual 3D viewer URLs:

| Product | Current iframeUrl | Correct iframeUrl |
|---|---|---|
| Round Solitaire Studs | ✅ Already correct | (same) |
| Emerald Solitaire Studs | ✅ Already correct | (same) |
| Princess Solitaire Pendant → **Round Solitaire Pendant** | placeholder round URL | `https://akler1.github.io/round-y_zoomed/` |
| Three-Stone Bracelet → **Solitaire Bracelet** | placeholder round URL | `https://akler1.github.io/Bracelet1Yellow/Bracelet1%20Yellow.2.html` |

Also update names/prices to match the collection:
- "Princess Solitaire Pendant" ($1,748) → "Round Solitaire Pendant" ($1,748) with pendant-specific URL
- "Three-Stone Bracelet" ($2,528) → "Solitaire Bracelet" ($2,528) with bracelet-specific URL

### Technical details
- Both changes are single-file edits with no structural impact
- The iframe URLs come directly from the Solitaires collection page data

