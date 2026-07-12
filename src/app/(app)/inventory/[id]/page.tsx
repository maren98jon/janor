"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppStore } from "@/shared/lib/store";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { Sheet } from "@/shared/ui/Sheet";
import {
  ArrowLeft,
  Trash2,
  Snowflake,
  MoveRight,
  UtensilsCrossed,
  ShoppingCart,
  Clock,
  MapPin,
  Pencil,
} from "lucide-react";
import { useState } from "react";
import { AddItemForm } from "@/features/inventory/presentation/AddItemForm";

function formatExpiration(date: Date | undefined): string {
  if (!date) return "Sin fecha de caducidad";
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return `Caducó hace ${Math.abs(days)} día${Math.abs(days) !== 1 ? "s" : ""}`;
  if (days === 0) return "Caduca hoy";
  if (days === 1) return "Caduca mañana";
  return `Caduca en ${days} día${days !== 1 ? "s" : ""}`;
}

export default function InventoryItemPage() {
  const params = useParams();
  const router = useRouter();
  const { inventory, deleteInventoryItem, consumeInventoryItem, updateInventoryItem, moveInventoryItem, addInventoryItemToShopping, storageLocations } = useAppStore();
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [moveSheetOpen, setMoveSheetOpen] = useState(false);
  const [discardConfirmOpen, setDiscardConfirmOpen] = useState(false);

  const item = inventory.find((i) => i.id === params.id);

  if (!item) {
    return (
      <div className="px-4 pt-6 pb-8">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4 -ml-2">
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <p className="text-text-secondary text-center py-8">Producto no encontrado</p>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    fresh: "bg-success",
    use_soon: "bg-warning",
    critical: "bg-danger",
    expired: "bg-danger",
  };

  const statusLabels: Record<string, string> = {
    fresh: "Fresco",
    use_soon: "Usar pronto",
    critical: "Crítico",
    expired: "Caducado",
  };

  const handleConsume = () => {
    consumeInventoryItem(item.id);
    router.back();
  };

  const handleDiscard = () => {
    deleteInventoryItem(item.id);
    router.back();
  };

  const handleFreeze = () => {
    updateInventoryItem(item.id, { isFrozen: true });
  };

  const handleMove = (locationId: string) => {
    moveInventoryItem(item.id, locationId);
    setMoveSheetOpen(false);
  };

  const handleBuyMore = () => {
    addInventoryItemToShopping(item.id);
  };

  return (
    <div className="px-4 pt-6 pb-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="rounded-full w-9 h-9 p-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold text-text-primary flex-1 truncate">
          {item.foodCatalogItem?.name}
        </h1>
        <Button variant="ghost" size="sm" onClick={() => setEditSheetOpen(true)} className="rounded-full w-9 h-9 p-0">
          <Pencil className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${statusColors[item.status]}`} />
            <div>
              <p className="text-base font-semibold text-text-primary">
                {item.quantity} {item.unit}
              </p>
              <p className="text-sm text-text-tertiary">
                {item.storageLocation?.name}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-text-tertiary" />
              <span className="text-text-secondary">{formatExpiration(item.expirationDate)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-text-tertiary" />
              <span className="text-text-secondary">{item.storageLocation?.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${statusColors[item.status]}`} />
              <span className="text-text-secondary">{statusLabels[item.status]}</span>
            </div>
            {item.isFrozen && (
              <div className="flex items-center gap-2 text-sm">
                <Snowflake className="w-4 h-4 text-accent" />
                <span className="text-accent-text">Congelado</span>
              </div>
            )}
            {item.notes && (
              <p className="text-sm text-text-tertiary pt-2 border-t border-border">
                {item.notes}
              </p>
            )}
          </div>
        </Card>

        <Card>
          <p className="text-sm font-medium text-text-secondary mb-3">Acciones</p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" onClick={handleConsume} className="justify-start">
              <UtensilsCrossed className="w-4 h-4" />
              Consumir
            </Button>
            <Button variant="secondary" size="sm" onClick={handleFreeze} className="justify-start">
              <Snowflake className="w-4 h-4" />
              Congelar
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setMoveSheetOpen(true)} className="justify-start">
              <MoveRight className="w-4 h-4" />
              Mover
            </Button>
            <Button variant="secondary" size="sm" onClick={handleBuyMore} className="justify-start">
              <ShoppingCart className="w-4 h-4" />
              Comprar más
            </Button>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <Button variant="danger" size="sm" onClick={() => setDiscardConfirmOpen(true)} className="w-full justify-start">
              <Trash2 className="w-4 h-4" />
              Desechar
            </Button>
          </div>
        </Card>
      </div>

      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen} title="Editar producto">
        <AddItemForm onClose={() => setEditSheetOpen(false)} />
      </Sheet>

      <Sheet open={moveSheetOpen} onOpenChange={setMoveSheetOpen} title="Mover a">
        <div className="flex flex-col gap-2 pb-4">
          {storageLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => handleMove(loc.id)}
              className={`flex items-center justify-between py-3 px-4 rounded-lg border transition-colors text-left ${
                loc.id === item.storageLocationId
                  ? "bg-accent-subtle border-accent"
                  : "bg-surface border-border hover:border-accent/50"
              }`}
            >
              <span className="text-sm font-medium text-text-primary">{loc.name}</span>
              {loc.id === item.storageLocationId && (
                <span className="text-xs text-accent">Actual</span>
              )}
            </button>
          ))}
        </div>
      </Sheet>

      <Sheet open={discardConfirmOpen} onOpenChange={setDiscardConfirmOpen} title="Desechar producto">
        <div className="flex flex-col gap-4 pb-4">
          <p className="text-sm text-text-secondary">
            ¿Seguro que quieres desechar <strong>{item.foodCatalogItem?.name}</strong>? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setDiscardConfirmOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDiscard} className="flex-1">
              Desechar
            </Button>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
