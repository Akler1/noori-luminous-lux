
# Transform 3D Carousel to Traditional Product Card Grid

## Overview

Replace the current 3D product carousel with a traditional 4x2 product card grid. The grid will feature a mix of 3D viewer cards and lifestyle/product image cards to create visual variety. Cards will have subtle shade variations (different greys/off-whites) to add depth and visual interest.

---

## Visual Layout

```text
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    Best Sellers                                          │
├──────────────────┬──────────────────┬──────────────────┬──────────────────┤
│                  │                  │                  │                  │
│   [MODEL IMAGE]  │   [3D Viewer]    │   [3D Viewer]    │   [3D Viewer]    │
│   Round Stud     │   Emerald        │   Princess       │   Round          │
│   Lifestyle      │   Earrings       │   Earrings       │   Necklace       │
│                  │                  │                  │                  │
├──────────────────┼──────────────────┼──────────────────┼──────────────────┤
│                  │                  │                  │                  │
│   [3D Viewer]    │   [3D Viewer]    │  [PRODUCT IMAGE] │   [3D Viewer]    │
│   Princess       │   Emerald        │   Bracelet       │   3 Stone        │
│   Necklace       │   Necklace       │   Product Shot   │   Bracelet       │
│                  │                  │                  │                  │
└──────────────────┴──────────────────┴──────────────────┴──────────────────┘
```

**Image Placement:**
- **Top-left (Position 0)**: Model/lifestyle image with Round Brilliant Stud
- **Bottom-third from left (Position 6)**: Product image with Bracelet

---

## Card Color Variations

Cards will use subtle shade variations to create visual depth:

| Position | Card Type | Background Color |
|----------|-----------|------------------|
| 0 | Model Image | `bg-[#f5f5f5]` (light grey) |
| 1 | 3D Viewer | `bg-black` (XR tile default) |
| 2 | 3D Viewer | `bg-black` (XR tile default) |
| 3 | 3D Viewer | `bg-black` (XR tile default) |
| 4 | 3D Viewer | `bg-black` (XR tile default) |
| 5 | 3D Viewer | `bg-black` (XR tile default) |
| 6 | Product Image | `bg-[#eaeaea]` (warm grey) |
| 7 | 3D Viewer | `bg-black` (XR tile default) |

The image cards use slightly different shades of white/grey to distinguish them from the black 3D viewer tiles and add visual variety.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Product3DCarousel.tsx` | **Replace** | Convert from carousel to 4x2 grid layout |

---

## Technical Implementation

### 1. Component Restructure

Remove the carousel logic (prev/next navigation, touch handling, dot pagination) and replace with a static 4x2 grid layout.

### 2. Product Data Array

Define 8 products for the grid with specific properties:

```tsx
const gridProducts = [
  {
    id: "stud-round-14k",
    name: "Round Brilliant Stud",
    price: "$1,599",
    pdpUrl: "/product/stud-round-14k",
    type: "model-image",  // Model lifestyle shot
    image: "/src/assets/hero-solitaires-collection.png",
    rating: 5,
    reviewCount: 31
  },
  {
    id: "earrings-emerald-gold",
    name: "Emerald Earrings",
    price: "$2,299",
    pdpUrl: "/product/earrings-emerald-gold",
    type: "3d",
    iframeUrl: "https://akler1.github.io/XR-Emerald-gold.1/",
    rating: 5,
    reviewCount: 18
  },
  // ... 6 more products
  {
    id: "bracelet-three-stone",
    name: "3 Stone Solitaire Bracelet",
    price: "$2,499",
    pdpUrl: "/product/bracelet-three-stone",
    type: "product-image",  // Product shot
    image: "/src/assets/bracelet-hero.jpg",
    rating: 5,
    reviewCount: 29
  },
  // ...
];
```

### 3. Grid Layout

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  {gridProducts.map((product, index) => (
    <ProductGridCard 
      key={product.id} 
      product={product}
      cardStyle={getCardStyle(index)}
    />
  ))}
</div>
```

### 4. Card Component Logic

Each card will render based on its `type`:
- `model-image`: Static lifestyle/model image
- `product-image`: Static product shot
- `3d`: Interactive iframe 3D viewer

### 5. Card Background Variations

```tsx
const getCardStyle = (index: number): string => {
  // Position 0 (top-left): Light grey for model image
  if (index === 0) return "bg-[#f5f5f5]";
  // Position 6 (bottom-third): Warm grey for product image  
  if (index === 6) return "bg-[#eaeaea]";
  // All 3D viewer cards: Keep black XR tile styling
  return "xr-tile";
};
```

---

## Responsive Behavior

| Viewport | Grid Layout |
|----------|-------------|
| Desktop (768px+) | 4 columns x 2 rows |
| Mobile (<768px) | 2 columns x 4 rows |

---

## Preserved Features

- Trust bar section below the grid
- Section header styling
- Product info (name, price, rating, reviews)
- Link to product detail pages
- Hover interactions and transitions
- XR tile styling for 3D viewer cards

---

## Code Structure Preview

```tsx
export default function Product3DCarousel() {
  const gridProducts = [...]; // 8 products array
  
  return (
    <section id="product-3d-carousel" className="section-spacing bg-background">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
            Explore the Collection
          </p>
          <h2 className="section-header text-foreground mb-3">Best sellers</h2>
        </div>

        {/* 4x2 Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {gridProducts.map((product, index) => (
            <Link key={product.id} to={product.pdpUrl} className="group block">
              <div className={cn(
                "rounded-2xl overflow-hidden border transition-all duration-300",
                product.type === "3d" 
                  ? "xr-tile" 
                  : index === 0 
                    ? "bg-[#f5f5f5] border-border/30" 
                    : "bg-[#eaeaea] border-border/30"
              )}>
                {/* Media Container */}
                <div className="aspect-square relative">
                  {product.type === "3d" ? (
                    <iframe src={product.iframeUrl} className="w-full h-full border-0" />
                  ) : (
                    <img src={product.image} className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-lg font-semibold">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Bar (preserved) */}
        <div className="mt-12 pt-8 border-t border-border/50">
          {/* ... existing trust bar content ... */}
        </div>
      </div>
    </section>
  );
}
```
