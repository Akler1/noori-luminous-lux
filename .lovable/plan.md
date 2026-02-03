

# Hero Section: Full Image Display (No Cropping)

## The Issue

Currently, the image uses `object-cover` which crops the image to fill the container. You want the **entire image** to be visible without any cropping, with the white background simply continuing on the left side behind the text.

---

## New Layout Approach

```text
+----------------------------------+----------------------------------+
|          WHITE BACKGROUND        |                                  |
|                                  |         FULL IMAGE               |
|   LAB-GROWN DIAMONDS             |     (no cropping, fully visible) |
|                                  |                                  |
|   LIGHT,                         |         Maintains aspect ratio   |
|   MADE                           |         Not stretched or cut     |
|   FOREVER                        |                                  |
|                                  |                                  |
|   Certified brilliance.          |                                  |
|   Ethical luxury.                |                                  |
|                                  |                                  |
|   [ SHOP COLLECTION ]            |                                  |
|                                  |                                  |
+----------------------------------+----------------------------------+
```

---

## Technical Changes

### File: `src/components/CinematicHero.tsx`

**Change the image styling:**

| Current | New |
|---------|-----|
| `object-cover` (crops image) | `object-contain` (shows full image) |
| Image fills container by cropping | Image fits within container fully visible |

**Image container changes:**
- Keep `h-screen` for the container height
- Change image from `object-cover` to `object-contain`
- Add `object-right` to align the image to the right edge (so the model is closer to the edge, not centered in empty space)

### Code Change (Line 88):

```tsx
// Current:
className="w-full h-full object-cover"

// New:
className="w-full h-full object-contain object-right"
```

This ensures:
- The full image is visible without any cropping
- The image maintains its natural aspect ratio
- The image aligns to the right side of its container
- Any empty space appears on the left (which blends into the white background where the text is)

---

## Mobile Consideration

On mobile, the image container uses `h-[50vh]` - with `object-contain`, the image will scale down to fit fully visible within that height while maintaining aspect ratio.

