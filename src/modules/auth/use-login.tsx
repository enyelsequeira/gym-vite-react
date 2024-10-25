import { API } from '@/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

type Login = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: Login) => {
      try {
        const res = await API.url('/login')
          .post({
            ...values,
          })
          .json();
        return res;
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    onSuccess: async () => {
      console.log('success');
      await navigate({
        to: '/',
      });
    },
  });
};

type Values = {
  username: string;
  userIdToUpdate: string;
};
export const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update'],
    mutationFn: async ({ userIdToUpdate, username }: Values) => {
      try {
        const res = await API.url(`/users/${userIdToUpdate}`)
          .patch({
            username,
          })
          .json();
        return res;
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    onSuccess: async () => {
      console.log('success');
      await queryClient.invalidateQueries({
        queryKey: ['all-user'],
      });
    },
  });
};
