

## Fix padding issues and move trust bar closer to best sellers

Three changes:

### 1. ScrollImageSequence — remove remaining padding (line 158)
Change `px-4` to `px-0` so the section has zero horizontal padding:
```tsx
<div className="hidden lg:flex items-center justify-center h-full gap-6 px-0">
```

### 2. Trust bar — move directly under product grid, remove extra spacing
In `Product3DCarousel.tsx`, the trust bar has `mt-12 pt-8` and `pb-12` — way too much spacing. Change to minimal spacing so it sits right under the products:

**Line 98**: `mt-12 pt-8` → `mt-4 pt-4`
**Line 99**: `pb-12` → `pb-4`

### 3. Reduce gap between best sellers section and scroll animation
The trust bar's `pb-12` was the main culprit. Reducing it to `pb-4` tightens the transition to the scroll animation section.

