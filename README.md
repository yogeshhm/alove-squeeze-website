# ALOVE SQUEEZE — product landing page

A responsive, scroll-animated product landing page showcasing the 3-flavour lineup: **Guava**, **Kiwi**, and **Orange**.

🌐 **Live Demo:** [https://yogeshhm.github.io/alove-squeeze-website/](https://yogeshhm.github.io/alove-squeeze-website/)

## Features
- **Hero Trio Showcase**: Interactive 3D cursor tilt and scroll fan-out motion for the Guava, Kiwi, and Orange bottles.
- **Stacked Flavour Cards**: Fullscreen sticky cards for each flavour with custom color themes, brand typography, and feature breakdowns.
- **Orange Floating Bottle Video**: Embedded video showcase for the orange flavor with ambient glow and badge overlay.
- **Original Guava Stage**: Dedicated spotlight on the original guava squeeze with dual callouts.
- **Responsive & Accessible**: Seamless adaptation on mobile devices (`< 760px` and `< 900px`) and full support for `prefers-reduced-motion`.

## Run locally
This is a static website. You can open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Assets
- `assets/alove-guava-bottle.png` — Guava juice bottle asset.
- `assets/alove-kiwi-bottle.png` — Kiwi juice bottle asset.
- `assets/alove-orange-bottle.png` — Orange juice bottle asset.
- `assets/alove-orange-floating.mp4` — Floating orange bottle video.
- `assets/original-product-reference.png` — Original reference packaging.

## Motion
GSAP and ScrollTrigger are loaded from CDN for scroll-linked motion and 3D pointer tracking. The page remains fully readable if CDN services do not load or if reduced motion is preferred.
