import { API } from '@/server/index.ts';
import { queryOptions } from '@tanstack/react-query';

export const getUserOptions = () => {
  return queryOptions({
    queryKey: ['all-user'],
    queryFn: async () => {
      try {
        const res = await API.get('/users')
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json();
        return res;
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
  });
};
