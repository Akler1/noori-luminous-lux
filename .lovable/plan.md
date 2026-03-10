

## Fix: Center animation + cards as a group with a smaller gap

**Root cause**: Every previous attempt used CSS grid with the canvas column stretching to fill the remaining viewport width (`1fr`). This inherently pushes the animation to the left edge and cards to the right, with a massive gap in between. Padding hacks don't fix this — the layout structure itself is wrong.

**Correct approach**: Use `flex` with `justify-center` to treat the animation and cards as a single centered group with a controlled gap between them.

### Change in `src/components/ScrollImageSequence.tsx` (lines 157-162)

Replace the desktop grid layout:

```tsx
{/* ── Desktop: centered flex layout ── */}
<div className="hidden lg:flex items-center justify-center h-full gap-10 px-16">
  {/* Left: canvas — fixed aspect ratio container */}
  <div className="relative h-[calc(100%-4rem)]" style={{ aspectRatio: '1 / 1' }}>
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
  </div>

  {/* Right: info cards */}
  <div className="flex flex-col gap-5 justify-center w-72">
```

**What this does**:
- **`flex justify-center`** — animation + cards sit as a centered group on the page, equal space on left and right.
- **`gap-10`** (2.5rem) — a controlled, small gap between animation and cards instead of the massive leftover space from `1fr`.
- **`aspectRatio: '1/1'`** on the canvas container — gives the canvas a tall square shape sized by the viewport height, rather than stretching to fill width.
- **`w-full h-full` on canvas** — simple, no conflicting absolute positioning values.
- Cards column keeps `w-72` but drops `pr-16` since page-edge spacing is handled by the parent `px-16`.

