

# Fix Best Sellers Title Styling and Reduce Spacing

## Issues Identified

1. **Title doesn't look like a proper title**: Currently using `section-header` class which is styled but may not stand out enough
2. **Too much padding**: The header has `py-12 md:py-16` (48px/64px padding) which creates excessive space between the hero and the product grid

## Changes

### File: `src/components/Product3DCarousel.tsx`

| Element | Current | New |
|---------|---------|-----|
| Header padding | `py-12 md:py-16` | `py-6 md:py-8` |
| Title styling | `section-header text-foreground` | `text-2xl md:text-3xl font-medium tracking-wide uppercase text-foreground` |

### Styling Details

The new title will use:
- **Smaller, tighter text**: `text-2xl md:text-3xl` instead of the large `section-header` class
- **Uppercase tracking**: `uppercase tracking-wide` for a clean luxury label look
- **Medium weight**: `font-medium` for more presence
- **Reduced padding**: `py-6 md:py-8` (24px/32px) to bring the grid closer to the hero

### Visual Result

```text
BEFORE:
┌─────────────────────────────────┐
│           Hero Section          │
└─────────────────────────────────┘
           ↕ 64px gap
     ┌─────────────────┐
     │  Best sellers   │  (large serif)
     └─────────────────┘
           ↕ 64px gap
┌─────────────────────────────────┐
│         Product Grid            │

AFTER:
┌─────────────────────────────────┐
│           Hero Section          │
└─────────────────────────────────┘
           ↕ 32px gap
     ┌─────────────────┐
     │  BEST SELLERS   │  (clean uppercase)
     └─────────────────┘
           ↕ 32px gap
┌─────────────────────────────────┐
│         Product Grid            │
```

## Code Change

```tsx
// Line 109: Before
<div className="container-editorial text-center py-12 md:py-16">
  <h2 className="section-header text-foreground">Best sellers</h2>
</div>

// After
<div className="container-editorial text-center py-6 md:py-8">
  <h2 className="text-2xl md:text-3xl font-medium tracking-wide uppercase text-foreground">
    Best Sellers
  </h2>
</div>
```

