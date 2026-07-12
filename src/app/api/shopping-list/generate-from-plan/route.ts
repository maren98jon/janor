import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const weekStart = new Date(body.weekStart);
  const weekEnd = new Date(weekStart.getTime() + 7 * 86400000);

  const entries = await prisma.mealPlanEntry.findMany({
    where: {
      mealPlan: {
        householdId: HOUSEHOLD_ID,
        weekStartDate: weekStart,
      },
      date: {
        gte: weekStart,
        lt: weekEnd,
      },
    },
    include: {
      recipe: {
        include: {
          ingredients: {
            where: { optional: false },
            include: { foodCatalogItem: true },
          },
        },
      },
    },
  });

  const inventoryMap = new Map<string, number>();
  const inventory = await prisma.inventoryItem.findMany({
    where: { householdId: HOUSEHOLD_ID },
  });
  inventory.forEach((item: { foodCatalogItemId: string; quantity: number }) => {
    const current = inventoryMap.get(item.foodCatalogItemId) || 0;
    inventoryMap.set(item.foodCatalogItemId, current + item.quantity);
  });

  let list = await prisma.shoppingList.findFirst({
    where: { householdId: HOUSEHOLD_ID, status: "active" },
  });

  if (!list) {
    list = await prisma.shoppingList.create({
      data: {
        householdId: HOUSEHOLD_ID,
        name: "Lista de compra",
        sourceType: "plan",
        status: "active",
      },
    });
  }

  const existingItems = await prisma.shoppingListItem.findMany({
    where: { shoppingListId: list.id, checked: false },
  });
  const existingLabels = new Set(existingItems.map((i) => i.label.toLowerCase()));

  const newItems = [];
  for (const entry of entries) {
    for (const ing of entry.recipe.ingredients) {
      const available = inventoryMap.get(ing.foodCatalogItemId || "") || 0;
      if (available <= 0 && !existingLabels.has(ing.nameFallback.toLowerCase())) {
        newItems.push({
          shoppingListId: list.id,
          foodCatalogItemId: ing.foodCatalogItemId,
          label: ing.nameFallback,
          quantity: ing.quantity,
          unit: ing.unit,
          category: ing.foodCatalogItem?.category || null,
          checked: false,
          sourceRecipeId: entry.recipeId,
        });
        existingLabels.add(ing.nameFallback.toLowerCase());
      }
    }
  }

  if (newItems.length > 0) {
    await prisma.shoppingListItem.createMany({ data: newItems });
  }

  const updatedList = await prisma.shoppingList.findUnique({
    where: { id: list.id },
    include: {
      items: {
        include: { foodCatalogItem: true },
        orderBy: [{ checked: "asc" }, { category: "asc" }],
      },
    },
  });

  return NextResponse.json({ list: updatedList });
}
