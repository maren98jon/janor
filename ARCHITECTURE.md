# Architecture

## Technical direction

The application should be built with Next.js, TypeScript, App Router, and a mobile-first PWA approach. Next.js provides an official path for Progressive Web App behavior and a strong foundation for a single codebase app-like experience.[web:36][web:41]

## High-level architecture goals

- Strong modularity.
- Excellent scalability.
- UX-first implementation discipline.
- Clean domain modeling.
- Easy migration from MVP persistence to a real backend later.[cite:28][cite:34]

## Recommended stack

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- Component primitives with strong customization control
- React Hook Form
- Zod
- Zustand for lightweight UI state
- TanStack Query if remote data is introduced
- PWA support including manifest and service worker strategy.[web:36][web:41]

## Architectural style

Use pragmatic Clean Architecture combined with Vertical Slice organization by feature. This is aligned with the preferred project style for apps expected to grow significantly.[cite:9][cite:34]

## Suggested folder structure

```text
src/
  app/
    (marketing)/
    (app)/
      home/
      inventory/
      recipes/
      plan/
      shopping/
    layout.tsx
    page.tsx
    globals.css
  features/
    inventory/
      domain/
      application/
      infrastructure/
      presentation/
    recipes/
      domain/
      application/
      infrastructure/
      presentation/
    meal-plans/
      domain/
      application/
      infrastructure/
      presentation/
    shopping/
      domain/
      application/
      infrastructure/
      presentation/
    expiry/
      domain/
      application/
      infrastructure/
      presentation/
  entities/
  shared/
    ui/
    lib/
    hooks/
    types/
    config/
    design/
  infrastructure/
    persistence/
    pwa/
    analytics/
```

## Architectural rules

- Features own their own presentation, application, and infrastructure logic.
- Shared code must stay truly generic and not become a dumping ground.
- UI primitives must be reusable but never generic-looking.
- Domain rules must not depend on page components.
- Implementation should favor composable feature slices over global service sprawl.[cite:34]

## Mobile-first implementation rules

- Design at phone width first.[web:45]
- Bottom navigation is the primary shell for the app area.
- Use sheets, segmented controls, grouped lists, and compact detail flows.
- Avoid desktop-first table thinking.
- Every core interaction must be comfortable on touch devices.

## PWA rules

- Include web app manifest.[web:36]
- Include installable icons.
- Include safe offline experience for app shell.[web:36][web:41]
- Plan for background sync and richer offline states later.[web:41]
- Use transitions and loading states that preserve trust even under weak connectivity.[web:36]

## Quality rules

- No generic template UI.
- No placeholder copy in final output.
- No unfinished empty states.
- No inaccessible low-contrast text.
- No component-library look left unrefined.
- No inconsistent spacing or visual rhythm.
