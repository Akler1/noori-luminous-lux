

# Simplify Navigation: Replace "Shop" Dropdown with "Collections" Link

## Overview

Replace the "Shop" dropdown menu in the nav bar with a simple "Collections" link that goes directly to `/collections/solitaires`. Since Solitaires is the only collection, no dropdown is needed.

## Changes

**File: `src/components/Header.tsx`**

1. Remove the `isShopOpen` state and `shopDropdownRef` ref (no longer needed)
2. Remove the `useEffect` for outside click handling on the dropdown
3. Remove the `ChevronDown` import (no longer needed)
4. Replace the entire Shop dropdown block (the `div` with `ref={shopDropdownRef}`) with a simple `Link` to `/collections/solitaires` labeled "Collections"
5. In the mobile menu, rename "Shop" to "Collections" (already links to `/collections/solitaires`)

## Result

- Desktop nav: Logo | Collections | About | FAQ | Contact | Cart
- Mobile nav: Collections, About, FAQ, Contact
- "Collections" links directly to `/collections/solitaires` with no dropdown
- Cleaner code with removed dropdown state and event listeners

