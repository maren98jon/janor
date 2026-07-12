"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Sheet } from "@/shared/ui/Sheet";
import { EmptyState } from "@/shared/ui/EmptyState";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  ShoppingCart,
  Clock,
} from "lucide-react";

type MealSlot = "breakfast" | "lunch" | "dinner" | "snacks";

const SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Desayuno",
  lunch: "Comida",
  dinner: "Cena",
  snacks: "Merienda",
};

const SLOT_ORDER: MealSlot[] = ["breakfast", "lunch", "dinner", "snacks"];

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" });
}

function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function PlanPage() {
  const { mealPlan, recipes, addMealPlanEntry, removeMealPlanEntry, generateShoppingFromPlan } = useAppStore();
  const [weekStart, setWeekStart] = useState(getWeekStart(new Date()));
  const [pickerOpen, setPickerOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; slot: MealSlot } | null>(null);

  const weekDays = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  }, [weekStart]);

  const prevWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() - 7);
    setWeekStart(d);
  };

  const nextWeek = () => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + 7);
    setWeekStart(d);
  };

  const getEntriesForDay = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return mealPlan.filter((e) => e.date.toISOString().split("T")[0] === dateStr);
  };

  const handleAddMeal = (recipeId: string) => {
    if (!selectedSlot) return;
    addMealPlanEntry({
      mealPlanId: "plan-default",
      date: selectedSlot.date,
      slot: selectedSlot.slot,
      recipeId,
      servings: 4,
    });
    setPickerOpen(false);
    setSelectedSlot(null);
  };

  const handleGenerateShopping = () => {
    generateShoppingFromPlan(weekStart);
  };

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-text-primary">Plan semanal</h1>
        <Button variant="secondary" size="sm" onClick={handleGenerateShopping} className="rounded-full">
          <ShoppingCart className="w-4 h-4" />
          Generar lista
        </Button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={prevWeek} className="rounded-full w-9 h-9 p-0">
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium text-text-secondary">
          {weekStart.toLocaleDateString("es-ES", { month: "short", day: "numeric" })} -{" "}
          {new Date(weekStart.getTime() + 6 * 86400000).toLocaleDateString("es-ES", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <Button variant="ghost" size="sm" onClick={nextWeek} className="rounded-full w-9 h-9 p-0">
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {weekDays.map((day) => {
          const entries = getEntriesForDay(day);
          const today = isToday(day);

          return (
            <div key={day.toISOString()} className={today ? "" : ""}>
              <div className="flex items-center gap-2 mb-2">
                <h3
                  className={`text-sm font-semibold capitalize ${
                    today ? "text-accent" : "text-text-secondary"
                  }`}
                >
                  {formatDate(day)}
                </h3>
                {today && (
                  <span className="text-xs text-accent font-medium">Hoy</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {SLOT_ORDER.map((slot) => {
                  const entry = entries.find((e) => e.slot === slot);
                  return (
                    <Card
                      key={slot}
                      variant={entry ? "default" : "subtle"}
                      className="py-2.5 px-3 flex items-center justify-between min-h-[44px]"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Clock className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
                        {entry ? (
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {entry.recipe?.title}
                            </p>
                            <p className="text-xs text-text-tertiary">{SLOT_LABELS[slot]}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-text-tertiary">{SLOT_LABELS[slot]}</span>
                        )}
                      </div>
                      {entry ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMealPlanEntry(entry.id)}
                          className="rounded-full w-7 h-7 p-0 flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedSlot({ date: day, slot });
                            setPickerOpen(true);
                          }}
                          className="rounded-full w-7 h-7 p-0 flex-shrink-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {mealPlan.length === 0 && (
        <EmptyState
          icon={CalendarDays}
          title="Sin comidas planificadas"
          description="Pulsa el botón + para añadir una comida a tu semana"
        />
      )}

      <Sheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        title={`Añadir comida - ${selectedSlot ? SLOT_LABELS[selectedSlot.slot] : ""}`}
      >
        <div className="flex flex-col gap-2 pb-4">
          {recipes.map((recipe) => (
            <button
              key={recipe.id}
              onClick={() => handleAddMeal(recipe.id)}
              className="flex items-center justify-between py-3 px-4 rounded-lg bg-surface border border-border hover:border-accent/50 transition-colors text-left"
            >
              <div>
                <p className="text-sm font-medium text-text-primary">{recipe.title}</p>
                <p className="text-xs text-text-tertiary">
                  {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min · {recipe.servings} raciones
                </p>
              </div>
              <Plus className="w-4 h-4 text-text-tertiary" />
            </button>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
