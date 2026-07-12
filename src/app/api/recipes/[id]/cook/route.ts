import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id, householdId: HOUSEHOLD_ID },
    include: {
      ingredients: { where: { optional: false } },
    },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Receta no encontrada" }, { status: 404 });
  }

  const inventoryMap = new Map<string, Array<{ id: string; quantity: number }>>();
  const allInventory = await prisma.inventoryItem.findMany({
    where: { householdId: HOUSEHOLD_ID },
  });

  allInventory.forEach((item) => {
    if (!inventoryMap.has(item.foodCatalogItemId)) {
      inventoryMap.set(item.foodCatalogItemId, []);
    }
    inventoryMap.get(item.foodCatalogItemId)!.push({ id: item.id, quantity: item.quantity });
  });

  const consumed: string[] = [];
  const missing: string[] = [];
  const updates: { id: string; quantity: number }[] = [];
  const toDelete: string[] = [];

  for (const ing of recipe.ingredients) {
    const items = inventoryMap.get(ing.foodCatalogItemId || "") || [];
    let needed = ing.quantity;

    for (const item of items) {
      if (needed <= 0) break;
      if (item.quantity >= needed) {
        updates.push({ id: item.id, quantity: item.quantity - needed });
        needed = 0;
      } else {
        toDelete.push(item.id);
        needed -= item.quantity;
      }
    }

    if (needed > 0) {
      missing.push(ing.nameFallback);
    } else {
      consumed.push(ing.nameFallback);
    }
  }

  for (const itemId of toDelete) {
    await prisma.inventoryItem.delete({ where: { id: itemId } });
  }

  for (const update of updates) {
    await prisma.inventoryItem.update({
      where: { id: update.id },
      data: { quantity: update.quantity },
    });
  }

  return NextResponse.json({ consumed, missing });
}
