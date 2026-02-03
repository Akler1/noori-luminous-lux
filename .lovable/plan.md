

# New Hero Section with 4-Card Image Grid

## Overview
Create a new hero section that features a 2x2 image grid on the left with a tagline/CTA section on the right, followed by the existing 3D carousel and social media strip.

## Layout Structure

```text
+------------------------------------------------------------------+
|                          HEADER                                   |
+------------------------------------------------------------------+
|                                                                   |
|   +------------------+  +------------------+                      |
|   |     Image 1      |  |     Image 2      |    Tagline           |
|   |   (uploaded)     |  |   (placeholder)  |    "Light, made      |
|   +------------------+  +------------------+     forever."         |
|   +------------------+  +------------------+                       |
|   |     Image 3      |  |     Image 4      |    Subheadline        |
|   |  (placeholder)   |  |   (uploaded)     |    + CTA Buttons     |
|   +------------------+  +------------------+                       |
|                                                                   |
+------------------------------------------------------------------+
|                    3D PRODUCT CAROUSEL                            |
|               (existing component, but hero text removed)         |
+------------------------------------------------------------------+
|                    SOCIAL PROOF STRIP                             |
|                 (existing #NooriJewelry section)                  |
+------------------------------------------------------------------+
|                 Rest of page (TrustIndicators, etc.)              |
+------------------------------------------------------------------+
```

## Implementation Details

### 1. Create New ImageGridHero Component
**File:** `src/components/ImageGridHero.tsx`

- **Left Side (2x2 Grid):**
  - 4 images in a responsive grid
  - Image 1: Uploaded lifestyle image (model wearing jewelry)
  - Image 2: Placeholder (using existing bracelet-hero.jpg from assets)
  - Image 3: Placeholder (using existing necklace-hero.jpg from assets)
  - Image 4: Uploaded product shot (clutch with jewelry)
  - Subtle hover effects with scale and overlay
  - Aspect ratio maintained for visual consistency

- **Right Side (Content Area):**
  - Tagline: "Light, made forever." (existing brand tagline)
  - Subheadline: "Certified lab-grown diamonds. Ethical. Enduring. Exquisitely priced."
  - Two CTA buttons: "Shop the Capsule" (primary gold) and "About Our Diamonds" (secondary outline)
  - Vertically centered content

- **Responsive Behavior:**
  - Desktop: Side-by-side layout (grid left, content right)
  - Tablet/Mobile: Stacked layout (grid on top, content below)

### 2. Copy Uploaded Images to Assets
- Copy `user-uploads://hf_20260202_213554_44dfbfb3-7c6b-4dee-a97f-d79dede0ee56.png` to `src/assets/hero-lifestyle.png`
- Copy `user-uploads://hf_20260202_235910_a8754953-c987-44f7-82f4-b7d96f9f9257.png` to `src/assets/hero-product-shot.png`

### 3. Modify Product3DCarousel Component
**File:** `src/components/Product3DCarousel.tsx`

- Remove the hero text section (lines 273-304) since this content moves to the new ImageGridHero
- Keep the 3D carousel functionality intact
- Adjust padding/spacing to work without the hero headline

### 4. Update Index Page Layout
**File:** `src/pages/Index.tsx`

Current order:
1. Header
2. Product3DCarousel (includes hero text)
3. TrustIndicators
4. SocialProof
5. BrandStory
6. LabDiamondsSection
7. Newsletter
8. Footer

New order:
1. Header
2. **ImageGridHero** (new component)
3. Product3DCarousel (3D carousel only, no hero text)
4. **SocialProof** (moved up - the "social media strip")
5. TrustIndicators
6. BrandStory
7. LabDiamondsSection
8. Newsletter
9. Footer

## Technical Details

### ImageGridHero Component Structure
```text
<section>
  <div container>
    <div grid (2 columns on desktop)>
      <!-- Left: 2x2 Image Grid -->
      <div 2x2-grid>
        <img hero-lifestyle.png />
        <img bracelet-hero.jpg />
        <img necklace-hero.jpg />
        <img hero-product-shot.png />
      </div>
      
      <!-- Right: Content -->
      <div content-area>
        <h1>Light, made forever.</h1>
        <p>Certified lab-grown diamonds...</p>
        <div buttons>
          <Button>Shop the Capsule</Button>
          <Button>About Our Diamonds</Button>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Styling Notes
- Background: Dark navy (`bg-background`) to match site theme
- Gold accent color for headline glow effect and primary button
- Top padding accounts for fixed header height (h-28)
- Images will have subtle border-radius and hover scale effects
- Content area uses Cormorant Garamond display font for headline

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/assets/hero-lifestyle.png` | Copy from upload |
| `src/assets/hero-product-shot.png` | Copy from upload |
| `src/components/ImageGridHero.tsx` | Create new component |
| `src/components/Product3DCarousel.tsx` | Remove hero text section |
| `src/pages/Index.tsx` | Update component order |

