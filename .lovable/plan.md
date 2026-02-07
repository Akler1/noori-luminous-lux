
# Fix Hero Sketch Reveal Effect - Pointer Event Blocking Issue

## Root Cause

The sketch reveal effect doesn't work because the text content overlay in `HeroSplitEditorial.tsx` has `z-10` and covers the entire hero area, blocking all pointer events from reaching the `HeroSketchReveal` component underneath.

**Current layer structure:**
```
Section (parent)
├── HeroSketchReveal (z-auto/0) ← has pointer event handlers
│   ├── <img> base photo
│   └── <canvas> sketch overlay
├── Text content div (z-10) ← BLOCKS ALL POINTER EVENTS
│   └── Text, buttons, etc.
└── Scroll cue (z-20)
```

When you move the mouse over the hero, the text div (which has `md:absolute md:inset-0`) intercepts all pointer events. The `onPointerMove` handler on `HeroSketchReveal` never fires.

## Solution

Add `pointer-events-none` to the text content wrapper, then re-enable pointer events on the interactive elements (buttons, links) inside it.

**Fixed layer structure:**
```
Section (parent)
├── HeroSketchReveal (z-auto) ← receives ALL pointer events now
│   ├── <img> base photo
│   └── <canvas> sketch overlay (pointer-events-none)
├── Text content div (z-10, pointer-events-none) ← passes events through
│   └── Interactive elements (pointer-events-auto) ← buttons still clickable
└── Scroll cue (z-20)
```

## File Changes

| File | Change |
|------|--------|
| `src/components/HeroSplitEditorial.tsx` | Add `pointer-events-none` to text wrapper, `pointer-events-auto` to interactive children |

## Code Changes

### HeroSplitEditorial.tsx

**Line 31** - Add `pointer-events-none` to the text content wrapper:
```tsx
<div className="relative z-10 h-full min-h-[100svh] md:min-h-0 md:absolute md:inset-0 flex items-end pb-16 md:pb-24 px-5 md:px-8 pointer-events-none">
```

**Line 36** - Add `pointer-events-auto` to the motion.div containing the text content so the buttons remain clickable:
```tsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
  className="max-w-xl pointer-events-auto"
>
```

## Expected Result

After this fix:
- Mouse movement anywhere on the hero will trigger the sketch reveal effect
- The text will still be visible and positioned at the left edge
- The buttons ("Shop the Collection" and "Explore in 3D") will remain clickable
- The reveal effect will work across the entire hero, including over the text area
