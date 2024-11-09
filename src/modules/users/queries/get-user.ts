import { API } from '@/server/index.ts';
import { queryOptions, useQuery } from '@tanstack/react-query';

export type GetAllUsers = {
  id: number;
  username: string;
  name: string;
  lastName: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  height?: number;
  weight?: number;
  targetWeight?: number;
  country?: string;
  city?: string;
  phone?: string;
  occupation?: string;
  dateOfBirth?: string;
  gender: any;
  activityLevel?: string;
};

export const GET_ALL_USERS = 'GET_USERS' as const;

export const getAllUserOptions = () => {
  return queryOptions({
    queryKey: [GET_ALL_USERS],
    queryFn: async () => {
      try {
        return await API.get('/users')
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json<Array<GetAllUsers>>();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    ...getAllUserOptions(),
  });
};
