import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/infrastructure/persistence/api-client";

export function useInventoryList(params?: Record<string, string>) {
  return useQuery({
    queryKey: ["inventory", params],
    queryFn: () => api.inventory.list(params),
  });
}

export function useAddInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.inventory.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useUpdateInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Record<string, unknown>) =>
      api.inventory.update(id as string, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useDeleteInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.inventory.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useConsumeInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity?: number }) =>
      api.inventory.consume(id, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useMoveInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, locationId }: { id: string; locationId: string }) =>
      api.inventory.move(id, locationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

export function useFreezeInventoryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.inventory.freeze(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}
