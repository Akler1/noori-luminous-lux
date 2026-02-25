

# Center Titles, 2x2 Card Grid, Larger Image

## What Changes

1. **Center the titles**: Move "Our Mission" and "How Your Purchase Creates Change" headings above the two-column grid so they span full width and are centered.
2. **2x2 card grid**: Change the 4 journey cards from a vertical stack to a 2x2 grid layout on desktop.
3. **Larger image**: Change the grid split from 50/50 to roughly 40/60 (left cards / right image) so the UNICEF image takes more space.

## Layout (Desktop)

```text
+----------------------------------------------------------+
|          Our Mission (centered, full width)               |
|     How Your Purchase Creates Change (centered)           |
+----------------------------------------------------------+
|  [Card 1]   [Card 2]  |                                  |
|                        |        UNICEF Image              |
|  [Card 3]   [Card 4]  |        (larger)                  |
+----------------------------------------------------------+
```

## Technical Details

**File: `src/pages/About.tsx`**

1. **Lines 168-194**: Move the mission statement and "How Your Purchase Creates Change" headings OUT of the left column div and place them ABOVE the grid, centered with `text-center`
2. **Line 166**: Change grid proportions from `lg:grid-cols-2` to `lg:grid-cols-5` with left column as `lg:col-span-2` and right column as `lg:col-span-3`
3. **Lines 197**: Change the desktop journey cards container from `flex flex-col gap-6` to `grid grid-cols-2 gap-4` for a 2x2 layout
4. **Lines 293-301**: The image column gets `lg:col-span-3` making it take 60% of the width
5. Mobile layout remains unchanged (single column, cards stacked vertically)

