import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const location = searchParams.get("location");
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { householdId: HOUSEHOLD_ID };

  if (location) where.storageLocationId = location;
  if (status) where.status = status;
  if (search) {
    where.foodCatalogItem = { name: { contains: search, mode: "insensitive" } };
  }

  const items = await prisma.inventoryItem.findMany({
    where,
    include: {
      foodCatalogItem: true,
      storageLocation: true,
    },
    orderBy: [{ status: "asc" }, { expirationDate: "asc" }],
  });

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const item = await prisma.inventoryItem.create({
    data: {
      householdId: HOUSEHOLD_ID,
      foodCatalogItemId: body.foodCatalogItemId,
      storageLocationId: body.storageLocationId,
      quantity: body.quantity,
      unit: body.unit,
      purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
      openedDate: body.openedDate ? new Date(body.openedDate) : null,
      expirationDate: body.expirationDate ? new Date(body.expirationDate) : null,
      status: body.status || "fresh",
      isFrozen: body.isFrozen || false,
      isLeftover: body.isLeftover || false,
      notes: body.notes || null,
    },
    include: {
      foodCatalogItem: true,
      storageLocation: true,
    },
  });

  return NextResponse.json({ item }, { status: 201 });
}
