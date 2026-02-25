

# Upgrade Earring Callout Cards -- Bigger, Premium Feel

## Current Issue
The cards are too small (max-width 200px, text-xs everywhere, p-3 padding). They feel like afterthoughts rather than premium content.

## Proposed Redesign

### Larger, Frosted Glass Cards
Replace the compact cards with bigger, glassmorphism-style cards that feel premium and integrated with the image:

- **Size**: Increase max-width from 200px to ~280px, padding from `p-3` to `p-5`
- **Glass effect**: `backdrop-blur-md bg-white/70 border border-white/40` -- semi-transparent frosted glass that lets the image bleed through subtly
- **Text sizing**: Title bumped to `text-sm`, body to `text-[13px]` (up from all `text-xs`)
- **Icon**: Larger icons (`w-6 h-6`) with a subtle accent-colored circular background behind them
- **Spacing**: Gap between cards increased from `gap-4` to `gap-5`

### Staggered Animation Upgrade
- Slide in from the right (`translateX`) instead of from below (`translateY`) for a more dynamic entrance
- Slightly longer stagger (200ms between cards instead of 150ms)
- Add a subtle scale effect (0.95 to 1) for extra polish

### Layout
- Position stays overlaid on the right side of the image
- Move slightly more inward: `right-[5%]` (from 4%)
- Cards remain vertically centered

## Technical Details

**File: `src/components/ScrollImageSequence.tsx`**

- Update the card container: increase `maxWidth` to `280px`, change `gap-4` to `gap-5`
- Replace `card-luxury` class with inline glassmorphism styles: `backdrop-blur-md bg-white/70 border border-white/40 rounded-xl`
- Add icon background circle: a small `w-10 h-10 rounded-full bg-accent/10` wrapper around each icon
- Increase text sizes: title to `text-sm`, body to `text-[13px]`
- Change animation from `translateY(12px)` to `translateX(30px)` + `scale(0.95)` for a slide-from-right entrance
- Increase stagger delay to 200ms per card
- Mobile fallback stays unchanged

**File: `src/index.css`** -- No changes needed (we bypass `card-luxury` with inline glass styles)

