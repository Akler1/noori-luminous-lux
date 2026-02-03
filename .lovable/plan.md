

# Fix Hero Section Image Layout

## Current Issues

Looking at the screenshot, I can see several problems:

1. **Overlapping chaos** - The bottom images (bracelet and necklace) overlap each other and the main image messily
2. **Black backgrounds** - Some product images have black backgrounds that clash with the dark navy page background
3. **CTA button blocked** - The floating product shot on the left is covering the "Shop Collection" button
4. **No visual breathing room** - Images are packed too tightly without intentional spacing
5. **Size proportions** - The secondary images are too large relative to the main image

## Reference Analysis

The inspiration image uses:
- One large dominant image (takes ~60% of the right side)
- One clear accent panel (top right, separate and distinct)
- Small floating product shots at bottom with whitespace around them
- Clear separation between elements - no awkward overlaps

---

## Proposed Fix

### Image Layout Restructure

```text
Typography Side              |    Image Collage Side
                            |
LAB-GROWN DIAMONDS          |    +------------------+------+
                            |    |                  | Gold |
LIGHT,                      |    |   MAIN IMAGE     | Accent|
MADE                        |    |   (70% width)    | Panel |
FOREVER                     |    |                  |      |
                            |    +------------------+------+
Certified brilliance...     |
                            |         +--------+
[SHOP COLLECTION]           |         | Float  |
                            |         +--------+
```

### Changes to `src/components/CinematicHero.tsx`:

1. **Remove the bottom-left floating image** (the one covering the CTA button)

2. **Simplify to 3 images total:**
   - Main large image (70-80% of collage area)
   - One gold accent panel (top right, smaller and distinct)
   - One small floating image (bottom right, with clear spacing)

3. **Fix positioning:**
   - Main image: `top-0 left-0` with 70% width and 75% height
   - Gold panel: `top-4 right-0` with 35% width and 40% height, positioned to overlap slightly but intentionally
   - Single floating image: `bottom-4 right-8` with fixed pixel dimensions (180px x 220px) for consistency

4. **Add proper spacing:**
   - Use fixed pixel values for floating images instead of percentages
   - Ensure minimum 16px gap between overlapping elements

5. **Improve visual hierarchy:**
   - Main image: no rotation, strong shadow
   - Accent panel: subtle gold border
   - Float: slight rotation (2-3 degrees), smaller scale

---

## Technical Implementation

### Key Changes:

| Element | Current | Fixed |
|---------|---------|-------|
| Images shown | 5 images | 3 images (cleaner) |
| Bottom-left float | Covers CTA button | Removed |
| Main image size | 75% width, 80% height | 70% width, 75% height |
| Accent panel | 35% x 45% | 30% x 40%, offset right |
| Bottom floats | 2 overlapping | 1 positioned cleanly |
| Sizing | Percentages (inconsistent) | Mix of % and fixed px |

### Fixed Positioning Values:

```text
Main Image:
- Position: top-0 left-0
- Size: w-[70%] h-[75%]
- Z-index: 10

Gold Accent Panel:
- Position: top-8 right-0
- Size: w-[30%] h-[40%]
- Z-index: 20
- Offset to overlap main image edge intentionally

Single Bottom Float:
- Position: bottom-8 right-20
- Size: w-44 h-56 (fixed 176px x 224px)
- Z-index: 30
- Slight rotation: 2deg
```

---

## File to Modify

`src/components/CinematicHero.tsx`:
- Remove the `productShot` floating image that's covering the CTA
- Remove one of the bottom floating images (keep only one)
- Adjust main image to `w-[70%] h-[75%]` 
- Fix accent panel to `w-[30%] h-[40%]` with better positioning
- Use fixed pixel dimensions for the remaining floating image
- Ensure all images have proper z-index stacking

