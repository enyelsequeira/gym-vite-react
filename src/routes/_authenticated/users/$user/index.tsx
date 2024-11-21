import { useGetUserWeight } from '@/modules/overview/queries/get-user-weights.ts';
import UserView from '@/modules/users/user/user-view.tsx';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/users/$user/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useParams();
  const { data: weights } = useGetUserWeight({
    userId: Number(user),
  });

  console.log({ weights });
  return <UserView userId={Number(user)} />;
}
