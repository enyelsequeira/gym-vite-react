import { useGetUserById } from '@/modules/users/user/queries/get-user-by-id.ts';
import UserView from '@/modules/users/user/user-view.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/$user/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useParams();
  const { data } = useGetUserById({
    id: Number(user),
  });
  console.log({ data });
  return <UserView />;
}
