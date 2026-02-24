
# Add Positioned Labels to Earring Animation Last Frame

## Overview
Add three floating labels that appear on the last frame of the scroll animation, each positioned to point at a specific part of the earring with relevant brand copy.

## Label Positions and Content

Based on the last frame layout, the three labels will be positioned as follows:

1. **Main Stone** (top-left area, near the large diamond)
   - Title: "Main Stone"
   - Copy: "Top 2% of stones. Colorless D-F, VS1+ clarity."
   - Position: ~25% from left, ~12% from top

2. **Pave Stones** (right side, near the scattered small diamonds)
   - Title: "Pave Stones"  
   - Copy: "Hand-placed. Each inspected for symmetry and setting security."
   - Position: ~70% from left, ~55% from top

3. **Setting and Post** (center-right, near the gold post)
   - Title: "14k Gold Setting"
   - Copy: "Solid 14k gold. Finished and polished to a high-jewellery standard."
   - Position: ~65% from left, ~80% from top

## Design
Each label will be a small, elegant callout with:
- A thin connecting line or dot marker pointing to the part
- Semi-transparent dark backdrop pill for readability
- Title in small caps or bold, body in lighter weight
- Staggered fade-in animation (each label appears with a slight delay after the last frame is reached)

## Technical Details (single file: `src/components/ScrollImageSequence.tsx`)

### Data structure
Replace `SEQUENCE_CONTENT` with a `LABELS` array:
```
const LABELS = [
  {
    title: "Main Stone",
    body: "Top 2% of stones. Colorless D-F, VS1+ clarity.",
    top: "12%", left: "22%",
  },
  {
    title: "Pave Stones",
    body: "Hand-placed. Each inspected for symmetry and setting security.",
    top: "55%", left: "68%",
  },
  {
    title: "14k Gold Setting",
    body: "Solid 14k gold. Finished and polished to a high-jewellery standard.",
    top: "78%", left: "60%",
  },
];
```

### Layout changes
- Remove the bottom gradient overlay with header/body/chips
- Add absolutely positioned label elements over the canvas, each with:
  - A small circular dot (4-5px, white with subtle border)
  - A text block next to the dot with title and short description
  - `pointer-events-none` so they don't interfere with scrolling
  - Individual `transition-all duration-700` with staggered `transition-delay` (0ms, 200ms, 400ms) for sequential reveal
  - Controlled by the existing `showCallouts` state (appears when `idx === frameCount - 1`)

### Styling per label
- Dot: `w-2 h-2 rounded-full bg-white border border-white/50 shadow-lg`
- Container: `absolute flex items-start gap-2`
- Title: `text-xs font-semibold uppercase tracking-wider text-foreground/90`
- Body: `text-xs text-muted-foreground leading-snug max-w-[180px]`
- Background pill: `bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md`

### Mobile handling
On mobile (`sm:` and below), the labels may overlap. We will hide labels on mobile and fall back to the existing bottom overlay with the "Crafted detail" header and chips. Use a `hidden lg:flex` on the labels and `lg:hidden` on the bottom text overlay so both experiences are covered.
