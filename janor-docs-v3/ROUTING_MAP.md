# Routing Map

## Purpose

This file defines the intended route structure for the Next.js application so navigation remains consistent and mobile-first.

## App shell routes

- `/` -> marketing redirect or app entry depending on strategy
- `/app` -> main app shell
- `/app/home` -> home
- `/app/inventory` -> inventory list
- `/app/inventory/[id]` -> inventory item detail
- `/app/recipes` -> recipes list
- `/app/recipes/[id]` -> recipe detail
- `/app/plan` -> weekly plan
- `/app/shopping` -> shopping list
- `/app/settings` -> settings

## Modal or sheet-driven interactions

These should usually not require dedicated top-level routes in the first pass:

- Add item
- Edit item
- Add recipe
- Plan meal picker
- Quick filters
- Confirm discard

These are better handled as bottom sheets, overlays, or route-intercepted modal patterns if implementation quality supports it.

## Routing rules

- Bottom navigation must map clearly to core routes.
- Deep links should remain possible for major entities like inventory item detail and recipe detail.
- Navigation transitions must preserve orientation and feel predictable.[web:62]
- Avoid unnecessary route depth on mobile.
