

# Complete Landing Page Redesign

## Vision

A high-end luxury jewelry experience inspired by brands like Mejuri, Tiffany, and Cartier. The page will feel elegant, spacious, and premium with intentional use of whitespace, sophisticated typography, and seamless transitions between sections.

---

## New Page Architecture

```text
+--------------------------------------------------+
|                    HEADER                        |
+--------------------------------------------------+
|                                                  |
|              HERO: PRODUCT SHOWCASE              |
|    (Large product image + overlay tagline)       |
|                                                  |
+--------------------------------------------------+
|                                                  |
|           3D PRODUCT CAROUSEL                    |
|    (Interactive, explore the collection)         |
|                                                  |
+--------------------------------------------------+
|                                                  |
|              BRAND MANIFESTO                     |
|    (Full-width statement of purpose)             |
|                                                  |
+--------------------------------------------------+
|                                                  |
|           THE NOORI DIFFERENCE                   |
|    (3 pillars: Lab-Grown, Ethical, Heirloom)     |
|                                                  |
+--------------------------------------------------+
|                                                  |
|            SOCIAL PROOF / UGC                    |
|    (Instagram-style grid with handles)           |
|                                                  |
+--------------------------------------------------+
|                                                  |
|             TRUST & CREDENTIALS                  |
|    (Certifications, shipping, warranty)          |
|                                                  |
+--------------------------------------------------+
|                                                  |
|              NEWSLETTER CTA                      |
|    (Email capture with luxury styling)           |
|                                                  |
+--------------------------------------------------+
|                    FOOTER                        |
+--------------------------------------------------+
```

---

## Section-by-Section Design

### 1. Hero Section (New Component: `LuxuryHero.tsx`)

**Layout:**
- Full-viewport-height hero with a single stunning product image
- Centered overlay with tagline, subheadline, and CTA
- Subtle gradient overlay for text legibility
- Optional: subtle ambient particle animation

**Visual Treatment:**
- Image fills the entire viewport
- Dark gradient overlay (bottom-to-top) for contrast
- Typography: Large serif tagline, lighter sans-serif subheadline
- Single prominent CTA button

```text
+--------------------------------------------------+
|                                                  |
|                                                  |
|              [HERO PRODUCT IMAGE]                |
|                                                  |
|         "Light, made forever."                   |
|    Certified lab-grown diamonds.                 |
|                                                  |
|           [ SHOP THE COLLECTION ]                |
|                                                  |
+--------------------------------------------------+
```

---

### 2. 3D Product Carousel (Existing: `Product3DCarousel.tsx`)

**Enhancements:**
- Add a section header: "Explore the Collection"
- Clean up background to match new design system
- Ensure smooth transition from hero above

---

### 3. Brand Manifesto (New Component: `BrandManifesto.tsx`)

**Purpose:** A full-width statement that communicates the brand's soul.

**Layout:**
- Full-width section with generous padding
- Large centered typography
- Subtle decorative elements (thin gold lines, sparkle icons)

**Content:**
```text
"Noori means light in Persian—the same light that 
creates diamonds deep within the earth, now harnessed 
to craft modern heirlooms."
```

---

### 4. The Noori Difference (New Component: `NooriDifference.tsx`)

**Purpose:** Explain the 3 core brand pillars in an elegant grid.

**Layout:**
- 3-column grid on desktop, stacked on mobile
- Each card has: Icon, title, description
- Luxury card styling with subtle hover effects

**Content:**
| Pillar | Icon | Description |
|--------|------|-------------|
| Lab-Grown Excellence | Gem | Certified by GIA & IGI. Identical to mined diamonds in every way. |
| Ethically Pure | Leaf | Zero mining impact. Complete traceability from lab to you. |
| Modern Heirlooms | Sparkles | Timeless designs meant to be passed down for generations. |

---

### 5. Social Proof / UGC (Existing: `SocialProof.tsx`)

**Enhancements:**
- Update styling to match new luxury aesthetic
- Add section header: "Worn by You"
- Larger image grid with hover overlays
- More prominent Instagram handles

---

### 6. Trust & Credentials (Existing: `TrustIndicators.tsx`)

**Enhancements:**
- Convert to a more prominent section (not just a thin strip)
- 4-column grid with icons, titles, and descriptions
- Subtle card styling

---

### 7. Newsletter CTA (Existing: `Newsletter.tsx`)

**Enhancements:**
- Update to match luxury aesthetic
- Add decorative elements
- Larger input field and button

---

## Technical Changes

### Files to Create

| File | Purpose |
|------|---------|
| `src/components/LuxuryHero.tsx` | New full-viewport hero with product image and overlay |
| `src/components/BrandManifesto.tsx` | Full-width brand statement section |
| `src/components/NooriDifference.tsx` | 3-pillar value proposition grid |

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/Index.tsx` | Update component order: LuxuryHero, Product3DCarousel, BrandManifesto, NooriDifference, SocialProof, TrustIndicators, Newsletter |
| `src/components/Product3DCarousel.tsx` | Add section header, adjust spacing to fit new flow |
| `src/components/SocialProof.tsx` | Update styling, add "Worn by You" header |
| `src/components/TrustIndicators.tsx` | Convert to 4-column grid with fuller styling |
| `src/components/Newsletter.tsx` | Update to luxury styling |

### Files to Remove/Deprecate

| File | Reason |
|------|---------|
| `src/components/ImageGridHero.tsx` | Replaced by LuxuryHero |
| `src/components/BrandStory.tsx` | Content merged into BrandManifesto and NooriDifference |
| `src/components/LabDiamondsSection.tsx` | Content moved to Why Noori page (already exists there) |

---

## Visual Design Details

### Color Palette (Existing)
- Background: Dark navy `hsl(226, 50%, 8%)`
- Foreground/Accent: Warm gold `hsl(45, 70%, 60%)`
- Text: Cream/off-white for body, gold for accents

### Typography
- Display: Cormorant Garamond (serif) for headings
- Body: Inter (sans-serif) for text
- Sizes: Large, generous spacing for luxury feel

### Spacing
- Generous vertical padding between sections (py-24 to py-32)
- Consistent container max-widths
- Intentional whitespace for premium feel

### Animations
- Subtle scroll-triggered reveals (existing reveal-up class)
- Smooth hover transitions
- No overwhelming motion

---

## Component Order Summary

1. **Header** (existing)
2. **LuxuryHero** (new) - Full-viewport product hero
3. **Product3DCarousel** (existing, enhanced) - Interactive 3D showcase
4. **BrandManifesto** (new) - Brand statement
5. **NooriDifference** (new) - 3-pillar value grid
6. **SocialProof** (existing, enhanced) - UGC Instagram grid
7. **TrustIndicators** (existing, enhanced) - Credentials
8. **Newsletter** (existing, enhanced) - Email capture
9. **Footer** (existing)

