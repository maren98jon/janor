# Repository Interfaces

## Purpose

This file defines the contracts the frontend should code against, regardless of whether the first implementation is local-only, mock-driven, or backed by a real API.[cite:28]

## InventoryRepository

Methods:
- `list(filters)`
- `getById(id)`
- `create(input)`
- `update(id, input)`
- `consume(id, input)`
- `move(id, input)`
- `freeze(id)`
- `discard(id)`

## RecipeRepository

Methods:
- `list(filters)`
- `getById(id)`
- `create(input)`
- `update(id, input)`
- `cook(id, input)`

## MealPlanRepository

Methods:
- `getCurrentWeek()`
- `createOrGetWeek(input)`
- `addEntry(input)`
- `updateEntry(id, input)`
- `removeEntry(id)`

## ShoppingRepository

Methods:
- `getActive()`
- `create(input)`
- `generateFromPlan(input)`
- `addItem(input)`
- `updateItem(id, input)`

## Implementation rule

Implement at least one local/mock repository variant first if backend is deferred, but keep the contract stable so migration remains straightforward.[cite:28]
