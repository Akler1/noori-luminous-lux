

# Hero Image Bleed Effect

## Overview

Modify the hero section so the woman image:
- Keeps the same zoom level (no additional cropping)
- Bleeds/extends into the text area on the left side
- Has white space after the image (on the right edge) to maintain the white background

This creates an editorial overlapping effect where the image partially sits behind the text content.

---

## New Layout Structure

```text
+------------------------------------------------------------------+
|                                                                   |
|   LAB-GROWN DIAMONDS                                              |
|                            +----------------------------------+   |
|   LIGHT,                   |                                  |   |
|   MADE                     |      WOMAN IMAGE                 |   |
|   FOREVER                  |      (bleeds under text)         |   |
|                            |                                  |   |
|   Certified brilliance.    |      Same zoom, no extra crop    |   |
|   Ethical luxury.          |                                  |   |
|                            +----------------------------------+   |
|   [ SHOP COLLECTION ]                                   WHITE     |
|                                                         SPACE     |
+------------------------------------------------------------------+
```

---

## Technical Changes

### File: `src/components/CinematicHero.tsx`

**Layout Approach:**
- Switch from side-by-side flex to a relative/absolute positioning approach
- Image positioned with negative left offset to bleed under text
- Text content has higher z-index to appear above image
- Right side of image has whitespace padding

**Specific Changes:**

1. **Section Container:**
   - Add `relative overflow-hidden` to contain the bleeding image
   - Keep `min-h-screen bg-white`

2. **Text Content (Left Panel):**
   - Add `relative z-10` to ensure text appears above image
   - Add white/semi-transparent background to text area for readability
   - Keep existing padding and typography

3. **Image Container:**
   - Position absolutely or use negative margin to bleed left
   - Use `object-contain` or `object-cover object-left` to prevent additional cropping
   - Add right margin/padding to create whitespace after the image

---

## Implementation Details

### Option 1: Absolute Positioning with Bleed

```text
Container: relative, overflow-hidden
├── Text Panel: relative z-10, left side, bg-white/90 backdrop
└── Image: absolute, positioned to overlap text, right padding for whitespace
```

### Option 2: Negative Margin Bleed

```text
Container: flex, overflow-visible
├── Text Panel: w-[45%], relative z-10
└── Image: w-[65%], -ml-[10%] (bleeds left), pr-8 (whitespace right)
```

### Recommended Implementation (Option 2):

| Element | Current | New |
|---------|---------|-----|
| Section | `flex flex-col lg:flex-row` | `flex flex-col lg:flex-row relative` |
| Text Panel | `lg:w-1/2` | `lg:w-[45%] relative z-10` |
| Image Container | `lg:w-1/2` | `lg:w-[60%] -ml-[5%] lg:pr-8` |
| Image | `object-cover` | `object-cover object-left` (anchor to left side) |

### Image Positioning Details:
- Negative left margin (`-ml-[5%]`) makes image bleed under text
- Right padding on container (`lg:pr-8`) creates whitespace after image
- `object-left` keeps the woman positioned from the left side of the image (same zoom)
- Text panel gets `relative z-10` and semi-transparent bg for readability

### Mobile Behavior:
- On mobile, remove bleed effect (standard stacked layout)
- Bleed effect only applies on `lg:` breakpoint and above

---

## Visual Effect

The result will be:
1. Text content on the left with white background
2. Woman image starting earlier (bleeding under text area)
3. Whitespace on the far right edge
4. Same image zoom level - no additional cropping
5. Editorial overlapping aesthetic

