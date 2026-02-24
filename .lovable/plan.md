

# Slow Down Sketch Reveal Fade

## What changes
A single file change in `src/components/HeroSketchReveal.tsx` (lines 278-279):

- **Idle threshold**: Increase from `150ms` to `300ms` -- the sketch stays fully visible for twice as long before starting to fade
- **Fade factors**: Slow the per-frame alpha decay:
  - Idle fade: `0.92` to `0.96` (fades roughly half as fast)
  - Active fade: `0.98` to `0.99` (stays nearly opaque while moving)

These three small number changes together make the revealed sketch persist about twice as long before disappearing.

## Technical detail

The animation loop runs at ~60fps and multiplies each mask pixel's alpha by the fade factor every frame. A factor of `0.92` means alpha drops to ~1% in about 55 frames (~0.9s). Changing to `0.96` extends that to ~110 frames (~1.8s), effectively doubling the visible duration.

