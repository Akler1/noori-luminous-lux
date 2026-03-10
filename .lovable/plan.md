

## Fix: Reduce padding so the section wraps tightly around the content

The `px-16` (4rem = 64px per side) on the flex container is adding excessive padding. Reduce it to `px-4` so the section starts and ends close to the image and cards.

### Change in `src/components/ScrollImageSequence.tsx` line 158

```tsx
// Before
<div className="hidden lg:flex items-center justify-center h-full gap-10 px-16">

// After
<div className="hidden lg:flex items-center justify-center h-full gap-6 px-4">
```

Also reduce `gap-10` to `gap-6` to tighten the space between animation and cards further.

