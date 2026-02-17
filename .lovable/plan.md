

# Update Scroll Image Sequence: New Frames + Full-Screen Layout

## Changes

### 1. Update frame source (Index.tsx)
- Change `basePath` from `/earing_frames` to `/earing_frames_final`
- Change `frameCount` from `49` to `46` (the new folder has 46 frames)

### 2. Make the image full-screen (ScrollImageSequence.tsx)
Remove the two-column grid layout so the canvas fills the entire viewport. The text content will overlay on top of the image (bottom area) instead of sitting in a side column.

**Layout change:**
- Remove `container-editorial` and the grid structure
- Canvas becomes full-screen: `w-full h-full` filling the entire sticky viewport
- Draw the image using **cover-fit** (not contain) so it fills edge to edge with no gaps
- Text content overlays at the bottom of the screen with a subtle gradient backdrop for readability

### Technical Details

**Index.tsx (line 18-24):**
- `basePath="/earing_frames_final"` and `frameCount={46}`

**ScrollImageSequence.tsx layout (lines 122-158):**
- Sticky container: `h-screen w-full relative`
- Canvas: absolute, fills entire screen
- Text overlay: absolute bottom, with gradient backdrop (`bg-gradient-to-t from-black/60 to-transparent`), text in white
- Heading, body, chips retain their structure but switch to light text colors for contrast against the image

**ScrollImageSequence.tsx drawing (lines 65-80):**
- Switch from contain-fit back to cover-fit so the earring fills the entire screen without any empty space around it

