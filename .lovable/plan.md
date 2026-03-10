

## Plan: Earring scroll animation in left card, explanatory cards on right

Currently the canvas fills the entire viewport and the three info cards float over it on the right. The user wants a split layout: the earring animation contained in a card on the left, info cards on the right.

### Changes — `src/components/ScrollImageSequence.tsx`

**Desktop layout (lg+):**
- Replace the full-screen canvas + floating cards with a two-column grid (`grid-cols-2`) inside the sticky viewport.
- **Left column**: A rounded card (frosted glass style, ~55% width) containing the canvas. The canvas draws inside this bounded card instead of filling the screen. Background set to a subtle neutral/dark tone.
- **Right column**: The three info cards stacked vertically, centered in the right half. Same animation behavior (appear when `showCallouts` is true).
- Add some padding around the grid so it doesn't touch edges.

**Mobile layout:** Unchanged — keeps current full-bleed canvas + bottom overlay fallback.

**Canvas drawing:** On desktop, switch from "cover" to "contain" fit so the full earring is visible inside the card without cropping. Add a dark background fill behind it.

### Rough layout
```text
┌─────────────────────────────────────────────┐
│  ┌──────────────────┐   ┌────────────────┐  │
│  │                  │   │  Main Stone     │  │
│  │   Earring        │   ├────────────────┤  │
│  │   Animation      │   │  Pavé Stones   │  │
│  │   (card)         │   ├────────────────┤  │
│  │                  │   │  14k Gold      │  │
│  └──────────────────┘   └────────────────┘  │
└─────────────────────────────────────────────┘
```

### Implementation details
1. Wrap the sticky `div` content in a `lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:p-10 lg:items-center lg:h-full` container.
2. Left cell: card wrapper with `rounded-2xl overflow-hidden bg-black/90 shadow-2xl` containing the canvas (now `relative w-full aspect-[3/4]` instead of `absolute inset-0`).
3. Right cell: the existing LABELS cards, remove absolute positioning on desktop.
4. Canvas `drawFrame`: on desktop, use contain-fit (already done for mobile) so the earring fits inside the card.
5. Mobile: preserve current absolute/full-screen behavior with a conditional class approach.

Single file edit: `src/components/ScrollImageSequence.tsx`.

