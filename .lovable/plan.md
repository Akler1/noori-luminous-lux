

# Fix Scroll Image Sequence: Smaller Image + Black Labels

## Overview

Two changes: shrink the canvas so the earring image doesn't stretch to fill the entire screen, and switch the callout labels/dots/lines from white/transparent to solid black styling.

## Changes

### 1. Shrink the canvas area (`ScrollImageSequence.tsx`)

Currently the inner container is `w-full h-full` which fills the entire viewport. Change it to a constrained size so the earring renders at a comfortable, centered size rather than spanning edge-to-edge.

- Change the inner container from `w-full h-full` to `w-[60vh] h-[60vh] max-w-[600px]` (roughly 60% of viewport height, capped at 600px) so the image is a contained square/rectangle centered on screen.
- The canvas inside keeps `w-full h-full` to fill its parent.
- The background stays black, image is centered via the existing `flex items-center justify-center`.

### 2. Change callout styling to black (`ScrollImageSequence.tsx`)

- **Dots**: `bg-white/60` --> `bg-black`
- **Leader lines**: `bg-white/40` --> `bg-black/60`
- **Label boxes**: `bg-white/10 backdrop-blur-md border border-white/20 text-white/90` --> `bg-white border border-black/20 text-black`

## Files Modified

- `src/components/ScrollImageSequence.tsx` -- resize inner container + update callout colors to black

