

# Shorten Best Sellers Header & Fix Image Card Labels

## Changes

### 1. Shorten the Section Header

| Current | New |
|---------|-----|
| Subtitle: "Explore the Collection" | **Remove entirely** |
| Heading: "Best sellers" | Keep as is |
| Description: "Discover our most loved pieces" | **Remove entirely** |

Result: Clean, minimal header with just "Best sellers"

### 2. Hide Product Info for Model/Lifestyle Images

The grid has two image positions that are not actual products:
- **Index 0** (top-left): Model lifestyle image (`hero-lifestyle.png`)
- **Index 6** (bottom row, 3rd from left): Product shot image (`hero-product-shot.png`)

These should NOT display material, name, or price. The image should flow directly into the product below it visually.

---

## File Changes

**File**: `src/components/Product3DCarousel.tsx`

### Header Simplification (Lines 109-117)

```tsx
// BEFORE
<div className="container-editorial text-center py-12 md:py-16">
  <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
    Explore the Collection
  </p>
  <h2 className="section-header text-foreground mb-3">Best sellers</h2>
  <p className="text-muted-foreground">
    Discover our most loved pieces
  </p>
</div>

// AFTER
<div className="container-editorial text-center py-12 md:py-16">
  <h2 className="section-header text-foreground">Best sellers</h2>
</div>
```

### Conditional Product Info (Lines 157-166)

Only render the product info block for items that are NOT lifestyle/model images:

```tsx
// BEFORE - always shows product info
<div className="p-4 md:p-6 bg-background">
  <p className="text-xs text-muted-foreground mb-1">{product.material}</p>
  <h3 className="font-medium text-foreground text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
    {product.name}
  </h3>
  <p className="text-sm md:text-base text-foreground">
    {product.price}
  </p>
</div>

// AFTER - hide for model-image and product-image types
{product.type === "3d" && (
  <div className="p-4 md:p-6 bg-background">
    <p className="text-xs text-muted-foreground mb-1">{product.material}</p>
    <h3 className="font-medium text-foreground text-sm md:text-base mb-1 group-hover:text-accent transition-colors">
      {product.name}
    </h3>
    <p className="text-sm md:text-base text-foreground">
      {product.price}
    </p>
  </div>
)}
```

---

## Summary

1. Remove subtitle and description from Best Sellers header - keep only "Best sellers"
2. Hide product name/price/material for the two image tiles (positions 0 and 6)

