

# XR Section Redesign: Premium Black Tile System

## Overview

Transform the 3D product carousel from a "big black room" to individual premium black tiles floating on a warm off-white background. Also update the FacetPlaceholder to use a matching black tile motif for consistent branding.

---

## Current State vs New State

| Component | Current | New |
|-----------|---------|-----|
| **XR Section background** | Dark `#0b0b0b` full container | Warm off-white (`bg-background`) |
| **XR Section container** | Large rounded black "room" | Removed entirely |
| **XR Viewer tiles** | Iframes in layout | Individual black tiles with gold border |
| **Product info** | Overlay on dark background | Below tile on light background |
| **Side cards** | `opacity-60` with dark surrounding | Scaled down, `opacity-75-85`, no dark overlay |
| **Arrows** | Large circular buttons | Minimal thin chevrons outside tiles |
| **Hint** | Static pill | One-time "Drag to rotate" that fades after interaction |
| **FacetPlaceholder** | Gold linework on light card | Black tile with subtle gold facet lines |

---

## File Changes

| Action | File |
|--------|------|
| **Modify** | `src/components/Product3DCarousel.tsx` |
| **Modify** | `src/components/FacetPlaceholder.tsx` |
| **Update** | `src/index.css` |

---

## 1. XR TILE DESIGN

### Individual Black Tile Styling

Each KeyShotXR iframe will be wrapped in a premium black tile:

```
┌───────────────────────────────────────────────────────┐
│                                                       │  ← 1px gold border at 10% opacity
│                                                       │
│            ┌─────────────────────────┐               │  ← Pure black bg (#000000)
│            │                         │               │
│            │     KeyShotXR Viewer    │               │  ← Zero/minimal padding
│            │                         │               │
│            └─────────────────────────┘               │
│                                                       │
└───────────────────────────────────────────────────────┘
              radius: 32px
              shadow: 0 20px 60px -15px rgba(0,0,0,0.3)
```

### Tile CSS Specification

```css
.xr-tile {
  background: #000000;
  border-radius: 32px;
  border: 1px solid rgba(201, 162, 39, 0.10);
  box-shadow: 
    0 20px 60px -15px rgba(0, 0, 0, 0.3),
    0 8px 24px -8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  padding: 0;
}
```

### Product Info Below Tile

Instead of overlaying text on black, place it below the tile on the light background:

```
┌─────────────────────────────────────┐
│                                     │
│         [ Black XR Tile ]           │
│                                     │
└─────────────────────────────────────┘

      Round Brilliant Stud
      Solid gold • Lab-grown
      
      [ View details → ]
```

Text styling:
- Product name: `font-serif text-2xl text-foreground`
- Subtitle: `text-muted-foreground text-sm`
- CTA: Gold border button with arrow hover animation

---

## 2. CAROUSEL LAYOUT CHANGES

### Section Background

Change from dark container to warm off-white:

```tsx
// Before
<section className="section-spacing bg-background">
  <div className="container-editorial">
    <div className="... rounded-[36px]" style={{ backgroundColor: '#0b0b0b' }}>
      ...
    </div>
  </div>
</section>

// After
<section className="section-spacing bg-background">
  <div className="container-editorial">
    {/* Section header on light background */}
    <div className="text-center mb-12 md:mb-16">
      <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
        Explore in 3D
      </p>
      <h2 className="section-header text-foreground mb-3">
        Best sellers
      </h2>
      <p className="text-muted-foreground">
        Spin each piece. See the details.
      </p>
    </div>
    
    {/* Carousel with black tiles on light bg */}
    ...
  </div>
</section>
```

### Side Cards Polish

| Aspect | Before | After |
|--------|--------|-------|
| Scale | 1.0 | 0.85 |
| Opacity | 0.60 | 0.80 |
| Overlay | None | None (keep clean) |
| Transition | `opacity` only | `opacity` + `scale` |

### Navigation Arrows

Replace large circular buttons with minimal chevrons:

```tsx
// Before
<Button className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20">
  <ChevronLeft className="w-6 h-6 text-white/90" />
</Button>

// After
<button 
  className="p-2 text-muted-foreground hover:text-accent transition-colors"
  aria-label="Previous"
>
  <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
</button>
```

Position arrows outside the tile area on desktop.

---

## 3. ONE-TIME DRAG HINT

### Initial State

On the center tile, show a subtle overlay:

```
┌─────────────────────────────────────┐
│                                     │
│       ┌─────────────────────┐       │
│       │  ↻ Drag to rotate   │       │
│       └─────────────────────┘       │
│                                     │
└─────────────────────────────────────┘
```

### Behavior

- Shows on first page load
- Fades out (opacity 0, pointer-events-none) after:
  - First mouse drag
  - First touch interaction
  - 5 seconds timeout (auto-dismiss)
- Uses `transition-opacity duration-500`
- Stored in `showRotateHint` state (already exists)

### Styling

```tsx
<div 
  className={cn(
    "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-500 pointer-events-none z-10",
    showRotateHint ? "opacity-100" : "opacity-0"
  )}
>
  <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2">
    <RotateCw className="w-4 h-4 text-white/70" />
    <span className="text-white/80 text-sm">Drag to rotate</span>
  </div>
</div>
```

---

## 4. FACETPLACEHOLDER — Black Tile Motif

### Current vs New

| Aspect | Current | New |
|--------|---------|-----|
| Background | Light card gradient | Pure black (#000000) |
| Border | Gold at 15% | Gold at 10% |
| Radius | 24px | 32px (match XR tiles) |
| SVG lines | Gold on light | Gold on black (more subtle) |
| Shadow | `shadow-elegant` | Floating black tile shadow |

### Updated Design

```tsx
<div className={cn(
  "relative w-full min-h-[400px] rounded-[32px] overflow-hidden",
  "bg-[#000000]",
  "border border-[rgba(201,162,39,0.10)]",
  "shadow-xr-tile",
  "group",
  className
)}>
  {/* Subtle gold facet SVG linework */}
  <svg ...>
    {/* Same diamond paths but with lower opacity gold on black */}
  </svg>
  
  {/* Shimmer on hover */}
</div>
```

### SVG Line Styling on Black

```css
.facet-line-dark {
  stroke: hsl(45, 70%, 50%);
  stroke-width: 0.75px;
  fill: none;
  stroke-opacity: 0.12;
  animation: facet-shimmer 4s ease-in-out infinite;
}
```

---

## 5. VISUAL LAYOUT — Final Design

### Desktop View

```
     Off-white background
     ┌──────────────────────────────────────────────────────────────┐
     │                                                              │
     │              Explore in 3D.                                  │
     │              BEST SELLERS                                    │
     │              Spin each piece. See the details.               │
     │                                                              │
     │   ←    ┌───────┐    ┌─────────────────┐    ┌───────┐    →   │
     │        │  SIDE │    │                 │    │  SIDE │         │
     │        │  TILE │    │   MAIN TILE     │    │  TILE │         │
     │        │ (85%) │    │   (black XR)    │    │ (85%) │         │
     │        │ scale │    │                 │    │ scale │         │
     │        └───────┘    │   ↻ Drag to     │    └───────┘         │
     │                     │     rotate      │                      │
     │                     └─────────────────┘                      │
     │                                                              │
     │                     Round Brilliant Stud                     │
     │                     Solid gold • Lab-grown                   │
     │                                                              │
     │                     [ View details → ]                       │
     │                                                              │
     │                     ● ─── ● ─── ●                           │
     │                                                              │
     └──────────────────────────────────────────────────────────────┘
```

### Mobile View

```
     ┌─────────────────────────────┐
     │                             │
     │     Explore in 3D.          │
     │     BEST SELLERS            │
     │                             │
     │  ┌───────────────────────┐  │
     │  │                       │  │
     │  │    [ Black XR Tile ]  │  │
     │  │                       │  │
     │  │    ↻ Drag to rotate   │  │
     │  │                       │  │
     │  └───────────────────────┘  │
     │                             │
     │   Round Brilliant Stud      │
     │   Solid gold • Lab-grown    │
     │                             │
     │   [ View details ]          │
     │                             │
     │   ● ─── ● ─── ●            │
     │                             │
     └─────────────────────────────┘
```

---

## 6. CSS ADDITIONS

### New Classes in index.css

```css
/* XR Tile styling */
.xr-tile {
  background: #000000;
  border-radius: 32px;
  border: 1px solid rgba(201, 162, 39, 0.10);
  box-shadow: 
    0 20px 60px -15px rgba(0, 0, 0, 0.25),
    0 8px 24px -8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Dark facet line for black tile backgrounds */
.facet-line-dark {
  stroke: hsl(var(--accent));
  stroke-width: 0.75px;
  fill: none;
  stroke-opacity: 0.12;
  animation: facet-shimmer 4s ease-in-out infinite;
}
```

---

## 7. IMPLEMENTATION ORDER

1. **Update `src/index.css`**
   - Add `.xr-tile` class with black background, gold border, shadow
   - Add `.facet-line-dark` for dark tile variant
   - Keep existing classes

2. **Modify `src/components/Product3DCarousel.tsx`**
   - Remove the dark "gallery room" container
   - Set section background to off-white
   - Move section header outside any dark container
   - Wrap each XR iframe in `.xr-tile` styled container
   - Move product info below tiles (on light bg)
   - Update side cards: `scale-[0.85]` and `opacity-80`
   - Replace circular arrow buttons with minimal chevrons
   - Update hint overlay to fade after first interaction
   - Remove static "Drag to rotate" pill at bottom

3. **Modify `src/components/FacetPlaceholder.tsx`**
   - Change background to black
   - Update border to match XR tiles
   - Change radius to 32px
   - Use `.facet-line-dark` for SVG lines
   - Update shadow to floating tile effect

---

## Technical Details

### Product3DCarousel Structure After Changes

```tsx
<section className="section-spacing bg-background">
  <div className="container-editorial">
    {/* Header on light background */}
    <div className="text-center mb-12 md:mb-16">
      <p className="text-accent text-xs tracking-[0.3em] uppercase mb-3">
        Explore in 3D
      </p>
      <h2 className="section-header text-foreground mb-3">Best sellers</h2>
      <p className="text-muted-foreground">Spin each piece. See the details.</p>
    </div>
    
    {/* Carousel */}
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-6 md:gap-8">
        {/* Side tiles with scale + opacity */}
        <div className="hidden md:block scale-[0.85] opacity-80 hover:opacity-100 transition-all">
          <div className="xr-tile aspect-square">
            <iframe ... />
          </div>
        </div>
        
        {/* Main tile */}
        <div className="relative">
          <div className="xr-tile aspect-square relative">
            <iframe ... />
            
            {/* One-time drag hint overlay */}
            <div className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-500 z-10",
              showRotateHint ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-white/70" />
                <span className="text-white/80 text-sm">Drag to rotate</span>
              </div>
            </div>
          </div>
          
          {/* Product info below tile on light bg */}
          <div className="text-center mt-6">
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
              {currentSlide.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Solid gold • Lab-grown
            </p>
            <a
              href={currentSlide.pdpUrl}
              className="inline-flex items-center gap-2 px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-background transition-colors duration-200 rounded font-medium text-sm group"
            >
              View details
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
        
        {/* Side tile */}
        <div className="hidden md:block scale-[0.85] opacity-80 hover:opacity-100 transition-all">
          <div className="xr-tile aspect-square">
            <iframe ... />
          </div>
        </div>
      </div>
      
      {/* Minimal chevron arrows */}
      <button 
        onClick={goToPrevious}
        className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-accent transition-colors"
      >
        <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-accent transition-colors"
      >
        <ChevronRight className="w-6 h-6 stroke-[1.5]" />
      </button>
    </div>
    
    {/* Dot navigation */}
    <div className="flex justify-center gap-2 mt-8">
      {slides.map((_, i) => (
        <button
          key={i}
          onClick={() => goToSlide(i)}
          className={cn(
            "w-2 h-2 rounded-full transition-all",
            i === currentIndex ? "bg-accent w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
        />
      ))}
    </div>
  </div>
</section>
```

### Auto-dismiss Hint After Timeout

```tsx
// Add to useEffect
useEffect(() => {
  if (showRotateHint) {
    const timer = setTimeout(() => {
      setShowRotateHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }
}, [showRotateHint]);
```

---

## Files Summary

| File | Changes |
|------|---------|
| `src/index.css` | Add `.xr-tile` and `.facet-line-dark` classes |
| `src/components/Product3DCarousel.tsx` | Remove dark room, add black tiles, minimal arrows, hint overlay |
| `src/components/FacetPlaceholder.tsx` | Black background, gold border, darker facet lines |

