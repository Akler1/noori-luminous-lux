

# Make Proof Chips Gold

## Overview

Update the proof chip styling from muted/barely visible to gold accent color for better visibility and brand consistency.

---

## Changes

**File:** `src/components/StickyStoryRefined.tsx`

### Desktop (line ~86)

**Before:**
```tsx
className="px-3 py-1 text-xs text-muted-foreground border border-border/50 rounded-full"
```

**After:**
```tsx
className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full"
```

### Mobile (line ~169)

**Before:**
```tsx
className="px-3 py-1 text-xs text-muted-foreground border border-border/50 rounded-full"
```

**After:**
```tsx
className="px-3 py-1 text-xs text-accent border border-accent/30 rounded-full"
```

---

## Visual Result

The chips will now display in gold text with a subtle gold border, making them much more visible while maintaining the luxury aesthetic.

