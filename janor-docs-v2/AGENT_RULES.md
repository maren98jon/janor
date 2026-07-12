# Agent Rules

## Purpose

This file defines how any implementation AI must behave while generating the product.

## Mandatory behavior

- Read every markdown file in this folder before generating code.
- Follow the UX/UI direction strictly.[cite:32]
- Prefer high-quality refinement over breadth.
- Do not invent features outside the documented scope.
- Do not reduce the product to a CRUD admin interface.
- Do not use generic component-library defaults as final UI.
- Do not ship screens without real states.
- Do not leave placeholder copy.
- Do not create layouts that only look good in screenshots.

## Design-specific behavior

- Use maximum UX/UI skill.
- If premium UI quality cannot be maintained, stop and explain the limitation before continuing.[cite:32]
- Keep the result natural and human.
- Avoid patterns that visually reveal AI generation.

## Technical behavior

- Keep the code modular and scalable.[cite:34]
- Favor reusable slices by feature.
- Keep domain logic separated from page-level rendering.
- Build mobile-first first, not as a late adaptation.[web:45]

## Product behavior

- Prioritize the main user loops.
- Make repeated actions fast.
- Preserve realism in the data model and interactions.
- Build for messy real-world household data.
