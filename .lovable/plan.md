

# Update Our Mission Section -- New Copy and Image

## What Changes

Update the mission section on the About page (`src/pages/About.tsx`) with revised copy and replace the YouTube video embed with the uploaded UNICEF backpacks image.

## Content Updates

**Our Mission header area (lines 168-173)**
- Keep the H2: "Our Mission"
- Replace body text with: "Every Noori purchase supports UNICEF programs that help children stay safe and access education in mining-affected communities."

**How Your Purchase Creates Change (lines 180-185)**
- Keep the H2 title
- Change subhead to: "A step-by-step path from unsafe work to school."
- Add a micro-footnote below: "UNICEF does not endorse any company, brand, product, or service."

**Journey card descriptions (4 cards, both desktop and mobile)**
1. The Mines: "Children face dangerous, unsafe work in mining communities."
2. UNICEF Steps In: "Cash support, birth registration, and safe spaces help families break the cycle."
3. Education: "Children receive school supplies, uniforms, and catch-up classes." (unchanged)
4. Thriving: "A safer childhood -- and a future built in school."

**Replace YouTube video with image (lines 291-308)**
- Copy the uploaded image to `src/assets/unicef-backpacks.jpg`
- Replace the iframe embed with a styled `<img>` element showing the backpacks photo
- Keep the "See the Impact in Action" heading
- Update caption to something fitting like "School supplies ready for distribution in mining-affected communities"

## Technical Details

**File: `src/pages/About.tsx`**

1. Add import for the new image asset at top of file
2. Line 172: Update mission body text
3. Lines 183-185: Update subhead text, add footnote `<p>` with `text-xs text-muted-foreground/60` styling
4. Lines 195, 205, 225, 241, 254, 280 (desktop + mobile): Update card description strings
5. Lines 291-308: Replace the video `<div>` containing the `<iframe>` with the new image, keeping the same container styling (rounded-xl, overflow-hidden, border, shadow)

**New asset**: Copy `user-uploads://hf_20260225_002404_cfd1d2f0-97cc-4e1c-8e23-ea97f3a9762e.png` to `src/assets/unicef-backpacks.jpg`

