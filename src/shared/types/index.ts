export interface Household {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  householdId: string;
  name: string;
  email: string;
  avatarUrl?: string;
  preferences?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface StorageLocation {
  id: string;
  householdId: string;
  name: string;
  type: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FoodCatalogItem {
  id: string;
  householdId: string;
  name: string;
  defaultUnit: string;
  category?: string;
  barcode?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type InventoryStatus = "fresh" | "use_soon" | "critical" | "expired";

export interface InventoryItem {
  id: string;
  householdId: string;
  foodCatalogItemId: string;
  storageLocationId: string;
  quantity: number;
  unit: string;
  purchaseDate?: Date;
  openedDate?: Date;
  expirationDate?: Date;
  status: InventoryStatus;
  isFrozen: boolean;
  isLeftover: boolean;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  foodCatalogItem?: FoodCatalogItem;
  storageLocation?: StorageLocation;
}

export interface RecipeIngredient {
  id: string;
  recipeId: string;
  foodCatalogItemId?: string;
  nameFallback: string;
  quantity: number;
  unit: string;
  optional: boolean;
  sortOrder: number;
  foodCatalogItem?: FoodCatalogItem;
}

export interface Recipe {
  id: string;
  householdId: string;
  title: string;
  description?: string;
  servings: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  tags: string[];
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
  ingredients?: RecipeIngredient[];
}

export interface MealPlan {
  id: string;
  householdId: string;
  weekStartDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type MealSlot = "breakfast" | "lunch" | "dinner" | "snacks";

export interface MealPlanEntry {
  id: string;
  mealPlanId: string;
  date: Date;
  slot: MealSlot;
  recipeId: string;
  servings: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  recipe?: Recipe;
}

export interface ShoppingList {
  id: string;
  householdId: string;
  name: string;
  sourceType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShoppingListItem {
  id: string;
  shoppingListId: string;
  foodCatalogItemId?: string;
  label: string;
  quantity: number;
  unit: string;
  category?: string;
  checked: boolean;
  sourceRecipeId?: string;
  createdAt: Date;
  updatedAt: Date;
  foodCatalogItem?: FoodCatalogItem;
}

export interface Leftover {
  id: string;
  householdId: string;
  sourceRecipeId: string;
  label: string;
  quantity: number;
  unit: string;
  createdDate: Date;
  expirationDate: Date;
  notes?: string;
}
