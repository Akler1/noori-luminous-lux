
# Full-Width Hero Grid Layout

## Problem
The current hero section has container padding (`px-4 md:px-8`) that creates gaps on the left and right sides of the image grid. Looking at your Mejuri reference, the images should span edge-to-edge on the left side with no padding.

## Solution

### Layout Structure Change
Instead of wrapping everything in a container, the layout needs to:
1. Have the **image grid start at the left edge of the screen** (no padding)
2. Have the **content area on the right** with appropriate padding only on the right side

### Visual Result
```text
|<-- Screen Edge                                              Screen Edge -->|
+-----------------------------------------------+-----------------------------+
| IMAGE 1 (no padding) | IMAGE 2               |                             |
|                      |                       |     Light, made forever.    |
|----------------------+-----------------------|                             |
| IMAGE 3              | IMAGE 4               |     Subheadline + CTAs      |
|                      |                       |                   (padding) |
+-----------------------------------------------+-----------------------------+
         ~75% full bleed                               ~25% with padding
```

### Technical Changes to `src/components/ImageGridHero.tsx`

1. **Remove container wrapper** - Replace `container mx-auto px-4 md:px-8` with a full-width layout
2. **Use viewport-based grid** - The main grid should span the full viewport width
3. **Remove section padding** - No horizontal padding on the section itself
4. **Add padding only to content area** - The right-side text content gets its own internal padding

### Code Structure
```text
<section className="pt-28 pb-16 ... overflow-hidden">
  <!-- Full-width grid, no container -->
  <div className="grid lg:grid-cols-[3fr_1fr]">
    
    <!-- Image grid: full bleed, starts at left edge -->
    <div className="grid grid-cols-2 gap-0">
      ...images
    </div>
    
    <!-- Content: has its own padding -->
    <div className="px-8 lg:px-12 py-8">
      ...tagline, CTAs
    </div>
    
  </div>
</section>
```

## File to Modify

| File | Changes |
|------|---------|
| `src/components/ImageGridHero.tsx` | Remove container, make grid full-width, apply padding only to content area |
