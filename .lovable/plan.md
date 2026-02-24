

# Match Card Style and Fix Dot Positions

## What's wrong now
Based on the screenshot of the last frame:
- The **Main Stone** dot is on the gold prongs/setting area instead of on the large diamond (top-left)
- The **Pave Stones** dot is on the gold post instead of near the small scattered diamonds
- The **14k Gold Setting** dot should be on the gold post
- The cards don't match the About page's `card-luxury` style (no icons, no centered layout, missing accent colors)

## Corrected dot positions (from screenshot analysis)
| Label | Current dot | Corrected dot | Card position |
|-------|------------|---------------|---------------|
| Main Stone | top:30 left:42 | top:20 left:32 | top:8 left:8 (keep) |
| Pave Stones | top:52 left:55 | top:38 left:58 | top:35 left:72 (adjusted) |
| 14k Gold Setting | top:72 left:48 | top:72 left:68 | top:68 left:78 (adjusted) |

## Card style updates (matching About page `card-luxury`)
The About page cards use:
- `card-luxury p-8 text-center` class
- Icon in `text-accent` color (the golden/amber brand color)
- Title in `font-serif`
- Description in `text-muted-foreground`

Each card will get:
- **Main Stone**: `Gem` icon from lucide-react
- **Pave Stones**: `Sparkles` icon
- **14k Gold Setting**: `Crown` or similar icon

## Technical changes (single file: `src/components/ScrollImageSequence.tsx`)

1. **Add lucide-react import** for `Gem`, `Sparkles`, and `Crown` icons
2. **Update LABELS data** with corrected dot/card coordinates and an icon field
3. **Restyle cards** to match the About page pattern:
   - Use `card-luxury` class (which includes `bg-card border border-border/50 rounded-xl shadow-elegant`)
   - Add icon with `text-accent` color above the title
   - Center-align text
   - Use `font-serif` for the title
   - Keep `text-muted-foreground` for description
4. **Update SVG line endpoints** to match the new coordinates

The mobile fallback remains unchanged.
