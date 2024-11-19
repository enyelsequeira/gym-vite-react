import type {AuthenticatedUser} from '@/providers/auth.tsx';
import {API} from '@/server';
import type {MeResponse} from '@/server/get-me.ts';
import {queryOptions, useQuery, useSuspenseQuery} from '@tanstack/react-query';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';

export const getUserById = ({ id }: Pick<AuthenticatedUser, 'id'>) => {
  return queryOptions({
    queryKey: [GET_USER_BY_ID, { id }],
    queryFn: async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 8000));
        return await API.get(`/users/${id}/info`).json<MeResponse>();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    enabled: !!id,
  });
};

export const useGetUserById = ({ id }: Pick<AuthenticatedUser, 'id'>) => {
  return useQuery({
    ...getUserById({ id }),
  });
};

export const useGetUserByIdSuspenseQuery = ({ id }: Pick<AuthenticatedUser, 'id'>) => {
  return            useSuspenseQuery({
    ...getUserById({ id }),
  });
};
