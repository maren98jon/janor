import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { householdId: HOUSEHOLD_ID };
  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  const recipes = await prisma.recipe.findMany({
    where,
    include: {
      ingredients: {
        include: { foodCatalogItem: true },
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ recipes });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const recipe = await prisma.recipe.create({
    data: {
      householdId: HOUSEHOLD_ID,
      title: body.title,
      description: body.description || null,
      servings: body.servings || 4,
      prepTimeMinutes: body.prepTimeMinutes || 0,
      cookTimeMinutes: body.cookTimeMinutes || 0,
      tags: body.tags || [],
      instructions: body.instructions,
      ingredients: {
        create: (body.ingredients || []).map((ing: Record<string, unknown>, i: number) => ({
          foodCatalogItemId: ing.foodCatalogItemId || null,
          nameFallback: ing.nameFallback,
          quantity: ing.quantity || 1,
          unit: ing.unit || "unidad",
          optional: ing.optional || false,
          sortOrder: i,
        })),
      },
    },
    include: {
      ingredients: { include: { foodCatalogItem: true } },
    },
  });

  return NextResponse.json({ recipe }, { status: 201 });
}
