

# Add Proof Chips to Story Section

## Overview

Add 3 small proof chips (text-only, no icons) below the paragraph in each story beat to reinforce quality messaging with quick, scannable proof points.

---

## Design

Each story beat will have a row of 3 small chips below the paragraph:

```
┌─────────────────────────────────────────┐
│  The cut. The clarity.                  │
│                                         │
│  Every Noori diamond is precision-cut   │
│  to maximize brilliance...              │
│                                         │
│  ┌────────────┐ ┌────────────┐ ┌──────────────┐
│  │Precision cut│ │Optical symmetry│ │Quality checked│
│  └────────────┘ └────────────┘ └──────────────┘
└─────────────────────────────────────────┘
```

**Chip styling:**
- Small rounded pills with subtle border
- `text-xs` or `text-sm` for compact size
- `text-muted-foreground` for understated elegance
- `border border-border/50` for subtle definition
- `rounded-full` with horizontal padding

---

## Proof Chips Per Section

| Beat | Proof Chips |
|------|-------------|
| **"The cut. The clarity."** | Precision cut · Optical symmetry · Quality checked |
| **"The details that matter."** | Hand-finished · Solid gold · Inspected |
| **"Made to be kept."** | Lab-grown · Certified · Lifetime warranty |

---

## File Changes

| File | Changes |
|------|---------|
| `src/components/StickyStoryRefined.tsx` | Add `chips` array to each beat, render chip row below paragraph |

---

## Implementation Details

### Updated storyBeats Data

```tsx
const storyBeats = [
  {
    header: "The cut. The clarity.",
    body: "Every Noori diamond is precision-cut...",
    image: earringsHero,
    chips: ["Precision cut", "Optical symmetry", "Quality checked"],
  },
  {
    header: "The details that matter.",
    body: "Handcrafted settings in solid 14k and 18k gold...",
    image: necklaceHero,
    chips: ["Hand-finished", "Solid gold", "Inspected"],
  },
  {
    header: "Made to be kept.",
    body: "Lab-grown diamonds are chemically identical...",
    image: braceletHero,
    chips: ["Lab-grown", "Certified", "Lifetime warranty"],
  },
];
```

### Chip Row Component

**Desktop (after paragraph, line 77-79):**
```tsx
<p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
  {beat.body}
</p>

{/* Proof chips */}
<div className="flex flex-wrap gap-2 mt-5">
  {beat.chips.map((chip, chipIndex) => (
    <span
      key={chipIndex}
      className="px-3 py-1 text-xs text-muted-foreground border border-border/50 rounded-full"
    >
      {chip}
    </span>
  ))}
</div>
```

**Mobile (after paragraph, line 149-151):**
```tsx
<p className="text-muted-foreground text-base leading-relaxed">
  {beat.body}
</p>

{/* Proof chips */}
<div className="flex flex-wrap gap-2 mt-4">
  {beat.chips.map((chip, chipIndex) => (
    <span
      key={chipIndex}
      className="px-3 py-1 text-xs text-muted-foreground border border-border/50 rounded-full"
    >
      {chip}
    </span>
  ))}
</div>
```

---

## Visual Result

**Desktop:**
```
  The cut. The clarity.
  
  Every Noori diamond is precision-cut to maximize
  brilliance. The same fire that lives in mined 
  stones, born from innovation.
  
  ┌──────────────┐  ┌──────────────────┐  ┌────────────────┐
  │ Precision cut │  │ Optical symmetry │  │ Quality checked │
  └──────────────┘  └──────────────────┘  └────────────────┘
```

**Mobile:**
```
  ┌─────────────────────┐
  │     [earrings]      │
  └─────────────────────┘
  
  The cut. The clarity.
  
  Every Noori diamond is...
  
  ┌──────────────┐ ┌──────────────────┐
  │ Precision cut │ │ Optical symmetry │
  └──────────────┘ └──────────────────┘
  ┌────────────────┐
  │ Quality checked │
  └────────────────┘
```

