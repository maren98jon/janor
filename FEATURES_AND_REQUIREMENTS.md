# Features and Requirements

## Scope overview

The application should unify household inventory, expiration tracking, recipes, meal planning, and shopping in a single workflow.[cite:1][web:13][web:15][web:17]

## Functional modules

### 1. Household and user context

The app must support:

- A household concept as the top-level shared space.
- One or more members inside the household.
- Optional user preferences such as dietary style, allergens, dislikes, and favorite recipes.
- Shared data visibility across household members.

### 2. Storage locations

The app must support storage locations such as:

- Fridge
- Freezer
- Pantry
- Drinks
- Snacks
- Other custom locations

Each inventory item must belong to a location.[web:15][web:17][web:22]

### 3. Inventory management

The app must support:

- Manual item creation.
- Quantity and unit tracking.
- Date purchased.
- Date opened.
- Expiration or best-before date.
- Notes.
- Favorite or recurring products.
- Quick consumption, edit, move, and discard actions.
- Duplicate handling and quantity merge suggestions.

### 4. Expiration management

The app must support:

- Visual identification of items expiring soon.
- Item status such as fresh, use soon, critical, expired.
- Sorting and filtering by urgency.
- Alerts for upcoming expiration.[web:14][web:15][web:17]

### 5. Recipes

The app must support:

- Manual recipe creation.
- Recipe import from URL in later phases.
- Ingredients with quantities and units.
- Optional ingredients.
- Steps.
- Preparation time.
- Servings.
- Tags such as breakfast, lunch, dinner, quick, healthy, vegetarian.
- Favorite recipes.

### 6. Recipe matching

The app should support:

- Full match recipes using only available ingredients.
- Partial match recipes with missing items highlighted.
- Priority ranking for recipes that use soon-to-expire ingredients.[web:15][web:17][web:22]

### 7. Meal planning

The app must support:

- Weekly planning.
- Daily planning.
- Time slots such as breakfast, lunch, dinner, snacks.
- Drag, tap, or quick assignment of recipes to dates.
- Notes for a planned meal.[web:13][web:21][web:22]

### 8. Shopping lists

The app must support:

- Manual list creation.
- Auto-generated lists from recipes.
- Auto-generated lists from meal planning.
- Deduplication of repeated items.
- Grouping by category or store section.
- Check and uncheck interactions that are fast on mobile.[web:13][web:20][web:24]

### 9. Consumption and leftovers

The app should support:

- Consuming inventory directly.
- Consuming inventory by cooking a recipe.
- Creating leftovers after cooking.
- Tracking leftover lifetime separately from raw ingredients.[web:13][web:15]

### 10. Quick actions

The app must support fast actions from key screens:

- Add item
- Use item
- Move item
- Freeze item
- Add to shopping list
- Cook recipe
- Plan meal

## Non-functional requirements

- Mobile-first layout and interactions.[web:36][web:45]
- Installable PWA experience.[web:36][web:41]
- High-performance perceived loading.
- Excellent readability.
- Offline-tolerant or offline-capable flows for core actions in later iterations.[web:36][web:41]
- Strong empty, loading, and error states.
- Natural microcopy and realistic product tone.

## MVP boundaries

The MVP should include:

- Household
- Storage locations
- Inventory CRUD
- Expiration states
- Recipe CRUD
- Weekly meal planning
- Shopping list generation
- Basic recipe matching
- Mobile-first navigation

The MVP should not require in phase one:

- Barcode scanning
- OCR/photo recognition
- Nutrition tracking
- Full AI assistant
- Advanced analytics
- External supermarket integrations
