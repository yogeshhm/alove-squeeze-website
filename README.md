# ALOVE SQUEEZE — product landing page

A responsive, scroll-animated product landing page built around the **exact uploaded ALOVE SQUEEZE Guava bottle image**.

## Run locally
This is a static website. You can open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Product-image handling
- `assets/original-product-reference.png` is the original uploaded image, preserved unchanged.
- `assets/alove-guava-bottle.png` is a lossless crop of empty white canvas around the bottle only. The bottle, label, cap, colours and proportions are not altered.
- The site does not generate or substitute any packaging.
- The bottle is not rotated as if it were a 3D model. Scroll motion uses scale and vertical movement only.

## Motion
GSAP and ScrollTrigger are loaded from CDN for scroll-linked motion. A network connection is needed for those animation libraries and Google Fonts. The page remains readable if those services do not load.

## Before publishing
Confirm product claims, ingredients, nutrition facts, net quantity, manufacturer details, certifications, purchase links and contact details. These have intentionally not been invented.
