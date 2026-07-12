import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/infrastructure/persistence/prisma";

const HOUSEHOLD_ID = "household-default";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const weekStart = searchParams.get("weekStart");

  if (weekStart) {
    const plan = await prisma.mealPlan.findUnique({
      where: {
        householdId_weekStartDate: {
          householdId: HOUSEHOLD_ID,
          weekStartDate: new Date(weekStart),
        },
      },
      include: {
        entries: {
          include: { recipe: { include: { ingredients: true } } },
          orderBy: [{ date: "asc" }, { slot: "asc" }],
        },
      },
    });

    return NextResponse.json({ plan });
  }

  const plans = await prisma.mealPlan.findMany({
    where: { householdId: HOUSEHOLD_ID },
    include: {
      entries: {
        include: { recipe: true },
        orderBy: [{ date: "asc" }, { slot: "asc" }],
      },
    },
    orderBy: { weekStartDate: "desc" },
  });

  return NextResponse.json({ plans });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const weekStart = new Date(body.weekStart);

  const plan = await prisma.mealPlan.upsert({
    where: {
      householdId_weekStartDate: {
        householdId: HOUSEHOLD_ID,
        weekStartDate: weekStart,
      },
    },
    update: {},
    create: {
      householdId: HOUSEHOLD_ID,
      weekStartDate: weekStart,
    },
  });

  return NextResponse.json({ plan });
}
