async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Error desconocido" }));
    throw new Error(error.error || `Error ${res.status}`);
  }

  return res.json();
}

export const api = {
  inventory: {
    list: (params?: Record<string, string>) => {
      const qs = params ? `?${new URLSearchParams(params)}` : "";
      return apiFetch<{ items: unknown[] }>(`/api/inventory${qs}`);
    },
    create: (data: Record<string, unknown>) =>
      apiFetch<{ item: unknown }>("/api/inventory", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: Record<string, unknown>) =>
      apiFetch<{ item: unknown }>(`/api/inventory/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/inventory/${id}`, {
        method: "DELETE",
      }),
    consume: (id: string, quantity?: number) =>
      apiFetch<{ message: string }>(`/api/inventory/${id}/consume`, {
        method: "POST",
        body: JSON.stringify({ quantity }),
      }),
    move: (id: string, locationId: string) =>
      apiFetch<{ item: unknown }>(`/api/inventory/${id}/move`, {
        method: "POST",
        body: JSON.stringify({ locationId }),
      }),
    freeze: (id: string) =>
      apiFetch<{ item: unknown }>(`/api/inventory/${id}/freeze`, {
        method: "POST",
      }),
  },

  recipes: {
    list: (search?: string) => {
      const qs = search ? `?search=${encodeURIComponent(search)}` : "";
      return apiFetch<{ recipes: unknown[] }>(`/api/recipes${qs}`);
    },
    get: (id: string) =>
      apiFetch<{ recipe: unknown }>(`/api/recipes/${id}`),
    cook: (id: string) =>
      apiFetch<{ consumed: string[]; missing: string[] }>(`/api/recipes/${id}/cook`, {
        method: "POST",
      }),
  },

  mealPlans: {
    get: (weekStart?: string) => {
      const qs = weekStart ? `?weekStart=${weekStart}` : "";
      return apiFetch<{ plan: unknown | null; plans?: unknown[] }>(`/api/meal-plans${qs}`);
    },
    create: (weekStart: string) =>
      apiFetch<{ plan: unknown }>("/api/meal-plans", {
        method: "POST",
        body: JSON.stringify({ weekStart }),
      }),
    addEntry: (data: Record<string, unknown>) =>
      apiFetch<{ entry: unknown }>("/api/meal-plans/entries", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    removeEntry: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/meal-plans/entries?id=${id}`, {
        method: "DELETE",
      }),
  },

  shoppingList: {
    get: () => apiFetch<{ list: unknown | null }>("/api/shopping-list"),
    addItem: (data: Record<string, unknown>) =>
      apiFetch<{ item: unknown }>("/api/shopping-list/items", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    updateItem: (data: Record<string, unknown>) =>
      apiFetch<{ item: unknown }>("/api/shopping-list/items", {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    removeItem: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/shopping-list/items?id=${id}`, {
        method: "DELETE",
      }),
    generateFromPlan: (weekStart: string) =>
      apiFetch<{ list: unknown }>("/api/shopping-list/generate-from-plan", {
        method: "POST",
        body: JSON.stringify({ weekStart }),
      }),
  },
};
