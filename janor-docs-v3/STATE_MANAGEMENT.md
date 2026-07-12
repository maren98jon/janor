# State Management

## Purpose

This file defines how state should be split across the application so the MVP remains understandable and scalable.

## Principles

- Keep server-like data separate from transient UI state.
- Avoid over-centralized global stores.
- Keep state close to the owning feature when possible.
- Preserve testability and future backend migration.[cite:34]

## State categories

### 1. Domain data state

Examples:
- Inventory items
- Recipes
- Meal plans
- Shopping lists

Recommendation:
- If backend exists, manage through query layer.
- If backend does not exist yet, use repositories with the same contract surface so the frontend is future-ready.[cite:28]

### 2. UI state

Examples:
- Active tab
- Selected filters
- Open bottom sheet
- Selected recipe for planning
- Temporary confirmation states

Recommendation:
- Use a lightweight client store only when prop drilling becomes harmful.
- Keep feature-local state local where practical.

### 3. Form state

Examples:
- Add item form
- Recipe form
- Plan meal form

Recommendation:
- Use dedicated form tooling and schema validation.

## Recommended split

- Repository pattern for data access
- Feature hooks for composition
- Lightweight UI store for cross-screen interaction state only
- Strong input validation on write actions

## Anti-patterns

Do not:
- Put the whole app into one massive client store
- Mix network concerns directly into view components
- Store derived view state redundantly everywhere
- Create hidden mutable state flows

## Suggested repositories

- `InventoryRepository`
- `RecipeRepository`
- `MealPlanRepository`
- `ShoppingRepository`

The first implementation can provide local/mock versions and later swap to API-backed implementations with minimal UI disruption.[cite:28]
