# Screen by Screen Specification

## Purpose

This document defines the expected structure, hierarchy, actions, and states of the MVP screens. It should be used by the implementation AI as a screen-level contract.[cite:7][cite:32]

## 1. Home

### Goal

Provide a fast decision hub for the day.

### Main content

- Greeting or contextual header
- Expiring soon module
- Cook today module
- Shopping in progress module
- Quick add entry point
- Optional leftovers module

### Primary action

Add item

### Secondary actions

- View all expiring items
- Open recipe suggestion
- Open shopping list

### Empty states

- No food tracked yet
- No items expiring soon
- No active shopping list

### Notes

The home screen must never look like a dashboard template. It should feel like a calm operational overview.[web:13][web:15]

## 2. Inventory List

### Goal

Let the user understand all current food quickly.

### Main content

- Search
- Filter chips by location
- Filter chips by status
- Sort control
- Grouped inventory rows

### Row content

- Item name
- Quantity
- Location
- Expiration status
- Optional date

### Primary action

Add item

### Row quick actions

- Consume
- Move
- Freeze
- Edit
- Add to shopping

### Notes

Rows should be highly scannable and optimized for touch.[web:45]

## 3. Add Item Sheet

### Goal

Create an item with minimal friction.

### Fields

- Product name
- Location
- Quantity
- Unit
- Expiration date
- Opened toggle
- Notes optional

### Behavior

- Smart defaults
- Recent products suggestion
- Save button pinned or clearly reachable

### Success state

Item added with optional “add another” path.

## 4. Item Detail

### Goal

Review and manage one stored item.

### Main content

- Item name
- Quantity and unit
- Location
- Dates
- Status
- Notes

### Primary action

Consume or Use now depending on status

### Secondary actions

- Edit
- Freeze
- Move
- Add to shopping
- Discard

## 5. Recipes List

### Goal

Help the user browse and choose recipes intelligently.

### Main content

- Search
- Segmented control: All / Available / Use First / Favorites
- Recipe cards or rows

### Recipe preview content

- Recipe title
- Coverage indicator
- Time estimate
- Missing ingredient count

### Primary action

Add recipe

## 6. Recipe Detail

### Goal

Support cooking and planning.

### Main content

- Title
- Time and servings
- Ingredient list
- Match status with inventory
- Steps

### Primary action

Cook this

### Secondary actions

- Plan meal
- Add missing items
- Edit recipe

## 7. Weekly Plan

### Goal

Let the user organize the week with low friction.

### Main content

- Week switcher
- Daily sections or card-based planner
- Meal slots per day

### Primary action

Add planned meal

### Secondary actions

- Move recipe
- Remove meal
- Generate shopping list

## 8. Shopping List

### Goal

Provide a fast in-store checklist.

### Main content

- Active list title
- Grouped items by category
- Checkable rows
- Add item input

### Primary action

Add item

### Secondary actions

- Generate from plan
- Mark all purchased
- Send purchased items into inventory in future phases

## Global states

Every screen must include:

- Empty state
- Loading state
- Error state
- Realistic overflow handling
- Real-data resilience for long item names and messy lists
