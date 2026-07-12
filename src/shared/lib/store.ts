import { create } from "zustand";
import {
  InventoryItem,
  Recipe,
  ShoppingListItem,
  MealPlanEntry,
  StorageLocation,
  FoodCatalogItem,
  RecipeIngredient,
} from "@/shared/types";
import {
  STORAGE_LOCATIONS,
  FOOD_CATALOG,
  RECIPES,
  INVENTORY_ITEMS,
  SHOPPING_LIST_ITEMS,
} from "@/shared/config/seed-data";
import { api } from "@/infrastructure/persistence/api-client";

interface RecipeWithMatch extends Recipe {
  matchPercentage: number;
  missingIngredients: string[];
  hasSoonToExpire: boolean;
}

interface AppState {
  initialized: boolean;
  inventory: InventoryItem[];
  recipes: Recipe[];
  shoppingList: ShoppingListItem[];
  mealPlan: MealPlanEntry[];
  storageLocations: StorageLocation[];
  foodCatalog: FoodCatalogItem[];
  initialize: () => Promise<void>;
  addInventoryItem: (item: Omit<InventoryItem, "id" | "createdAt" | "updatedAt">) => void;
  updateInventoryItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteInventoryItem: (id: string) => void;
  consumeInventoryItem: (id: string) => void;
  moveInventoryItem: (id: string, locationId: string) => void;
  cookRecipe: (recipeId: string) => Promise<{ consumed: string[]; missing: string[] }>;
  addInventoryItemToShopping: (inventoryItemId: string) => void;
  toggleShoppingItem: (id: string) => void;
  addShoppingItem: (item: Omit<ShoppingListItem, "id" | "createdAt" | "updatedAt">) => void;
  removeShoppingItem: (id: string) => void;
  addMealPlanEntry: (entry: Omit<MealPlanEntry, "id" | "createdAt" | "updatedAt">) => void;
  removeMealPlanEntry: (id: string) => void;
  generateShoppingFromPlan: (weekStart: Date) => void;
  getMatchedRecipes: () => RecipeWithMatch[];
  getExpiringItems: (days: number) => InventoryItem[];
}

const householdId = "household-default";
const now = new Date();

const seedFoodCatalog: FoodCatalogItem[] = FOOD_CATALOG.map((f) => ({
  ...f,
  householdId,
  createdAt: now,
  updatedAt: now,
}));

const seedLocations: StorageLocation[] = STORAGE_LOCATIONS.map((l) => ({
  ...l,
  householdId,
  createdAt: now,
  updatedAt: now,
}));

const toInventoryItem = (item: Record<string, unknown>): InventoryItem => ({
  id: item.id as string,
  householdId: item.householdId as string,
  foodCatalogItemId: item.foodCatalogItemId as string,
  storageLocationId: item.storageLocationId as string,
  quantity: item.quantity as number,
  unit: item.unit as string,
  purchaseDate: item.purchaseDate ? new Date(item.purchaseDate as string) : undefined,
  openedDate: item.openedDate ? new Date(item.openedDate as string) : undefined,
  expirationDate: item.expirationDate ? new Date(item.expirationDate as string) : undefined,
  status: item.status as InventoryItem["status"],
  isFrozen: item.isFrozen as boolean,
  isLeftover: item.isLeftover as boolean,
  notes: item.notes as string | undefined,
  createdAt: new Date(item.createdAt as string),
  updatedAt: new Date(item.updatedAt as string),
  foodCatalogItem: item.foodCatalogItem as FoodCatalogItem | undefined,
  storageLocation: item.storageLocation as StorageLocation | undefined,
});

const toRecipe = (r: Record<string, unknown>): Recipe => ({
  id: r.id as string,
  householdId: r.householdId as string,
  title: r.title as string,
  description: r.description as string | undefined,
  servings: r.servings as number,
  prepTimeMinutes: r.prepTimeMinutes as number,
  cookTimeMinutes: r.cookTimeMinutes as number,
  tags: r.tags as string[],
  instructions: r.instructions as string,
  createdAt: new Date(r.createdAt as string),
  updatedAt: new Date(r.updatedAt as string),
  ingredients: (r.ingredients as Record<string, unknown>[] | undefined)?.map((ing, i) => ({
    id: ing.id as string,
    recipeId: ing.recipeId as string,
    foodCatalogItemId: ing.foodCatalogItemId as string | undefined,
    nameFallback: ing.nameFallback as string,
    quantity: ing.quantity as number,
    unit: ing.unit as string,
    optional: ing.optional as boolean,
    sortOrder: ing.sortOrder as number,
    foodCatalogItem: ing.foodCatalogItem as FoodCatalogItem | undefined,
  })),
});

const toShoppingItem = (item: Record<string, unknown>): ShoppingListItem => ({
  id: item.id as string,
  shoppingListId: item.shoppingListId as string,
  foodCatalogItemId: item.foodCatalogItemId as string | undefined,
  label: item.label as string,
  quantity: item.quantity as number,
  unit: item.unit as string,
  category: item.category as string | undefined,
  checked: item.checked as boolean,
  sourceRecipeId: item.sourceRecipeId as string | undefined,
  createdAt: new Date(item.createdAt as string),
  updatedAt: new Date(item.updatedAt as string),
});

const toMealPlanEntry = (entry: Record<string, unknown>): MealPlanEntry => ({
  id: entry.id as string,
  mealPlanId: entry.mealPlanId as string,
  date: new Date(entry.date as string),
  slot: entry.slot as MealPlanEntry["slot"],
  recipeId: entry.recipeId as string,
  servings: entry.servings as number,
  notes: entry.notes as string | undefined,
  createdAt: new Date(entry.createdAt as string),
  updatedAt: new Date(entry.updatedAt as string),
  recipe: entry.recipe as Recipe | undefined,
});

export const useAppStore = create<AppState>((set, get) => ({
  initialized: false,
  inventory: [],
  recipes: [],
  shoppingList: [],
  mealPlan: [],
  storageLocations: seedLocations,
  foodCatalog: seedFoodCatalog,

  initialize: async () => {
    try {
      const [inventoryRes, recipesRes, shoppingRes, mealPlanRes] = await Promise.all([
        api.inventory.list(),
        api.recipes.list(),
        api.shoppingList.get(),
        api.mealPlans.get(),
      ]);

      const inventory = (inventoryRes.items as Record<string, unknown>[]).map(toInventoryItem);
      const recipes = (recipesRes.recipes as Record<string, unknown>[]).map(toRecipe);
      const shoppingList = shoppingRes.list
        ? ((shoppingRes.list as Record<string, unknown>).items as Record<string, unknown>[] | undefined)?.map(toShoppingItem) || []
        : [];
      const mealPlan = mealPlanRes.plan
        ? ((mealPlanRes.plan as Record<string, unknown>).entries as Record<string, unknown>[] | undefined)?.map(toMealPlanEntry) || []
        : [];

      set({ inventory, recipes, shoppingList, mealPlan, initialized: true });
    } catch {
      set({
        inventory: INVENTORY_ITEMS.map((item) => ({
          ...item,
          householdId,
          createdAt: now,
          updatedAt: now,
          isFrozen: false,
          isLeftover: false,
          foodCatalogItem: seedFoodCatalog.find((f) => f.id === item.foodCatalogItemId),
          storageLocation: seedLocations.find((l) => l.id === item.storageLocationId),
        })),
        recipes: RECIPES.map((r) => ({
          ...r,
          householdId,
          createdAt: now,
          updatedAt: now,
          ingredients: r.ingredients.map((ing, i) => ({
            ...ing,
            id: `ri-${r.id}-${i}`,
            recipeId: r.id,
            foodCatalogItem: seedFoodCatalog.find((f) => f.id === ing.foodCatalogItemId),
          })),
        })),
        shoppingList: SHOPPING_LIST_ITEMS.map((item) => ({
          ...item,
          shoppingListId: "list-default",
          foodCatalogItemId: undefined,
          sourceRecipeId: undefined,
          createdAt: now,
          updatedAt: now,
        })),
        mealPlan: [],
        initialized: true,
      });
    }
  },

  addInventoryItem: (item) => {
    const catalogItem = get().foodCatalog.find((f) => f.id === item.foodCatalogItemId);
    const location = get().storageLocations.find((l) => l.id === item.storageLocationId);
    const newItem: InventoryItem = {
      ...item,
      id: `inv-${Date.now()}`,
      householdId,
      createdAt: new Date(),
      updatedAt: new Date(),
      foodCatalogItem: catalogItem,
      storageLocation: location,
    };
    set((state) => ({ inventory: [...state.inventory, newItem] }));

    api.inventory.create({
      foodCatalogItemId: item.foodCatalogItemId,
      storageLocationId: item.storageLocationId,
      quantity: item.quantity,
      unit: item.unit,
      purchaseDate: item.purchaseDate?.toISOString(),
      openedDate: item.openedDate?.toISOString(),
      expirationDate: item.expirationDate?.toISOString(),
      status: item.status,
      isFrozen: item.isFrozen,
      isLeftover: item.isLeftover,
      notes: item.notes,
    }).catch(() => {});
  },

  updateInventoryItem: (id, updates) => {
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
      ),
    }));

    api.inventory.update(id, updates).catch(() => {});
  },

  deleteInventoryItem: (id) => {
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== id),
    }));

    api.inventory.delete(id).catch(() => {});
  },

  consumeInventoryItem: (id) => {
    set((state) => ({
      inventory: state.inventory.filter((item) => item.id !== id),
    }));

    api.inventory.consume(id).catch(() => {});
  },

  moveInventoryItem: (id, locationId) => {
    const location = get().storageLocations.find((l) => l.id === locationId);
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === id
          ? { ...item, storageLocationId: locationId, storageLocation: location, updatedAt: new Date() }
          : item
      ),
    }));

    api.inventory.move(id, locationId).catch(() => {});
  },

  cookRecipe: async (recipeId) => {
    try {
      const result = await api.recipes.cook(recipeId);
      const { inventory } = get();
      const recipe = get().recipes.find((r) => r.id === recipeId);
      if (!recipe) return { consumed: [], missing: [] };

      const inventoryMap = new Map<string, number>();
      inventory.forEach((item) => {
        const current = inventoryMap.get(item.foodCatalogItemId) || 0;
        inventoryMap.set(item.foodCatalogItemId, current + item.quantity);
      });

      const newInventory = [...inventory];
      recipe.ingredients?.forEach((ing) => {
        if (ing.optional) return;
        let needed = ing.quantity;
        for (let i = 0; i < newInventory.length && needed > 0; i++) {
          if (newInventory[i].foodCatalogItemId === ing.foodCatalogItemId) {
            if (newInventory[i].quantity >= needed) {
              newInventory[i] = { ...newInventory[i], quantity: newInventory[i].quantity - needed };
              needed = 0;
            } else {
              needed -= newInventory[i].quantity;
              newInventory[i] = { ...newInventory[i], quantity: 0 };
            }
          }
        }
      });

      set({ inventory: newInventory.filter((item) => item.quantity > 0) });
      return result;
    } catch {
      return { consumed: [], missing: [] };
    }
  },

  addInventoryItemToShopping: (inventoryItemId) => {
    const item = get().inventory.find((i) => i.id === inventoryItemId);
    if (!item) return;

    const exists = get().shoppingList.find(
      (sl) => sl.foodCatalogItemId === item.foodCatalogItemId && !sl.checked
    );
    if (exists) return;

    const newItem: ShoppingListItem = {
      id: `sl-${Date.now()}`,
      shoppingListId: "list-default",
      foodCatalogItemId: item.foodCatalogItemId,
      label: item.foodCatalogItem?.name || "Producto",
      quantity: item.quantity,
      unit: item.unit,
      category: item.foodCatalogItem?.category,
      checked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ shoppingList: [...state.shoppingList, newItem] }));

    api.shoppingList.addItem({
      shoppingListId: "list-default",
      foodCatalogItemId: item.foodCatalogItemId,
      label: newItem.label,
      quantity: newItem.quantity,
      unit: newItem.unit,
      category: newItem.category,
    }).catch(() => {});
  },

  toggleShoppingItem: (id) => {
    set((state) => ({
      shoppingList: state.shoppingList.map((item) =>
        item.id === id ? { ...item, checked: !item.checked, updatedAt: new Date() } : item
      ),
    }));

    api.shoppingList.updateItem({ id, checked: !get().shoppingList.find((i) => i.id === id)?.checked }).catch(() => {});
  },

  addShoppingItem: (item) => {
    const exists = get().shoppingList.find(
      (sl) => sl.label.toLowerCase() === item.label.toLowerCase() && !sl.checked
    );
    if (exists) return;

    const newItem: ShoppingListItem = {
      ...item,
      id: `sl-${Date.now()}`,
      shoppingListId: "list-default",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ shoppingList: [...state.shoppingList, newItem] }));

    api.shoppingList.addItem({
      ...item,
      shoppingListId: "list-default",
    }).catch(() => {});
  },

  removeShoppingItem: (id) => {
    set((state) => ({
      shoppingList: state.shoppingList.filter((item) => item.id !== id),
    }));

    api.shoppingList.removeItem(id).catch(() => {});
  },

  addMealPlanEntry: (entry) => {
    const recipe = get().recipes.find((r) => r.id === entry.recipeId);
    const newEntry: MealPlanEntry = {
      ...entry,
      id: `meal-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      recipe,
    };
    set((state) => ({ mealPlan: [...state.mealPlan, newEntry] }));

    api.mealPlans.addEntry({
      ...entry,
      date: entry.date instanceof Date ? entry.date.toISOString() : entry.date,
    }).catch(() => {});
  },

  removeMealPlanEntry: (id) => {
    set((state) => ({
      mealPlan: state.mealPlan.filter((entry) => entry.id !== id),
    }));

    api.mealPlans.removeEntry(id).catch(() => {});
  },

  generateShoppingFromPlan: (weekStart) => {
    const { mealPlan, recipes, inventory, shoppingList } = get();
    const weekEnd = new Date(weekStart.getTime() + 7 * 86400000);

    const weekEntries = mealPlan.filter((e) => {
      const d = new Date(e.date);
      return d >= weekStart && d < weekEnd;
    });

    const inventoryMap = new Map<string, number>();
    inventory.forEach((item) => {
      const current = inventoryMap.get(item.foodCatalogItemId) || 0;
      inventoryMap.set(item.foodCatalogItemId, current + item.quantity);
    });

    const existingLabels = new Set(
      shoppingList.filter((sl) => !sl.checked).map((sl) => sl.label.toLowerCase())
    );

    const newItems: ShoppingListItem[] = [];
    const now = new Date();

    weekEntries.forEach((entry) => {
      const recipe = recipes.find((r) => r.id === entry.recipeId);
      if (!recipe) return;

      recipe.ingredients?.forEach((ing) => {
        if (ing.optional) return;
        const available = inventoryMap.get(ing.foodCatalogItemId || "") || 0;
        if (available <= 0 && !existingLabels.has(ing.nameFallback.toLowerCase())) {
          newItems.push({
            id: `sl-${Date.now()}-${ing.id}`,
            shoppingListId: "list-default",
            foodCatalogItemId: ing.foodCatalogItemId || undefined,
            label: ing.nameFallback,
            quantity: ing.quantity,
            unit: ing.unit,
            category: ing.foodCatalogItem?.category,
            checked: false,
            sourceRecipeId: recipe.id,
            createdAt: now,
            updatedAt: now,
          });
          existingLabels.add(ing.nameFallback.toLowerCase());
        }
      });
    });

    set((state) => ({
      shoppingList: [...state.shoppingList, ...newItems],
    }));

    api.shoppingList.generateFromPlan(weekStart.toISOString()).catch(() => {});
  },

  getMatchedRecipes: () => {
    const { inventory, recipes } = get();
    const inventoryMap = new Map<string, number>();
    inventory.forEach((item) => {
      const current = inventoryMap.get(item.foodCatalogItemId) || 0;
      inventoryMap.set(item.foodCatalogItemId, current + item.quantity);
    });

    return recipes.map((recipe) => {
      const ingredients = recipe.ingredients || [];
      const required = ingredients.filter((i) => !i.optional);

      let coveredCount = 0;
      const missing: string[] = [];

      required.forEach((ing) => {
        const available = inventoryMap.get(ing.foodCatalogItemId || "") || 0;
        if (available > 0) {
          coveredCount++;
        } else {
          missing.push(ing.nameFallback);
        }
      });

      const matchPercentage = required.length > 0 ? Math.round((coveredCount / required.length) * 100) : 0;

      const expiringIds = new Set(
        inventory.filter((i) => i.status === "use_soon" || i.status === "critical").map((i) => i.foodCatalogItemId)
      );
      const hasSoonToExpire = ingredients.some((ing) => expiringIds.has(ing.foodCatalogItemId || ""));

      return {
        ...recipe,
        matchPercentage,
        missingIngredients: missing,
        hasSoonToExpire,
      };
    }).sort((a, b) => {
      if (a.hasSoonToExpire && !b.hasSoonToExpire) return -1;
      if (!a.hasSoonToExpire && b.hasSoonToExpire) return 1;
      return b.matchPercentage - a.matchPercentage;
    });
  },

  getExpiringItems: (days) => {
    const { inventory } = get();
    const threshold = new Date();
    threshold.setDate(threshold.getDate() + days);
    return inventory
      .filter((item) => item.expirationDate && item.expirationDate <= threshold && item.status !== "expired")
      .sort((a, b) => (a.expirationDate?.getTime() || 0) - (b.expirationDate?.getTime() || 0));
  },
}));
