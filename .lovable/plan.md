

# Update Product Grid: New Images & Larger Cards

## Overview

Modify the 4x2 product grid to:
1. Change the far right card (position 3) to the original hero lifestyle image
2. Change the third from left card (position 2) to the purse with jewelry product shot
3. Significantly increase the card sizes

---

## Visual Layout After Changes

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Best Sellers                                          │
├──────────────────┬──────────────────┬──────────────────┬──────────────────┤
│                  │                  │                  │                  │
│   [MODEL IMAGE]  │   [3D Viewer]    │ [PRODUCT-SHOT]   │ [LIFESTYLE IMG]  │
│   Round Stud     │   Emerald        │   Purse/Jewelry  │   Hero Lifestyle │
│                  │   Earrings       │                  │                  │
│                  │                  │                  │                  │
├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│                  │                  │                  │                  │
│   [3D Viewer]    │   [3D Viewer]    │ [PRODUCT IMAGE]  │   [3D Viewer]    │
│   Princess       │   Emerald        │   Bracelet       │   Five-Stone     │
│   Necklace       │   Necklace       │                  │   Bracelet       │
│                  │                  │                  │                  │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

**Image Positions:**
- Position 0 (top-left): Model image — `hero-solitaires-collection.png` (unchanged)
- Position 2 (third from left): Product shot — `hero-product-shot.png` (NEW)
- Position 3 (far right): Lifestyle image — `hero-lifestyle.png` (NEW)
- Position 6 (bottom third): Product image — `bracelet-hero.jpg` (unchanged)

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Product3DCarousel.tsx` | **Update** | Add new image imports, update product types, increase card sizes |

---

## Technical Details

### 1. New Image Imports

Add imports for the two new lifestyle/product images:

```tsx
import heroLifestyle from "@/assets/hero-lifestyle.png";
import heroProductShot from "@/assets/hero-product-shot.png";
```

### 2. Update Product Data

Modify positions 2 and 3 in the `gridProducts` array:

- **Position 2** (Princess Earrings): Change from `type: "3d"` to `type: "product-image"` with `image: heroProductShot`
- **Position 3** (Round Necklace): Change from `type: "3d"` to `type: "model-image"` with `image: heroLifestyle`

### 3. Update Background Logic

Update `getCardBackground` function to handle the new image positions:

```tsx
const getCardBackground = (index: number, type: string): string => {
  if (type === "3d") return "xr-tile";
  // Different shades for image cards
  if (index === 0) return "bg-[#f5f5f5] border-border/30";
  if (index === 2) return "bg-[#f0f0f0] border-border/30";
  if (index === 3) return "bg-[#ebebeb] border-border/30";
  return "bg-[#eaeaea] border-border/30";
};
```

### 4. Increase Card Sizes

Modify the grid and aspect ratio to make cards larger:

**Current grid:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
```

**Updated to larger gaps and aspect ratio:**
```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
  {/* Increase aspect ratio from square to taller */}
  <div className="aspect-[4/5] relative overflow-hidden">
```

This changes:
- Grid gap: `gap-4 md:gap-6` → `gap-6 md:gap-8`
- Card aspect: `aspect-square` → `aspect-[4/5]` (20% taller)

---

## Card Background Color Summary

| Position | Card Type | Background | Notes |
|----------|-----------|------------|-------|
| 0 | Model Image | `bg-[#f5f5f5]` | Lightest grey |
| 1 | 3D Viewer | `xr-tile` (black) | Interactive |
| 2 | Product Shot | `bg-[#f0f0f0]` | Light grey (NEW) |
| 3 | Lifestyle Image | `bg-[#ebebeb]` | Warm grey (NEW) |
| 4-5 | 3D Viewers | `xr-tile` (black) | Interactive |
| 6 | Product Image | `bg-[#eaeaea]` | Warm grey |
| 7 | 3D Viewer | `xr-tile` (black) | Interactive |

