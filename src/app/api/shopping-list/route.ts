import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function GET() {
  const list = await prisma.shoppingList.findFirst({
    where: { householdId: HOUSEHOLD_ID, status: "active" },
    include: {
      items: {
        include: { foodCatalogItem: true },
        orderBy: [{ checked: "asc" }, { category: "asc" }],
      },
    },
  });

  return NextResponse.json({ list });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const list = await prisma.shoppingList.create({
    data: {
      householdId: HOUSEHOLD_ID,
      name: body.name || "Lista de compra",
      sourceType: body.sourceType || "manual",
      status: "active",
    },
  });

  return NextResponse.json({ list }, { status: 201 });
}
