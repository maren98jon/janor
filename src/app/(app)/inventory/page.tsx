"use client";

import { useState, useMemo } from "react";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Sheet } from "@/shared/ui/Sheet";
import { AddItemForm } from "@/features/inventory/presentation/AddItemForm";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Package, Search, Filter, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { InventoryStatus } from "@/shared/types";

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

function statusBadge(status: InventoryStatus) {
  const config = {
    fresh: { variant: "success" as const, label: "Fresco" },
    use_soon: { variant: "warning" as const, label: "Usar pronto" },
    critical: { variant: "danger" as const, label: "Crítico" },
    expired: { variant: "danger" as const, label: "Caducado" },
  };
  const c = config[status];
  return <Badge variant={c.variant}>{c.label}</Badge>;
}

type FilterType = "all" | "expiring" | "fridge" | "freezer" | "pantry";

export default function InventoryPage() {
  const [addSheetOpen, setAddSheetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [showFilters, setShowFilters] = useState(false);
  const { inventory, storageLocations } = useAppStore();

  const filteredItems = useMemo(() => {
    let items = [...inventory];

    if (search) {
      const q = search.toLowerCase();
      items = items.filter((item) =>
        item.foodCatalogItem?.name.toLowerCase().includes(q)
      );
    }

    if (filter === "expiring") {
      items = items.filter(
        (item) => item.status === "use_soon" || item.status === "critical"
      );
    } else if (filter === "fridge" || filter === "freezer" || filter === "pantry") {
      items = items.filter((item) => item.storageLocation?.type === filter);
    }

    items.sort((a, b) => {
      const statusOrder: Record<string, number> = { expired: 0, critical: 1, use_soon: 2, fresh: 3 };
      return (statusOrder[a.status] ?? 3) - (statusOrder[b.status] ?? 3);
    });

    return items;
  }, [inventory, search, filter]);

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "expiring", label: "Caducidad" },
    { key: "fridge", label: "Nevera" },
    { key: "freezer", label: "Congelador" },
    { key: "pantry", label: "Despensa" },
  ];

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-text-primary">Despensa</h1>
        <Button size="sm" onClick={() => setAddSheetOpen(true)} className="rounded-full">
          <Package className="w-4 h-4" />
          Añadir
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          />
        </div>
        <Button
          variant={showFilters ? "primary" : "secondary"}
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="rounded-lg"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {showFilters && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.key
                  ? "bg-accent text-text-inverse"
                  : "bg-surface border border-border text-text-secondary hover:bg-accent-subtle"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="text-sm text-text-tertiary mb-3">
        {filteredItems.length} producto{filteredItems.length !== 1 ? "s" : ""}
      </div>

      {filteredItems.length === 0 ? (
        <EmptyState
          icon={Package}
          title={search ? "Sin resultados" : "Aún no hay productos"}
          description={
            search
              ? "Prueba con otro término de búsqueda"
              : "Empieza añadiendo productos a tu despensa"
          }
          actionLabel={!search ? "Añadir primer producto" : undefined}
          onAction={!search ? () => setAddSheetOpen(true) : undefined}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/inventory/${item.id}`}
              className="block"
            >
              <Card className="flex items-center justify-between py-3 px-4 hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {(item.status === "use_soon" || item.status === "critical") && (
                    <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {item.foodCatalogItem?.name}
                    </p>
                    <p className="text-xs text-text-tertiary mt-0.5">
                      {item.quantity} {item.unit} · {item.storageLocation?.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {statusBadge(item.status)}
                  {item.expirationDate && (
                    <div className="flex items-center gap-1 text-text-tertiary">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs">{formatExpiration(item.expirationDate)}</span>
                    </div>
                  )}
                  <ArrowRight className="w-4 h-4 text-text-tertiary" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <Sheet open={addSheetOpen} onOpenChange={setAddSheetOpen} title="Añadir producto">
        <AddItemForm onClose={() => setAddSheetOpen(false)} />
      </Sheet>
    </div>
  );
}
