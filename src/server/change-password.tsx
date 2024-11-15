import { useSession } from '@/providers/auth.tsx';
import { ME_QUERY_KEY } from '@/server/get-me.ts';
import { API } from '@/server/index.ts';
import { onErrorConfig } from '@/utils/notifications-toast.tsx';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Params = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
// path: "/users/{userId}/change-password",
export const useChangePassword = () => {
  const { session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['ChangePassword'],
    mutationFn: async ({ ...rest }: Params) => {
      const res = await API.url(`/users/${session?.user?.id}/change-password`)
        .post({
          ...rest,
        })
        .json();
      return res;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [ME_QUERY_KEY],
      });
    },
    onError: async () => {
      notifications.show({
        title: 'Password Could not be Changed',
        message: 'Failed to change password',
        ...onErrorConfig,
      });
    },
  });
};
