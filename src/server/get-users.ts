import { API } from '@/server/index.ts';
import { queryOptions } from '@tanstack/react-query';

export const GET_USERS_QUERY_KEY = ['all-user'] as const;
export const getUserOptions = () => {
  return queryOptions({
    queryKey: [GET_USERS_QUERY_KEY],
    queryFn: async () => {
      try {
        return await API.get('/users')
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
  });
};
