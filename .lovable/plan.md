

# Use Dedicated Mobile Hero Images

## Approach
Instead of trying to CSS-crop the wide desktop image, use the user's pre-cropped mobile images directly. This guarantees perfect framing and fixes the sketch overlay alignment since both images will have matching aspect ratios and content positioning.

## Changes

### 1. Copy uploaded images to project (`src/assets/`)
- Copy `user-uploads://hero-real.PNG` to `src/assets/hero-real-mobile.png`
- Copy `user-uploads://hero-sketch.PNG` to `src/assets/hero-sketch-mobile.png`

### 2. Update `src/components/HeroSketchReveal.tsx`

**Imports (top of file):**
- Add imports for the two new mobile images alongside the existing desktop ones

**Background image (line 410-413):**
- Use the mobile image on small screens and the desktop image on md+
- Render two `<img>` tags: one with the mobile image (hidden on md+) and one with the desktop image (hidden below md)
- Mobile image uses simple `object-cover object-center` since it's already perfectly cropped
- Desktop image keeps `object-cover object-right` exactly as-is

**Sketch image loading (lines 152-160):**
- Load the appropriate sketch image based on `isMobile` state
- When `isMobile` is true, load `hero-sketch-mobile.png`; otherwise load the existing `hero-sketch.png`
- Re-trigger the load when `isMobile` changes

**Canvas offset calculation (lines 19-42):**
- Simplify the mobile branch: since the mobile images are pre-cropped, the canvas offset on mobile can use simple centered `object-cover` math (center alignment) instead of the 50% focal-point hack
- Desktop branch stays completely untouched

### What stays the same
- All desktop rendering: image positioning, sketch overlay, pointer interactions -- zero changes
- Text content, CTAs, scroll cue, animation timing
- The overall component structure and animation loop

