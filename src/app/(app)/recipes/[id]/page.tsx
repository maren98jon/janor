"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Sheet } from "@/shared/ui/Sheet";
import {
  ArrowLeft,
  Clock,
  ChefHat,
  Users,
  Check,
  X,
  ShoppingCart,
  CalendarDays,
  Flame,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { recipes, addShoppingItem, cookRecipe, addMealPlanEntry, mealPlan, storageLocations } = useAppStore();
  const [cooking, setCooking] = useState(false);
  const [cookConfirmOpen, setCookConfirmOpen] = useState(false);
  const [cookResult, setCookResult] = useState<{ consumed: string[]; missing: string[] } | null>(null);
  const [planSheetOpen, setPlanSheetOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; slot: string } | null>(null);

  const recipe = recipes.find((r) => r.id === params.id);

  if (!recipe) {
    return (
      <div className="px-4 pt-6 pb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <p className="text-text-secondary text-center py-8">Receta no encontrada</p>
      </div>
    );
  }

  const ingredients = recipe.ingredients || [];
  const inventoryMap = new Map<string, number>();

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const handleAddMissingToShopping = () => {
    ingredients.forEach((ing) => {
      if (ing.optional) return;
      const available = inventoryMap.get(ing.foodCatalogItemId || "") || 0;
      if (available <= 0) {
        addShoppingItem({
          label: ing.nameFallback,
          quantity: ing.quantity,
          unit: ing.unit,
          category: ing.foodCatalogItem?.category,
          checked: false,
          sourceRecipeId: recipe.id,
          foodCatalogItemId: ing.foodCatalogItemId || undefined,
          shoppingListId: "list-default",
        });
      }
    });
  };

  const handleCook = async () => {
    const result = await cookRecipe(recipe.id);
    setCookResult(result);
    setCooking(false);
  };

  const mealSlots = [
    { slot: "breakfast", label: "Desayuno" },
    { slot: "lunch", label: "Comida" },
    { slot: "dinner", label: "Cena" },
    { slot: "snacks", label: "Merienda" },
  ];

  const today = new Date();
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    weekDays.push(d);
  }

  const handlePlanMeal = (date: Date, slot: string) => {
    addMealPlanEntry({
      mealPlanId: "plan-default",
      date,
      slot: slot as "breakfast" | "lunch" | "dinner" | "snacks",
      recipeId: recipe.id,
      servings: recipe.servings,
    });
    setPlanSheetOpen(false);
  };

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="rounded-full w-9 h-9 p-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-text-primary flex-1">{recipe.title}</h1>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-text-tertiary" />
              <span>{totalTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-text-tertiary" />
              <span>{recipe.servings} raciones</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ChefHat className="w-4 h-4 text-text-tertiary" />
              <span>Prep {recipe.prepTimeMinutes} min</span>
            </div>
          </div>

          {recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {recipe.tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-text-primary">Ingredientes</h2>
            <Button variant="ghost" size="sm" onClick={handleAddMissingToShopping} className="text-xs">
              <ShoppingCart className="w-3.5 h-3.5" />
              Añadir faltantes
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {ingredients.map((ing) => {
              const available = inventoryMap.get(ing.foodCatalogItemId || "") || 0;
              const hasEnough = available >= ing.quantity;
              const isMissing = !ing.optional && available <= 0;

              return (
                <div
                  key={ing.id}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg ${
                    isMissing ? "bg-danger-subtle/50" : hasEnough ? "bg-success-subtle/30" : "bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    {hasEnough ? (
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                    ) : isMissing ? (
                      <X className="w-4 h-4 text-danger flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-warning flex-shrink-0" />
                    )}
                    <span className="text-sm text-text-primary truncate">
                      {ing.nameFallback}
                    </span>
                  </div>
                  <span className="text-sm text-text-tertiary flex-shrink-0 ml-2">
                    {ing.quantity} {ing.unit}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {recipe.description && (
          <Card>
            <p className="text-sm text-text-secondary">{recipe.description}</p>
          </Card>
        )}

        <Card>
          <h2 className="text-base font-semibold text-text-primary mb-3">Preparación</h2>
          <div className="flex flex-col gap-4">
            {recipe.instructions.split("\n").map((step, i) => {
              const text = step.replace(/^\d+\.\s*/, "");
              if (!text.trim()) return null;
              return (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent-subtle text-accent-text text-xs font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1">{text}</p>
                </div>
              );
            })}
          </div>
        </Card>

        {cookResult && (
          <Card variant={cookResult.missing.length > 0 ? "subtle" : "default"}>
            <div className="flex items-center gap-2 mb-2">
              {cookResult.missing.length > 0 ? (
                <AlertCircle className="w-4 h-4 text-warning" />
              ) : (
                <Check className="w-4 h-4 text-success" />
              )}
              <h3 className="text-sm font-semibold text-text-primary">
                {cookResult.missing.length > 0 ? "Cocinado con faltantes" : "¡Receta cocinada!"}
              </h3>
            </div>
            <p className="text-xs text-text-secondary mb-1">
              Usado: {cookResult.consumed.join(", ")}
            </p>
            {cookResult.missing.length > 0 && (
              <p className="text-xs text-warning-text">
                Faltaba: {cookResult.missing.join(", ")}
              </p>
            )}
          </Card>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => setPlanSheetOpen(true)}
          >
            <CalendarDays className="w-4 h-4" />
            Planificar
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              setCooking(true);
              setCookConfirmOpen(true);
            }}
          >
            <ChefHat className="w-4 h-4" />
            {cooking ? "Cocinando..." : "Empezar a cocinar"}
          </Button>
        </div>
      </div>

      <Sheet open={cookConfirmOpen} onOpenChange={setCookConfirmOpen} title="Confirmar cocción">
        <div className="flex flex-col gap-4 pb-4">
          <p className="text-sm text-text-secondary">
            Se descontarán los siguientes ingredientes de tu despensa:
          </p>
          <div className="flex flex-col gap-2">
            {ingredients.filter((i) => !i.optional).map((ing) => {
              const available = inventoryMap.get(ing.foodCatalogItemId || "") || 0;
              const hasEnough = available >= ing.quantity;
              return (
                <div key={ing.id} className="flex items-center justify-between py-2">
                  <span className="text-sm text-text-primary">{ing.nameFallback}</span>
                  <span className={`text-sm ${hasEnough ? "text-success" : "text-danger"}`}>
                    {ing.quantity} {ing.unit}
                    {!hasEnough && " (falta)"}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setCookConfirmOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleCook} className="flex-1">
              Confirmar
            </Button>
          </div>
        </div>
      </Sheet>

      <Sheet open={planSheetOpen} onOpenChange={setPlanSheetOpen} title="Planificar comida">
        <div className="flex flex-col gap-4 pb-4">
          {weekDays.map((day) => (
            <div key={day.toISOString()}>
              <p className="text-xs font-medium text-text-tertiary mb-2 capitalize">
                {day.toLocaleDateString("es-ES", { weekday: "long", day: "numeric" })}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {mealSlots.map((ms) => (
                  <button
                    key={ms.slot}
                    onClick={() => handlePlanMeal(day, ms.slot)}
                    className="py-2.5 px-3 rounded-lg bg-surface border border-border hover:border-accent/50 transition-colors text-left"
                  >
                    <p className="text-sm font-medium text-text-primary">{ms.label}</p>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Sheet>
    </div>
  );
}
