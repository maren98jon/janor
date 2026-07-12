import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/infrastructure/persistence/api-client";

export function useMealPlan(weekStart?: string) {
  return useQuery({
    queryKey: ["meal-plan", weekStart],
    queryFn: () => api.mealPlans.get(weekStart),
  });
}

export function useCreateMealPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weekStart: string) => api.mealPlans.create(weekStart),
    onSuccess: (_, weekStart) =>
      queryClient.invalidateQueries({ queryKey: ["meal-plan", weekStart] }),
  });
}

export function useAddMealPlanEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Record<string, unknown>) => api.mealPlans.addEntry(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meal-plan"] }),
  });
}

export function useRemoveMealPlanEntry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.mealPlans.removeEntry(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meal-plan"] }),
  });
}
