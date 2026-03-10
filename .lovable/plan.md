

## Fix: Add padding to left column + crop image 10% on each side on desktop

Two issues to fix:

1. **Image hugs the left edge** — add padding to the left column so the canvas has breathing room.
2. **Black line artifact + centering** — crop 10% from left and 10% from right of the source image on desktop (same approach already used on mobile).

### Changes in `src/components/ScrollImageSequence.tsx`

**Left column padding (line 153):**
Change `<div className="relative h-full">` to `<div className="relative h-full p-8">` — gives the canvas room from edges.

**Desktop drawFrame (lines 93-101):**
Apply the same crop logic used for mobile — crop 10% from each side of the source image:

```tsx
} else {
  // Desktop: crop 10% from left and right for centered framing
  const cropLeft = 0.10;
  const cropWidth = 0.80;
  const sx = img.naturalWidth * cropLeft;
  const sw = img.naturalWidth * cropWidth;
  const sy = 0;
  const sh = img.naturalHeight;
  const croppedRatio = sw / sh;
  if (croppedRatio > canvasRatio) {
    dw = w; dh = w / croppedRatio; dx = 0; dy = (h - dh) / 2;
  } else {
    dh = h; dw = h * croppedRatio; dx = (w - dw) / 2; dy = 0;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}
```

This crops the source image to the center 80%, then contain-fits it within the padded column. No black line, no edge-hugging.

