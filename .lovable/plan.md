

# Mobile Hero Image Fix - Focus on Pendant

## Problem
On mobile, the hero background image uses `object-right` positioning, which crops the pendant (center-right of the image) almost entirely out of view. The user sees mostly the marble background with chain edges. The pendant should be the focal point on mobile.

## What stays the same
- Desktop layout is completely untouched -- the `md:` breakpoint classes and the 16:9 aspect ratio strategy remain exactly as they are
- Text positioning, CTA buttons, scroll cue -- all unchanged on desktop

## Changes

### 1. `src/components/HeroSketchReveal.tsx` (line 401)
- Change the image class from `object-right` to `object-[65%_center] md:object-right`
- On mobile: `object-[65%_center]` positions the crop at 65% from the left (where the pendant sits), centering it on screen
- On desktop (md+): `object-right` keeps the current right-aligned crop behavior exactly as-is

### 2. `src/components/HeroSketchReveal.tsx` (canvas offset function, lines 19-48)
- Add a mobile-aware branch to `calculateImageCoverRightOffset` so the sketch overlay canvas aligns with the shifted image position on mobile
- On mobile, the offset calculation will use center-right (65%) positioning instead of full-right alignment
- On desktop, the existing right-alignment logic stays identical
- The function will accept an optional `isMobile` parameter (defaulting to false) to determine which calculation path to use

### 3. `src/components/HeroSketchReveal.tsx` (line 302)
- Pass the `isMobile` state (already available via the `useIsMobile` hook on line 136) into the offset calculation call so the canvas aligns correctly on mobile

### Technical Detail
The `object-[65%_center]` value tells the browser: when cropping the image to fit the container, use a focal point at 65% from the left edge and vertically centered. This places the pendant necklace front-and-center on mobile screens. The `md:object-right` override restores the original desktop behavior at the 768px breakpoint and above, so desktop rendering is completely unchanged.
