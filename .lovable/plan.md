

# Hero Section: Clean Split Layout

## Overview

Redesign the hero as a clean two-panel split:
- **Left panel**: White background with typography content
- **Right panel**: Woman image (`hero-lifestyle.png`) filling the entire right side edge-to-edge

The image starts exactly where the text content ends - a seamless vertical divide.

---

## New Layout Structure

```text
+----------------------------------+----------------------------------+
|          WHITE PANEL             |                                  |
|                                  |                                  |
|   LAB-GROWN DIAMONDS             |                                  |
|                                  |                                  |
|   LIGHT,                         |      WOMAN IMAGE                 |
|   MADE                           |      (hero-lifestyle.png)        |
|   FOREVER                        |                                  |
|                                  |      Full height                 |
|   Certified brilliance.          |      Fills right half            |
|   Ethical luxury.                |      Edge-to-edge                |
|                                  |                                  |
|   [ SHOP COLLECTION ]            |                                  |
|                                  |                                  |
+----------------------------------+----------------------------------+
```

---

## Technical Changes

### File: `src/components/CinematicHero.tsx`

**Remove:**
- `DecorativeLines` SVG component (not suitable for white background)
- `FloatingImage` component (no longer needed)
- All collage image imports (`heroImage`, `earringsImage`, `necklaceImage`)
- All absolute positioning and collage logic

**Add:**
- Import `hero-lifestyle.png` only
- White background (`bg-white`)
- Simple flex or grid layout with no gaps

**Modify:**
- Section background: `bg-background` → `bg-white`
- Text colors for light background readability
- Right side: Single full-height image with `object-cover`
- Remove container padding that creates gaps between columns

---

## Implementation Details

### Layout Structure
```tsx
<section className="min-h-screen bg-white flex">
  {/* Left: Text Content */}
  <div className="w-1/2 flex items-center px-12 lg:px-20">
    {/* Typography here */}
  </div>
  
  {/* Right: Full-height Image */}
  <div className="w-1/2 h-screen">
    <img 
      src={heroLifestyle} 
      className="w-full h-full object-cover"
    />
  </div>
</section>
```

### Color Changes
| Element | Current (Dark BG) | New (White BG) |
|---------|-------------------|----------------|
| Background | `bg-background` (navy) | `bg-white` |
| "LIGHT," "MADE" | `text-foreground` (cream) | `text-gray-900` |
| "FOREVER" | `text-accent` (gold italic) | `text-accent` (keep gold) |
| Subheadline | `text-foreground/70` | `text-gray-600` |
| Label | `text-accent` | `text-accent` (keep gold) |
| CTA Button | Gold | Gold (unchanged) |

### Key Points
- Use `flex` with no gap so image starts exactly where text panel ends
- Left panel: `w-1/2` with internal padding for text
- Right panel: `w-1/2` with image filling 100% width and height
- Image uses `object-cover` to fill space while maintaining aspect ratio
- No decorative elements overlapping between panels

### Mobile Behavior
- Stack vertically: image on top, text below
- Image: `h-[50vh]` on mobile
- Text: full width with padding

---

## Cleanup Summary

| Remove | Keep/Add |
|--------|----------|
| `DecorativeLines` component | White background |
| `FloatingImage` component | Clean 50/50 split |
| 3 collage images | Single `hero-lifestyle.png` |
| Absolute positioning | Flexbox layout |
| Dark navy background | Dark text for contrast |

