

## Fix: Excessive black space on mobile 3D product viewer

The iframe in `ThreeDViewer.tsx` uses a fixed `height: 700px` (line 106). On a 390px-wide mobile screen, this creates a tall black rectangle with the product floating at the top.

### Change in `src/components/ThreeDViewer.tsx`

**Line 104-109**: Replace the fixed 700px height with an aspect-square approach that scales with viewport width.

```tsx
// Before
style={{
  width: '100%',
  height: '700px',
  border: 'none',
  backgroundColor: 'transparent'
}}

// After
style={{
  width: '100%',
  aspectRatio: '1 / 1',
  border: 'none',
  backgroundColor: 'transparent'
}}
```

Same change for the model-viewer fallback (lines 127-131).

This makes the viewer square on all viewports — on mobile (390px) it will be 390px tall instead of 700px, eliminating the black gap. On desktop the two-column grid keeps it large enough.

