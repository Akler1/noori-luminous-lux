
# Hero Layout Adjustments

## Changes Required

### 1. Adjust Grid Proportions
Change the main grid from 50/50 split to 75/25 split so images dominate the layout:
- **Current**: `lg:grid-cols-2` (50% / 50%)
- **New**: `lg:grid-cols-[3fr_1fr]` (75% / 25%)

### 2. Remove Image Gaps
Eliminate all spacing between the 4 images:
- **Current**: `gap-3 md:gap-4`
- **New**: `gap-0`

### 3. Remove Square Aspect Ratio
Allow images to display at their natural height rather than forcing square:
- **Current**: `aspect-square`
- **New**: Remove aspect-square, use natural image proportions

### 4. Remove Image Border Radius
Since images are now edge-to-edge with no gaps, remove the rounded corners:
- **Current**: `rounded-lg`
- **New**: Remove rounded-lg

## Visual Result

```text
+----------------------------------------+----------+
|  IMAGE 1  |  IMAGE 2  |                           |
|           |           |   Tagline                 |
|-----------|-----------|   + Subheadline           |
|  IMAGE 3  |  IMAGE 4  |   + CTAs                  |
|           |           |                           |
+----------------------------------------+----------+
      ~75% of screen           ~25%
```

## File to Modify

| File | Changes |
|------|---------|
| `src/components/ImageGridHero.tsx` | Update grid proportions, remove gaps, remove aspect-square and rounded corners |
