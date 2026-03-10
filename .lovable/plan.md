

## Fix: Image too large, cropped on right, excessive padding

**Issues:**
1. Desktop uses **cover-fit** — image overflows and gets cropped (diamond cut off on right)
2. Grid is `1.2fr / 1fr` — image column is wider than the cards column, making image oversized
3. Card height `h-[80vh]` creates excessive vertical padding

**Changes in `src/components/ScrollImageSequence.tsx`:**

1. **`drawFrame` desktop branch (lines 97-105)**: Switch from cover-fit to **contain-fit**. Fill background with `#faf9f7` first, then draw the image fitted inside the canvas so nothing is cropped.

2. **Grid layout (line 192)**: Change `lg:grid-cols-[1.2fr_1fr]` to `lg:grid-cols-2` so both columns are equal width — image matches cards column width.

3. **Card height (line 196)**: Reduce from `h-[80vh]` to `h-[70vh]` to reduce top/bottom padding.

4. **Desktop background fill in `drawFrame`**: Add `ctx.fillStyle = "#faf9f7"; ctx.fillRect(0, 0, w, h);` before drawing so contain-fit gaps match the section background.

