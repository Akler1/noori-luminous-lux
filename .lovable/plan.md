

# Add Placeholder Images to Story Section

## Overview

Replace the abstract SVG `FacetPlaceholder` components with real product photography in the section between the Hero and 3D Carousel. This will use the existing product images already in the assets folder.

---

## Current State vs New State

| Component | Current | New |
|-----------|---------|-----|
| **StickyStoryRefined (Desktop)** | Single FacetPlaceholder SVG | Product images that crossfade as user scrolls |
| **StickyStoryRefined (Mobile)** | FacetPlaceholder per beat | Product image per beat |

---

## Available Images

The project already has these product images ready to use:
- `src/assets/earrings-hero.jpg` - For "The cut. The clarity." beat
- `src/assets/necklace-hero.jpg` - For "The details that matter." beat  
- `src/assets/bracelet-hero.jpg` - For "Made to be kept." beat

---

## Changes

### `src/components/StickyStoryRefined.tsx`

**Updates:**
1. Import the three product images
2. Add image paths to the `storyBeats` array
3. Replace `FacetPlaceholder` with crossfading images on desktop
4. Replace `FacetPlaceholder` with individual images on mobile

**Desktop Behavior:**
- Sticky image frame on the right (7 columns)
- As user scrolls through each story beat, the corresponding image fades in
- Uses scroll-based visibility detection to determine which image is active
- Smooth opacity transitions between images

**Mobile Behavior:**
- Stacked layout with image above text for each beat
- Each beat shows its corresponding product image
- Rounded corners with subtle shadow

---

## Technical Implementation

### Updated storyBeats Array

```tsx
import earringsHero from "@/assets/earrings-hero.jpg";
import necklaceHero from "@/assets/necklace-hero.jpg";
import braceletHero from "@/assets/bracelet-hero.jpg";

const storyBeats = [
  {
    header: "The cut. The clarity.",
    body: "Every Noori diamond is precision-cut...",
    image: earringsHero,
  },
  {
    header: "The details that matter.",
    body: "Handcrafted settings in solid 14k and 18k gold...",
    image: necklaceHero,
  },
  {
    header: "Made to be kept.",
    body: "Lab-grown diamonds are chemically identical...",
    image: braceletHero,
  },
];
```

### Desktop: Crossfading Image Stack

- Track which beat is currently in view using `useInView` or intersection observer
- Stack all three images absolutely positioned
- Only the active image has `opacity-100`, others have `opacity-0`
- Smooth 500ms transition between images

### Mobile: Image Per Beat

- Each beat shows its image above the text
- Images have rounded corners (`rounded-2xl`) and subtle shadow
- Maintains the premium aesthetic

---

## Visual Layout

**Desktop:**
```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  "The cut. The clarity."      │  ┌────────────────────────────┐ │
│  Every Noori diamond...       │  │                            │ │
│                               │  │    [earrings-hero.jpg]     │ │
│  ↓ scroll ↓                   │  │    crossfades to           │ │
│                               │  │    [necklace-hero.jpg]     │ │
│  "The details that matter."   │  │    crossfades to           │ │
│  Handcrafted settings...      │  │    [bracelet-hero.jpg]     │ │
│                               │  │                  ┌───────┐ │ │
│                               │  │                  │product│ │ │
│                               │  └──────────────────│ card  │ │ │
│                                                      └───────┘   │
└──────────────────────────────────────────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────────┐
│  ┌───────────────────┐  │
│  │ [earrings image]  │  │
│  └───────────────────┘  │
│  "The cut. The clarity."│
│  Every Noori diamond... │
│                         │
│  ┌───────────────────┐  │
│  │ [necklace image]  │  │
│  └───────────────────┘  │
│  "The details..."       │
│                         │
│  ┌───────────────────┐  │
│  │ [bracelet image]  │  │
│  └───────────────────┘  │
│  "Made to be kept."     │
└─────────────────────────┘
```

---

## File to Modify

| File | Action |
|------|--------|
| `src/components/StickyStoryRefined.tsx` | Replace FacetPlaceholder with product images |

---

## Image Styling

- Desktop: `rounded-3xl`, `shadow-sticky`, full container width
- Mobile: `rounded-2xl`, subtle shadow, `aspect-[4/3]` for consistent proportions
- All images: `object-cover` for proper cropping

