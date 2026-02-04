

# Full-Bleed Hero with Text Overlay

## Overview

Transform the current split editorial hero into a full-bleed image hero with text overlay, using the new product image featuring jewelry on stones. The text will be positioned over the image with proper contrast treatment.

---

## Visual Design

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                                                                       │  │
│  │                    [Full-Bleed Product Image]                         │  │
│  │                                                                       │  │
│  │     Lab-Grown Diamonds                                                │  │
│  │                                                                       │  │
│  │     Brilliance,                                                       │  │
│  │     refined.                                                          │  │
│  │                                                                       │  │
│  │     Introducing the inaugural Solitaires collection.                  │  │
│  │     Modern heirlooms crafted from light itself.                       │  │
│  │                                                                       │  │
│  │     [Shop the Collection]    Explore in 3D →                          │  │
│  │                                                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/assets/hero-solitaires-collection.png` | **Create** | Copy uploaded image to assets |
| `src/components/HeroSplitEditorial.tsx` | **Update** | Redesign to full-bleed with overlay text |

---

## Implementation Details

### 1. Copy Image to Project

Copy the uploaded image from `user-uploads://` to `src/assets/hero-solitaires-collection.png` for proper bundling.

### 2. Hero Component Redesign

**Structure:**
- Full viewport height section with background image
- Dark gradient overlay (bottom-left) for text readability
- Text content positioned bottom-left on desktop, centered on mobile
- Staggered entrance animations preserved

**Layout Changes:**
- Remove the 12-column grid split layout
- Use absolute positioning for full-bleed image
- Add gradient overlay for text contrast (subtle dark gradient from bottom-left)

**Copy Updates:**
- Eyebrow: "Lab-Grown Diamonds" (unchanged)
- H1: "Brilliance, refined." (unchanged)
- Subhead: "Introducing the inaugural Solitaires collection. Modern heirlooms crafted from light itself."
- Primary CTA: "Shop the Collection" (was "Shop best sellers")
- Secondary CTA: "Explore in 3D" (unchanged)

**Desktop Styling:**
- Text positioned in bottom-left quadrant
- Gradient overlay: `linear-gradient(to top right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)`
- Text uses light colors for contrast against the image

**Mobile Styling:**
- Text centered or left-aligned at bottom
- Stronger gradient overlay for readability
- Compact spacing

---

## Code Structure

```tsx
<section className="relative h-screen overflow-hidden">
  {/* Full-bleed background image */}
  <img 
    src={heroSolitairesImage}
    alt="Noori Solitaires Collection"
    className="absolute inset-0 w-full h-full object-cover"
  />
  
  {/* Gradient overlay for text contrast */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
  
  {/* Text content */}
  <div className="relative z-10 container-editorial h-full flex items-end pb-24">
    <motion.div className="max-w-xl text-white">
      <p className="text-accent">Lab-Grown Diamonds</p>
      <h1>Brilliance, refined.</h1>
      <p>Introducing the inaugural Solitaires collection...</p>
      <div className="flex gap-4">
        <Button>Shop the Collection</Button>
        <Link>Explore in 3D →</Link>
      </div>
    </motion.div>
  </div>
</section>
```

---

## Responsive Behavior

| Viewport | Text Position | Gradient |
|----------|---------------|----------|
| Desktop (1024px+) | Bottom-left | Subtle diagonal gradient |
| Mobile (<1024px) | Bottom center/left | Stronger gradient overlay |

---

## Preserved Features

- Staggered text entrance animations
- "Explore in 3D" scroll link to carousel
- Scroll cue indicator (desktop)
- Brand slogan usage per memory policy

