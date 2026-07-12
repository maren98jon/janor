import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = await prisma.inventoryItem.update({
    where: { id, householdId: HOUSEHOLD_ID },
    data: { isFrozen: true },
    include: { foodCatalogItem: true, storageLocation: true },
  });

  return NextResponse.json({ item });
}
