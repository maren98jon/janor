# API Contracts

## Purpose

This file defines the intended application-facing contracts so the frontend can be developed against stable boundaries even if the first version uses mock data or local repositories.[cite:28][cite:34]

## API style

- Resource-oriented
- Versionable
- Household-scoped
- Simple payloads for MVP
- JSON only

## Inventory endpoints

### GET /api/inventory

Purpose:
- Return inventory items with filters.

Query parameters:
- `location`
- `status`
- `search`
- `sort`

Response shape:
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Greek yogurt",
      "quantity": 2,
      "unit": "unit",
      "location": "Fridge",
      "expirationDate": "2026-07-15",
      "status": "use-soon",
      "isFrozen": false,
      "isLeftover": false
    }
  ]
}
```

### POST /api/inventory

Purpose:
- Create inventory item.

### PATCH /api/inventory/:id

Purpose:
- Update inventory item fields.

### POST /api/inventory/:id/consume

Purpose:
- Consume part or all of an item.

### POST /api/inventory/:id/move

Purpose:
- Move item to a new location.

### POST /api/inventory/:id/freeze

Purpose:
- Mark item as frozen.

### POST /api/inventory/:id/discard

Purpose:
- Mark item as discarded or remove from active inventory.

## Recipe endpoints

### GET /api/recipes

Purpose:
- Return recipe list with filters such as available, favorites, and use-first ranking.

### POST /api/recipes

Purpose:
- Create recipe.

### GET /api/recipes/:id

Purpose:
- Return recipe detail plus inventory coverage summary.

### PATCH /api/recipes/:id

Purpose:
- Update recipe.

### POST /api/recipes/:id/cook

Purpose:
- Trigger a cooking flow and propose inventory deductions.

## Meal planning endpoints

### GET /api/meal-plans/current

Purpose:
- Return current week plan.

### POST /api/meal-plans/:id/entries

Purpose:
- Add meal plan entry.

### PATCH /api/meal-plan-entries/:id

Purpose:
- Update one meal plan entry.

### DELETE /api/meal-plan-entries/:id

Purpose:
- Remove one meal plan entry.

## Shopping endpoints

### GET /api/shopping-lists/active

Purpose:
- Return active shopping list.

### POST /api/shopping-lists

Purpose:
- Create shopping list.

### POST /api/shopping-lists/generate-from-plan

Purpose:
- Create or update shopping list based on current meal plan and current inventory.[web:13][web:24]

### POST /api/shopping-lists/:id/items

Purpose:
- Add item manually.

### PATCH /api/shopping-list-items/:id

Purpose:
- Update quantity, label, category, or checked state.

## Response rules

- Use clear success and error shapes.
- Return field-level validation errors when possible.
- Use plain-language messages for recoverable issues.
- Never leak technical implementation details into user-facing payloads.
