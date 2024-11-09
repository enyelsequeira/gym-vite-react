import { GET_ALL_USERS, type GetAllUsers } from '@/modules/users/queries/get-user';
import { API } from '@/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

export type CreateUserRequest = Omit<
  GetAllUsers,
  'id' | 'createdAt' | 'updatedAt' | 'dateOfBirth'
> & {
  password: string;
  dateOfBirth?: string | Date;
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
          .json<GetAllUsers>();
      } catch (error) {
        console.error('User creation error:', error);
        throw error;
      }
    },
    onMutate: async (newUser: CreateUserRequest) => {
      await queryClient.cancelQueries({ queryKey: [GET_ALL_USERS] });
      const previousUsers = queryClient.getQueryData<GetAllUsers[]>([GET_ALL_USERS]);

      const optimisticUser: GetAllUsers = {
        id: -1, // Temporary ID for optimistic entry
        username: newUser.username,
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        type: newUser.type,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        gender: newUser.gender ?? null,
        height: newUser.height,
        weight: newUser.weight,
        targetWeight: newUser.targetWeight,
        country: newUser.country,
        city: newUser.city,
        phone: newUser.phone,
        occupation: newUser.occupation,
        dateOfBirth: newUser.dateOfBirth
          ? dayjs(newUser.dateOfBirth).format('YYYY-MM-DD')
          : undefined,
        activityLevel: newUser.activityLevel,
      };

      queryClient.setQueryData<GetAllUsers[]>([GET_ALL_USERS], (old) =>
        old ? [optimisticUser, ...old] : [optimisticUser]
      );

      return { previousUsers };
    },
    onError: (error, _, context) => {
      console.error('Error creating user:', error);
      if (context?.previousUsers) {
        queryClient.setQueryData([GET_ALL_USERS], context.previousUsers);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData<GetAllUsers[]>([GET_ALL_USERS], (old) => {
        if (!old) return [data];
        return [data, ...old.filter((user) => user.id !== -1)];
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] });
    },
  });
};
