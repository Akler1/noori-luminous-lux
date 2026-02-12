

# Match Scroll Image Sequence to Story Section Layout

## Problem

The scroll image sequence uses a flex layout with a capped `max-w-[550px]` canvas inside a `w-1/2` container, making the image much smaller than the story section images below. The story section uses `grid grid-cols-2 gap-16` with full-width uncapped images.

## Fix (single file: `src/components/ScrollImageSequence.tsx`)

Replace the current flex layout with the exact same grid structure used by `StickyStoryRefined`:

- Use `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center` (identical to story section)
- Remove the `max-w-[550px]` cap on the canvas wrapper -- let it fill the grid column naturally with `w-full aspect-square`
- The canvas uses `contain` fit instead of `cover` so nothing gets cropped
- Labels column matches the story section text column: use `section-header` sized text and `text-lg` body styling instead of `text-sm` pills, so the callout labels visually match the story section headings/text

### Specific changes:

**Layout (lines 123-146):**
- Replace `flex items-center h-full` with `grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center`
- Image side: remove `w-1/2`, remove inner `max-w-[550px]` wrapper, use `rounded-2xl overflow-hidden shadow-elegant` to match story images
- Canvas: `w-full aspect-square` filling its grid column
- Labels side: remove `w-1/2 pl-12`, use same structure as story text column

**Canvas drawing (line 68-77):**
- Switch from cover-fit to contain-fit so the full earring is visible without cropping

**Label styling (line 136):**
- Increase from `text-sm` to `text-lg` to match story section body text size

