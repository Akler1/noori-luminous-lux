

# Upgrade Earring Callout Cards -- Liquid Glass Effect

## What Changes

The three callout cards on the right side of the earring scroll sequence will get a dramatic visual upgrade with a layered "liquid glass" aesthetic. The cards stay in their current position (right side, not overlapping the earring) but become much more visually striking.

## Visual Design

Each card will feature:

- **Multi-layer glass effect**: An outer glow/blur layer behind each card creates a soft luminous halo, making the cards feel like they float on liquid glass
- **Gradient glass background**: Instead of flat `bg-white/70`, use a subtle gradient (`bg-gradient-to-br from-white/80 via-white/60 to-white/40`) with stronger `backdrop-blur-xl` for a richer frosted glass look
- **Inset highlight**: A pseudo-element-style inner border glow using `ring-1 ring-white/50 ring-inset` to simulate light catching the edge of glass
- **Outer glow halo**: Each card gets an absolutely-positioned blurred element behind it (a soft radial gradient circle) in brand gold at low opacity, creating a warm ambient glow
- **Refined shadow**: Replace `shadow-xl` with a custom multi-layer shadow for more depth: a tight shadow for definition + a wide diffused shadow for atmosphere
- **Larger icon treatment**: Icon circle gets a subtle gradient background and a soft ring
- **Gold accent line**: A thin decorative gold line/divider between the icon area and the text

## Technical Details

**File: `src/components/ScrollImageSequence.tsx`**

- Wrap each card in a container div that holds both the glow element and the card itself
- The glow element: `absolute -inset-3 bg-gradient-radial from-[#C4A265]/15 to-transparent rounded-2xl blur-xl` positioned behind each card
- Card styling: `backdrop-blur-xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 border border-white/50 rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06),0_16px_48px_rgba(0,0,0,0.08)] ring-1 ring-inset ring-white/40`
- Icon circle: `w-11 h-11 rounded-full bg-gradient-to-br from-accent/15 to-accent/5 ring-1 ring-accent/20`
- Add a thin gold divider: `w-8 h-px bg-accent/30 mx-auto my-3` between icon and title
- Increase container max-width to `300px`, padding to `p-6`
- Keep the same animation (slide from right + scale) and stagger timing

No other files need changes -- all styling is inline/Tailwind.

