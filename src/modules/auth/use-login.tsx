import { API } from '@/server';
import { useMutation } from '@tanstack/react-query';

type Login = {
  username: string;
  password: string;
};

export const useLogin = () => {
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
  });
};
