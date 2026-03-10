

## Fix: Center the animation + cards and reduce the gap

**Problem**: The 50/50 grid (`grid-cols-2`) pushes content to edges. The gap between the animation and cards is too large.

**Fix in `src/components/ScrollImageSequence.tsx`** — adjust the grid layout on line 158 and surrounding lines:

1. **Center everything on the page**: Add `max-w-7xl mx-auto` to the grid container so both columns sit centered rather than spanning the full viewport width.

2. **Reduce the gap**: Change from two equal columns with no explicit gap to `gap-8` (half the current visual separation). Also reduce the card column's `px-10` to `px-4` to pull cards closer to the animation.

3. **Adjust canvas inset**: Reduce the left-column padding from `p-8` to `p-4` on the side facing the cards, keeping left padding for page edge breathing room.

### Specific changes (line 158-165):

```tsx
// Line 158: Add centering + reduced gap
<div className="hidden lg:grid lg:grid-cols-2 h-full max-w-6xl mx-auto gap-4">
  {/* Left: canvas */}
  <div className="relative h-full py-8 pl-8 pr-4">
    <canvas ref={canvasRef} className="absolute top-8 bottom-8 left-8 right-4 w-[calc(100%-3rem)] h-[calc(100%-4rem)]" />
  </div>

  {/* Right: info cards — reduced horizontal padding */}
  <div className="flex flex-col gap-5 justify-center pl-4 pr-8 max-w-sm mx-auto">
```

This centers the whole section on the page and halves the visual gap between animation and cards.

