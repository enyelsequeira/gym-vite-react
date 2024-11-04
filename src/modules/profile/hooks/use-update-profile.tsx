import { API } from '@/server';
import type { MeResponse } from '@/server/get-me.ts';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';

export const useUpdateProfile = () => {
  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (data: Partial<MeResponse>) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const res = await API.url(`/users/${data?.id}`).patch(data).json();
        return res;
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
        loading: true,
        radius: 'lg',
        color: 'blue',
      });
    },
    onSuccess: (_, variables) => {
      notifications.update({
        id: 'updating',
        title: `Updated Profile ${variables.id}`,
        message: 'Updated Successfully',
        loading: false,
        icon: <IconCheck />,
        radius: 'lg',
        color: 'green',
        withBorder: false,
      });
    },
    onError: (_, variables) => {
      notifications.update({
        id: 'updating',
        title: `Updating ${variables.id} failed`,
        message: 'Something went wrong',
        loading: false,
        radius: 'lg',
        color: 'red',
      });
    },
  });
};
