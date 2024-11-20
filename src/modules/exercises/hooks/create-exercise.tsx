import { type Exercise, GET_ALL_EXERCISES } from '@/modules/exercises/queries/get-all-exercices.ts';
import { API } from '@/server';
import type { PaginatedResponse } from '@/utils/create-api-fetcher';
import { onErrorConfig } from '@/utils/notifications-toast.tsx';
import { createOptimisticEntity, updateQueryWithOptimisticData } from '@/utils/optmistic-update.ts';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CreateNewExercise = Omit<Exercise, 'createdAt' | 'updatedAt' | 'id'>;

export const createOptimisticExercise = (data: CreateNewExercise): Exercise => {
  return createOptimisticEntity<Exercise, CreateNewExercise>({
    data,
  });
};

export const useCreateNewExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-new-exercise'],
    mutationFn: async (data: CreateNewExercise) => {
      // Simulated delay for demo purposes
      await new Promise((resolve) => setTimeout(resolve, 8000));

      return API.url('/exercises')
        .post(data)
        .unauthorized(() => {
          console.log('Unauthorized');
        })
        .json<Exercise>();
    },
    onMutate: async (newExercise: CreateNewExercise) => {
      // Cancel any in-flight queries to avoid race conditions
      await queryClient.cancelQueries({ queryKey: [GET_ALL_EXERCISES] });
      // Create optimistic entry
      const optimisticExercise = createOptimisticExercise(newExercise);
      // Get all active queries for the exercise list
      const currentQueries = queryClient.getQueriesData<PaginatedResponse<Exercise>>({
        queryKey: [GET_ALL_EXERCISES],
      });
      // Store current state for potential rollback
      const snapshot = new Map(currentQueries);
      // Update cache for all active queries
      currentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;
        // Update the query cache with optimistic data
        queryClient.setQueryData(
          queryKey,
          updateQueryWithOptimisticData(oldData, optimisticExercise)
        );
      });
      return { snapshot };
    },
    onError: (_err, _newExercise, context) => {
      notifications.show({
        title: 'Error',
        message: 'New Exercise was not added',
        ...onErrorConfig,
      });

      // On error, restore all queries to their previous state
      context?.snapshot?.forEach((data, queryKey) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSuccess: (newExercise) => {
      // Get all active queries
      const currentQueries = queryClient.getQueriesData<PaginatedResponse<Exercise>>({
        queryKey: [GET_ALL_EXERCISES],
      });

      // Replace optimistic entries with real data
      currentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;

        // Update cache with real data
        queryClient.setQueryData(queryKey, {
          ...oldData,
          data: oldData.data.map((item) => (item.id < 0 ? newExercise : item)),
        });
      });
    },
  });
};
