

# Complete Luxury Landing Page Redesign

## Vision: "Cinematic Luxury"

A bold, editorial-style landing page that feels like a high-fashion jewelry campaign. Large-scale imagery, dramatic contrasts, asymmetric layouts, and seamless flow between visual storytelling and product discovery. The design will feel premium, modern, and uniquely Noori.

---

## New Page Architecture

```text
+--------------------------------------------------+
|                    HEADER                        |
+--------------------------------------------------+
|                                                  |
|         CINEMATIC HERO (Full-bleed)              |
|    Split: Large product shot + Tagline overlay   |
|                                                  |
+--------------------------------------------------+
|                                                  |
|         EDITORIAL GALLERY (Masonry)              |
|    Model + Product photos in asymmetric grid     |
|                                                  |
+--------------------------------------------------+
|                                                  |
|           3D PRODUCT CAROUSEL                    |
|        (Keep existing, enhanced styling)         |
|                                                  |
+--------------------------------------------------+
|                                                  |
|         BRAND PHILOSOPHY (Horizontal)            |
|    Side-by-side image + manifesto text           |
|                                                  |
+--------------------------------------------------+
|                                                  |
|            INSTAGRAM / UGC FEED                  |
|    Seamless horizontal scroll of real posts      |
|                                                  |
+--------------------------------------------------+
|                                                  |
|              VALUE PROPOSITIONS                  |
|    Minimal icons with short punchy copy          |
|                                                  |
+--------------------------------------------------+
|                                                  |
|           NEWSLETTER / CLOSING CTA               |
|    Full-width with dramatic background           |
|                                                  |
+--------------------------------------------------+
|                    FOOTER                        |
+--------------------------------------------------+
```

---

## Section-by-Section Design

### 1. Cinematic Hero (New: `CinematicHero.tsx`)

**Concept:** A split-screen hero that dominates the viewport. One side is a full-height product/model image, the other is minimal with the tagline and CTA. Creates immediate visual drama.

**Layout:**
- Desktop: 60/40 split (image left, content right)
- Mobile: Stacked (image top, content bottom)
- Minimum height: 100vh on desktop, auto on mobile

**Visual Treatment:**
- Left: Full-bleed hero image (will use `hero-diamonds.jpg` or `hero-lifestyle.png`)
- Right: Dark background, vertically centered tagline
- Tagline: "Light, made forever." in large serif display text
- Subheadline: Short, elegant copy
- Single gold CTA button
- Subtle animated scroll indicator

**Technical Details:**
- Uses CSS Grid with `grid-cols-1 lg:grid-cols-[1.2fr_1fr]`
- Hero image with `object-cover` and slight Ken Burns hover effect
- Content area with generous padding and vertical centering
- Reveal animations on load

---

### 2. Editorial Gallery (New: `EditorialGallery.tsx`)

**Concept:** A magazine-style masonry grid showcasing all the uploaded product and model photos. Creates visual richness and shows product variety.

**Layout:**
- Asymmetric grid with varying image sizes
- 6-8 images arranged in an editorial fashion
- Some images span 2 columns, others are single column
- On hover: subtle zoom and gold border accent

**Images Used:**
- `earrings-hero.jpg`
- `earrings-princess.jpg`
- `bracelet-hero.jpg`
- `necklace-hero.jpg`
- `hero-product-shot.png`
- `hero-lifestyle.png`

**Visual Treatment:**
- No gaps between images (or very minimal 2px gaps)
- On hover: image scales slightly, subtle gold overlay with "Shop Earrings" etc.
- Optional: Parallax scroll effect on individual images

**Technical Details:**
- CSS Grid with `grid-template-columns: repeat(12, 1fr)` for precise control
- Images with grid-column spans for varied sizes
- Intersection Observer for scroll-triggered reveal animations

---

### 3. 3D Product Carousel (Existing: Enhanced)

**Enhancements:**
- Remove the current section header (already feels like transition)
- Add a thin gold separator line above
- Slightly reduce vertical padding to feel more integrated
- Keep all functionality intact

---

### 4. Brand Philosophy (New: `BrandPhilosophy.tsx`)

**Concept:** A horizontal split section that pairs a beautiful product close-up with the brand story. More editorial than the previous manifesto.

**Layout:**
- Desktop: Side-by-side (image left, text right), 50/50 split
- Mobile: Stacked (image top, text bottom)

**Content:**
- Image: Close-up product shot or lifestyle image
- Small gold uppercase label: "OUR STORY"
- Headline: "Born from Light"
- Body: 2-3 sentences about Noori's origin and mission
- Small link: "Learn More →" to Why Noori page

**Visual Treatment:**
- Image with slight border or gold frame accent
- Text area with generous left padding
- Large serif headline, smaller sans-serif body

---

### 5. Social Feed (New: `SocialFeed.tsx`)

**Concept:** A horizontally scrolling Instagram-style feed that feels alive and community-driven. Less formal than a grid.

**Layout:**
- Full-width horizontal scroll container
- 5-8 square or portrait images in a row
- Smooth scroll with grab cursor
- Optional: Auto-scroll animation (subtle)

**Visual Treatment:**
- Images with slight rounded corners
- On hover: overlay with Instagram icon and handle
- Small section label above: "#NooriJewelry"

**Technical Details:**
- Uses `overflow-x-auto` with `scroll-snap-x`
- Custom scrollbar hidden
- Touch-friendly on mobile

---

### 6. Value Propositions (New: `ValueBar.tsx`)

**Concept:** A clean, minimal bar showing 4 key trust points. Less "card" focused, more typographic.

**Layout:**
- Single horizontal row with dividers
- 4 items: Certification, Free Shipping, Returns, Warranty
- Icons above text, all centered

**Visual Treatment:**
- Very clean, almost invisible background
- Small gold icons
- Short 2-3 word titles
- No descriptions (keep it punchy)
- Vertical gold dividers between items

---

### 7. Newsletter CTA (New: `NewsletterCTA.tsx`)

**Concept:** A full-width closing section with dramatic visual impact.

**Layout:**
- Full-width background (subtle gradient or pattern)
- Centered content: headline, subheadline, email input, button
- Generous vertical padding

**Visual Treatment:**
- Gold accent line at top
- Large serif headline: "First to the Light"
- Elegant input and button styling
- Sparkle decorative elements

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/components/CinematicHero.tsx` | Split-screen hero with dramatic imagery |
| `src/components/EditorialGallery.tsx` | Masonry grid of product/model photos |
| `src/components/BrandPhilosophy.tsx` | Side-by-side image + brand story |
| `src/components/SocialFeed.tsx` | Horizontal scrolling Instagram feed |
| `src/components/ValueBar.tsx` | Minimal 4-item trust indicators |
| `src/components/NewsletterCTA.tsx` | Full-width dramatic newsletter signup |

## Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | New component order and imports |
| `src/components/Product3DCarousel.tsx` | Remove section header, adjust spacing |

## Files to Delete

| File | Reason |
|------|---------|
| `src/components/LuxuryHero.tsx` | Replaced by CinematicHero |
| `src/components/BrandManifesto.tsx` | Replaced by BrandPhilosophy |
| `src/components/NooriDifference.tsx` | Not needed in new design |
| `src/components/SocialProof.tsx` | Replaced by SocialFeed |
| `src/components/TrustIndicators.tsx` | Replaced by ValueBar |
| `src/components/Newsletter.tsx` | Replaced by NewsletterCTA |

---

## Visual Design Language

### Typography
- Display: Cormorant Garamond (serif) - large, elegant, dramatic
- Body: Inter (sans-serif) - clean, modern
- Generous line heights and letter spacing

### Color Palette
- Background: Dark navy `hsl(226, 50%, 8%)`
- Accent: Warm gold `hsl(45, 70%, 60%)`
- Text: Cream for headings, muted gold for body

### Spacing Philosophy
- Generous vertical rhythm (py-24 to py-40)
- Full-bleed sections alternate with contained sections
- Intentional asymmetry for editorial feel

### Animation
- Subtle scroll-triggered reveals
- Smooth hover transitions
- No jarring motion

---

## Component Flow Summary

1. **Header** (existing)
2. **CinematicHero** - Split hero with dramatic product shot
3. **EditorialGallery** - Magazine-style product photo grid
4. **Product3DCarousel** - Interactive 3D showcase (kept)
5. **BrandPhilosophy** - Side-by-side story section
6. **SocialFeed** - Horizontal Instagram scroll
7. **ValueBar** - Minimal trust indicators
8. **NewsletterCTA** - Dramatic closing signup
9. **Footer** (existing)

