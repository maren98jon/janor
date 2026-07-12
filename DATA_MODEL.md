# Data Model

## Modeling philosophy

The data model should support real-world household food management, not only simple product checklists. Inventory should be represented as actual stored instances with dates and quantities, because expiration tracking depends on lot-like item records rather than generic product names.[web:15]

## Main entities

### Household

Fields:
- id
- name
- createdAt
- updatedAt

### User

Fields:
- id
- householdId
- name
- email
- avatarUrl
- preferences
- createdAt
- updatedAt

### StorageLocation

Fields:
- id
- householdId
- name
- type
- sortOrder
- createdAt
- updatedAt

### FoodCatalogItem

Represents a generic product identity such as “Greek yogurt” or “Brown rice”.

Fields:
- id
- householdId
- name
- defaultUnit
- category
- barcode
- notes
- createdAt
- updatedAt

### InventoryItem

Represents a real instance of food currently stored at home.

Fields:
- id
- householdId
- foodCatalogItemId
- storageLocationId
- quantity
- unit
- purchaseDate
- openedDate
- expirationDate
- status
- isFrozen
- isLeftover
- notes
- createdAt
- updatedAt

### Recipe

Fields:
- id
- householdId
- title
- description
- servings
- prepTimeMinutes
- cookTimeMinutes
- tags
- instructions
- createdAt
- updatedAt

### RecipeIngredient

Fields:
- id
- recipeId
- foodCatalogItemId
- nameFallback
- quantity
- unit
- optional
- sortOrder

### MealPlan

Fields:
- id
- householdId
- weekStartDate
- createdAt
- updatedAt

### MealPlanEntry

Fields:
- id
- mealPlanId
- date
- slot
- recipeId
- servings
- notes
- createdAt
- updatedAt

### ShoppingList

Fields:
- id
- householdId
- name
- sourceType
- status
- createdAt
- updatedAt

### ShoppingListItem

Fields:
- id
- shoppingListId
- foodCatalogItemId
- label
- quantity
- unit
- category
- checked
- sourceRecipeId
- createdAt
- updatedAt

### Leftover

Fields:
- id
- householdId
- sourceRecipeId
- label
- quantity
- unit
- createdDate
- expirationDate
- notes

## Important business rules

- Expiration should always be stored at inventory-item level, not product-definition level.[web:15]
- Recipe matching should compare recipe ingredients against current available inventory quantities.[web:17][web:22]
- Shopping list generation should subtract available inventory where appropriate.[web:13][web:24]
- Leftovers should be first-class records or clearly represented inventory variants.
- Inventory state changes should be auditable through event-like logs in later phases.

## Persistence recommendation

The initial implementation can use frontend-managed mock or local data models if needed, provided the schemas are written as if migration to a real database will happen later. This matches the preference for a simpler starting stack that can later evolve to database-backed persistence.[cite:28]
