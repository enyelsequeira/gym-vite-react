import { type AuthenticatedUser, useSession } from '@/providers/auth.tsx';
import { API } from '@/server/index.ts';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';

export type MeResponse = {
  id: number;
  username: string;
  name: string;
  lastName: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  height: number;
  weight: number;
  targetWeight: number;
  dateOfBirth?: number | Date;
  gender: string;
  activityLevel: string;
  country?: string;
  city?: string;
  phone?: string;
  occupation?: string;
  firstLogin: boolean;
};

export const ME_QUERY_KEY = ['get-me'] as const;

export const getMeOptions = ({ id }: Pick<AuthenticatedUser, 'id'>) => {
  return queryOptions({
    queryKey: [ME_QUERY_KEY, { id }],
    queryFn: async () => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 8000));
        return await API.get('/users/me')
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json<MeResponse>();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    enabled: !!id,
  });
};

export const useGetMe = () => {
  const { session } = useSession();
  return useQuery({
    ...getMeOptions({ id: Number(session.user?.id) }),
  });
};

export const useGetMeSuspenseQuery = () => {
  const { session } = useSession();
  return useSuspenseQuery({
    ...getMeOptions({ id: Number(session.user?.id) }),
  });
};
