

# Hero V2 Implementation Plan

## Overview

Transform the current editorial hero into a premium interactive experience with cursor-follow light effects, staggered entrance animations, edge-bleeding image layout, and scroll cue.

---

## Changes Summary

| Aspect | Current | New |
|--------|---------|-----|
| Top padding | `pt-28 md:pt-32` | `pt-20 md:pt-24` (reduced) |
| Image container | Rounded, contained in grid | Bleeds to right edge, no right rounding |
| Desktop image | Inside 7-col grid cell | Positioned absolute, extends beyond container |
| Gradient overlay | Small left edge (`w-32`) | Larger veil for text/image cohesion |
| Text animations | Simple fade-in all at once | Staggered: eyebrow → H1 → paragraph → CTAs |
| Image animation | Fade + slide | Scale from 1.03 → 1.00 + fade |
| Cursor effect | None | Radial highlight follows mouse (desktop) |
| Mobile glow | None | Subtle looping light shift animation |
| Scroll cue | None | Bottom-left vertical line + "Scroll" text |
| Primary button | Standard hover | Magnetic effect + shadow lift |

---

## File Changes

### 1. `src/components/HeroSplitEditorial.tsx` — Complete Rewrite

**New Features:**

- **State for cursor tracking**: `useState` for mouse x/y position
- **`useIsMobile` hook**: Disable cursor effects on mobile
- **Staggered Framer Motion variants**: Container with `staggerChildren: 0.15`
- **Image positioned absolute on desktop**: Bleeds to right edge of viewport
- **Cursor-follow highlight overlay**: CSS custom properties + radial gradient
- **Scroll cue**: Animated vertical line with rotated "Scroll" text

**Component Structure:**
```
<section> (relative, overflow-hidden)
  <div container-editorial>
    <div grid 12-col>
      
      {/* Mobile: Image first (stacked) */}
      <motion.div> (mobile only)
        <img with mobile glow overlay />
      </motion.div>
      
      {/* Text Column - 5 cols */}
      <motion.div variants={container}>
        <motion.p variants={item}>Eyebrow</motion.p>
        <motion.h1 variants={item}>Brilliance, refined.</motion.h1>
        <motion.p variants={item}>Subhead paragraph</motion.p>
        <motion.div variants={item}>CTAs with magnetic button</motion.div>
      </motion.div>
      
    </div>
  </div>
  
  {/* Desktop Image - Absolute positioned, bleeds right */}
  <motion.div> (hidden on mobile)
    <div gradient-veil />
    <div cursor-highlight-overlay />
    <img hero-lifestyle />
  </motion.div>
  
  {/* Scroll Cue - Desktop only */}
  <div> (bottom-left)
    <span>"Scroll"</span>
    <div animated-line />
  </div>
  
</section>
```

---

### 2. `src/index.css` — Add New Styles

**New CSS additions:**

```css
/* Mobile light shift animation */
@keyframes light-shift {
  0%, 100% { background-position: -100% 0; }
  50% { background-position: 200% 0; }
}

.hero-mobile-glow {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: light-shift 10s ease-in-out infinite;
}

/* Cursor-follow highlight (desktop) */
.cursor-highlight {
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(255, 255, 255, 0.08),
    transparent 40%
  );
}

/* Magnetic button hover */
.btn-magnetic {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.btn-magnetic:hover {
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
}

/* Scroll cue animation */
@keyframes scroll-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

.scroll-cue-line {
  animation: scroll-pulse 2s ease-in-out infinite;
}
```

---

## Technical Details

### Cursor-Follow Effect (Desktop)

```tsx
const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
const imageRef = useRef<HTMLDivElement>(null);

const handleMouseMove = (e: React.MouseEvent) => {
  if (!imageRef.current) return;
  const rect = imageRef.current.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  setMousePosition({ x, y });
};

// Applied via inline style:
style={{
  '--mouse-x': `${mousePosition.x}%`,
  '--mouse-y': `${mousePosition.y}%`,
} as React.CSSProperties}
```

### Staggered Entrance Animations

```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};
```

### Image Scale Animation

```tsx
<motion.div
  initial={{ opacity: 0, scale: 1.03 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
```

### Edge-Bleeding Image Layout

- Desktop: Image container is `position: absolute` with `right: 0`, `top: 0`, `bottom: 0`
- Width: approximately 58% of viewport to cover 7 cols + bleed
- Left side has gradient veil blending into background
- Mobile: Image remains in normal document flow, stacked above text

---

## Responsive Behavior

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Layout | Side-by-side (5+7 cols) | Stacked (image first) |
| Image | Bleeds to right edge | Contained, rounded |
| Cursor effect | Mouse-follow highlight | Looping light shift |
| Scroll cue | Visible bottom-left | Hidden |
| Button effect | Magnetic hover | Standard hover |

---

## Files to Modify

1. **`src/components/HeroSplitEditorial.tsx`** — Complete rewrite with new layout + interactions
2. **`src/index.css`** — Add animation keyframes + utility classes

