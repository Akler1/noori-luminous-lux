

## Redesign nav bar: edge-to-edge with centered logo

### Layout change
Currently: Floating pill with rounded corners, inset from edges, logo on left, nav links centered, cart on right.

New layout: Full-width edge-to-edge bar pinned to top. Three-column layout:
- **Left**: Nav links (Collections, About, FAQ, Contact)
- **Center**: Noori logo
- **Right**: Cart icon + mobile menu toggle

### Changes in `src/components/Header.tsx`

1. **Header positioning**: Replace `top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-[1200px] md:w-[calc(100%-128px)]` with `top-0 left-0 right-0`. Remove `rounded-full` / `rounded-2xl` — no border-radius.

2. **Inner container**: Use a 3-column grid (`grid grid-cols-3`) instead of `justify-between` so logo sits in the true center column.

3. **Move nav links to left column**: Remove `absolute left-1/2 -translate-x-1/2` from the nav. Place it in the first grid column, left-aligned.

4. **Logo to center column**: Move the logo `<Link>` to the middle grid column, centered with `justify-self-center`.

5. **Cart stays in right column**: Right-aligned with `justify-self-end`.

6. **Mobile**: On mobile, left column is hidden (nav links collapse into hamburger menu). Logo stays centered, cart+hamburger on right.

