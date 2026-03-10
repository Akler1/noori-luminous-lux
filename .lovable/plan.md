

## Fix: Remove black border from earring card and polish the section

The black bars come from the canvas `drawFrame` filling `#0a0a0a` as background before drawing the contain-fitted image. On desktop, this creates visible black letterboxing around the earring inside the card.

### Changes — `src/components/ScrollImageSequence.tsx`

1. **Remove black background fill on desktop** — Instead of filling `#0a0a0a`, match the page background (use the CSS background color or make it transparent by simply not filling). Only keep the dark fill for mobile where the canvas is full-bleed.

2. **Polish the card container** — The left card placeholder (`cardRef`) currently has `bg-transparent`. Give it a clean, subtle styling: soft white/cream background (`bg-white/80 backdrop-blur-sm`) with a refined shadow, so the earring sits on a polished surface instead of floating over nothing.

3. **Remove the canvas `borderRadius` inline style** — Let the card container's `rounded-2xl overflow-hidden` handle clipping naturally.

4. **Sticky container background** — Change from `bg-background` (which may be dark) to match the page's light tone so there's no dark bleed around the layout.

### Summary of edits (single file)

- `drawFrame`: on desktop (`!isSmallMobile`), skip the `fillRect` or use a neutral light color (`#faf9f7` or similar) instead of `#0a0a0a`.
- `cardRef` div: add `bg-[#faf9f7] shadow-lg` for a clean card look.
- `positionCanvas`: keep border-radius logic but ensure it matches the card styling.

