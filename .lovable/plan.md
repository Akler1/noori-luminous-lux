
Goal: make the About page fully readable on mobile by removing all visible cropping (purse image + text/content clipping) while preserving desktop exactly as-is.

What I verified in code:
- `src/pages/About.tsx` already has:
  - `overflow-x-hidden` on page root
  - IGI/GCal card switched to mobile stacking
- The “Our Story” purse image is still forced into a cropped mobile frame:
  - `object-cover aspect-[4/5]` on mobile in the image class
  - This intentionally crops parts of the source image on phones.
- The IGI/GCal “Download Sample Certificate” button uses the base Button style `whitespace-nowrap` (from `src/components/ui/button.tsx`), so long text can still clip/feel cut on narrow mobile widths even after stacking.

Implementation plan (mobile-only behavior, desktop unchanged):

1) Fix purse image cropping in “Our Story”
- File: `src/pages/About.tsx` (Our Story image block)
- Change image fit strategy for mobile only:
  - Mobile: `object-contain` (show full purse image)
  - Desktop: keep current `md:object-cover md:aspect-auto md:h-full`
- Keep rounded corners/border.
- Add subtle neutral background behind image so contain letterboxing looks intentional.
- Result: full purse is visible on mobile, desktop visual remains unchanged.

2) Prevent long CTA text from clipping in certification card on mobile
- File: `src/pages/About.tsx` (IGI/GCal section button)
- Override mobile behavior for the button so it can wrap and fit:
  - Mobile: allow wrapping (`whitespace-normal`), center text/icon, optional `w-full` for stable fit
  - Desktop: keep current single-line compact button (`md:w-auto` and existing styling)
- Result: no cut-off text in narrow viewports.

3) Remove “masking-only” dependence and fix actual overflow sources
- Keep `overflow-x-hidden` as safety net, but ensure no key content depends on being clipped to look correct.
- Confirm all major About blocks (Our Story, Brand Values, Mission cards, 4Cs, Certification, Sourcing) fit at mobile width without hidden right-edge text.

4) Visual QA pass focused on mobile
- Validate on 390x844 and 375x812:
  - Purse image fully visible (not zoom-cropped)
  - All paragraph lines readable with no right-edge cut-off
  - Certification bullets and button fully visible
  - No horizontal scrollbar
- Desktop sanity check at 1366+:
  - Purse image still uses desktop layout/crop behavior
  - Certification section remains desktop side-by-side.

Technical notes:
- Targeted edits only in `src/pages/About.tsx`.
- Use responsive utility classes (`md:`) so desktop rendering is preserved.
- Do not modify shared Button component globally; apply local class overrides only where needed.
