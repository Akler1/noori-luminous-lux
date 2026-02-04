

# Revert to Original 3D Carousel After Hero

## Overview

Replace the staggered grid layout with the original 3D carousel component, positioned immediately after the hero section on the light background.

---

## Changes Required

### 1. Update Index.tsx

**Current:**
```tsx
import { Product3DStaggeredGrid } from "@/components/Product3DStaggeredGrid";
...
<HeroSplitEditorial />
<Product3DStaggeredGrid />
<StickyStoryRefined />
```

**Updated:**
```tsx
import Product3DCarousel from "@/components/Product3DCarousel";
...
<HeroSplitEditorial />
<Product3DCarousel />
<StickyStoryRefined />
```

---

## What Gets Restored

The original carousel design includes:

- **3-panel layout**: Previous slide (left) | Current slide (center) | Next slide (right)
- **Navigation arrows**: Chevron buttons on left/right edges
- **Dot pagination**: Expandable dots below the carousel
- **Section header**: "Explore in 3D" + "Best sellers" + "Spin each piece. See the details."
- **"Drag to rotate" hint**: One-time overlay that dismisses on interaction or after 5 seconds
- **Touch/swipe support**: Mobile gesture navigation
- **Keyboard navigation**: Arrow key support
- **XR iframe viewers**: Interactive 3D models users can click and drag to rotate

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/Index.tsx` | **Update** | Replace `Product3DStaggeredGrid` import with `Product3DCarousel` |

---

## Note

The `Product3DStaggeredGrid` component file will remain in the codebase for potential future use, but won't be rendered on the homepage.

