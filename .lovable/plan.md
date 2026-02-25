

# Restructure Our Mission Section Layout

## What Changes

Reorganize the mission section from the current vertically-stacked, centered layout into a two-column layout: journey cards/icons with text on the left, UNICEF backpacks image on the right. Also remove the impact stats row (500+ Children Supported, Kipushi & Lualaba, 5,000+ Families Reached).

## Layout Changes

**New two-column grid (desktop)**
- Left column: Mission statement, "How Your Purchase Creates Change" heading + footnote, and the 4 journey cards stacked vertically
- Right column: The UNICEF backpacks image (currently below everything), displayed large and vertically centered

**Mobile**: Stack normally -- text/cards first, image below

**Remove**: The entire "Impact Stats" block (lines 312-321) containing "500+", "Kipushi & Lualaba", and "5,000+ Families Reached"

**Remove**: The "See the Impact in Action" heading and caption around the image -- just show the image cleanly

## Technical Details

**File: `src/pages/About.tsx`**

1. Wrap the mission content (lines 165-310) in a `grid grid-cols-1 lg:grid-cols-2 gap-12 items-center` layout
2. Left column: Move the mission statement (h2 + body), "How Your Purchase Creates Change" (h3 + subhead + footnote), and the desktop journey nodes into a left-aligned vertical stack (remove `text-center` classes)
3. Right column: Move the UNICEF backpacks image, remove the "See the Impact in Action" heading and caption text, just keep the styled image
4. Delete lines 312-321: The impact stats section with `StatItem` components (500+, Kipushi & Lualaba, 5,000+)
5. On mobile, the grid collapses to single column -- cards then image below
6. Keep all existing animations, journey node components, and mobile connectors

