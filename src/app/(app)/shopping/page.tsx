"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { EmptyState } from "@/shared/ui/EmptyState";
import {
  ShoppingCart,
  Plus,
  Check,
  Trash2,
  ListFilter,
} from "lucide-react";

export default function ShoppingPage() {
  const { shoppingList, toggleShoppingItem, addShoppingItem, removeShoppingItem } = useAppStore();
  const [newLabel, setNewLabel] = useState("");
  const [newQuantity, setNewQuantity] = useState("1");
  const [newUnit, setNewUnit] = useState("unidad");
  const [groupByCategory, setGroupByCategory] = useState(true);

  const unchecked = shoppingList.filter((item) => !item.checked);
  const checked = shoppingList.filter((item) => item.checked);

  const groupedItems = useMemo(() => {
    if (!groupByCategory) return { "Sin categoría": unchecked };
    const groups: Record<string, typeof unchecked> = {};
    unchecked.forEach((item) => {
      const cat = item.category || "Sin categoría";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [unchecked, groupByCategory]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;
    addShoppingItem({
      label: newLabel.trim(),
      quantity: parseFloat(newQuantity) || 1,
      unit: newUnit,
      category: undefined,
      checked: false,
      shoppingListId: "list-default",
    });
    setNewLabel("");
    setNewQuantity("1");
  };

  const handleClearChecked = () => {
    checked.forEach((item) => removeShoppingItem(item.id));
  };

  if (shoppingList.length === 0) {
    return (
      <div className="px-4 pt-6 pb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Compra</h1>
        <EmptyState
          icon={ShoppingCart}
          title="Lista de compra vacía"
          description="Añade productos manualmente o genera la lista desde tu plan semanal"
        />
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-text-primary">Compra</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setGroupByCategory(!groupByCategory)}
            className={`rounded-full ${groupByCategory ? "text-accent" : ""}`}
          >
            <ListFilter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <Input
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Añadir producto..."
          className="flex-1"
        />
        <div className="flex gap-1">
          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            className="w-14 h-11 px-2 rounded-lg border border-border bg-surface text-text-primary text-sm text-center focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            min="0"
            step="0.1"
          />
          <Button type="submit" size="sm" className="rounded-lg">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {unchecked.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide mb-2">
            Por comprar ({unchecked.length})
          </p>
          <div className="flex flex-col gap-1">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category}>
                {groupByCategory && (
                  <p className="text-xs text-text-tertiary px-3 py-1.5">{category}</p>
                )}
                {items.map((item) => (
                  <Card
                    key={item.id}
                    variant="default"
                    className="py-3 px-4 flex items-center gap-3"
                  >
                    <button
                      onClick={() => toggleShoppingItem(item.id)}
                      className="w-5 h-5 rounded-full border-2 border-border hover:border-accent flex items-center justify-center flex-shrink-0 transition-colors"
                    >
                      <Check className="w-3 h-3 text-transparent" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary">{item.label}</p>
                    </div>
                    <span className="text-sm text-text-tertiary flex-shrink-0">
                      {item.quantity} {item.unit}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeShoppingItem(item.id)}
                      className="rounded-full w-7 h-7 p-0 flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-text-tertiary" />
                    </Button>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {checked.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-text-tertiary uppercase tracking-wide">
              Comprado ({checked.length})
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChecked}
              className="text-xs"
            >
              Limpiar
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            {checked.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-2.5 px-4 opacity-50"
              >
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-text-inverse" />
                </div>
                <span className="text-sm text-text-primary line-through flex-1">
                  {item.label}
                </span>
                <span className="text-sm text-text-tertiary">
                  {item.quantity} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
