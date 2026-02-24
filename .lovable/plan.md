

# Add Connecting Lines from Dots to Label Cards

## Overview
Replace the current simple label layout with a two-part system: a **dot marker** positioned on the earring part, an **SVG line/arrow** connecting the dot to the card, and a **styled card** matching the site's `card-luxury` aesthetic.

## Changes (single file: `src/components/ScrollImageSequence.tsx`)

### 1. Update LABELS data structure
Each label gets two positions: a `dot` position (where the marker sits on the earring) and a `card` position (where the info card renders). Also add an `anchor` direction hint so lines route cleanly.

```
const LABELS = [
  {
    title: "Main Stone",
    body: "Top 2% of stones. Colorless D-F, VS1+ clarity.",
    dot: { top: "30%", left: "42%" },
    card: { top: "8%", left: "8%" },
  },
  {
    title: "Pave Stones",
    body: "Hand-placed. Each inspected for symmetry and setting security.",
    dot: { top: "52%", left: "55%" },
    card: { top: "48%", left: "72%" },
  },
  {
    title: "14k Gold Setting",
    body: "Solid 14k gold. Finished and polished to a high-jewellery standard.",
    dot: { top: "72%", left: "48%" },
    card: { top: "75%", left: "72%" },
  },
];
```

### 2. Render structure per label
For each label, render three elements:
- **Dot**: A small pulsing circle positioned directly on the earring part (`w-3 h-3 rounded-full bg-white border-2 border-white/80 shadow-lg`)
- **SVG connector line**: An absolutely positioned SVG that draws a line from the dot to the card, ending with a small arrowhead. Uses `stroke: white`, thin line (1.5px), with a subtle drop shadow
- **Card**: Styled to match the site's card aesthetic -- `bg-card border border-border/50 rounded-xl shadow-elegant` (matching `card-luxury` class), with the title in uppercase tracking and the body in muted foreground text

### 3. SVG line implementation
Use a full-screen SVG overlay (`absolute inset-0 w-full h-full pointer-events-none`) with percentage-based coordinates. Each line is drawn from the dot center to the nearest edge of the card. A small triangular arrowhead marker is defined in SVG `<defs>` and applied to the line end.

### 4. Card styling
Cards will use the existing `card-luxury` pattern from the site:
- `bg-card border border-border/50 rounded-xl shadow-elegant`
- Padding: `px-4 py-3`
- Title: `text-xs font-semibold uppercase tracking-wider`
- Body: `text-xs text-muted-foreground leading-snug max-w-[200px]`

### 5. Animation
All three elements (dot, line, card) share the same staggered fade-in:
- `transition-all duration-700`
- `transitionDelay: index * 200ms`
- Dot gets a subtle pulse animation when visible
- Line draws in using SVG `stroke-dasharray` / `stroke-dashoffset` transition

### 6. Mobile
No changes to mobile -- the bottom overlay fallback remains as-is with `lg:hidden`. The dots, lines, and cards use `hidden lg:block`.

## Technical notes
- The SVG overlay sits between the canvas and the cards in z-order
- Dot and card positions will likely need fine-tuning once visible on the actual last frame -- initial values are estimates
- The connecting lines use percentage-based SVG viewBox (`viewBox="0 0 100 100"` with `preserveAspectRatio="none"`) so they scale with the viewport
