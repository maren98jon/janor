import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const recipe = await prisma.recipe.findUnique({
    where: { id, householdId: HOUSEHOLD_ID },
    include: {
      ingredients: {
        include: { foodCatalogItem: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!recipe) {
    return NextResponse.json({ error: "Receta no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ recipe });
}
