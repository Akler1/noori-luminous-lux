
## Diagnosis (why it still looks “the same”)

From the current code and your screenshot, the latest styles are technically present, but the visual delta is too subtle on this cream background:
- Cards are still light-on-light (`white/80 → white/40`) so they read like the old white boxes.
- The halo behind each card is very soft and diffused, so it’s barely perceptible at normal viewing distance.
- There is no strong shared backdrop behind the stack, so each card still feels isolated and “flat.”

So this is not a React re-render/query issue. It’s a visual-contrast/design-strength issue.

## Implementation approach (make it obviously different)

I’ll keep the cards to the right (not on top of the earring), but introduce a **clear liquid-glass panel system** with stronger depth cues:

1. Add a **group-level glass backplate** behind all 3 cards  
   - Large rounded translucent slab behind the entire card column.
   - Adds immediate “something behind” structure and makes the section feel intentional/premium.

2. Add a **group ambient glow blob** behind the backplate  
   - Warm gold radial glow with larger spread and slightly higher opacity so it is actually visible.

3. Upgrade each card to a stronger “liquid tile” style  
   - Slightly darker-tinted glass layer (still light, but more contrast than plain white).
   - Crisp top-edge highlight + subtle inner shadow for refractive glass feel.
   - Larger corner radius and spacing so the cards feel more editorial.

4. Add a subtle **moving sheen/reflection** on cards  
   - Very slow diagonal shimmer stripe across each card.
   - Low-opacity and premium (not flashy), just enough to signal “liquid.”

5. Increase perceived size and hierarchy  
   - Wider stack (`max-width` ~340–360px), larger title/body sizing, more vertical breathing room.
   - Icons get stronger gold treatment with a cleaner circular plate.

## File-level changes

### `src/components/ScrollImageSequence.tsx`

I’ll refactor only the desktop callout block:

- Keep container position (`right side`) but wrap it in a new `relative` group layer.
- Insert:
  - **Backplate layer** (absolute, full stack bounds, blurred/translucent).
  - **Ambient glow layer** (absolute, radial gold glow).
- Update each mapped card:
  - Stronger glass tile class stack.
  - Add internal sheen element (`absolute` overlay).
  - Keep existing stagger animation, but slightly more pronounced transform.
- Ensure `pointer-events-none` on decorative layers and `pointer-events-auto` for card content.

### `src/index.css`

Add small reusable animation utilities for sheen:
- `@keyframes liquid-sheen` (slow horizontal/diagonal pass).
- Optional utility class for reduced-motion fallback.

This keeps JSX cleaner and ensures consistent animation behavior.

## Visual target after change

- You should immediately notice:
  - A clear glass “panel” behind the whole stack.
  - Brighter gold atmospheric glow around the panel.
  - Cards that look refractive/glossy (not flat white).
  - Subtle motion in highlights that makes the UI feel alive and premium.

## Risk & compatibility notes

- `backdrop-blur` support is good in modern browsers; the design will still look fine without full blur support.
- Sheen animation will be disabled/reduced if `prefers-reduced-motion` is on.
- No data logic, no routing, no external dependencies changed.

## Validation steps after implementation

1. Open homepage and scroll to the earring sequence final state.
2. Confirm the card stack now has a visible shared backplate + glow.
3. Confirm cards look materially different from the previous white-box appearance.
4. Check at 1440px and 1920px widths to verify the panel scale and spacing.
5. Quick mobile sanity check to ensure desktop-only layers stay hidden on small screens.
