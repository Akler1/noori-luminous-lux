

## Rename to Vela Collection + 3×3 Grid + Drag Prompt

### 1. Rename collection and products (`src/pages/Solitaires.tsx`)

**Collection title**: "The Solitaires Collection" → "The Vela Collection"

**Product naming convention** — `[Cut] Vela [Type]`:
- Round Vela Studs, Emerald Vela Studs, Princess Vela Studs
- Round Vela Pendant, Princess Vela Pendant, Emerald Vela Pendant
- Vela Bracelet, Vela Bracelet 2ct

**Grid**: Change from `grid-cols-2 lg:grid-cols-4` to `grid-cols-1 sm:grid-cols-3` with consistent gap. Products are already ordered correctly (3 earrings, 3 pendants, 2 bracelets) — add a 9th placeholder bracelet or leave the 3rd cell empty/spanned.

### 2. Add drag prompt overlay (`src/components/Solitaire3DCard.tsx`)

Add a "Click & drag to rotate" hint that appears on top of the 3D viewer. Show a small hand/rotate icon with text. It fades out after the user interacts (pointer down) or after a few seconds via a timeout. Use state `showHint` defaulting to `true`, set to `false` on `onPointerDown` or after 3 seconds.

### 3. Grid layout detail

Since there are only 8 products and we need 3×3, the last row will have 2 bracelets. The 3rd cell can be left empty or the last bracelet can span 1 cell normally (asymmetric is fine). Alternatively, I can center the last row's 2 items.

### Files changed
- `src/pages/Solitaires.tsx` — rename collection, rename products, change grid to 3-col
- `src/components/Solitaire3DCard.tsx` — add click-and-drag prompt overlay

