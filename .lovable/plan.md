

# Replace Hero Image and Remove Overlay

## Changes Required

### 1. Add the New Hero Image to the Project
Copy the uploaded image to the assets folder:
- **Source**: `user-uploads://hf_20260205_223400_e8d6ee3c-16dd-4980-a377-4f6c983732fa.png`
- **Destination**: `src/assets/hero-jewelry-marble.png`

### 2. Update HeroSplitEditorial.tsx

| Change | Current | New |
|--------|---------|-----|
| Image import | `hero-solitaires-collection.png` | `hero-jewelry-marble.png` |
| Gradient overlay | `bg-gradient-to-tr from-black/70 via-black/40...` | **Remove entirely** |

### 3. Text Color Consideration

Since the new image has a light marble background (instead of dark), the white text may need to change to dark for readability. The text is currently white (`text-white`).

**Options**:
- Change text to dark colors for the light background
- Add a subtle light gradient overlay for text contrast instead of dark

---

## Technical Implementation

**File**: `src/components/HeroSplitEditorial.tsx`

```tsx
// Line 5: Update import
import heroImage from "@/assets/hero-jewelry-marble.png";

// Line 28: Use new image
<img
  src={heroImage}
  alt="Noori Solitaires Collection - Lab-grown diamond jewelry"
  className="absolute inset-0 w-full h-full object-cover"
/>

// Line 33-34: Remove the gradient overlay div entirely
// DELETE: <div className="absolute inset-0 bg-gradient-to-tr from-black/70..." />

// Update text colors for light background:
// - "text-white" → "text-foreground" or "text-stone-800"
// - "text-white/90" → "text-muted-foreground" or "text-stone-600"
// - "text-white/60" → "text-stone-500"
```

---

## Summary

1. Copy new image to `src/assets/hero-jewelry-marble.png`
2. Update image import in HeroSplitEditorial.tsx
3. Remove the dark gradient overlay div (line 34)
4. Update text colors from white to dark for visibility on light marble background

