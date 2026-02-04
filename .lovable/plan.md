

# Move 3D Grid After Hero with White Background

## Overview

Reposition the 3D staggered grid section to appear immediately after the hero, and change its background from dark to white/light to match the site's editorial aesthetic.

---

## Changes Required

### 1. Reorder Components in Index.tsx

**Current order:**
```
Hero → StickyStory → 3D Grid → SocialFeed → StoryDuo → FinalCTA
```

**New order:**
```
Hero → 3D Grid → StickyStory → SocialFeed → StoryDuo → FinalCTA
```

---

### 2. Update Product3DStaggeredGrid.tsx Styling

**Background Change:**
- Remove: `dark-section bg-[hsl(220,30%,5%)]`
- Add: `bg-background` (warm off-white)

**Text Colors:**
- Product titles: `text-foreground` instead of `text-white/90`
- Gold accent tag: stays `text-accent`
- Hover state: stays `text-accent`

**Loading State:**
- Remove dark background styling
- Use light skeleton style

---

### 3. Click-and-Drag Rotation

The 3D rotation functionality is already built into the external XR viewer iframes (hosted on `akler1.github.io`). No changes needed - users can already click and drag to rotate the 3D models within each card.

---

## File Changes Summary

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Move `<Product3DStaggeredGrid />` before `<StickyStoryRefined />` |
| `src/components/Product3DStaggeredGrid.tsx` | Change background from dark to light, update text colors |

---

## Visual Result

The 3D cards will now appear on the warm off-white background directly below the hero, with black bracket-bordered tiles containing the interactive 3D viewers. Users can click and drag to rotate each product.

