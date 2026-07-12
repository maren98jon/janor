import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const item = await prisma.shoppingListItem.create({
    data: {
      shoppingListId: body.shoppingListId,
      foodCatalogItemId: body.foodCatalogItemId || null,
      label: body.label,
      quantity: body.quantity || 1,
      unit: body.unit || "unidad",
      category: body.category || null,
      checked: false,
      sourceRecipeId: body.sourceRecipeId || null,
    },
    include: { foodCatalogItem: true },
  });

  return NextResponse.json({ item }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  if (!body.id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  const item = await prisma.shoppingListItem.update({
    where: { id: body.id },
    data: {
      ...(body.checked !== undefined && { checked: body.checked }),
      ...(body.quantity !== undefined && { quantity: body.quantity }),
      ...(body.label !== undefined && { label: body.label }),
    },
    include: { foodCatalogItem: true },
  });

  return NextResponse.json({ item });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  await prisma.shoppingListItem.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
