

## Fix: Give the earring animation equal spacing from left edge and right cards

**Problem**: The canvas uses `absolute inset-0` which ignores the parent's `p-8` padding — it still stretches to the column edges, hugging the left side of the page.

**Fix in `src/components/ScrollImageSequence.tsx`**:

Change line 161 from:
```tsx
<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
```
to:
```tsx
<canvas ref={canvasRef} className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)]" />
```

This insets the canvas 2rem (32px) from all edges of its column, giving it breathing room from both the left page edge and the right card column. The visual result will match the reference image — earring centered in the left half with equal margins.

