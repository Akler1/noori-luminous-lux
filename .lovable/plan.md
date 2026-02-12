

# Solitaires Page: Clean Header + Wall-to-Wall Grid (No Material)

## Overview

Simplify the hero to just the title and restyle the product grid to be edge-to-edge with no gaps, matching the Bulgari reference. No material label added.

## Changes

### 1. Simplify Hero (Solitaires.tsx)

Remove:
- All 6 decorative Sparkles icons
- The "Signature Collection" badge
- The description paragraph
- The Brilliance / Elegance / Grace category dividers
- The `motion` wrapper
- Imports for `Sparkles`, `Badge`, `motion`

Keep:
- Section with top padding (`pt-28 md:pt-36`) for the fixed header
- "The Solitaires Collection" as a clean centered heading
- Minimal background

### 2. Wall-to-Wall Grid (Solitaires.tsx)

Replace the current grid section:
- Remove `container`, `px-4`, `max-w-7xl mx-auto` constraints
- Change to `grid-cols-2 lg:grid-cols-4 gap-0`
- No padding around the grid -- full bleed edge to edge

### 3. Restyle Solitaire3DCard

- Remove `rounded-lg`, `border`, `hover:border`, `hover:shadow` from card wrapper
- Change 3D viewer background from gradient to flat `bg-[#e8e8e8]`
- Remove the "Click & Drag to Rotate" hover hint
- Keep stars, product name, and price as-is
- No material label

## Files Modified

- `src/pages/Solitaires.tsx` -- simplified hero, wall-to-wall grid
- `src/components/Solitaire3DCard.tsx` -- restyled card to match reference
