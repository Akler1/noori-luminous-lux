

# Fix 3D Viewer Controls for Iframe-Based Products

## Problem
The product pages use iframe-based 3D viewers (not the model-viewer library), but the controls are built for model-viewer. This means:
- **Reset button** calls `resetTurntableRotation()` which only works on model-viewer, not iframes -- so it does nothing
- **Fullscreen button** uses `requestFullscreen()` which is blocked inside the sandboxed preview environment
- **Info text** says "Scroll to zoom / Double-click to reset" but those are model-viewer features, not necessarily available in the iframe viewer

## Solution

**File: `src/components/ThreeDViewer.tsx`**

1. **Fix fullscreen**: Replace `requestFullscreen()` with a CSS-based fullscreen approach using fixed positioning (`position: fixed; inset: 0; z-index: 50`). This works reliably regardless of iframe sandboxing. Add a close button when in this mode.

2. **Hide reset button for iframe viewers**: Since we can't control the iframe content, hide the reset button when rendering an iframe (only show it for model-viewer).

3. **Update info text for iframe viewers**: Change the hint text to just "Click and drag to rotate" when showing an iframe, since zoom/reset behavior depends on the external viewer.

4. **Add Minimize icon**: Import `Minimize2` from lucide-react to show when already in fullscreen, giving a clear way to exit.

No other files need changes.

