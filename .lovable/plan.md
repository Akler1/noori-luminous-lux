

# Replace Social Feed Fade Effect with Carousel Arrows

## What Changes

Remove the white gradient fade overlays on the left and right edges of the social feed. Replace the raw horizontal scroll with an Embla-based carousel using the existing `Carousel` UI components, adding left/right arrow buttons for navigation.

## Technical Details

**File: `src/components/SocialFeed.tsx`**

1. **Import** the Embla carousel components: `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` from `@/components/ui/carousel`
2. **Remove** the two fade-edge `div` elements (the gradient overlays)
3. **Remove** the raw `overflow-x-auto` scroll container
4. **Replace** with:
   - `<Carousel>` wrapper with `opts={{ align: "start", loop: true }}` and custom class for padding
   - `<CarouselContent>` containing the mapped posts
   - Each post wrapped in `<CarouselItem>` with `basis-auto` class so items size naturally (not full-width)
   - `<CarouselPrevious>` and `<CarouselNext>` buttons repositioned to sit visibly on the left/right edges (override default `-left-12`/`-right-12` to `left-2`/`right-2`)
5. **Keep** the existing hover overlay with Instagram icon and handle
6. **Keep** the framer-motion entrance animations on the header

