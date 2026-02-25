

# Make 3D Viewer Larger, Remove Fullscreen and Reset Buttons

## Changes

### 1. `src/components/ThreeDViewer.tsx`
- Remove the fullscreen button, `handleFullscreen` function, `useNavigate` import, and `Maximize2` import
- Remove the reset button entirely (for all viewer types), `handleResetView` function, and `RotateCcw` import
- The controls overlay div can be removed completely since both buttons are gone

### 2. `src/pages/ProductDetail.tsx`
- Add `-mx-2 lg:-mx-3` negative margins to the viewer wrapper div to expand it into ~50% of the container's side padding, making the 3D view larger while keeping the rest of the layout untouched

### 3. Cleanup
- Remove `/viewer` route from `src/App.tsx` and the `Viewer` import
- Delete `src/pages/Viewer.tsx`

