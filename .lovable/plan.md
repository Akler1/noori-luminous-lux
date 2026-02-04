

# Add Trust Bar Below 3D Carousel

## Overview

Add a horizontal trust/benefits bar beneath the 3D product carousel. This bar will display key value propositions: Free Shipping, 30-Day Returns, Lifetime Warranty, and Ethical Sourcing — matching the pattern already established in the FAQ page.

---

## Visual Design

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [3D Product Carousel]                                                      │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   🚚 Free Shipping    ↩️ 30-Day Returns    🛡️ Lifetime Warranty    💎 Ethical│
│      On all orders       Easy exchanges       Crafted to last        Lab-grown│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Approach

### Option A: Add directly to Product3DCarousel.tsx

Add the trust bar section at the bottom of the carousel component, below the dot navigation. This keeps it visually tied to the carousel.

### Option B: Create a separate TrustBar component

Create a new reusable `TrustBar.tsx` component and place it in `Index.tsx` after the carousel. This allows reuse on other pages like the Product Detail page.

**Recommended: Option A** — keeps the implementation simple and maintains the visual grouping with the carousel.

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/Product3DCarousel.tsx` | **Update** | Add trust bar section after dot navigation |

---

## Trust Bar Content

| Icon | Title | Subtitle |
|------|-------|----------|
| Truck | Free Shipping | On all orders |
| RotateCcw | 30-Day Returns | Easy exchanges |
| Shield | Lifetime Warranty | Crafted to last |
| Gem | Ethical Diamonds | Lab-grown |

---

## Styling Details

- **Layout**: Horizontal flex row on desktop, 2x2 grid on mobile
- **Background**: Matches `bg-background` (warm off-white)
- **Icons**: Use `text-accent` (gold) for visual consistency
- **Text**: Title in `text-foreground`, subtitle in `text-muted-foreground`
- **Spacing**: Comfortable padding with dividers or subtle borders
- **Animation**: Optional fade-in animation using framer-motion

---

## Code Structure

```tsx
{/* Trust Bar */}
<div className="mt-12 pt-8 border-t border-border/50">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
    <div className="flex flex-col items-center gap-2">
      <Truck className="h-6 w-6 text-accent" />
      <div>
        <p className="font-medium text-sm">Free Shipping</p>
        <p className="text-xs text-muted-foreground">On all orders</p>
      </div>
    </div>
    {/* ...repeat for other items */}
  </div>
</div>
```

---

## Responsive Behavior

| Viewport | Layout | Spacing |
|----------|--------|---------|
| Desktop (768px+) | 4 items in a row | Generous padding |
| Mobile (<768px) | 2x2 grid | Compact spacing |

