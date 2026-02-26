

# Fix Mobile Cropping on About Page

## Problem
The About page has a horizontal scrollbar on mobile, causing text across the entire page to appear cropped on the right edge. This affects:
- The "Our Story" text paragraphs
- The IGI/GCal Certification card (text, bullet points, and button)
- Potentially other sections

## Root Cause
The **IGI/GCal Certification card** uses a horizontal flex layout (`flex items-start gap-6`) with a fixed-width icon (96px) and text side-by-side. On a 390px screen with padding, there isn't enough horizontal space, causing the card to overflow its container. Since no parent has `overflow-x-hidden`, this pushes the entire page wider than the viewport, creating a horizontal scrollbar that makes everything look cropped.

## Fixes (mobile only, desktop unchanged)

**File:** `src/pages/About.tsx`

### 1. Add `overflow-x-hidden` to the page wrapper (line 57)
Change `<div className="min-h-screen bg-background">` to include `overflow-x-hidden`. This prevents any element from creating a horizontal scrollbar on the page.

### 2. Fix the IGI/GCal Certification card layout (line 515)
Change the inner container from `flex items-start gap-6` to `flex flex-col md:flex-row items-center md:items-start gap-6`. This stacks the icon on top and text below on mobile, while keeping the side-by-side layout on desktop.

Also:
- Add `mx-auto md:mx-0` to the icon container so it centers on mobile
- Add `text-center md:text-left` to the text container for proper mobile alignment

These two changes fix the root cause (the overflowing card) and add a safety net (overflow-x-hidden) so no future element can break the page layout.

## What won't change
- Desktop layout remains exactly the same
- All other sections on the page are unaffected
- Only the certification card stacking behavior changes on mobile

