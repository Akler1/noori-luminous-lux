

# Redesign Scroll Image Sequence Layout

## Overview

Reformat the scroll image sequence so the earring image sits on one side (left) at a moderate size, with callout labels extending outward into the surrounding black space. The overall section width matches the content below it.

## Changes (single file: `src/components/ScrollImageSequence.tsx`)

### Layout Structure

Replace the current centered square layout with a wider container:

- The sticky inner area uses `container-editorial` (or `max-w-6xl mx-auto`) to match the width of the StickyStoryRefined section below.
- Inside, the canvas sits on the left side at roughly 50% width, vertically centered.
- The callout overlay extends across the full container width (not just the canvas), so labels can float into the black space to the right and left of the image.

### Callout Repositioning

Since the canvas now only occupies the left ~50% of the container, the callout anchor points (dots) stay relative to the canvas, but the label boxes can be positioned further out into the surrounding black area. The overlay div wraps the entire container (not just the canvas), with percentage positions recalculated:

- **Anchor dots**: positioned relative to the canvas area (left half)
- **Label boxes**: positioned relative to the full container, allowing them to sit in the black space beside the image
- Leader lines connect the two

Updated callout constants (approximate -- will be tuned):

```
Main Stone:    anchor on canvas (25%, 35%)  ->  box at (60%, 25%)
Pave Stones:   anchor on canvas (22%, 55%)  ->  box at (60%, 55%)
Earring Post:  anchor on canvas (26%, 78%)  ->  box at (60%, 78%)
```

### Styling

- Wrapper background remains `bg-black`
- Labels remain solid black text on white pill (`bg-white border border-black/20 text-black`)
- Dots and lines remain black-toned
- Canvas container: roughly `w-1/2` of the inner max-width container, centered vertically
- No changes to scroll logic, preloading, or animation behavior

### Section Height Matching

The black background already spans the full `scrollVh` height. The inner content container uses the same max-width class as the story section below so they feel visually aligned.

## Files Modified

- `src/components/ScrollImageSequence.tsx` -- restructure layout to side-aligned canvas with labels extending into surrounding space

