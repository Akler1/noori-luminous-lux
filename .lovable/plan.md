

# Staggered 3D Cards Grid Layout

## Overview

Replace the carousel with a staggered masonry-style grid of 3D cards, matching the reference layout with corner bracket borders, dark background, and asymmetric positioning.

---

## Visual Design

Based on the reference image, the layout features:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                               DARK BACKGROUND                                │
│                                                                             │
│   ┌──────────┐                    ┌──────────┐                              │
│   │ corners  │                    │ corners  │       ┌──────────┐          │
│   │   Card 1 │                    │   Card 2 │       │ corners  │          │
│   │          │                    │          │       │   Card 3 │          │
│   └──────────┘                    └──────────┘       │          │          │
│       Title  2025      ┌──────────┐   Title  2025    └──────────┘          │
│                        │ corners  │                      Title  2025        │
│                        │   Card 4 │                                         │
│   ┌──────────┐        │          │    ┌──────────┐                         │
│   │ corners  │        └──────────┘    │ corners  │                         │
│   │   Card 5 │           Title  2025  │   Card 6 │                         │
│   │          │                        │          │                         │
│   └──────────┘                        └──────────┘                         │
│       Title  2025                         Title  2025                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key Visual Elements:**
- Dark/black background for the entire section
- Cards with "corner bracket" borders (partial borders at corners, not full outline)
- Staggered vertical offsets creating organic rhythm
- Product title + gold accent year/tag below each card
- No section title header - cards start directly

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Product3DStaggeredGrid.tsx` | **Create** | New staggered masonry grid component |
| `src/pages/Index.tsx` | **Update** | Replace `Product3DCarousel` with new component |
| `src/index.css` | **Update** | Add corner bracket border styling |

---

## Technical Implementation

### 1. Corner Bracket Border CSS (index.css)

Add a new utility class for the distinctive corner-only border effect:

```css
/* Corner bracket borders - only corners visible */
.bracket-border {
  position: relative;
  background: #000;
  border-radius: 16px;
  overflow: hidden;
}

.bracket-border::before,
.bracket-border::after {
  content: '';
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(201, 162, 39, 0.3);
}

.bracket-border::before {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
  border-radius: 16px 0 0 0;
}

.bracket-border::after {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
  border-radius: 0 0 16px 0;
}
```

### 2. New Component: `Product3DStaggeredGrid.tsx`

**Structure:**
- Fetches `carousel-config.json` for product data
- Renders all 5 products in a staggered masonry layout
- Uses CSS Grid with manual offsets for asymmetric positioning
- Dark section background with `dark-section` class

**Desktop Grid Offsets (3 columns):**

| Position | Column | Vertical Offset | Product |
|----------|--------|-----------------|---------|
| 1 | Left | `mt-0` | Necklace |
| 2 | Center | `mt-24` | Round Stud |
| 3 | Right | `mt-12` | Bracelet |
| 4 | Left | `mt-8` | Princess |
| 5 | Center | `mt-16` | Emerald |

**Card Structure:**
```tsx
<div className="bracket-border aspect-[4/5]">
  <iframe src={xrUrl} ... />
</div>
<div className="mt-4 flex items-center gap-3">
  <span className="text-white/90 font-serif">Round Brilliant Stud</span>
  <span className="text-accent">2025</span>
</div>
```

**Staggered Animation:**
- Cards fade in with Framer Motion
- 0.1s delay between each card
- Scroll-triggered via `whileInView`

### 3. Index.tsx Update

Replace carousel import and usage:

```tsx
// Before
import Product3DCarousel from "@/components/Product3DCarousel";
<Product3DCarousel />

// After  
import { Product3DStaggeredGrid } from "@/components/Product3DStaggeredGrid";
<Product3DStaggeredGrid />
```

---

## Mobile Layout

- 2-column grid with smaller stagger offsets
- Cards stack more uniformly with subtle offsets
- Corner brackets scale appropriately

---

## Responsive Breakpoints

| Viewport | Layout | Offsets |
|----------|--------|---------|
| Desktop (1024px+) | 3 columns | Large stagger (16-24px) |
| Tablet (768px+) | 2 columns | Medium stagger (8-16px) |
| Mobile (<768px) | 2 columns | Small stagger (4-8px) |

---

## Data Mapping

Uses existing `carousel-config.json`:

| Product | Title | XR Viewer |
|---------|-------|-----------|
| necklace-1ct-silver | Bezel-less Necklace | Gold stud placeholder |
| stud-round-14k | Round Brilliant Stud | Gold stud viewer |
| bracelet-five-9k | Five-Solitaire Bracelet | Gold stud placeholder |
| earrings-princess-18k | Princess Earrings | Gold stud placeholder |
| earrings-emerald-gold | Emerald Earring | Emerald viewer |

