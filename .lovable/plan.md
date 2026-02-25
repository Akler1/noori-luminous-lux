

# Fix: Make Liquid Glass Cards Actually Visible

## Root Cause

The entire "liquid glass" approach using `backdrop-blur` is fundamentally broken here because the cards sit on a **solid cream background**. Backdrop-blur only creates a frosted-glass effect when there's varied content (images, patterns) behind the element. On a plain solid color, it does absolutely nothing visible.

Every previous attempt failed for the same reason -- they all relied on `backdrop-blur` which is invisible against a flat background.

## Solution: Use Real Backgrounds + Strong Visual Effects

Instead of relying on backdrop-blur, use **actual visible styling** that works regardless of what's behind:

### 1. Dark semi-transparent card backgrounds
- Switch to `rgba(15, 15, 20, 0.75)` (dark charcoal) so the cards pop against the cream background
- This creates immediate, dramatic contrast -- no blur needed
- White text on dark cards for readability

### 2. Visible gold glow behind the card stack
- Use a stronger gold radial glow at ~30% opacity (up from 15%)
- Larger spread with `blur(40px)` so it's actually visible
- Acts as an ambient halo behind the dark cards

### 3. Proper vertical centering
- Keep `top-1/2 -translate-y-1/2` but ensure the inline `transform` in the animation doesn't override the CSS `translate`
- The current code sets `transform: translateX(...)` via inline style, which **overrides** the Tailwind `-translate-y-1/2` class. This is likely why the cards are mispositioned
- Fix: combine both transforms in the inline style

### 4. Glass-like accents on the dark cards
- Subtle top-edge highlight: `border-top: 1px solid rgba(255,255,255,0.15)`
- Moving sheen animation stays (now visible as a light stripe on dark background)
- Gold icon circles with `rgba(196,162,101,0.2)` background

### 5. Card inner styling
- Icon: gold color `#C4A265` on `rgba(255,255,255,0.08)` circle
- Title: `text-white/90`, uppercase, serif
- Body: `text-white/55`, small, relaxed leading
- Gold divider line between icon and text

## Technical Changes

### File: `src/components/ScrollImageSequence.tsx`

**Container (line 127-134):** Fix the transform override issue. The inline `style={{ transform: translateX(...) }}` overrides Tailwind's `-translate-y-1/2`. Solution: include both transforms in the inline style:
```
transform: `translate(${showCallouts ? 0 : 40}px, -50%)`
```
Remove `-translate-y-1/2` from className since it will be handled inline.

**Ambient glow (lines 137-143):** Increase opacity to 0.30 and spread, change to a warmer, more visible glow.

**Glass backplate (lines 145-154):** Switch to dark semi-transparent: `rgba(10,10,15,0.5)` with `border: 1px solid rgba(255,255,255,0.08)`.

**Individual cards (lines 167-203):** Replace the white gradient glass with:
- Background: `rgba(15,15,20,0.75)` 
- Border: `1px solid rgba(255,255,255,0.1)` with brighter top border `rgba(255,255,255,0.2)`
- Box shadow: multi-layer for depth
- Sheen animation: keep, now visible on dark background
- Text colors: white/90 for title, white/55 for body
- Icon color: `#C4A265` (brand gold)

### File: `src/index.css`

No changes needed -- the `liquid-sheen` keyframes already exist and will now be visible on the dark card background.

## Why This Will Work

- Dark cards on light background = guaranteed high contrast, no dependency on backdrop-blur
- The gold glow behind dark cards creates a premium, luminous floating effect
- The sheen animation (light stripe on dark surface) becomes actually visible
- Transform fix ensures cards are properly vertically centered

## What It Will Look Like

- Three dark, semi-transparent cards floating on the right
- Warm gold atmospheric glow surrounding the card stack
- Subtle light shimmer sweeping across each card
- Gold icons and white text for premium contrast
- Cards vertically centered alongside the earring
