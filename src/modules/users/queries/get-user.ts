import { type PaginationParams, createPaginatedQuery } from '@/utils/create-api-fetcher.ts';

export type User = {
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

export type UsersQueryParams = PaginationParams & {
  username?: string;
};

export const GET_ALL_USERS = 'GET_USERS';

export const useGetAllUsers = createPaginatedQuery<User, UsersQueryParams>({
  queryKey: [GET_ALL_USERS],
  endpoint: '/users',
  debounceFields: ['username'],
});
