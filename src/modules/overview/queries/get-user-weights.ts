import { useSession } from '@/providers/auth.tsx';
import { API } from '@/server/index.ts';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

export type UserWeights = {
  id: number;
  userId: number;
  weight: number;
  date: string;
  source: string;
  notes: string;
};

const USER_WEIGHTS_QUERY_KEY = ['get-user-weights'] as const;
export const getUserWeightOptions = ({ id }: { id: number }) => {
  return queryOptions({
    queryKey: [USER_WEIGHTS_QUERY_KEY, { id }],
    queryFn: async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 8000));
        return await API.get(`/users/${id}/weights`)
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json<Array<UserWeights>>();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    enabled: !!id,
  });
};

export const useGetUserWeight = () => {
  const { session } = useSession();
  return useQuery({
    ...getUserWeightOptions({ id: Number(session.user?.id) }),
  });
};

export const useGetUserWeightsSuspense = () => {
  const { session } = useSession();
  return useSuspenseQuery({
    ...getUserWeightOptions({ id: Number(session.user?.id) }),
  });
};
