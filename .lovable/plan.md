
# Match Bulgari-Style Full-Width Product Grid

## Overview

Transform the current product grid to match the Bulgari reference image exactly:
1. **Top-left (Position 0)**: Lifestyle image (hero-lifestyle.png) - currently at position 3
2. **Bottom third from left (Position 6)**: Product shot (hero-product-shot.png) - currently at position 2
3. **Full-screen cards**: Remove all container padding, no gaps between cards, edge-to-edge layout

---

## Visual Layout to Match Reference

```text
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ FULL WIDTH - NO PADDING - NO GAPS                                                     │
├─────────────────┬─────────────────┬─────────────────┬─────────────────┤
│                 │                 │                 │                 │
│  [LIFESTYLE]    │   [3D Viewer]   │   [3D Viewer]   │   [3D Viewer]   │
│  hero-lifestyle │   Emerald       │   Princess      │   Round         │
│  (model image)  │   Earrings      │   Earrings      │   Necklace      │
│                 │                 │                 │                 │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│                 │                 │                 │                 │
│   [3D Viewer]   │   [3D Viewer]   │ [PRODUCT SHOT]  │   [3D Viewer]   │
│   Princess      │   Emerald       │ hero-product    │   Five-Stone    │
│   Necklace      │   Necklace      │ (purse/jewelry) │   Bracelet      │
│                 │                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
```

---

## Key Style Changes (Matching Reference)

| Element | Current | Reference Style |
|---------|---------|-----------------|
| Container | `container-editorial` (max-width, padding) | Full viewport width, no max-width |
| Grid gaps | `gap-6 md:gap-8` | `gap-0` or `gap-[1px]` (seamless) |
| Card corners | `rounded-2xl` | `rounded-none` (square edges) |
| Card borders | `border` | None or minimal |
| Card aspect | `aspect-[4/5]` | Taller, closer to `aspect-[3/4]` |
| Section padding | `section-spacing` | Minimal or none |

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Product3DCarousel.tsx` | **Update** | Swap image positions, remove container constraints, make cards edge-to-edge |

---

## Technical Implementation

### 1. Swap Image Positions in Product Data

**Position 0** (Top-left): Change to `hero-lifestyle.png`
**Position 2** (Third from left, top row): Change back to 3D viewer  
**Position 3** (Far right, top row): Change back to 3D viewer
**Position 6** (Third from left, bottom row): Change to `hero-product-shot.png`

```tsx
const gridProducts: GridProduct[] = [
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    type: "model-image",
    image: heroLifestyle,  // CHANGED: lifestyle image in top-left
    ...
  },
  {
    id: "earrings-emerald-gold",
    type: "3d",
    iframeUrl: "...",  // Keep as 3D
    ...
  },
  {
    id: "earrings-princess-18k",
    type: "3d",  // CHANGED BACK to 3D
    iframeUrl: "https://akler1.github.io/XR-Princess-Gold.1/...",
    ...
  },
  {
    id: "necklace-round",
    type: "3d",  // CHANGED BACK to 3D
    iframeUrl: "https://akler1.github.io/XR-Round-Gold.1/...",
    ...
  },
  // ... positions 4-5 stay as 3D ...
  {
    id: "bracelet-three-stone",
    type: "product-image",
    image: heroProductShot,  // CHANGED: product shot in bottom third
    ...
  },
  // position 7 stays as 3D
];
```

### 2. Full-Width Layout (Remove Container)

```tsx
// BEFORE
<section className="section-spacing bg-background">
  <div className="container-editorial">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

// AFTER
<section className="bg-background">
  <div className="w-full">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
```

### 3. Card Styling Updates

```tsx
// BEFORE
<div className="rounded-2xl overflow-hidden border transition-all duration-300">
  <div className="aspect-[4/5] relative overflow-hidden">

// AFTER  
<div className="overflow-hidden transition-all duration-300">
  <div className="aspect-[3/4] md:aspect-square lg:aspect-[3/4] relative overflow-hidden">
```

### 4. Updated Background Function

```tsx
const getCardBackground = (index: number, type: string): string => {
  if (type === "3d") return "bg-black";
  // Vary the grey shades for image cards
  if (index === 0) return "bg-[#f5f5f5]";  // Lifestyle - lightest
  if (index === 6) return "bg-[#f0f0f0]";  // Product shot - light warm grey
  return "bg-[#eaeaea]";
};
```

### 5. Section Header - Keep Centered Above Grid

The header stays centered but moves outside the full-width grid container:

```tsx
<section className="bg-background">
  {/* Header with container */}
  <div className="container-editorial text-center py-12 md:py-16">
    <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
      Explore the Collection
    </p>
    <h2 className="section-header text-foreground mb-3">Best sellers</h2>
  </div>

  {/* Full-width grid */}
  <div className="w-full">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
      {/* cards */}
    </div>
  </div>
</section>
```

---

## Product Info Styling (Match Reference)

The reference shows:
- Material type in small muted text (e.g., "Yellow gold")
- Product name in medium weight
- Price below name

```tsx
<div className="p-4 md:p-6">
  <p className="text-xs text-muted-foreground mb-1">Yellow gold</p>
  <h3 className="font-medium text-foreground text-sm md:text-base mb-1">
    {product.name}
  </h3>
  <p className="text-sm md:text-base text-foreground">
    {product.price}
  </p>
</div>
```

---

## Summary of Changes

1. **Swap images**: Lifestyle to top-left (0), Product shot to bottom-third (6)
2. **Remove container**: Full viewport width
3. **Remove gaps**: `gap-0` for seamless grid
4. **Remove rounded corners**: Square edges like reference
5. **Taller cards**: Increase aspect ratio for more visual impact
6. **Simplified product info**: Material type + name + price (no star ratings)
