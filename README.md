# nuée: skincare website (portfolio project)

A multi-page website for the fictional skincare brand **nuée**, built as a web design portfolio piece.

## Pages
- `index.html`: home. A four-scene scrolling product story (misty lake → ingredients → white shelf with benefits → pedestal),
  followed by a scrolling panel with **About**, **Reviews** and **Contact** (front-end-only demo form).
  Each wheel flick, swipe or arrow key plays one scene transition.
- `shop.html`: six products with image, description, price in euros and "Add to cart".
- `product.html`: the Radiance Serum product page (30 ml): quantity selector, key ingredients, how to use, "You may also like".

## Features
- French (default), Ukrainian and English, switched from the menu on every page and remembered between pages.
- Cart counter in the menu, kept in the browser (no checkout).
- Under 768px wide: logo + menu icon that opens a full-screen menu.
- Every image, video and script is in this repo; only Google Fonts loads from outside.

## Files
- `assets/site.css`, `assets/site.js`: shared menu, translations, cart and product cards
- `assets/hero.webp`, `assets/scene.webp`, `assets/water.mp4`: scene media
- `assets/nuee-serum.webp`: bottle cutout with label; `assets/products/*.webp`: shop images
- `SOURCES.md`: research behind the ingredient and benefit copy

The contact form does not send anything yet. To make it work, point it at a form service (for example Formspree) in `index.html`.
