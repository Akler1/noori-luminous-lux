

# Mobile Fixes: Trust Bar, Earring Scroll, and Worn By You Carousel

Three mobile-only fixes. Desktop remains completely untouched.

---

## 1. Trust Bar - Compact 5-across on Mobile

**File:** `src/components/Product3DCarousel.tsx` (lines 98-135)

Change the grid from `grid-cols-2` to `grid-cols-5` on all screen sizes. On mobile, make items smaller:

- Grid: `grid-cols-5` instead of `grid-cols-2 md:grid-cols-5`
- Reduce gap: `gap-2 md:gap-8`
- Reduce padding: `px-2 md:px-0`
- Icons: `h-4 w-4 md:h-6 md:w-6`
- Title text: `text-[10px] md:text-sm`
- Hide subtitle paragraphs on mobile: add `hidden md:block` to each subtitle `<p>`
- Reduce inner gap: `gap-1 md:gap-2`

This keeps all 5 icons visible in one row on mobile without scrolling.

---

## 2. Earring Scroll Animation - Contain on Mobile

**File:** `src/components/ScrollImageSequence.tsx` (lines 68-78)

Update the `drawFrame` function to use "contain" mode on mobile so the full earring is visible:

- After `ctx.clearRect`, check `window.innerWidth < 768`
- If mobile: fill canvas with black, then use contain logic (scale image to fit within canvas without cropping, centered)
- If desktop: keep existing cover logic unchanged

```
// Mobile: contain (no crop)
if (imgRatio > canvasRatio) {
  dw = w; dh = w / imgRatio; dx = 0; dy = (h - dh) / 2;
} else {
  dh = h; dw = h * imgRatio; dx = (w - dw) / 2; dy = 0;
}
```

This is the inverse of the current cover logic.

---

## 3. Worn By You Carousel - Show 2 Images on Mobile

**File:** `src/components/SocialFeed.tsx` (lines 47, 53)

- Change `CarouselItem` class from `basis-auto` to `basis-1/2 md:basis-auto`
- Change inner div width from `w-72 md:w-80` to `w-full md:w-80`
- This makes each item take exactly half the viewport on mobile, showing 2 at a time

---

## Summary

| File | Change | Desktop impact |
|------|--------|----------------|
| `Product3DCarousel.tsx` | 5-col compact trust bar on mobile | None |
| `ScrollImageSequence.tsx` | Contain mode for earring on mobile | None |
| `SocialFeed.tsx` | basis-1/2 carousel items on mobile | None |

