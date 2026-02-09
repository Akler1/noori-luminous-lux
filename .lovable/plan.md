

# Floating Rounded Nav Bar with Bigger Logo

## Changes

**File: `src/components/Header.tsx`**

### 1. Make the header floating with rounded corners

Change the `<header>` from a full-width sticky bar to a floating pill that hovers over the content with some top margin and horizontal inset:

- Remove `w-full` and `border-b`
- Add `fixed` positioning (instead of `sticky`) with `top-3 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-[1200px] md:w-[calc(100%-128px)]`
- Add `rounded-full` for the pill shape
- Add `backdrop-blur-xl bg-[#111111]/85` for a frosted glass look
- Add `border border-white/[0.1]` for a subtle outline
- Add `shadow-lg shadow-black/20` for depth

### 2. Increase the logo size

- Default (not scrolled): `h-9 md:h-10` (up from `h-7 md:h-8`)
- Scrolled: `h-7 md:h-8` (up from `h-6 md:h-7`)

### 3. Adjust inner container padding

- Since the bar is now rounded, increase horizontal padding slightly: `px-6 md:px-8`
- Keep the height transitions as-is

### 4. Mobile menu adjustments

- The mobile dropdown menu needs `rounded-b-2xl` instead of no rounding, and should appear below the floating bar
- Wrap the mobile menu inside the header so it flows naturally, with matching rounded bottom corners

### 5. Add top spacer

- Since the header changes from `sticky` to `fixed`, content will flow behind it. Add a spacer div before the header or adjust the page layout to account for the fixed header height.

## Technical Details

| Area | Current | New |
|------|---------|-----|
| Position | `sticky top-0` | `fixed top-3` |
| Shape | Full-width rectangle | Rounded pill (`rounded-full`) |
| Background | Solid `#111` | Semi-transparent `#111/85` with backdrop blur |
| Border | Bottom only | All sides, subtle |
| Logo height | 28-32px | 36-40px |
| Mobile menu | Flush rectangle | Rounded bottom, matches floating style |

The header will change from `rounded-full` to `rounded-2xl` when the mobile menu is open, so the dropdown flows naturally from the pill shape.

A spacer `<div>` will be added after the header to push page content down, matching the header height plus the top offset.

