
# Fix: Sketch Reveal Effect Blocked by Text

## Problem

`pointer-events-auto` is applied to the entire `motion.div` wrapper (line 36), which contains all the text content (headings, paragraphs, buttons). This means hovering over any text still blocks pointer events from reaching the sketch reveal canvas underneath.

Only the clickable elements (the "Shop the Collection" button and the "Explore in 3D" link) actually need to receive pointer events.

## Solution

Remove `pointer-events-auto` from the `motion.div` wrapper and instead add it only to the CTA container (`motion.div` at line 66) that holds the buttons.

## Changes

**File: `src/components/HeroSplitEditorial.tsx`**

1. **Line 36** - Remove `pointer-events-auto` from the text wrapper:
   - Change: `className="max-w-xl pointer-events-auto"`
   - To: `className="max-w-xl"`

2. **Line 68** - Add `pointer-events-auto` to the CTA buttons container only:
   - Change: `className="flex flex-col sm:flex-row gap-4"`
   - To: `className="flex flex-col sm:flex-row gap-4 pointer-events-auto"`

## Result

- The sketch reveal effect will work everywhere, including over the headline and body text
- The "Shop the Collection" and "Explore in 3D" buttons remain fully clickable
- Text is still visible but transparent to pointer events
