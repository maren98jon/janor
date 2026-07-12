"use client";

import { useState } from "react";
import { useAppStore } from "@/shared/lib/store";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { InventoryStatus } from "@/shared/types";
import { z } from "zod";

interface AddItemFormProps {
  onClose: () => void;
}

const UNITS = [
  { value: "unidad", label: "Unidades" },
  { value: "g", label: "Gramos (g)" },
  { value: "kg", label: "Kilogramos (kg)" },
  { value: "ml", label: "Mililitros (ml)" },
  { value: "L", label: "Litros (L)" },
];

const addItemSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  quantity: z.coerce.number().min(0.1, "La cantidad debe ser mayor que 0"),
  unit: z.string().min(1, "Selecciona una unidad"),
  locationId: z.string().min(1, "Selecciona una ubicación"),
  expirationDate: z.string().optional(),
});

export function AddItemForm({ onClose }: AddItemFormProps) {
  const { foodCatalog, storageLocations, addInventoryItem } = useAppStore();
  const [selectedFood, setSelectedFood] = useState("");
  const [customName, setCustomName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unit, setUnit] = useState("unidad");
  const [locationId, setLocationId] = useState(storageLocations[0]?.id || "");
  const [expirationDate, setExpirationDate] = useState("");
  const [openedDate, setOpenedDate] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const name = selectedFood
      ? foodCatalog.find((f) => f.id === selectedFood)?.name || ""
      : customName;

    const result = addItemSchema.safeParse({
      name,
      quantity,
      unit,
      locationId,
      expirationDate: expirationDate || undefined,
    });

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const catalogId = selectedFood || `custom-${Date.now()}`;

    let status: InventoryStatus = "fresh";
    if (expirationDate) {
      const expDate = new Date(expirationDate);
      const now = new Date();
      const diff = expDate.getTime() - now.getTime();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (days <= 0) status = "expired";
      else if (days <= 2) status = "critical";
      else if (days <= 5) status = "use_soon";
    }

    addInventoryItem({
      householdId: "household-default",
      foodCatalogItemId: catalogId,
      storageLocationId: locationId,
      quantity: parseFloat(quantity) || 1,
      unit,
      purchaseDate: new Date(),
      openedDate: openedDate ? new Date() : undefined,
      expirationDate: expirationDate ? new Date(expirationDate) : undefined,
      status,
      isFrozen: false,
      isLeftover: false,
      notes: notes || undefined,
    });

    onClose();
  };

  const foodOptions = [
    { value: "", label: "Escribir nombre personalizado..." },
    ...foodCatalog.map((f) => ({ value: f.id, label: f.name })),
  ];

  const locationOptions = storageLocations.map((l) => ({
    value: l.id,
    label: l.name,
  }));

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pb-4">
      <Select
        label="Producto"
        value={selectedFood}
        onChange={(e) => {
          setSelectedFood(e.target.value);
          if (e.target.value) setCustomName("");
          setErrors({});
        }}
        options={foodOptions}
        error={errors.name}
      />

      {!selectedFood && (
        <Input
          label="Nombre del producto"
          value={customName}
          onChange={(e) => {
            setCustomName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
          placeholder="Ej: Leche de almendras"
          required
          error={errors.name}
        />
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            label="Cantidad"
            type="number"
            min="0.1"
            step="0.1"
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
              setErrors((prev) => ({ ...prev, quantity: "" }));
            }}
            error={errors.quantity}
          />
        </div>
        <div className="flex-1">
          <Select
            label="Unidad"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              setErrors((prev) => ({ ...prev, unit: "" }));
            }}
            options={UNITS}
            error={errors.unit}
          />
        </div>
      </div>

      <Select
        label="Ubicación"
        value={locationId}
        onChange={(e) => {
          setLocationId(e.target.value);
          setErrors((prev) => ({ ...prev, locationId: "" }));
        }}
        options={locationOptions}
        error={errors.locationId}
      />

      <Input
        label="Fecha de caducidad"
        type="date"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
        min={minDate}
      />

      <label className="flex items-center gap-3 py-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={openedDate}
            onChange={(e) => setOpenedDate(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-10 h-6 rounded-full bg-border peer-checked:bg-accent transition-colors" />
          <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm peer-checked:translate-x-4 transition-transform" />
        </div>
        <span className="text-sm text-text-secondary">Producto abierto</span>
      </label>

      <Input
        label="Notas (opcional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Cualquier detalle..."
      />

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button type="submit" className="flex-1">
          Añadir producto
        </Button>
      </div>
    </form>
  );
}
