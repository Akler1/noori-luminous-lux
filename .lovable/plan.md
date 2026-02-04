

# Stagger Scrolling Elements with Reduced Spacing

## Overview

Update the StickyStoryRefined component to alternate text and image positions on each scroll, and reduce the excessive empty space between content blocks.

---

## Current Issue

The current StickyStoryRefined component:
- Has text **always on the left** and image **always on the right** for all 3 story beats
- Uses `min-h-screen` for each beat, creating excessive vertical space
- Desktop sticky image doesn't alternate positions

---

## Proposed Design

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│  BEAT 1:  [Text & Chips]          │          [Image]                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  BEAT 2:  [Image]                 │          [Text & Chips]                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  BEAT 3:  [Text & Chips]          │          [Image]                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Approach

Replace the sticky layout with a staggered alternating layout (similar to StoryDuoModules):

1. **Remove sticky behavior** — The current sticky image doesn't work well with alternating sides
2. **Create alternating rows** — Each story beat becomes a full-width row with text/image sides flipping
3. **Reduce vertical spacing** — Remove `min-h-screen`, use reasonable padding instead

---

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/StickyStoryRefined.tsx` | **Update** | Rewrite layout to staggered alternating grid |

---

## Technical Details

### Desktop Layout Changes

**Current:**
- 5-column text (left) + 7-column sticky image (right)
- `min-h-screen` per beat
- Same side for all beats

**Updated:**
- 2-column grid with alternating order
- ~60vh or auto height per beat
- Odd rows: text left, image right
- Even rows: image left, text right
- Reduced gap from `py-24` / `min-h-screen` to `py-16` / `space-y-16`

### Mobile Layout Changes

**Current:**
- Image above text for all beats
- `space-y-16` between beats

**Updated:**
- Maintain image above text (simpler on mobile)
- Reduce `space-y-16` to `space-y-12`

---

## Code Structure

```tsx
{storyBeats.map((beat, index) => {
  const isReversed = index % 2 === 1; // Alternate layout
  
  return (
    <div 
      key={index}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* Image Column */}
      <motion.div className={isReversed ? 'lg:order-1' : 'lg:order-2'}>
        <img src={beat.image} alt={beat.header} />
      </motion.div>
      
      {/* Text Column */}
      <motion.div className={isReversed ? 'lg:order-2' : 'lg:order-1'}>
        <h2>{beat.header}</h2>
        <p>{beat.body}</p>
        <div>{/* chips */}</div>
      </motion.div>
    </div>
  );
})}
```

---

## Spacing Reduction Summary

| Element | Before | After |
|---------|--------|-------|
| Section padding | `py-24` | `py-16` |
| Beat height | `min-h-screen` | Auto (content-based) |
| Gap between beats | Implicit full viewport | `space-y-16 lg:space-y-24` |
| Mobile spacing | `space-y-16` | `space-y-12` |

---

## Preserved Features

- Framer Motion entrance animations
- Proof chips with gold styling
- All 3 story beats with existing content
- Responsive mobile layout

