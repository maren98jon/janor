# Schema

## Purpose

This file defines the initial relational data model and future-ready schema assumptions for the application. It is written to support a clean migration path from mock/local data to a real backend with PostgreSQL, which aligns with the desired evolution path for the product.[cite:8][cite:28]

## General modeling rules

- Use UUIDs for primary keys.
- Every main table includes `created_at` and `updated_at`.
- Use soft deletes only where business value exists.
- Keep household scoping explicit on every business entity.
- Avoid polymorphic chaos in MVP tables.

## Main tables

### households

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Household identifier | PK |
| name | text | Household display name | Required |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### users

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | User identifier | PK |
| household_id | uuid | Household owner | FK -> households.id |
| name | text | Display name | Required |
| email | text | User email | Unique per product scope if auth exists |
| avatar_url | text | Optional avatar reference | Nullable |
| preferences_json | jsonb | User preferences blob | MVP-friendly |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### storage_locations

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Location identifier | PK |
| household_id | uuid | Household scope | FK |
| name | text | Custom name, e.g. Fridge | Required |
| type | text | System or custom type | e.g. fridge, freezer, pantry |
| sort_order | int | Visual order | Default 0 |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### food_catalog_items

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Product identity | PK |
| household_id | uuid | Household scope | FK |
| name | text | Product name | Required |
| default_unit | text | Preferred unit | Nullable |
| category | text | Product category | Nullable |
| barcode | text | Product barcode | Nullable, future use |
| notes | text | Optional notes | Nullable |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### inventory_items

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Inventory record identifier | PK |
| household_id | uuid | Household scope | FK |
| food_catalog_item_id | uuid | Product identity reference | FK |
| storage_location_id | uuid | Current location | FK |
| quantity | numeric(12,3) | Current quantity | Required |
| unit | text | Quantity unit | Required |
| purchase_date | date | Date bought | Nullable |
| opened_date | date | Date opened | Nullable |
| expiration_date | date | Best-before or expiration date | Nullable |
| status | text | Fresh/use-soon/expired/etc. | Derived or persisted |
| is_frozen | boolean | Frozen marker | Default false |
| is_leftover | boolean | Leftover marker | Default false |
| notes | text | Optional notes | Nullable |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### recipes

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Recipe identifier | PK |
| household_id | uuid | Household scope | FK |
| title | text | Recipe name | Required |
| description | text | Short description | Nullable |
| servings | int | Default servings | Nullable |
| prep_time_minutes | int | Prep time | Nullable |
| cook_time_minutes | int | Cook time | Nullable |
| tags_json | jsonb | Tags array | MVP-friendly |
| instructions_markdown | text | Recipe steps | Required |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### recipe_ingredients

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Ingredient row id | PK |
| recipe_id | uuid | Parent recipe | FK |
| food_catalog_item_id | uuid | Catalog link if matched | Nullable FK |
| name_fallback | text | Raw ingredient name | Required |
| quantity | numeric(12,3) | Needed amount | Nullable |
| unit | text | Needed unit | Nullable |
| optional | boolean | Optional ingredient marker | Default false |
| sort_order | int | Visual order | Default 0 |

### meal_plans

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Meal plan id | PK |
| household_id | uuid | Household scope | FK |
| week_start_date | date | Week anchor | Required |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### meal_plan_entries

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Entry id | PK |
| meal_plan_id | uuid | Parent plan | FK |
| date | date | Scheduled day | Required |
| slot | text | breakfast/lunch/dinner/snack | Required |
| recipe_id | uuid | Planned recipe | FK |
| servings | int | Planned servings | Nullable |
| notes | text | Optional planning note | Nullable |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### shopping_lists

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Shopping list id | PK |
| household_id | uuid | Household scope | FK |
| name | text | List label | Required |
| source_type | text | manual/recipe/plan/mixed | Required |
| status | text | active/completed/archived | Required |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### shopping_list_items

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Item id | PK |
| shopping_list_id | uuid | Parent shopping list | FK |
| food_catalog_item_id | uuid | Optional product reference | Nullable FK |
| label | text | Display label | Required |
| quantity | numeric(12,3) | Desired amount | Nullable |
| unit | text | Unit | Nullable |
| category | text | Shopping category | Nullable |
| checked | boolean | Purchased marker | Default false |
| source_recipe_id | uuid | Source recipe if applicable | Nullable FK |
| created_at | timestamptz | Creation timestamp | Required |
| updated_at | timestamptz | Update timestamp | Required |

### leftovers

| Column | Type | Meaning | Notes |
|---|---|---|---|
| id | uuid | Leftover id | PK |
| household_id | uuid | Household scope | FK |
| source_recipe_id | uuid | Origin recipe | Nullable FK |
| label | text | Leftover name | Required |
| quantity | numeric(12,3) | Quantity | Nullable |
| unit | text | Unit | Nullable |
| created_date | date | Creation date | Required |
| expiration_date | date | Suggested use-by date | Nullable |
| notes | text | Optional notes | Nullable |

## Index recommendations

- `inventory_items (household_id, expiration_date)`
- `inventory_items (household_id, storage_location_id)`
- `food_catalog_items (household_id, name)`
- `recipes (household_id, title)`
- `meal_plan_entries (meal_plan_id, date, slot)`
- `shopping_list_items (shopping_list_id, checked)`

## Open modeling notes

- Auth can remain lightweight at MVP stage if the first implementation starts with mock or simple local state.[cite:28]
- `status` can be derived dynamically instead of persisted if the implementation prefers cleaner write paths.
- `preferences_json` and `tags_json` are acceptable MVP simplifications but should be normalized later if product complexity grows.
