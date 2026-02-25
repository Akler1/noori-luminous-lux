

# Simplified Charitable Impact Section

## What Changes

Replace the current `StickyStoryRefined` component with a clean, image-forward section: centered headline, the UNICEF backpacks image displayed large, a short paragraph, and a "Learn Our Story" link that navigates to the About page's mission section (`/policies#mission`). No icons, no stat pillars, no extra copy.

## Layout

```text
+----------------------------------------------------------+
|                                                          |
|              Beauty that gives back.                     |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|         [  UNICEF backpacks image, large  ]              |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|     A portion of every Noori purchase supports           |
|     UNICEF programs for child safety and education.      |
|                                                          |
|              Learn Our Story ->                          |
|                                                          |
+----------------------------------------------------------+
```

## Technical Details

**File: `src/components/StickyStoryRefined.tsx`** -- Full rewrite

1. Replace `braceletHero` import with `unicefBackpacks` from `@/assets/unicef-backpacks.jpg`
2. Import `Link` from `react-router-dom` and `ArrowRight` from `lucide-react`
3. Remove the `storyBeats` array, chips, and grid layout
4. New structure (all centered, stacked vertically):
   - Centered serif headline: "Beauty that gives back."
   - Full-width UNICEF image with `rounded-2xl shadow-elegant`
   - Short one-sentence paragraph below the image
   - `Link` to `/policies#mission` styled as a subtle text CTA with arrow icon
5. Keep `bg-secondary` background and framer-motion fade-in animations
6. No icons, no 3-column grid, no extra copy blocks

**No changes to `Index.tsx`** -- component stays in the same position.

