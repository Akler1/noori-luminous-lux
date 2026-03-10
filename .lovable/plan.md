

## Fix: Remove the max-width constraint, use full-width layout with proper spacing

**What went wrong**: Adding `max-w-6xl` (1152px) on a 1952px viewport squished everything into a narrow centered strip — the animation got tiny instead of using the available space.

**Correct approach**: Keep the grid full-width but add balanced padding so the animation has breathing room from the left edge and a reasonable gap before the cards.

### Changes in `src/components/ScrollImageSequence.tsx` (lines 158-165)

```tsx
{/* Desktop: two-column layout — full width, balanced padding */}
<div className="hidden lg:grid lg:grid-cols-[1fr_auto] h-full">
  {/* Left: canvas with equal padding */}
  <div className="relative h-full">
    <canvas ref={canvasRef} className="absolute top-8 bottom-8 left-16 right-16 w-[calc(100%-8rem)] h-[calc(100%-4rem)]" />
  </div>

  {/* Right: info cards */}
  <div className="flex flex-col gap-5 justify-center w-72 pr-16">
```

- **No `max-w-6xl`** — grid spans full viewport.
- **`grid-cols-[1fr_auto]`** — animation column takes remaining space, card column sizes to content.
- **Canvas inset `left-16 right-16`** — 4rem padding on each side gives breathing room without shrinking the image.
- **Card column `w-72 pr-16`** — fixed card width with right page margin matching the left canvas margin.

