

# Add Social Strip to Product Pages

## What Changes

Insert the `SocialFeed` component between the "Complete the Set" section and the "Customer Reviews" section on every product page.

## Technical Details

**File: `src/pages/ProductDetail.tsx`**

1. Import the `SocialFeed` component at the top of the file
2. Add `<SocialFeed />` between the closing of the "Complete the Set" section (line 443) and the Reviews `motion.div` (line 446)

This is a two-line change -- one import and one component insertion. The `SocialFeed` component already handles its own spacing, animation, and responsive layout.

