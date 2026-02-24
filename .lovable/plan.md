

# Fix Dot Positions and Add Scroll Hold Zone

## Problems identified from screenshots
1. **Dots not on correct parts**: In the final exploded frame, the main diamond is in the upper-left, but the dot is too far right. The pave stones dot is on the gold setting area, not on the scattered small diamonds. The gold setting dot is near the post tip but should be on the gold prong basket.
2. **No hold zone**: Once the animation hits the last frame, the callouts appear but the user immediately scrolls past the section. The cards need to stay visible for a reading period.

## Changes (single file: `src/components/ScrollImageSequence.tsx`)

### 1. Correct dot positions (based on screenshot of last frame)
From the exploded view screenshot:
- **Main Stone** (large diamond, upper-left): dot moves to `top: 15, left: 28`
- **Pave Stones** (scattered small diamonds, center area): dot moves to `top: 42, left: 50`
- **14k Gold Setting** (gold prong basket, center): dot moves to `top: 30, left: 45`

Card positions stay roughly similar but adjust to avoid overlapping the earring parts.

### 2. Add scroll hold zone
Increase `scrollVh` from 180 to 300 and modify the scroll-to-frame mapping so that:
- The first 60% of scroll distance maps to all 46 frames (the animation plays)
- The last 40% holds on the final frame with callouts visible

This gives the user a generous scroll window where the cards, dots, and lines stay on screen for reading.

The logic change in the scroll handler:
```
// Map only first 60% of scroll to frames
const animationEnd = 0.6;
const rawT = Math.min(1, Math.max(0, -rect.top / scrollRange));
const t = Math.min(1, rawT / animationEnd);
const idx = Math.round(t * (frameCount - 1));

// Show callouts for the last 40% hold zone
setShowCallouts(rawT >= animationEnd);
```

### 3. Updated coordinates summary
| Label | Dot (on earring part) | Card |
|-------|----------------------|------|
| Main Stone | top:15, left:28 | top:8, left:8 |
| Pave Stones | top:42, left:50 | top:35, left:72 |
| 14k Gold Setting | top:30, left:45 | top:68, left:78 |

### 4. No other changes
- Card styling stays as-is (card-luxury with icons)
- SVG lines auto-adjust to new coordinates
- Mobile fallback unchanged
