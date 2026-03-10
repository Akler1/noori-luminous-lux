

## Fix: Remove extra black space below products in 3D cards

The product card iframes use `aspect-[3/4]` (portrait ratio) which is taller than the 3D viewer content, causing black bars below the product. The iframe background is also set to black (`#000000`), making the empty space very visible.

### Changes in `src/components/Product3DCarousel.tsx`

1. **Line 112**: Change `aspect-[3/4]` to `aspect-square` so the iframe container matches the 3D viewer's content area without extra vertical black space.

2. **Line 111**: Change `bg-black` to `bg-[#e8e8e8]` (or match the iframe viewer's actual background color) so any remaining empty space blends in rather than showing black.

3. **Line 117**: Change `background: "#000000"` to `background: "#e8e8e8"` on the iframe style for the same reason.

