

# Three Changes: Landing Page Section + About Page Mission Revert

## 1. Landing page: StickyStoryRefined updates

**File: `src/components/StickyStoryRefined.tsx`**

- Change heading from "Beauty that gives back." to "How Your Purchase Creates Change."
- Reduce section padding from `py-20 lg:py-28` to `py-10 lg:py-14`
- Reduce heading bottom margin from `mb-12` to `mb-8`

## 2. About page: Revert mission section to original layout (title, cards, then video)

**File: `src/pages/About.tsx`** (mission section, lines ~153-297)

Restructure the mission section from the current "centered titles + 2x2 grid beside large image" layout back to a vertical flow:

- Keep "Our Mission" title and subtitle at the top, centered
- Below that, show the "How Your Purchase Creates Change" subtitle
- Then show the 4 journey cards stacked vertically (single column, `flex flex-col gap-6`) instead of the current 2x2 grid beside an image
- Remove the UNICEF backpacks image from this section entirely
- Replace it with the embedded YouTube video (`https://www.youtube.com/watch?v=JfxpeHV-fXg`) displayed below the journey cards
- Video embed uses a responsive 16:9 aspect ratio iframe with `rounded-xl` styling and the same border/shadow treatment
- Remove the `lg:grid-cols-5` two-column grid layout -- the section becomes a single centered column (`max-w-4xl mx-auto`)

### Final layout order:
```text
Our Mission (title + subtitle)
How Your Purchase Creates Change (subtitle)
  |
  v
[The Mines] card
[UNICEF Steps In] card
[Education] card
[Thriving] card
  |
  v
[YouTube video embed - 16:9 responsive iframe]
```

### Video embed code:
```html
<iframe
  src="https://www.youtube.com/embed/JfxpeHV-fXg"
  title="UNICEF - Breaking the cycle"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-full aspect-video rounded-xl border border-primary/20 shadow-lg shadow-primary/10"
/>
```

