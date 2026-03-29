

## Rename "Solitaires" → "Vela" site-wide + remove product page description

### 1. Header nav (`src/components/Header.tsx`)
- Line 81: "Solitaires" → "Vela" (desktop dropdown)
- Line 158: "Solitaires" → "Vela" (mobile dropdown)

### 2. Product detail page (`src/pages/ProductDetail.tsx`)
- Line 143: Breadcrumb "Solitaires" → "Vela"
- Lines 227-232: Remove the description paragraph (`{product.description}`) and the "Available in 14K and 18K..." paragraph

### 3. Footer (`src/components/Footer.tsx`)
- Line 8: "Solitaires" label → "Vela"

### 4. Product3DCarousel (`src/components/Product3DCarousel.tsx`)
- Rename product names: "Round Solitaire Studs" → "Round Vela Studs", "Emerald Solitaire Studs" → "Emerald Vela Studs", "Round Solitaire Pendant" → "Round Vela Pendant", "Solitaire Bracelet" → "Vela Bracelet"

### 5. Cross-sell in ProductDetail (`src/pages/ProductDetail.tsx`)
- Line 76-77: "Solitaire Necklace" → "Vela Necklace", "Solitaire Bracelet" → "Vela Bracelet"

### 6. Other references
- `HeroSplitEditorial.tsx` line 61: "Solitaires collection" → "Vela collection"
- `HeroSketchReveal.tsx`: alt text updates

### Files changed
- `src/components/Header.tsx`
- `src/pages/ProductDetail.tsx`
- `src/components/Footer.tsx`
- `src/components/Product3DCarousel.tsx`
- `src/components/HeroSplitEditorial.tsx`
- `src/components/HeroSketchReveal.tsx`

