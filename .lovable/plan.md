
# Fix Hero to Display Consistently Across All Desktop Sizes

## Problem Identified

The hero section currently uses `min-h-[calc(100vh-4rem)]` which makes it fill the viewport height. Combined with `object-cover` on the background image, this causes:

- **Taller viewports (smaller width)**: Image gets cropped more on the sides
- **Wider viewports (larger width)**: More of the image is visible horizontally

The text position also shifts because the content container inherits this variable height.

## Solution

Use a **fixed aspect ratio** for the hero section on desktop instead of viewport-based height. This ensures the hero always displays the same portion of the image regardless of screen size.

```text
Current Behavior:
┌─────────────────┐     ┌───────────────────────────────┐
│                 │     │                               │
│   [cropped]     │     │      [full image visible]     │
│                 │     │                               │
│   Small width   │     │         Large width           │
│   100vh tall    │     │         100vh tall            │
└─────────────────┘     └───────────────────────────────┘

Fixed Behavior:
┌─────────────────┐     ┌───────────────────────────────┐
│                 │     │                               │
│  [same crop]    │     │        [same crop]            │
│                 │     │                               │
│  aspect-[16/9]  │     │       aspect-[16/9]           │
└─────────────────┘     └───────────────────────────────┘
```

---

## File Changes

| File | Change |
|------|--------|
| `src/components/HeroSplitEditorial.tsx` | Replace viewport height with fixed aspect ratio on desktop |

---

## Technical Implementation

### Change the Section Height Logic

Replace the `100vh` approach with a fixed aspect ratio that matches your hero image:

**Current:**
```tsx
<section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
```

**New:**
```tsx
<section className="relative min-h-[100svh] md:min-h-0 md:aspect-[16/9] overflow-hidden">
```

This means:
- **Mobile**: Still uses full viewport height (`100svh`)
- **Desktop (768px+)**: Uses fixed `16:9` aspect ratio so the image crop is always consistent

### Update the Content Container

The text container also needs to match:

**Current:**
```tsx
<div className="relative z-10 container-editorial h-full min-h-[calc(100vh-4rem)] flex items-end pb-16 lg:pb-24">
```

**New:**
```tsx
<div className="relative z-10 container-editorial h-full min-h-[100svh] md:min-h-0 md:absolute md:inset-0 flex items-end pb-16 md:pb-24">
```

### Consolidate Breakpoints

Also update the `lg:` classes to `md:` so desktop layout is consistent:

| Current | New |
|---------|-----|
| `lg:from-black/60 lg:via-black/30` | `md:from-black/60 md:via-black/30` |
| `lg:mb-6` | `md:mb-6` |
| `lg:mb-10` | `md:mb-10` |
| `lg:pb-24` | `md:pb-24` |
| `hidden lg:flex` (scroll cue) | `hidden md:flex` |

---

## Summary

1. **Mobile**: Keeps full-screen hero (`100svh`)
2. **Desktop**: Uses fixed `aspect-[16/9]` ratio so the image always shows the same content regardless of browser width
3. **Breakpoint consolidation**: All desktop styles kick in at `md:` (768px) to prevent layout shifts
