import { API } from '@/server';
import { GET_ALL_FOODS, type GetAllFoods } from '@/server/foods';
import type { PaginatedResponse } from '@/utils/create-api-fetcher';
import { createOptimisticEntity, updateQueryWithOptimisticData } from '@/utils/optmistic-update.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CreateNewFoodType = Pick<
  GetAllFoods,
  | 'name'
  | 'brand'
  | 'category'
  | 'servingSize'
  | 'servingUnit'
  | 'calories'
  | 'protein'
  | 'fat'
  | 'carbs'
  | 'picture'
  | 'barcode'
>;

export const createOptimisticFood = (data: CreateNewFoodType): GetAllFoods => {
  return createOptimisticEntity<GetAllFoods, CreateNewFoodType>({
    data,
    defaultFields: {
      verified: false,
      createdBy: 0,
    },
  });
};

/**
 * Hook for creating a new food item with optimistic updates
 * Provides real-time UI feedback while the server request is processing
 */
export const useCreateNewFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-new-food'],
    mutationFn: async (data: CreateNewFoodType) => {
      // Simulated delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 8000));

      return API.url('/foods')
        .post(data)
        .unauthorized(() => {
          console.log('Unauthorized');
        })
        .json<GetAllFoods>();
    },
    onMutate: async (newFood: CreateNewFoodType) => {
      // Cancel any in-flight queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: [GET_ALL_FOODS] });
      // Create optimistic entry
      const optimisticFood = createOptimisticFood(newFood);
      // Get all active queries for the foods list
      const currentQueries = queryClient.getQueriesData<PaginatedResponse<GetAllFoods>>({
        queryKey: [GET_ALL_FOODS],
      });
      // Store current state for potential rollback
      const snapshot = new Map(currentQueries);
      // Update cache for all active queries
      currentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;
        // Update the query cache with optimistic data
        queryClient.setQueryData(queryKey, updateQueryWithOptimisticData(oldData, optimisticFood));
      });
      return { snapshot };
    },
    onError: (_err, _newFood, context) => {
      // On error, restore all queries to their previous state
      context?.snapshot?.forEach((data, queryKey) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSuccess: (newFood) => {
      // Get all active queries
      const currentQueries = queryClient.getQueriesData<PaginatedResponse<GetAllFoods>>({
        queryKey: [GET_ALL_FOODS],
      });

      // Replace optimistic entries with real data
      currentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;

        // Update cache with real data
        queryClient.setQueryData(queryKey, {
          ...oldData,
          data: oldData.data.map((item) => (item.id < 0 ? newFood : item)),
        });
      });
    },
  });
};
