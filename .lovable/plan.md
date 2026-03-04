
Goal
- Eliminate all mobile cropping in the “Our Story” section (both image and paragraph text) while keeping desktop layout exactly unchanged.

What I verified visually and in code
- On mobile, the “Our Story” text is still visibly cut off on the right edge.
- Current section layout in `src/pages/About.tsx` uses:
  - `grid grid-cols-12 gap-12 md:gap-16 items-center` even on mobile.
  - children use `col-span-12 md:col-span-5` and `col-span-12 md:col-span-7`.
- This is the core issue: on a 12-column grid, a `col-span-12` item spans all tracks plus internal column gaps; with large `gap-12`, the effective spanned width overflows on small screens. Because the page wrapper has `overflow-x-hidden`, that overflow becomes visually cropped content.
- The purse image itself was already switched to mobile `object-contain`; however, the parent layout overflow still causes apparent cropping.

Implementation plan (mobile-only behavior; desktop preserved)
1) Fix the actual overflow source in Our Story grid
- File: `src/pages/About.tsx` (Our Story section container around lines ~79-80)
- Change grid declaration from always-12-columns to responsive columns:
  - From: `grid grid-cols-12 gap-12 md:gap-16 items-center`
  - To: `grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center`
- Keep child span classes as-is (`col-span-12 md:col-span-5` and `col-span-12 md:col-span-7`) so desktop remains identical.

2) Keep mobile image fully visible (already done) and ensure it remains stable
- Keep current mobile image fit strategy (`object-contain`, neutral background) in place.
- No desktop image behavior changes (`md:object-cover`, `md:h-full` remain).

3) Keep text readable and uncut
- Once grid overflow is fixed, paragraph clipping should resolve naturally.
- No copy or typography changes required unless a final QA pass shows edge clipping on ultra-small widths.

4) QA pass (mobile-first + desktop parity)
- Mobile checks at 390x844 and 375x812:
  - No right-edge text clipping in “Our Story”
  - Purse image fully visible without side cut-off
  - No horizontal scroll in the section/page
- Desktop check (1366+):
  - 5/12 + 7/12 editorial layout unchanged
  - Same spacing/visual hierarchy as before

Technical notes
- Single-file targeted change: `src/pages/About.tsx`.
- This approach fixes root cause (layout overflow) instead of relying on global masking (`overflow-x-hidden`) to hide symptoms.
- Risk is low because desktop behavior is fully gated behind `md:` and preserved.
