import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const consumeQuantity = body.quantity || null;

  const item = await prisma.inventoryItem.findUnique({
    where: { id, householdId: HOUSEHOLD_ID },
  });

  if (!item) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  if (consumeQuantity && consumeQuantity < item.quantity) {
    const updated = await prisma.inventoryItem.update({
      where: { id },
      data: { quantity: item.quantity - consumeQuantity },
      include: { foodCatalogItem: true, storageLocation: true },
    });
    return NextResponse.json({ item: updated, message: "Cantidad consumida" });
  }

  await prisma.inventoryItem.delete({ where: { id } });

  return NextResponse.json({ message: "Producto consumido" });
}
