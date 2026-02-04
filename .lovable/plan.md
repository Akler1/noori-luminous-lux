

# Noori Homepage V1 — Full Redesign Implementation Plan

## Overview

This plan transforms the homepage into a premium, editorial luxury experience with 8 distinct sections following the build brief. The redesign introduces controlled scroll animations, a sticky story section, and seamless transitions between light and dark sections.

---

## Current State → New State

| Current Component | Action | New Component |
|-------------------|--------|---------------|
| `Header` | **Modify** | `NavMinimal` (transparent → scrolled behavior) |
| `CinematicHero` | **Replace** | `HeroSplitEditorial` (12-col grid, new headline) |
| `EditorialGallery` | **Replace** | `StickyStoryRefined` (sticky scroll + 3 beats) |
| — | **New** | `FadeToNightBridge` (gradient transition) |
| `Product3DCarousel` | **Keep + Modify** | `BestSellers3DCarousel` (add header, lazy load) |
| `SocialFeed` | **Modify** | `UGCStrip` (update header to "Worn by you.") |
| `BrandPhilosophy` | **Replace** | `StoryDuoModules` (Our Story + Quality modules) |
| `ValueBar` | **Remove** | Integrated into other sections as micro-trust |
| `NewsletterCTA` | **Replace** | `FinalCTAForm` (new headline + optional dropdown) |

---

## Section-by-Section Breakdown

### 0. Global Design System Updates

**File: `src/index.css` + `tailwind.config.ts`**

Add new CSS custom properties and Tailwind utilities:
- Container max-width: 1280px
- Desktop outer padding: 64px
- Mobile padding: 20-24px
- Section spacing: 96px desktop / 64px mobile
- Warm off-white light background color token
- Near-black text color token
- Hairline border utility class

---

### 1. NavMinimal — Top Navigation

**File: `src/components/Header.tsx` → Modify**

**Changes:**
- Remove the NavigationMenu dropdown complexity
- Simplify to flat navigation: Shop | About | FAQ | Contact
- Transparent over hero on initial load
- On scroll: light background with hairline bottom border
- Remove enlarged logo sizing, use more refined proportions

**Key Updates:**
```
Initial state: bg-transparent
Scrolled state: bg-white/95 border-b border-gray-200
Links: near-black text, gold accent on hover
Logo: refined height (h-12 md:h-16)
```

---

### 2. HeroSplitEditorial — Hero Section

**File: `src/components/HeroSplitEditorial.tsx` → New**

**Layout (12-column grid):**
- Left: 5 columns (text content)
- Right: 7 columns (single hero image)

**Content:**
- Eyebrow: "LAB-GROWN DIAMONDS" (gold, small caps)
- H1: **"Brilliance, refined."** (high-contrast serif)
- Subhead: Keep existing copy
- Primary CTA: "Shop best sellers" (gold button)
- Secondary: "Explore in 3D" (text link)

**Image Treatment:**
- Single model image (`hero-lifestyle.png`) in rounded container (24px radius)
- Subtle left-edge gradient overlay for cohesion with text
- No floating cards or collage elements

**Mobile:** Stack image first, then text

---

### 3. StickyStoryRefined — Scroll Story Section

**File: `src/components/StickyStoryRefined.tsx` → New**

This is the "wow" moment — a controlled editorial sticky-scroll experience.

**Layout (12-column grid):**
- Left: 5 columns — scrolling story blocks
- Right: 7 columns — sticky media frame

**Sticky Media Frame:**
- `position: sticky` with `top: 96px`
- Rounded corners (24px), consistent shadow
- Crossfade between 3 images OR slow Ken Burns zoom on single image
- **Single overlapping product card** (desktop only):
  - Anchored bottom-right corner
  - Overlap: ~24px
  - 1px gold border at 20-25% opacity
  - Radius: 16px
  - NO second card

**Scroll Beats (3 blocks):**
Each beat has:
- Big section header (new)
- Existing smaller body copy

| Beat | Header |
|------|--------|
| 1 | "The cut. The clarity." |
| 2 | "The details that matter." |
| 3 | "Made to be kept." |

**Mobile:** Remove sticky, convert to: image → beat 1 → image → beat 2 → image → beat 3

---

### 4. FadeToNightBridge — Transition Section

**File: `src/components/FadeToNightBridge.tsx` → New**

**Purpose:** Smooth transition from light sections to dark 3D carousel

**Design:**
- Height: 12-18vh
- Background: gradient from off-white → charcoal → black
- Centered text: "Explore in 3D." (elegant serif)
- Optional: subtle diamond-facet grain texture at 5% opacity

---

### 5. BestSellers3DCarousel — 3D Product Gallery

**File: `src/components/Product3DCarousel.tsx` → Modify (rename conceptually)**

**Keep:**
- Black background
- Current 3D carousel functionality
- Rotation hint
- Card styling

**Add/Modify:**
- Section header: "Best sellers"
- Subhead: "Spin each piece. See the details."
- CTA label on cards: "View details"
- Micro-trust line under product name: "Solid gold • Lab-grown" (if applicable)
- Lazy loading: show static poster first, init 3D on view/interaction
- Mobile: scroll-snap + "Tap & drag" hint (show once)

---

### 6. UGCStrip — Social Proof Section

**File: `src/components/SocialFeed.tsx` → Modify**

**Changes:**
- Can remain dark (matching 3D section) OR transition back to light
- Update header: "Worn by you."
- Keep horizontal scroll grid (6-10 tiles)
- Ensure consistent crop/exposure
- If insufficient UGC: show fewer tiles (4-6) vs weak content

---

### 7. StoryDuoModules — Brand Story + Quality

**File: `src/components/StoryDuoModules.tsx` → New**

**Replaces:** BrandPhilosophy

**Module A — Our Story (image left, text right):**
- Big header: "Our story."
- Keep existing paragraph text
- 3 short proof bullets

**Module B — Quality (image right, text left):**
- Big header: "Quality, without compromise."
- Keep existing paragraph text
- 3 proof bullets (certification/materials/returns)

**Rules:**
- 2-3 lines visible before "read more" (if needed)
- Strong whitespace maintained
- Light background section

---

### 8. FinalCTAForm — Newsletter Capture

**File: `src/components/FinalCTAForm.tsx` → New**

**Replaces:** NewsletterCTA

**Design:**
- Light background
- Headline: **"Brilliance, refined — in your inbox."** (echoes hero)
- Email field + submit button
- Optional dropdown: "What are you shopping for?"
- Privacy note: keep existing

---

## Updated Index.tsx Structure

```
<div className="min-h-screen">
  <NavMinimal />
  <main>
    <HeroSplitEditorial />
    <StickyStoryRefined />
    <FadeToNightBridge />
    <BestSellers3DCarousel />
    <UGCStrip />
    <StoryDuoModules />
    <FinalCTAForm />
  </main>
  <Footer />
  <EmailCaptureModal />
</div>
```

---

## File Changes Summary

| Action | File |
|--------|------|
| **Modify** | `src/index.css` (global design tokens) |
| **Modify** | `tailwind.config.ts` (container, spacing utilities) |
| **Modify** | `src/components/Header.tsx` (NavMinimal behavior) |
| **Create** | `src/components/HeroSplitEditorial.tsx` |
| **Create** | `src/components/StickyStoryRefined.tsx` |
| **Create** | `src/components/FadeToNightBridge.tsx` |
| **Modify** | `src/components/Product3DCarousel.tsx` (header, lazy load) |
| **Modify** | `src/components/SocialFeed.tsx` (header update) |
| **Create** | `src/components/StoryDuoModules.tsx` |
| **Create** | `src/components/FinalCTAForm.tsx` |
| **Modify** | `src/pages/Index.tsx` (new component order) |
| **Delete** | `src/components/CinematicHero.tsx` |
| **Delete** | `src/components/EditorialGallery.tsx` |
| **Delete** | `src/components/BrandPhilosophy.tsx` |
| **Delete** | `src/components/ValueBar.tsx` |
| **Delete** | `src/components/NewsletterCTA.tsx` |

---

## Implementation Order

1. Update global design system (CSS + Tailwind config)
2. Modify Header for transparent → scrolled behavior
3. Create HeroSplitEditorial with new headline
4. Create StickyStoryRefined with sticky scroll
5. Create FadeToNightBridge transition
6. Modify Product3DCarousel with header + lazy loading
7. Update SocialFeed header
8. Create StoryDuoModules
9. Create FinalCTAForm
10. Update Index.tsx with new component flow
11. Clean up deprecated components

---

## Key Headlines Placement

Per the brief, "Brilliance, refined." appears in exactly two places:
- **Hero H1** (primary)
- **Final CTA headline** (echo)

All other section headers use unique chapter-style wording.

