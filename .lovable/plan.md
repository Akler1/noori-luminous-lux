

# Update 3D Carousel Cards to Match Luxury Product Card Style

## Overview

Transform the current black XR tiles into light neutral gray product cards matching the Bulgari-style reference image. This includes moving product info inside the card, adding a badge tag, and changing from centered layout to left-aligned product details.

---

## Reference Image Analysis

The reference shows a premium product card with:
- Light gray/taupe background (~`#e5e4e0` or similar neutral)
- "Must-have" badge tag in top-left (accent/gold color)
- Large product area taking most of the card height
- Product info at bottom-left inside the card:
  - Material: "Yellow gold" (small, muted)
  - Product name: "B.zero1 Ring" (serif, bold)
  - Price: "$4,500.00"

---

## Current vs New Design

| Aspect | Current | New |
|--------|---------|-----|
| **Card background** | Pure black (`#000000`) | Light neutral gray (`#e5e4e0`) |
| **Card shape** | Square (`aspect-square`) | Taller portrait (`aspect-[3/4]` or similar) |
| **Badge** | None | "Must-have" tag in top-left |
| **Product info location** | Below card, centered | Inside card, bottom-left |
| **Text color** | Dark text on light page | Dark text inside card |
| **Border** | 1px gold at 10% | Optional subtle border or shadow only |

---

## Visual Layout (New Design)

```
┌─────────────────────────────────────────┐
│ Must-have                               │  ← Badge tag (accent color)
│                                         │
│                                         │
│                                         │
│           ┌─────────────────┐           │
│           │                 │           │
│           │   3D XR Viewer  │           │  ← KeyShotXR iframe (black bg inside)
│           │                 │           │
│           │                 │           │
│           └─────────────────┘           │
│                                         │
│                                         │
│ Yellow gold                             │  ← Material (muted, small)
│ Round Brilliant Stud                    │  ← Product name (serif, bold)
│ $1,250.00                               │  ← Price
└─────────────────────────────────────────┘
     radius: 16-24px, subtle shadow
```

---

## File Changes

| File | Changes |
|------|---------|
| `src/components/Product3DCarousel.tsx` | Restructure card layout, add badge, move product info inside |
| `src/index.css` | Update `.xr-tile` to light gray background, add new card classes |
| `public/data/carousel-config.json` | Add `price` and `material` fields to slide data |

---

## 1. Update Card Structure

### New Card Component Structure

Each slide card will now contain:
1. Badge tag (top-left)
2. 3D viewer area (centered, with some padding)
3. Product info (bottom-left inside card)

```tsx
<div className="product-card-luxury">
  {/* Badge */}
  <span className="absolute top-4 left-4 text-accent text-xs font-medium tracking-wide">
    Must-have
  </span>
  
  {/* 3D Viewer Container */}
  <div className="absolute inset-x-4 top-12 bottom-24">
    <div className="w-full h-full bg-black rounded-2xl overflow-hidden">
      <iframe ... />
    </div>
  </div>
  
  {/* Product Info - Bottom Left */}
  <div className="absolute bottom-4 left-4">
    <p className="text-xs text-muted-foreground mb-1">Yellow gold</p>
    <h3 className="font-serif text-lg text-foreground mb-1">{title}</h3>
    <p className="text-sm text-foreground">{price}</p>
  </div>
</div>
```

---

## 2. CSS Changes

### Replace `.xr-tile` with `.product-card-luxury`

```css
.product-card-luxury {
  position: relative;
  background: #e5e4e0;
  border-radius: 16px;
  box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
```

### XR Viewer Inner Container

Since KeyShotXR has a fixed black background, we embrace it as the product display area inside the card:

```css
.xr-viewer-container {
  background: #000000;
  border-radius: 12px;
  overflow: hidden;
}
```

---

## 3. Update Carousel Config

Add price and material to each slide:

```json
{
  "slides": [
    {
      "slug": "stud-round-14k",
      "title": "Round Brilliant Stud",
      "subtitle": "Heirloom-Quality Lab Diamond",
      "material": "Yellow gold",
      "price": "$1,250.00",
      "pdpUrl": "/product/stud-round-14k",
      ...
    }
  ]
}
```

---

## 4. Layout Adjustments

### Card Aspect Ratio

Change from square to portrait for a more luxurious feel:
- Current: `aspect-square` (1:1)
- New: `aspect-[3/4]` or similar (3:4 ratio for portrait)

### Side Cards

Side cards will also use the new styling but with reduced scale and opacity as before:
- Scale: `scale-[0.85]`
- Opacity: `opacity-80`

### Remove Current Product Info Below Card

Move the title, subtitle, and CTA button inside the card itself. The "View details" CTA can become a hover overlay or be removed entirely (clicking the card navigates to PDP).

---

## 5. Mobile Considerations

On mobile, the card will:
- Take full width with horizontal padding
- Maintain portrait aspect ratio
- Show all info inside the card

---

## Implementation Summary

1. **Update `public/data/carousel-config.json`**
   - Add `material` and `price` fields to each slide

2. **Update `src/index.css`**
   - Replace `.xr-tile` with `.product-card-luxury`
   - Add `.xr-viewer-container` for the inner black 3D viewer area

3. **Update `src/components/Product3DCarousel.tsx`**
   - Restructure card to include badge, viewer area, and product info inside
   - Change aspect ratio from square to portrait
   - Remove the product info section below the card
   - Add click handler to navigate to PDP
   - Update side cards to use new styling

---

## Files Summary

| File | Action |
|------|--------|
| `public/data/carousel-config.json` | Add `material` and `price` fields |
| `src/index.css` | Update card styling classes |
| `src/components/Product3DCarousel.tsx` | Restructure card layout |

