

# Fix Fullscreen Cropping on Product 3D Viewers

## Problem
When clicking the fullscreen button, the iframe/model-viewer element goes fullscreen but keeps its fixed `height: 700px` style. This means on most screens, the content doesn't fill the viewport and gets cropped or letterboxed awkwardly, cutting off half the product.

## Solution
1. **Fullscreen the parent container** instead of the iframe/model-viewer directly -- this ensures the controls overlay and info bar also appear in fullscreen.
2. **Listen for fullscreen change events** to track state reliably (handles Escape key exit too).
3. **When in fullscreen, switch to `100vh` height** on the iframe/model-viewer so it fills the entire screen instead of staying at 700px.

## Technical Changes

**File: `src/components/ThreeDViewer.tsx`**

1. Add a `containerRef` for the wrapping `motion.div` and use it for fullscreen requests instead of `modelViewerRef`.
2. Add a `fullscreenchange` event listener to keep `isFullscreen` state in sync.
3. Conditionally set the iframe/model-viewer height: `100vh` when fullscreen, `700px` otherwise.
4. Update the `handleFullscreen` function to target the container.

No other files need changes.

