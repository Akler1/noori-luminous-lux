

## Move trust bar under title + reduce padding between sections

### 1. `Product3DCarousel.tsx` — Move trust bar from bottom to right after the title

Move the trust bar block (lines 97-136) to right after the title div (after line 60), before the product grid. Remove the `border-t` since it's now between title and grid.

### 2. `Product3DCarousel.tsx` — Reduce section padding

- Title: `py-6 md:py-8` → `pt-4 pb-2 md:pt-6 md:pb-3`
- Trust bar: `py-3` → `py-2`
- Remove bottom spacing so grid ends the section flush

### 3. `ScrollImageSequence.tsx` — No extra wrapper padding needed (already `px-0`)

The `scrollVh` height controls scroll distance. No padding changes needed here — the gap comes from the sections around it.

### 4. `StickyStoryRefined.tsx` — Reduce top padding

- `py-10 lg:py-14` → `py-4 lg:py-6` to reduce gap after the scroll animation section

