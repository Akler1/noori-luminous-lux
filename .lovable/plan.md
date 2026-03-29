

## Convert three About page sections to 2×2 grids

### 1. "What We Stand For" (lines 102-125)
4 brand values — perfect for 2×2. Replace the vertical stack with a `grid grid-cols-1 md:grid-cols-2 gap-8` layout. Remove the separator dividers between items. Each card gets icon, title, and description centered or left-aligned in its cell.

### 2. "Real diamonds. Better origin." (lines 184-203)
3 stat items — convert from stacked rows to a `grid grid-cols-1 md:grid-cols-2 gap-8` layout (3 items = 2 on top, 1 on bottom). Remove border-t separators. Each stat becomes a card-like cell with the big number and label.

### 3. "The 4Cs" (lines 265-299)
4 items — convert from 12-column editorial rows to a `grid grid-cols-1 md:grid-cols-2 gap-8` layout. Each card contains icon+name, description, and grade scale/badge stacked vertically instead of spread across columns. Remove border-t separators.

### Files changed
- `src/pages/About.tsx` — layout changes only (vertical lists → 2×2 grids)

