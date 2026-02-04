

# Homepage Refresh: Nav V2 + Hero Edge Fix + FacetPlaceholder

## Overview

This update delivers three key improvements:
1. **Nav redesign**: Floating dark capsule style with proper alignment
2. **Hero edge fix**: Remove white fog, apply clean tight mask treatment
3. **FacetPlaceholder**: Designed placeholder component for info sections until real imagery exists

---

## Changes Summary

| Component | Current State | New State |
|-----------|---------------|-----------|
| **Header** | Full-width transparent/blur nav | Floating dark capsule, centered links |
| **Hero image edge** | Wide gradient veil creating "white fog" | Tight 8-12% left-edge mask |
| **Hero interactions** | Already implemented | Keep existing (cursor-follow, staggered entrance) |
| **StickyStoryRefined** | Relies on earrings/necklace/bracelet images | Split: text left + FacetPlaceholder right |

---

## File Changes

| Action | File |
|--------|------|
| **Modify** | `src/components/Header.tsx` |
| **Modify** | `src/components/HeroSplitEditorial.tsx` |
| **Create** | `src/components/FacetPlaceholder.tsx` |
| **Modify** | `src/components/StickyStoryRefined.tsx` |
| **Update** | `src/index.css` |

---

## 1. NAV V2 — Floating Dark Capsule

### Current vs New

| Aspect | Current | New |
|--------|---------|-----|
| Container | Full-width transparent | Floating capsule, centered |
| Background | `bg-background/95 backdrop-blur-md` on scroll | `rgba(10,10,10,0.78)` + `backdrop-blur-[12px]` always |
| Border | `border-b border-hairline` on scroll | `border border-white/8` + `rounded-2xl` |
| Position | Fixed full-width | Fixed, centered with max-width, top margin |
| Layout | Logo left, links right of center, cart far right | Logo left, links **absolute centered**, cart right |
| Height | `h-20 md:h-24` | `h-14 md:h-16` (more compact) |
| Scroll state | Adds border, blur | Slightly more opaque, reduced height |

### Technical Implementation

**Nav Container:**
```text
┌─────────────────────────────────────────────────────────────────────────┐
│     [NOORI LOGO]      Shop  About  FAQ  Contact           [Cart🛒(2)]  │
│     (left)                   (absolute centered)              (right)  │
└─────────────────────────────────────────────────────────────────────────┘
                  ↑ max-width: 1100px, mx-auto, mt-4, rounded-2xl
```

**Styling:**
- Background: `bg-[rgba(10,10,10,0.78)]`
- Blur: `backdrop-blur-[12px]`
- Border: `border border-white/[0.08]`
- Radius: `rounded-[18px]`
- Padding: `px-6 md:px-7 py-3.5 md:py-4`

**Scroll State Changes:**
- Background opacity increases: `rgba(10,10,10,0.88)`
- Height slightly reduced
- Transition: 300ms

**Link Hover:**
- Animated underline (already exists, keep it)
- Color transition to gold

**Cart Icon:**
- Slightly brighter on hover (`opacity-100` from `opacity-80`)
- Badge styling kept

**Optional Shop Dropdown (compact):**
- Column A: Studs, Necklaces, Bracelets
- Column B: Best Sellers, 3D Gallery
- Same dark glass styling as nav
- Opens on click, closes on outside click

---

## 2. HERO — Remove White Fog, Apply Tight Mask

### Current Problem

The hero currently has a wide gradient veil (line 132 in HeroSplitEditorial.tsx):
```tsx
<div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
```

This creates an obvious "white fog" effect on the left edge of the image.

### Solution: Tight CSS Mask

Replace the gradient div with a CSS `mask-image` on the image itself that fades only 8-12% of the left edge.

**Implementation:**
```css
.hero-image-masked {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0,0,0,0.3) 3%,
    rgba(0,0,0,0.7) 6%,
    black 10%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0,0,0,0.3) 3%,
    rgba(0,0,0,0.7) 6%,
    black 10%
  );
}
```

This creates a tight fade that only affects the leftmost ~10% of the image, with no visible "fog" or blur.

### Changes to HeroSplitEditorial.tsx

1. Remove the gradient veil div entirely
2. Add `.hero-image-masked` class to the image
3. Keep cursor-follow highlight (already working)
4. Keep staggered entrance animations (already working)

---

## 3. FACETPLACEHOLDER — Designed Placeholder Component

### Purpose

When real product photography isn't available, this component provides a designed visual counterweight that maintains the premium aesthetic.

### Design Specifications

- **Dimensions**: Fill available space, min-height 400px on desktop
- **Radius**: 24px
- **Background**: Subtle gradient from `card` to slightly darker
- **Border**: 1px gold at 15-20% opacity
- **Shadow**: `shadow-elegant`
- **Inner content**: Abstract diamond-facet SVG linework (thin strokes)
- **Hover effect**: Subtle shimmer animation across the facet lines

### SVG Linework Concept

```text
┌─────────────────────────────────────────┐
│                                         │
│            ╱╲                           │
│           ╱  ╲                          │
│          ╱────╲                         │
│         ╱      ╲                        │
│        ╱   ◇    ╲   ← thin gold strokes │
│       ╱          ╲                      │
│      ╱────────────╲                     │
│                                         │
└─────────────────────────────────────────┘
```

### Component Props

```tsx
interface FacetPlaceholderProps {
  className?: string;
  variant?: 'diamond' | 'facet' | 'minimal';
}
```

### CSS for Shimmer Effect

```css
@keyframes facet-shimmer {
  0% { stroke-opacity: 0.15; }
  50% { stroke-opacity: 0.35; }
  100% { stroke-opacity: 0.15; }
}

.facet-line {
  stroke: hsl(var(--accent));
  stroke-width: 1px;
  fill: none;
  animation: facet-shimmer 4s ease-in-out infinite;
}

.facet-line:nth-child(2) { animation-delay: 0.5s; }
.facet-line:nth-child(3) { animation-delay: 1s; }
/* staggered delays for each line */
```

---

## 4. STICKYSTORYREFINED — Use FacetPlaceholder Until Real Imagery

### Current State

The component uses `earringsHero.jpg`, `necklaceHero.jpg`, `braceletHero.jpg` for the sticky media frame.

### Changes

Replace the crossfading images with `FacetPlaceholder` component:

**Desktop:**
- Sticky media frame now shows `FacetPlaceholder` instead of photo
- The single overlapping product card remains (uses `hero-product-shot.png`)
- Text beats remain unchanged

**Mobile:**
- Each beat shows `FacetPlaceholder` instead of the hero images
- Text remains below each placeholder

### Updated Layout

```text
Desktop:
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  "The cut. The clarity."      │  ┌────────────────────────────┐ │
│  Every Noori diamond...       │  │                            │ │
│                               │  │    FacetPlaceholder        │ │
│                               │  │    (abstract diamond       │ │
│                               │  │     linework + shimmer)    │ │
│                               │  │                  ┌───────┐ │ │
│                               │  │                  │product│ │ │
│                               │  └──────────────────│ card  │ │ │
│                                                      └───────┘   │
└──────────────────────────────────────────────────────────────────┘
```

---

## Implementation Order

1. **Update `src/index.css`**
   - Add nav capsule styling tokens
   - Add `.hero-image-masked` class
   - Add facet shimmer keyframes
   - Add `.facet-line` styling

2. **Modify `src/components/Header.tsx`**
   - Restructure to floating capsule
   - Logo left, centered links (absolute), cart right
   - Dark glass styling
   - Scroll state changes
   - (Optional) Add compact Shop dropdown

3. **Modify `src/components/HeroSplitEditorial.tsx`**
   - Remove gradient veil div
   - Add `.hero-image-masked` class to image
   - Keep all existing interactions

4. **Create `src/components/FacetPlaceholder.tsx`**
   - Abstract diamond SVG linework
   - Shimmer animation on hover
   - Configurable variants

5. **Modify `src/components/StickyStoryRefined.tsx`**
   - Replace image crossfade with FacetPlaceholder
   - Keep overlapping product card
   - Update mobile layout

---

## Technical Details

### Nav Capsule Positioning

```tsx
<header className={cn(
  "fixed top-4 left-1/2 -translate-x-1/2 z-50",
  "max-w-[1100px] w-[calc(100%-2rem)] md:w-[calc(100%-4rem)]",
  "bg-[rgba(10,10,10,0.78)] backdrop-blur-[12px]",
  "border border-white/[0.08] rounded-[18px]",
  "transition-all duration-300",
  isScrolled && "bg-[rgba(10,10,10,0.88)] top-2"
)}>
  <div className="flex items-center justify-between px-6 md:px-7 py-3.5 md:py-4">
    {/* Logo */}
    <Link to="/">...</Link>
    
    {/* Centered Links (absolute) */}
    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
      ...
    </nav>
    
    {/* Cart */}
    <div className="flex items-center gap-3">
      <Button>Cart</Button>
      <Button className="md:hidden">Menu</Button>
    </div>
  </div>
</header>
```

### Hero Image Mask CSS

```css
.hero-image-masked {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0,0,0,0.4) 4%,
    rgba(0,0,0,0.8) 8%,
    black 12%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    rgba(0,0,0,0.4) 4%,
    rgba(0,0,0,0.8) 8%,
    black 12%
  );
}
```

### FacetPlaceholder SVG Structure

```tsx
<svg viewBox="0 0 200 200" className="w-full h-full">
  {/* Diamond facet lines */}
  <path d="M100 20 L180 80 L150 180 L50 180 L20 80 Z" className="facet-line" />
  <path d="M100 20 L100 180" className="facet-line" />
  <path d="M20 80 L180 80" className="facet-line" />
  <path d="M100 20 L50 180" className="facet-line" />
  <path d="M100 20 L150 180" className="facet-line" />
  {/* Additional internal facet lines for complexity */}
</svg>
```

---

## Responsive Behavior

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Nav | Centered floating capsule | Same capsule, hamburger menu |
| Nav links | Visible, centered | Hidden, in drawer |
| Hero image | Bleeds right with tight left mask | Stacked, rounded |
| FacetPlaceholder | In sticky frame | Stacked between beats |
| Hero interactions | Cursor-follow active | Looping light-shift |

---

## Files Summary

| File | Changes |
|------|---------|
| `src/index.css` | Add nav capsule vars, hero mask class, facet shimmer |
| `src/components/Header.tsx` | Complete restyle to floating dark capsule |
| `src/components/HeroSplitEditorial.tsx` | Remove gradient veil, add mask class |
| `src/components/FacetPlaceholder.tsx` | New component with SVG linework |
| `src/components/StickyStoryRefined.tsx` | Replace images with FacetPlaceholder |

