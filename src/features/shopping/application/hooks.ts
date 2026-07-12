import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/infrastructure/persistence/api-client";

export function useShoppingList() {
  return useQuery({
    queryKey: ["shopping-list"],
    queryFn: () => api.shoppingList.get(),
  });
}

export function useAddShoppingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.shoppingList.addItem(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });
}

export function useUpdateShoppingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.shoppingList.updateItem(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });
}

export function useRemoveShoppingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.shoppingList.removeItem(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });
}

export function useGenerateShoppingFromPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weekStart: string) => api.shoppingList.generateFromPlan(weekStart),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["shopping-list"] }),
  });
}
