

# Update Nav Bar Logo and Size

## Changes

**File: `src/assets/noori-logo-new.png`**
- Copy the uploaded Noori logo image to the project assets.

**File: `src/components/Header.tsx`**

1. **Replace logo import**: Change from `noori-logo.png` to the new uploaded logo.
2. **Increase nav bar height by 25%**:
   - Unscrolled: `h-14 md:h-16` becomes `h-[70px] md:h-20`
   - Scrolled: `h-12 md:h-14` becomes `h-[60px] md:h-[70px]`
3. **Increase logo size by 25%**:
   - Unscrolled: `h-9 md:h-10` becomes `h-11 md:h-12`
   - Scrolled: `h-7 md:h-8` becomes `h-9 md:h-10`
4. **Adjust top offset**: Bump `top-3` to `top-4` to keep the larger bar visually balanced.

All other nav styling (glassmorphism, pill shape, links, cart icon) stays the same.

