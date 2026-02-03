

# Hero Grid: 3x2 Layout + CTA Bar

## Changes Required

Based on the approved plan to have a full-width image grid with a CTA bar below, we'll now use a **3 columns × 2 rows** layout instead of 2x2.

### 1. Add More Images

Currently using 4 images. Need 6 for a 3x2 grid. Available assets to add:
- `earrings-hero.jpg`
- `earrings-princess.jpg`

### 2. Update Grid Layout

| Property | Before | After |
|----------|--------|-------|
| Grid columns | `grid-cols-2` | `grid-cols-3` |
| Total images | 4 | 6 |

### Visual Result

```text
+---------------------+---------------------+---------------------+
|  IMAGE 1            |  IMAGE 2            |  IMAGE 3            |
|  (lifestyle)        |  (bracelet)         |  (necklace)         |
+---------------------+---------------------+---------------------+
|  IMAGE 4            |  IMAGE 5            |  IMAGE 6            |
|  (product shot)     |  (earrings)         |  (earrings princess)|
+---------------------+---------------------+---------------------+
|  Light, made forever.  •  Subheadline  •  [Shop] [About]       |
+---------------------+---------------------+---------------------+
```

### Technical Changes

**File: `src/components/ImageGridHero.tsx`**

1. **Import 2 additional images:**
   - `earrings-hero.jpg`
   - `earrings-princess.jpg`

2. **Update images array** to include 6 images total

3. **Change grid class:**
   - From: `grid-cols-2`
   - To: `grid-cols-3`

4. **Restructure layout** (from approved plan):
   - Remove side-by-side layout
   - Full-width image grid
   - CTA bar below as a compact horizontal strip with border-top

### File to Modify

| File | Changes |
|------|---------|
| `src/components/ImageGridHero.tsx` | Add 2 image imports, expand images array to 6, change to `grid-cols-3`, restructure to stacked layout with CTA bar below |

