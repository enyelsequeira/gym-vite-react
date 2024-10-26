import { type AuthenticatedUser, useSession } from '@/providers/auth.tsx';
import { API } from '@/server';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';

type Login = {
  username: string;
  password: string;
};

type LoginRequest = {
  username: string;
  password: string;
};

type LoginResponse = {
  user: AuthenticatedUser;
  message: string;
};

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useLogin = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { login } = useSession();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (values: LoginRequest) => {
      try {
        return await API.url('/login')
          .post({
            ...values,
          })
          .json<LoginResponse>();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: async (response) => {
      console.log('Login successful:', response);
      if (!response.user) {
        throw new Error('Login response missing user data');
      }
      login(response.user);
      await sleep(200);
      await navigate({ to: '/' });
      await router.invalidate();
    },
    onError: async (error) => {
      console.log({ error });
      notifications.show({
        id: 'login-error',
        color: 'red',
        title: 'Login Failed',
        message: error.message,
        autoClose: 5000,
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

type LOGOUT = {
  id: string;
};
export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { logout } = useSession();
  return useMutation({
    mutationKey: ['update'],
    mutationFn: async ({ id }: LOGOUT) => {
      try {
        const res = await API.url(`/logout/${id}`).post().json();
        return res;
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    onSuccess: async () => {
      console.log('success');
      logout();
      // await router.invalidate();
      await queryClient.invalidateQueries({
        queryKey: ['all-user'],
      });
    },
  });
};
