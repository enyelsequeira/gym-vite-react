import { GET_ALL_USERS, type User } from '@/modules/users/queries/get-user';
import { API } from '@/server';
import type { PaginatedResponse } from '@/utils/create-api-fetcher.ts';
import { onErrorConfig } from '@/utils/notifications-toast.tsx';
import { createOptimisticEntity, updateQueryWithOptimisticData } from '@/utils/optmistic-update.ts';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CreateUserRequest = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'dateOfBirth'> & {
  password: string;
  dateOfBirth?: string | Date;
};
type OptimisticUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export const createOptimisticUser = (data: CreateUserRequest): User => {
  const processedData: OptimisticUserData = {
    ...data,
    dateOfBirth:
      data.dateOfBirth instanceof Date ? data.dateOfBirth.toISOString() : data.dateOfBirth,
  };
  return createOptimisticEntity<User, OptimisticUserData>({
    data: processedData,
    dateFields: ['dateOfBirth'],
    defaultFields: {},
  });
};

export const useCreateNewUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-new-user'],
    mutationFn: async (data: CreateUserRequest) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 8000));

        return await API.url('/users/create')
          .post({
            ...data,
          })
          .unauthorized(() => {
            throw new Error('Unauthorized access');
          })
          .json<User>();
      } catch (error) {
        console.error('User creation error:', error);
        throw error;
      }
    },
    onMutate: async (newUser: CreateUserRequest) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USERS] });

      const optimisticUser = createOptimisticUser(newUser);

      const currentQueries = queryClient.getQueriesData<PaginatedResponse<User>>({
        queryKey: [GET_ALL_USERS],
      });

      const snapShot = new Map(currentQueries);

      currentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;
        queryClient.setQueryData(queryKey, updateQueryWithOptimisticData(oldData, optimisticUser));
      });
      return { snapShot };
    },
    onError: (_err, _, context) => {
      notifications.show({
        title: 'Error',
        message: 'New User was not added',
        ...onErrorConfig,
      });
      context?.snapShot?.forEach((data, queryKey) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSuccess: (newUser) => {
      const currentQueries = queryClient.getQueriesData<PaginatedResponse<User>>({
        queryKey: [GET_ALL_USERS],
      });
      currentQueries.forEach(([queryKey, oldData]) => {
        if (!oldData) return;
        queryClient.setQueryData(queryKey, {
          ...oldData,
          data: oldData.data.map((item) => (item.id < 0 ? newUser : item)),
        });
      });
    },
  });
};
