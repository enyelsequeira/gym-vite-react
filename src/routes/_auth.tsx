import { Outlet, createFileRoute } from '@tanstack/react-router';

const AuthenticationModule = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_auth')({
  component: AuthenticationModule,
});
