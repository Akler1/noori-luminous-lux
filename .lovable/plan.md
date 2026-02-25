

# Fullscreen 3D Viewer as Separate Page

## Problem
The CSS-based fullscreen overlay still crops the product. The iframe doesn't resize properly within the overlay approach.

## Solution
Create a dedicated `/viewer` route that displays the 3D iframe at full viewport size. The fullscreen button navigates to this page, and a back button returns to the product page.

## Changes

### 1. New file: `src/pages/Viewer.tsx`
- Reads `iframeUrl` and `title` from URL query params (e.g. `/viewer?url=...&title=...`)
- Renders the iframe at `width: 100vw; height: 100vh`
- Shows a back button (top-left) that navigates back via `useNavigate(-1)`
- Minimal page -- no header/footer, just the viewer and the back button

### 2. Edit: `src/App.tsx`
- Add route: `<Route path="/viewer" element={<Viewer />} />`

### 3. Edit: `src/components/ThreeDViewer.tsx`
- Replace `handleFullscreen` to use `useNavigate` from react-router-dom
- On click, navigate to `/viewer?url=${encodeURIComponent(iframeUrl)}&title=${encodeURIComponent(variant.title)}`
- Remove all CSS fullscreen logic (`isFullscreen` state, Escape key listener, fixed positioning classes)
- Keep the `Maximize2` icon button but remove `Minimize2` import (that goes in the Viewer page)

