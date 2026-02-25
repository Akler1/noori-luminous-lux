

# Redesign "Our Story" Section with Purse Image

## What Changes

The "Our Story" section on the About page (`/policies`) will be transformed from a centered text-only block into a premium 2-column layout with the uploaded purse/jewelry image as the visual anchor.

## Layout

```text
Desktop (md+):
+------ 5/12 ------+---- gap ----+-------- 7/12 --------+
|                   |            |                        |
|  Our Story        |            |   [Purse Image]       |
|                   |            |   rounded-[24px]       |
|  Paragraph 1      |            |   subtle border        |
|  Paragraph 2      |            |   object-cover          |
|  Paragraph 3      |            |                        |
|  Paragraph 4      |            |                        |
|  (bold)           |            |                        |
+-------------------+            +------------------------+

Mobile:
+----------------------------+
|   [Purse Image]            |
+----------------------------+
|   Our Story                |
|   Paragraph 1-4            |
+----------------------------+
```

## Technical Details

**Step 1: Copy the uploaded image to the project**
- Copy `user-uploads://hf_20260202_235910_...png` to `src/assets/our-story-purse.png`

**Step 2: Update `src/pages/About.tsx` (lines 76-114)**

Replace the current "Our Story" section with:
- A responsive 12-column grid (`grid-cols-12`) with 5/7 column split on desktop
- Mobile: image first (order-1), copy second (order-2)
- Desktop: copy left (col-span-5), image right (col-span-7)

**Image styling:**
- `rounded-3xl` (24px corners)
- `border border-border/30` (subtle 1px neutral border)
- `object-cover object-center`
- Full height within the grid cell

**Copy styling:**
- Left-aligned text, `max-w-[560px]`
- Title: "Our Story" with gold accent on "Story" (same `noor-glow` class)
- 4 paragraphs with the specified copy, ~16px gap between title and first paragraph, ~16px between paragraphs
- Paragraph 4 slightly bolder (`text-foreground font-medium` vs `text-muted-foreground`)

**Spacing:**
- Section padding: `py-16 md:py-[72px]`
- Column gap: `gap-12 md:gap-16` (48-64px)

**No additions:** No buttons, links, icons, or extra elements inside this section.

