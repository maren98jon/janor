import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const item = await prisma.inventoryItem.update({
    where: { id, householdId: HOUSEHOLD_ID },
    data: {
      ...(body.quantity !== undefined && { quantity: body.quantity }),
      ...(body.unit !== undefined && { unit: body.unit }),
      ...(body.storageLocationId !== undefined && { storageLocationId: body.storageLocationId }),
      ...(body.expirationDate !== undefined && { expirationDate: body.expirationDate ? new Date(body.expirationDate) : null }),
      ...(body.status !== undefined && { status: body.status }),
      ...(body.isFrozen !== undefined && { isFrozen: body.isFrozen }),
      ...(body.isLeftover !== undefined && { isLeftover: body.isLeftover }),
      ...(body.notes !== undefined && { notes: body.notes }),
      ...(body.openedDate !== undefined && { openedDate: body.openedDate ? new Date(body.openedDate) : null }),
    },
    include: {
      foodCatalogItem: true,
      storageLocation: true,
    },
  });

  return NextResponse.json({ item });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await prisma.inventoryItem.delete({
    where: { id, householdId: HOUSEHOLD_ID },
  });

  return NextResponse.json({ success: true });
}
