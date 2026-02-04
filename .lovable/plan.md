

# Homepage Redesign: Header + Hero Diagonal Cut + Gallery Room

## Overview

This update transforms the homepage with three key changes:
1. **Header**: Remove floating capsule nav, create a proper in-flow header bar
2. **Hero**: Replace the "milky fog" mask with an intentional diagonal clip-path and gold hairline
3. **3D Gallery**: Replace the blur gradient transition with a contained "Gallery Room" dark container

---

## Current State vs New State

| Component | Current | New |
|-----------|---------|-----|
| **Header** | Floating capsule overlay on hero | In-flow header bar, dark (#111), ~64px height |
| **Header position** | `fixed top-4 left-1/2` with rounded capsule | `sticky top-0` full-width with subtle border |
| **Hero padding** | `pt-20 md:pt-24` (padding for overlay nav) | `pt-0` (header is in-flow, no extra padding) |
| **Hero image edge** | CSS mask gradient (creates fog) | Diagonal clip-path + gold hairline |
| **FadeToNightBridge** | Blur gradient white→gray→black | Removed entirely |
| **3D Carousel wrapper** | Full-bleed dark section | Inset "Gallery Room" with radius + shadow |

---

## File Changes

| Action | File |
|--------|------|
| **Modify** | `src/components/Header.tsx` |
| **Modify** | `src/components/HeroSplitEditorial.tsx` |
| **Delete/Modify** | `src/components/FadeToNightBridge.tsx` |
| **Modify** | `src/components/Product3DCarousel.tsx` |
| **Modify** | `src/pages/Index.tsx` |
| **Update** | `src/index.css` |

---

## 1. HEADER — In-Flow Dark Bar (No Overlay)

### Layout Structure

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ [NOORI LOGO]        Shop ▾   About   FAQ   Contact                    [🛒]  │
│   (left)                     (center)                                (right) │
└──────────────────────────────────────────────────────────────────────────────┘
                    Height: 64px desktop / 56px mobile
                    Background: #111 (near-black)
                    Border-bottom: 1px rgba(255,255,255,0.08)
```

### Key Changes

- **Position**: Change from `fixed` to `sticky top-0` (in document flow)
- **Background**: Solid `#111` (not transparent with blur)
- **Shape**: Full-width, no rounded corners, no floating capsule
- **Height**: `h-16` desktop (64px), `h-14` mobile (56px)
- **Border**: Bottom only: `border-b border-white/[0.08]`
- **Scroll behavior**: Slightly tighter padding + subtle backdrop blur on scroll
- **Hover states**: Links get animated underline; cart icon brightens

### Technical Implementation

```tsx
<header className={cn(
  "sticky top-0 z-50 w-full",
  "bg-[#111111]",
  "border-b border-white/[0.08]",
  "transition-all duration-300",
  isScrolled && "backdrop-blur-sm"
)}>
  <div className={cn(
    "flex items-center justify-between max-w-[1280px] mx-auto",
    "px-5 md:px-16",
    "h-14 md:h-16",
    isScrolled && "h-12 md:h-14"
  )}>
    {/* Logo - Left */}
    <Link to="/">
      <img src={nooriLogo} className="h-7 md:h-8" />
    </Link>
    
    {/* Navigation - Center */}
    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
      {/* Shop with dropdown, About, FAQ, Contact */}
    </nav>
    
    {/* Cart - Right */}
    <Button>Cart</Button>
  </div>
</header>
```

---

## 2. HERO — Diagonal Clip-Path + Gold Hairline

### Remove "Fog" Mask

The current hero uses `hero-image-masked` CSS class which creates a gradient fade on the left edge. This creates the "milky fog" effect.

**Solution**: Remove the mask and apply a diagonal `clip-path` instead.

### Diagonal Edge Design

```
         ┌─────────────────────────────────────────┐
         │                                         │
         │   TEXT                                  │
         │   CONTENT        ╱─────────────────────│
         │                ╱                        │
         │              ╱      HERO IMAGE          │
         │            ╱                            │
         │          ╱                              │
         │        ╱                                │
         └──────╱─────────────────────────────────┘
               ↑
         Diagonal edge with thin gold hairline (1px)
```

### Implementation

**Image container clip-path:**
```css
.hero-image-diagonal {
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
}
```

**Gold hairline overlay:**
```tsx
{/* Diagonal gold hairline */}
<div 
  className="absolute top-0 bottom-0 left-0 w-px z-30 pointer-events-none"
  style={{
    background: 'hsl(45 70% 50%)',
    transform: 'translateX(-1px)',
    clipPath: 'polygon(8% 0, calc(8% + 1px) 0, 1px 100%, 0 100%)'
  }}
/>
```

Alternatively, use an SVG line positioned along the diagonal:
```tsx
<svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
  <line 
    x1="8%" y1="0" 
    x2="0" y2="100%" 
    stroke="hsl(45, 70%, 50%)" 
    strokeWidth="1"
  />
</svg>
```

### Hero Padding Adjustment

Since the header is now in document flow, remove the top padding:
- **Before**: `pt-20 md:pt-24`
- **After**: `pt-0` (or small padding like `pt-4 md:pt-8` for breathing room)

### Keep Existing Interactions

- Cursor-follow light sweep (already implemented, just remove the mask class)
- Staggered entrance animations (already implemented)

---

## 3. FADETIGHTBRIDGE — Remove Entirely

Delete or empty this component. The gradient blur transition is replaced by the Gallery Room design.

**In Index.tsx:**
- Remove `<FadeToNightBridge />` from the component tree entirely

---

## 4. 3D CAROUSEL — Gallery Room Container

### Current vs New

| Aspect | Current | New |
|--------|---------|-----|
| Background | Full-bleed `hsl(220 30% 5%)` | Inset container with radius |
| Edges | Sharp, full-width | Rounded 32-44px, shadow |
| Transition | Relies on FadeToNightBridge gradient | Sits on off-white background with clear separation |
| Side cards | `opacity-40` (too dim) | `opacity-60` (brighter) |
| Section header | At top inside dark section | Inside container with gold accent |

### Gallery Room Structure

```
Off-white page background
│
├─────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│    ┌──────────────────────────────────────────────────────────────┐     │
│    │ ╌╌╌╌╌╌╌╌╌╌╌╌╌╌ thin gold line ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ │     │
│    │                                                              │     │
│    │     Explore in 3D.                                          │     │
│    │     BEST SELLERS                                            │     │
│    │     Spin each piece. See the details.                       │     │
│    │                                                              │     │
│    │     ┌───────┐     ┌─────────────┐     ┌───────┐            │     │
│    │     │  Prev │     │    MAIN     │     │  Next │            │     │
│    │     │ (60%) │     │   CAROUSEL  │     │ (60%) │            │     │
│    │     └───────┘     └─────────────┘     └───────┘            │     │
│    │                                                              │     │
│    │     [Drag to rotate pill]        01 / 03  ● ─── ●          │     │
│    │                                                              │     │
│    └──────────────────────────────────────────────────────────────┘     │
│           ↑                                                              │
│      radius: 36px, shadow, bg: #0b0b0b, padding: 80-110px               │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

### Implementation Details

**Container wrapper:**
```tsx
<section className="section-spacing bg-background">
  <div className="container-editorial">
    <div 
      className="relative rounded-[36px] overflow-hidden shadow-2xl"
      style={{ backgroundColor: '#0b0b0b' }}
    >
      {/* Gold top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-accent" />
      
      {/* Section header */}
      <div className="pt-20 pb-8 text-center">
        <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
          Explore in 3D
        </p>
        <h2 className="font-display text-3xl md:text-4xl text-white/90 mb-3">
          Best sellers
        </h2>
        <p className="text-white/60 text-base">
          Spin each piece. See the details.
        </p>
      </div>
      
      {/* Carousel content */}
      {/* ... existing carousel ... */}
      
      {/* Drag to rotate pill */}
      <div className="flex justify-center pb-16">
        <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 flex items-center gap-2">
          <RotateCw className="w-4 h-4 text-accent" />
          <span className="text-white/70 text-sm">Drag to rotate</span>
        </div>
      </div>
      
      {/* Bottom padding: ~110px */}
    </div>
  </div>
</section>
```

**Side card brightness increase:**
- Change from `opacity-40` to `opacity-60`
- Keep hover state at `opacity-80`

**Shadow for the room:**
```css
box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.4);
```

---

## 5. INDEX.TSX — Updated Component Order

```tsx
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSplitEditorial />
        <StickyStoryRefined />
        {/* FadeToNightBridge REMOVED */}
        <Product3DCarousel /> {/* Now has Gallery Room wrapper */}
        <SocialFeed />
        <StoryDuoModules />
        <FinalCTAForm />
      </main>
      <Footer />
      <EmailCaptureModal />
    </div>
  );
};
```

---

## 6. CSS UPDATES

### Remove hero-image-masked

Replace with new diagonal clip utility:

```css
/* Diagonal hero image clip */
.hero-image-diagonal {
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%);
}
```

### Add Gallery Room shadow

```css
.shadow-gallery-room {
  box-shadow: 0 25px 80px -20px rgba(0, 0, 0, 0.4);
}
```

---

## Responsive Behavior

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Header height | 64px (scrolled: 56px) | 56px (scrolled: 48px) |
| Header layout | Logo left, nav center, cart right | Logo left, cart + hamburger right |
| Hero layout | Side-by-side with diagonal cut | Stacked (image above text) |
| Hero diagonal | Visible clip-path + gold line | Standard rounded corners |
| Gallery Room | Large radius (36px), generous padding | Slightly smaller radius (24px), reduced padding |
| Gallery Room position | Inset with margins | Full-width with small horizontal padding |

---

## Implementation Order

1. **Update `src/index.css`**
   - Add `.hero-image-diagonal` class
   - Add `.shadow-gallery-room` utility
   - Remove or keep `.hero-image-masked` (unused)

2. **Modify `src/components/Header.tsx`**
   - Change from fixed capsule to sticky in-flow bar
   - Update styling to solid dark background
   - Keep dropdown and mobile menu functionality

3. **Modify `src/components/HeroSplitEditorial.tsx`**
   - Remove top padding (header is now in-flow)
   - Replace mask class with diagonal clip-path
   - Add gold hairline SVG along diagonal edge
   - Keep cursor-follow and animations

4. **Modify `src/pages/Index.tsx`**
   - Remove `<FadeToNightBridge />` import and usage

5. **Modify `src/components/Product3DCarousel.tsx`**
   - Wrap content in Gallery Room container
   - Add gold accent line at top
   - Add overline above section title
   - Increase side card opacity
   - Add "Drag to rotate" pill below carousel

6. **Optionally delete `src/components/FadeToNightBridge.tsx`**
   - Or just leave it unused

---

## Visual Summary

**Before:**
```
┌──────────────────────────────────────────────────────────────────┐
│  ┌─ floating capsule nav ─┐                                      │
│  └────────────────────────┘                                      │
│                                                                  │
│  HERO (with foggy left edge mask)                               │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  STICKY STORY SECTION                                            │
├──────────────────────────────────────────────────────────────────┤
│  ░░░░░░░ GRADIENT BLUR TRANSITION ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
├──────────────────────────────────────────────────────────────────┤
│  3D CAROUSEL (full-bleed dark)                                   │
└──────────────────────────────────────────────────────────────────┘
```

**After:**
```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER BAR (in-flow, sticky, #111)                              │
├──────────────────────────────────────────────────────────────────┤
│  HERO (with diagonal cut + gold hairline)                        │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│  STICKY STORY SECTION                                            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                            │  │
│  │           GALLERY ROOM (inset dark container)             │  │
│  │           3D CAROUSEL inside                               │  │
│  │                                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Files Summary

| File | Changes |
|------|---------|
| `src/index.css` | Add diagonal clip utility, gallery room shadow |
| `src/components/Header.tsx` | Complete restructure to in-flow sticky bar |
| `src/components/HeroSplitEditorial.tsx` | Diagonal clip-path, gold hairline, remove padding |
| `src/pages/Index.tsx` | Remove FadeToNightBridge |
| `src/components/Product3DCarousel.tsx` | Wrap in Gallery Room container, brighten side cards |
| `src/components/FadeToNightBridge.tsx` | Optional: delete or leave unused |

