

# Floating Nav Over Hero + Collections Dropdown

## Overview

Two changes: (1) Remove the spacer div so the nav floats directly over the hero image instead of over a white gap, and (2) convert "Collections" from a plain link into a dropdown with "Solitaires" as an option.

## Changes

### 1. Remove the spacer div (Header.tsx, line 33)

Delete the spacer `<div>` that pushes content down. Since the header is `fixed`, it already overlays content -- the spacer was creating the white bar above the hero. Without it, the hero will sit at the top of the page and the floating nav will overlay it.

### 2. Collections dropdown (Header.tsx)

Replace the plain "Collections" `<Link>` with a hover-activated dropdown:

- Add `ChevronDown` to the lucide imports
- Add `isCollectionsOpen` state and a `ref` for outside-click handling
- Desktop: "Collections" button with a chevron icon that toggles a small dropdown panel containing a "Solitaires" link (pointing to `/collections/solitaires`). The dropdown uses the same dark glass aesthetic (`bg-[#111111]/95 backdrop-blur-xl border-white/[0.1] rounded-xl`) and has a high z-index.
- Mobile: Replace the single "Collections" link with a collapsible section -- tapping "Collections" reveals "Solitaires" indented below it.

### 3. Dropdown styling

The dropdown will appear below the "Collections" text with:
- `absolute top-full mt-2`
- `bg-[#111111]/95 backdrop-blur-xl`
- `border border-white/[0.1] rounded-xl`
- `shadow-lg shadow-black/20`
- `min-w-[180px] py-2 px-1`
- Each item: `block px-4 py-2 text-sm text-white/80 hover:text-accent hover:bg-white/5 rounded-lg transition-colors`

## Technical Details

| Area | Current | New |
|------|---------|-----|
| Spacer div | Present, creates white gap | Removed |
| Hero position | Below spacer | Starts at page top, under floating nav |
| Collections nav | Plain link | Dropdown with chevron |
| Dropdown items | N/A | "Solitaires" (expandable for future collections) |
| Dropdown trigger | N/A | Click on desktop, tap on mobile |
| Outside click | N/A | Closes dropdown |

