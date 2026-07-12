"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { BookOpen, Search, Clock, Flame, ChefHat } from "lucide-react";
import Link from "next/link";

type TabType = "all" | "available" | "use-first";

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { getMatchedRecipes, recipes } = useAppStore();

  const matchedRecipes = getMatchedRecipes();

  const filteredRecipes = useMemo(() => {
    let items = matchedRecipes;

    if (activeTab === "available") {
      items = items.filter((r) => r.matchPercentage === 100);
    } else if (activeTab === "use-first") {
      items = items.filter((r) => r.hasSoonToExpire);
    }

    if (search) {
      const q = search.toLowerCase();
      items = items.filter((r) => r.title.toLowerCase().includes(q));
    }

    return items;
  }, [matchedRecipes, activeTab, search]);

  const tabs: { key: TabType; label: string }[] = [
    { key: "all", label: "Todas" },
    { key: "available", label: "Disponibles" },
    { key: "use-first", label: "Usa primero" },
  ];

  if (recipes.length === 0) {
    return (
      <div className="px-4 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Recetas</h1>
        <EmptyState
          icon={BookOpen}
          title="Aún no hay recetas"
          description="Añade tus recetas favoritas para empezar a combinarlas con tu despensa"
        />
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-text-primary">Recetas</h1>
        <Badge variant="accent" size="sm">
          {recipes.length}
        </Badge>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.key
                ? "bg-accent text-text-inverse"
                : "bg-surface border border-border text-text-secondary hover:bg-accent-subtle"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredRecipes.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title="Sin recetas que coincidan"
          description={
            activeTab === "available"
              ? "Aún no tienes todos los ingredientes para ninguna receta"
              : "Ninguna receta usa productos a punto de caducar"
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <Card className="hover:border-accent/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-text-primary truncate">
                        {recipe.title}
                      </h3>
                      {recipe.hasSoonToExpire && (
                        <Flame className="w-4 h-4 text-warning flex-shrink-0" />
                      )}
                    </div>
                    {recipe.description && (
                      <p className="text-sm text-text-tertiary line-clamp-2 mb-2">
                        {recipe.description}
                      </p>
                    )}
                    <div className="flex items-center gap-3 text-xs text-text-tertiary">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                      </div>
                      <div className="flex items-center gap-1">
                        <ChefHat className="w-3.5 h-3.5" />
                        {recipe.servings} raciones
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div
                      className={`text-lg font-bold ${
                        recipe.matchPercentage === 100
                          ? "text-success"
                          : recipe.matchPercentage >= 70
                          ? "text-warning"
                          : "text-text-tertiary"
                      }`}
                    >
                      {recipe.matchPercentage}%
                    </div>
                    <p className="text-xs text-text-tertiary">disponible</p>
                  </div>
                </div>
                {recipe.missingIngredients.length > 0 && recipe.matchPercentage < 100 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-text-tertiary">
                      Falta: {recipe.missingIngredients.slice(0, 3).join(", ")}
                      {recipe.missingIngredients.length > 3 &&
                        ` +${recipe.missingIngredients.length - 3}`}
                    </p>
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
