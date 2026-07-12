# User Flows and Screens

## Primary product flows

The app should be designed around complete user flows rather than isolated pages.[web:13][web:15][web:17]

## Flow 1: Add food item

Goal: register a newly bought or discovered item in the home inventory.

Steps:

1. User taps Quick Add.
2. User selects or types product name.
3. User selects location.
4. User enters quantity and unit.
5. User optionally sets expiration and opened status.
6. Item is saved and appears in inventory.
7. App may suggest merge with an existing item.

Related screens:

- Home
- Quick add sheet
- Inventory detail

## Flow 2: See what expires soon

Goal: know what should be used first.

Steps:

1. User opens Home or Inventory.
2. User sees a prioritized expiring-soon list.
3. User taps an item.
4. User chooses consume, cook with, freeze, move, or discard.

Related screens:

- Home
- Inventory list
- Expiration detail sheet

## Flow 3: Cook with available ingredients

Goal: decide what to cook now based on real stock.[web:15][web:17][web:22]

Steps:

1. User opens Recipes.
2. User switches to Available / Use First mode.
3. App ranks recipes by ingredient coverage and urgency.
4. User opens a recipe.
5. User starts cooking.
6. App proposes inventory deduction after cooking.

Related screens:

- Recipes list
- Recipe detail
- Cook confirmation sheet

## Flow 4: Plan weekly meals

Goal: organize the week with minimum friction.[web:13][web:21]

Steps:

1. User opens Plan.
2. User chooses a date and meal slot.
3. User selects a recipe.
4. Planned meals appear in the weekly view.
5. User can generate or update the shopping list.

Related screens:

- Weekly plan
- Recipe picker sheet
- Shopping generation confirmation

## Flow 5: Generate shopping list

Goal: buy what is missing without duplication.[web:13][web:24]

Steps:

1. User opens Shopping.
2. User creates a list manually or from plan/recipe.
3. App groups missing items and merges duplicates.
4. User checks items while shopping.
5. User can add purchased items back into inventory.

Related screens:

- Shopping list
- Add item quick action
- Purchase completion sheet

## Core screens

### 1. Home

Purpose:
- Immediate overview and action hub.

Content blocks:
- Expiring soon
- Cook today
- Leftovers
- Active shopping list
- Quick add CTA

### 2. Inventory list

Purpose:
- Browse and manage all stored food.

Capabilities:
- Filter by location
- Filter by expiration state
- Search
- Sort by urgency, name, or recent activity

### 3. Inventory item detail

Purpose:
- Understand and edit one item fully.

Actions:
- Edit
- Consume
- Move
- Freeze
- Add to shopping
- Discard

### 4. Recipes list

Purpose:
- Explore, search, and filter recipes.

Capabilities:
- Tabs or segmented filter for All, Available, Use First, Favorites

### 5. Recipe detail

Purpose:
- Review ingredients and cook.

Actions:
- Start cooking
- Plan meal
- Add missing items to shopping list
- Edit recipe

### 6. Weekly plan

Purpose:
- Organize meals visually by day and slot.

Actions:
- Add recipe
- Move recipe
- Remove recipe
- Generate shopping list

### 7. Shopping list

Purpose:
- Fast in-store checklist.

Capabilities:
- Group by category
- Check/uncheck fast
- Add item quickly
- Mark as purchased

## Secondary screens

- Onboarding
- Household settings
- User preferences
- Notifications settings
- Empty states
- Search / global command entry

## Screen priorities for MVP

Phase 1 screens:
- Home
- Inventory list
- Add item sheet
- Item detail
- Recipes list
- Recipe detail
- Weekly plan
- Shopping list

Phase 2 screens:
- Onboarding
- Household collaboration
- Leftovers management
- Smart suggestions
