

# Match Scroll Sequence Layout to Story Section

## Problem

The scroll image sequence doesn't match the story section below in three ways:
1. **Breakpoints**: Uses `md:` but story section uses `lg:` for the two-column grid
2. **Image sizing**: Forces `aspect-square` on the canvas, while story images use `w-full h-auto` and size naturally -- the earring canvas likely doesn't need to be square
3. **Text content**: Only shows tiny plain labels ("Main Stone") while the story section has a bold header (`section-header`), a full paragraph (`text-lg leading-relaxed`), and proof chips

## Changes (single file: `src/components/ScrollImageSequence.tsx`)

### 1. Fix grid breakpoints (line 127)
Change `grid-cols-1 md:grid-cols-2 gap-8 md:gap-16` to `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16` to match the story section exactly.

### 2. Fix image container (line 129)
Remove `aspect-square` from the canvas wrapper. Instead, let the canvas use a natural aspect ratio that better matches the earring frames (likely close to 1:1 but we let the image dictate). Use a reasonable aspect ratio like `aspect-[4/5]` or keep `aspect-square` but ensure `h-full` is not constrained. The key is the wrapper should use `rounded-2xl overflow-hidden shadow-elegant` (already does) and fill its grid column naturally, just like the story images.

### 3. Upgrade callout labels to match story text column (lines 134-148)
Replace the plain labels with the same structure as the story text column:
- A heading using `section-header text-foreground mb-6` (e.g., "Crafted detail.")
- A body paragraph using `text-muted-foreground text-lg leading-relaxed mb-6 max-w-lg`
- Proof chips using `px-3 py-1 text-xs text-accent border border-accent/30 rounded-full`

Update the `CALLOUTS` data to include a header, body text, and chips array for each callout, so the right column mirrors the story section layout exactly.

Updated callouts data structure:
```
{ 
  header: "Crafted detail.",
  body: "Each Noori earring features a precision-set main stone...",
  chips: ["Main Stone", "Pave Stones", "Earring Post"] 
}
```

Since we only need one text block (not three separate labels), this simplifies to a single content block on the right that fades in when the sequence completes -- with the same classes as the story section text.

### Summary of class alignment

| Element | Story Section | Scroll Sequence (after fix) |
|---|---|---|
| Grid | `grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center` | Same |
| Image wrapper | `rounded-2xl overflow-hidden shadow-elegant` | Same |
| Image | `w-full h-auto object-cover` | `w-full h-full` (canvas) |
| Heading | `section-header text-foreground mb-6` | Same |
| Body | `text-muted-foreground text-lg leading-relaxed mb-6 max-w-lg` | Same |
| Chips | `px-3 py-1 text-xs text-accent border border-accent/30 rounded-full` | Same |

