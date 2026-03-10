

## Fix: Image contained on LEFT, cards on RIGHT — not a background

**Problem now**: The canvas is `absolute inset-0` filling the entire viewport as a background. You want the earring animation contained in the left column only, with cards on the right.

**Solution**: Keep a single canvas ref but position it inside the left column (not the full viewport). The left column gets `relative` + the canvas is `absolute inset-0` within that column only.

### Changes in `src/components/ScrollImageSequence.tsx`

**Lines 148-155** — Restructure the sticky container:

```tsx
<div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
  {/* Desktop: two-column layout */}
  <div className="hidden lg:grid lg:grid-cols-2 h-full">
    {/* Left: canvas contained here */}
    <div className="relative h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>

    {/* Right: info cards */}
    <div className="flex flex-col gap-5 justify-center px-10 max-w-md mx-auto">
      {/* ... cards unchanged ... */}
    </div>
  </div>

  {/* Mobile: full-screen canvas + overlay */}
  <canvas ref={mobileCanvasRef} className="lg:hidden absolute inset-0 w-full h-full" />
  {/* ... mobile overlay unchanged ... */}
</div>
```

**Key difference from before**: Two separate refs (`canvasRef` for desktop, `mobileCanvasRef` for mobile). `drawFrame` draws to whichever ref is currently visible (check `clientWidth > 0`).

**New ref + drawFrame update**:
- Add `mobileCanvasRef = useRef<HTMLCanvasElement>(null)`
- In `drawFrame`, pick the active canvas: `const canvas = canvasRef.current?.clientWidth ? canvasRef.current : mobileCanvasRef.current`
- Desktop canvas lives inside the left grid column — it only fills that column, not the whole screen
- Mobile canvas stays full-screen as before

This gives you: earring animation contained on the left half, info cards on the right half, no background stretching.

