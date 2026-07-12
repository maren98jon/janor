import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/infrastructure/persistence/api-client";

export function useRecipeList(search?: string) {
  return useQuery({
    queryKey: ["recipes", search],
    queryFn: () => api.recipes.list(search),
  });
}

export function useRecipe(id: string) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => api.recipes.get(id),
    enabled: !!id,
  });
}

export function useCookRecipe() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.recipes.cook(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });
}
