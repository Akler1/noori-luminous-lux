

# Hero Section Redesign: Editorial Collage Style

## Reference Analysis

The uploaded reference image features:
- **Left side**: Bold typography with mixed weights (some condensed bold, some lighter/outlined)
- **Right side**: Multiple overlapping product images creating a dynamic collage
- **Background**: Subtle decorative curved line patterns
- **Floating elements**: Additional product images at various positions and sizes
- **CTA**: Prominent accent-colored button

---

## New Hero Design for Noori

### Layout Structure

```text
+------------------------------------------------------------------+
|  [HEADER]                                                         |
+------------------------------------------------------------------+
|                                                                   |
|  LAB-GROWN DIAMONDS                                               |
|                                                                   |
|  LIGHT,                           +------------------+            |
|  MADE                             |   [Main Image]   |  +------+  |
|  FOREVER                          |  (hero-diamonds) |  |[Gold]|  |
|                                   |                  |  |Panel |  |
|  Certified brilliance.            +------------------+  +------+  |
|  Ethical luxury.                                                  |
|                              +--------+                           |
|  [ SHOP COLLECTION ]         |[Float] |   +------------+          |
|                              +--------+   | [Float 2]  |          |
|  +------+                                 +------------+          |
|  |[Prod]|                                                         |
|  +------+                                                         |
|                                                                   |
+------------------------------------------------------------------+
```

### Key Design Elements

| Element | Implementation |
|---------|----------------|
| Typography | Bold condensed weight for "LIGHT, MADE" with outlined/lighter "FOREVER" |
| Image Collage | 4-5 overlapping product images with varied sizes and positions |
| Background Pattern | SVG curved lines (subtle gold/accent color, 5% opacity) |
| Floating Products | Absolutely positioned images with shadow/depth effects |
| CTA Button | Gold accent button matching brand colors |

---

## Technical Implementation

### File to Modify: `src/components/CinematicHero.tsx`

### Changes Required:

1. **Layout Restructure**
   - Change from 2-column split to single full-width container
   - Use relative positioning with absolutely positioned image elements
   - Left-aligned content with right-side image collage

2. **Typography Update**
   - Bold condensed style for main words
   - Different treatment for "forever" (outlined or italic accent)
   - Larger scale (text-7xl to text-9xl)

3. **Image Collage**
   - Main large image (hero-diamonds.jpg or hero-lifestyle.png)
   - 3-4 smaller floating product images positioned around it
   - Use `earrings-hero.jpg`, `necklace-hero.jpg`, `bracelet-hero.jpg`
   - Varied sizes and rotation angles for dynamic feel

4. **Background Pattern**
   - Add SVG curved lines as decorative background
   - Low opacity (5-10%) in gold/accent color
   - Creates visual interest without distraction

5. **Animations**
   - Staggered reveal for floating images
   - Subtle hover effects on images
   - Smooth entrance animations for text

### Images to Use (from `src/assets/`)
- `hero-diamonds.jpg` - Main large image
- `earrings-hero.jpg` - Floating element 1
- `necklace-hero.jpg` - Floating element 2
- `bracelet-hero.jpg` - Floating element 3
- `hero-product-shot.png` - Additional floating element

---

## Visual Design Details

### Color Adaptations
- Keep dark navy background (`hsl(226, 50%, 8%)`)
- Gold accent for button and decorative elements
- Text in gold/cream tones

### Spacing
- Generous padding (px-8 to px-20)
- Min-height: 100vh to fill viewport
- Image overlap creates depth without requiring extra vertical space

### Animation Timings
- Text: 0.3s stagger between lines
- Images: 0.5s-1.5s staggered delays
- Subtle float/hover animations on images

---

## Summary of Changes

| Aspect | Current | New Design |
|--------|---------|------------|
| Layout | 2-column split | Full-width with positioned collage |
| Typography | Light serif | Bold mixed weights |
| Images | Single hero image | 4-5 overlapping collage |
| Background | Plain | Decorative curved SVG pattern |
| Depth | Flat | Layered with shadows and overlaps |

