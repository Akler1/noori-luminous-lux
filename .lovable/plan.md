

# Overlay Cards on Right Side (Keep Hold Zone)

## What Changes

### 1. Remove dots, lines, SVG connectors
All dot markers, pulse rings, SVG lines, and arrowheads will be removed entirely. The cards will speak for themselves.

### 2. Cards overlaid on the right side of the image
Three compact cards will be absolutely positioned as a vertical stack on the right side of the full-screen canvas -- still overlaid on top of the earring image, same background, no separate section. Positioned at roughly `right: 4%`, vertically centered.

### 3. Compact card sizing (~25% of viewport width)
- Max-width of ~200px
- Small padding (`p-3`)
- Smaller text (title: `text-xs`, body: `text-xs`)
- Keeps `card-luxury` styling, icon, title, body

### 4. Staggered fade-in animation
When `showCallouts` triggers, cards animate in with staggered delays (0ms, 150ms, 300ms) using opacity + translateY transition.

### 5. Hold zone stays exactly as-is
- `scrollVh` remains 300
- `animationEnd` remains 0.6
- No changes to scroll logic whatsoever

### 6. Mobile fallback unchanged
Bottom overlay text block stays the same.

## Technical Details

**File: `src/components/ScrollImageSequence.tsx`**

- Remove `dot` and `card` fields from LABELS array (keep title, body, icon only)
- Delete SVG section (lines 144-184)
- Delete dot markers section (lines 186-212)
- Replace individually-positioned cards (lines 214-238) with a single absolutely-positioned right-side container:

```tsx
<div
  className="absolute right-[4%] top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 z-20"
  style={{ maxWidth: "200px" }}
>
  {LABELS.map((label, idx) => (
    <div
      key={label.title}
      className="card-luxury p-3 text-center"
      style={{
        opacity: showCallouts ? 1 : 0,
        transform: `translateY(${showCallouts ? 0 : 12}px)`,
        transition: `all 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${idx * 150}ms`,
        boxShadow: "var(--shadow-elegant)",
      }}
    >
      <label.icon className="w-5 h-5 text-accent mx-auto mb-2" />
      <h4 className="text-xs font-serif font-semibold uppercase tracking-wider">
        {label.title}
      </h4>
      <p className="text-xs text-muted-foreground leading-relaxed mt-1">
        {label.body}
      </p>
    </div>
  ))}
</div>
```

- All scroll logic (animationEnd, scrollVh, hold zone) remains untouched
