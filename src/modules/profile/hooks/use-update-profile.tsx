import { API } from '@/server';
import type { MeResponse } from '@/server/get-me.ts';
import { onErrorConfig, onMutateConfig, onSuccessConfig } from '@/utils/notifications-toast.tsx';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (data: Partial<MeResponse>) => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));

        return await API.url(`/users/${data?.id}`).patch(data).json();
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    onMutate: (variables) => {
      notifications.show({
        id: 'updating',
        title: `Updating Profile ${variables.id}`,
        message: 'please wait',
        position: 'bottom-center',
        ...onMutateConfig,
      });
    },
    onSuccess: (_, variables) => {
      notifications.update({
        id: 'updating',
        title: `Updated Profile ${variables.id}`,
        message: 'Updated Successfully',
        ...onSuccessConfig,
      });
    },
    onError: (_, variables) => {
      notifications.update({
        id: 'updating',
        title: `Updating ${variables.id} failed`,
        message: 'Something went wrong',
        ...onErrorConfig,
      });
    },
  });
};
