"use client";

import { useState } from "react";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Sheet } from "@/shared/ui/Sheet";
import { AddItemForm } from "@/features/inventory/presentation/AddItemForm";
import {
  AlertTriangle,
  ChefHat,
  ShoppingCart,
  Plus,
  Clock,
  ArrowRight,
  Flame,
} from "lucide-react";
import Link from "next/link";

function formatExpiration(date: Date | undefined): string {
  if (!date) return "";
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return "Caducado";
  if (days === 0) return "Hoy";
  if (days === 1) return "Mañana";
  return `En ${days} días`;
}

export default function HomePage() {
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const { getExpiringItems, inventory, recipes, shoppingList, getMatchedRecipes } = useAppStore();
  const expiringItems = getExpiringItems(3);
  const matchedRecipes = getMatchedRecipes();
  const uncheckedShopping = shoppingList.filter((item) => !item.checked);
  const useFirstRecipes = matchedRecipes.filter((r) => r.hasSoonToExpire).slice(0, 3);
  const cookTodayRecipes = matchedRecipes.filter((r) => r.matchPercentage >= 70).slice(0, 3);

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Janor</h1>
          <p className="text-sm text-text-tertiary">Tu cocina de un vistazo</p>
        </div>
        <Button
          size="sm"
          onClick={() => setAddSheetOpen(true)}
          className="rounded-full"
        >
          <Plus className="w-4 h-4" />
          Añadir
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {expiringItems.length > 0 && (
          <Card className="border-l-4 border-l-warning">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <h2 className="text-base font-semibold text-text-primary">Caducidad próxima</h2>
              <Badge variant="warning" size="sm">
                {expiringItems.length}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              {expiringItems.slice(0, 4).map((item) => (
                <Link
                  key={item.id}
                  href={`/inventory/${item.id}`}
                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent-subtle/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        item.status === "critical" ? "bg-danger" : "bg-warning"
                      )}
                    />
                    <span className="text-sm font-medium text-text-primary">
                      {item.foodCatalogItem?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-text-tertiary" />
                    <span className="text-xs text-text-tertiary">
                      {formatExpiration(item.expirationDate)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-tertiary" />
                  </div>
                </Link>
              ))}
            </div>
            <Link href="/inventory?filter=expiring" className="mt-3 flex items-center gap-1 text-sm text-accent font-medium">
              Ver todo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        )}

        {useFirstRecipes.length > 0 && (
          <Card variant="subtle">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-accent" />
              <h2 className="text-base font-semibold text-text-primary">Usa primero</h2>
            </div>
            <p className="text-sm text-text-secondary mb-3">
              Recetas que usan productos a punto de caducar
            </p>
            <div className="flex flex-col gap-2">
              {useFirstRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-surface border border-border hover:border-accent/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">{recipe.title}</p>
                    <p className="text-xs text-text-tertiary mt-0.5">
                      {recipe.missingIngredients.length > 0
                        ? `Falta: ${recipe.missingIngredients.slice(0, 2).join(", ")}`
                        : "Tienes todo lo necesario"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-tertiary" />
                </Link>
              ))}
            </div>
          </Card>
        )}

        {cookTodayRecipes.length > 0 && (
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="w-4 h-4 text-accent" />
              <h2 className="text-base font-semibold text-text-primary">Cocina hoy</h2>
            </div>
            <div className="flex flex-col gap-2">
              {cookTodayRecipes.map((recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-accent-subtle/50 hover:bg-accent-subtle transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-text-primary">{recipe.title}</p>
                    <p className="text-xs text-accent-text mt-0.5">
                      {recipe.matchPercentage}% disponible
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-tertiary" />
                </Link>
              ))}
            </div>
          </Card>
        )}

        {uncheckedShopping.length > 0 && (
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart className="w-4 h-4 text-accent" />
              <h2 className="text-base font-semibold text-text-primary">Lista de compra</h2>
              <Badge variant="accent" size="sm">
                {uncheckedShopping.length}
              </Badge>
            </div>
            <div className="flex flex-col gap-1.5">
              {uncheckedShopping.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-1.5">
                  <div className="w-4 h-4 rounded-full border-2 border-border" />
                  <span className="text-sm text-text-primary">{item.label}</span>
                  <span className="text-xs text-text-tertiary ml-auto">
                    {item.quantity} {item.unit}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/shopping" className="mt-3 flex items-center gap-1 text-sm text-accent font-medium">
              Abrir lista <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Card>
        )}

        {expiringItems.length === 0 &&
          useFirstRecipes.length === 0 &&
          cookTodayRecipes.length === 0 &&
          uncheckedShopping.length === 0 && (
            <Card variant="subtle" className="text-center py-8">
              <p className="text-text-secondary">¡Tu cocina está en perfecto estado!</p>
              <p className="text-sm text-text-tertiary mt-1">
                Nada urgente que atender ahora mismo.
              </p>
            </Card>
          )}
      </div>

      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen} title="Añadir producto">
        <AddItemForm onClose={() => setAddSheetOpen(false)} />
      </Sheet>
    </div>
  );
}

function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
