

# Fix Mission Cards to Horizontal Layout

## What Changes

The four journey cards (The Mines, UNICEF Steps In, Education, Thriving) in the About page mission section are currently stacked vertically. They should be displayed side-by-side in a horizontal row on desktop, stacking vertically only on mobile.

## Layout

```text
Desktop:
[The Mines]  [UNICEF Steps In]  [Education]  [Thriving]

Mobile:
[The Mines]
[UNICEF Steps In]
[Education]
[Thriving]
```

## Technical Details

**File: `src/pages/About.tsx`**

1. Line 188: Change the cards container from `flex flex-col gap-6` to `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6` so the cards sit in a horizontal row on desktop
2. Lines 189-229: Remove the `fullWidth` prop from all four `JourneyNode` components (so they use `flex-1` instead of `w-full`)

No other files need changes.

