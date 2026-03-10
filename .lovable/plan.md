

## Increase 3D viewer height by ~12%

Change the aspect ratio from `1 / 1` to `1 / 1.12` in both the iframe and model-viewer styles in `ThreeDViewer.tsx`. This makes the viewer 12% taller while still being responsive.

### Changes in `src/components/ThreeDViewer.tsx`

- **Line 106**: `aspectRatio: '1 / 1'` → `aspectRatio: '1 / 1.12'`
- **Line 129**: `aspectRatio: '1 / 1'` → `aspectRatio: '1 / 1.12'`

