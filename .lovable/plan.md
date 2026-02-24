

# Remove "Quality, without shortcuts" and "A higher standard, made wearable" Sections

## What Changes

The `StickyStoryRefined` component currently renders three story beats. The first two -- "Quality, without shortcuts" and "A higher standard, made wearable" -- will be removed, leaving only "Brilliance with impact" (the UNICEF section).

## Technical Details

**File: `src/components/StickyStoryRefined.tsx`**

- Remove the first two entries from the `storyBeats` array (lines 7-18)
- Keep only "Brilliance with impact" (the third entry)
- Remove unused image imports (`cutClarityDiamonds`, `necklaceHero`) since only `braceletHero` will remain

