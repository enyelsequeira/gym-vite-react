import ProfileLayout from '@/modules/layouts/authenticated-layout.tsx';
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';

const AuthenticatedRoues = () => {
  return (
    <ProfileLayout>
      <Outlet />
    </ProfileLayout>
  );
};

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context }) => {
    if (!context.authentication.session.user) {
      throw redirect({
        to: '/login',
      });
    }
  },
  component: AuthenticatedRoues,
});
