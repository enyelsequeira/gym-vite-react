import ProfileView from '@/modules/profile';
import { getMeOptions } from '@/server/get-me.ts';
import { Container } from '@mantine/core';
import { createFileRoute, redirect } from '@tanstack/react-router';

function ProfilePage() {
  return (
    <Container px={'xs'}>
      <ProfileView />
    </Container>
  );
}

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,

  beforeLoad: async ({ context }) => {
    const data = await context.queryClient.fetchQuery({
      ...getMeOptions({ id: context?.authentication?.session?.user?.id as number }),
    });

    if (data.firstLogin && data?.type === 'USER') {
      throw redirect({
        to: '/change-password',
      });
    }
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      ...getMeOptions({
        id: Number(context.authentication.session?.user?.id),
      }),
    });
  },
});
