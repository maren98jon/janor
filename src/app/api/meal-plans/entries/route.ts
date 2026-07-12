import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const entry = await prisma.mealPlanEntry.create({
    data: {
      mealPlanId: body.mealPlanId,
      date: new Date(body.date),
      slot: body.slot,
      recipeId: body.recipeId,
      servings: body.servings || 4,
      notes: body.notes || null,
    },
    include: { recipe: true },
  });

  return NextResponse.json({ entry }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  await prisma.mealPlanEntry.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
