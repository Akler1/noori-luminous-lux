

# Reorganize Content: Landing Page, About Page, and Contact Page

## Overview

Three pages need changes: remove sections from the landing page, move sections to the About page, and strip the Contact page (currently /why-noori) down to just a contact form + info + footer.

## Changes

### 1. Landing Page (src/pages/Index.tsx)

Remove the `StoryDuoModules` component (the "Our story" and "Quality without compromise" sections).

- Remove the import for `StoryDuoModules`
- Remove `<StoryDuoModules />` from the JSX

### 2. About Page (src/pages/About.tsx)

Add two sections from WhyNoori.tsx, inserted before the footer:

**A. Lab-Grown Diamonds section** (lines 195-295 of WhyNoori.tsx)
- The 4Cs comparison grid with visual grade scales
- The IGI/GCal certification sample card
- Includes all related data: `fourCs` array
- Required imports: `Microscope`, `Scale`, `Palette`, `FileCheck`, `Download`, `Gem`, `Sparkles` icons, `Button`

**B. Sourcing and Craftsmanship section** (lines 297-365 of WhyNoori.tsx)
- Supply chain diagram (Lab Creation -> Quality Control -> Studio Design -> Packaging -> Delivery)
- Quality Control Checklist
- Includes all related data: `supplyChainSteps`, `qualityChecks` arrays
- Required imports: `Factory`, `ClipboardCheck`, `Package`, `Truck`, `ArrowRight`, `CheckCircle2` icons

These will be placed after the existing "Why Lab-Grown?" section and before the footer.

### 3. Contact Page (src/pages/WhyNoori.tsx)

Strip everything and replace with:
- Header
- A clean contact section with:
  - Page title ("Contact Us" or similar)
  - Contact form (Name, Email, Message fields + Submit button)
  - Contact information (email address, response time, etc.)
- Footer

Remove all current content: hero, three pillars, lab-grown diamonds, sourcing, pricing, sustainability, and FAQ sections. Remove all unused imports and data arrays.

### 4. Nav Label Update (src/components/Header.tsx)

The nav item already says "Contact" and points to `/why-noori`, so no change needed here.

## Files Modified

- `src/pages/Index.tsx` -- remove StoryDuoModules
- `src/pages/About.tsx` -- add Lab-Grown Diamonds and Sourcing sections with all related data/imports
- `src/pages/WhyNoori.tsx` -- replace with contact form + contact info only

