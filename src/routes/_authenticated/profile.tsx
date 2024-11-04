import ProfileView from '@/modules/profile';
import { getMeOptions } from '@/server/get-me.ts';
import { Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

function ProfilePage() {
  return (
    <Container px={'xs'}>
      <ProfileView />
    </Container>
  );
}

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,
  loader: async ({ context }) => {
    // await context.queryClient.ensureQueryData({
    //   ...getMeOptions({
    //     id: Number(context.authentication.session?.user?.id),
    //   }),
    // });
    await context.queryClient.prefetchQuery({
      ...getMeOptions({
        id: Number(context.authentication.session?.user?.id),
      }),
    });
  },
  // pendingComponent: () => {
  //   return <Loader size={'md'} />;
  // },

  // errorComponent: ({ error, reset }) => {
  //   const router = useRouter();
  //   const queryErrorResetBoundary = useQueryErrorResetBoundary();
  //
  //   useEffect(() => {
  //     // Reset the query error boundary
  //     queryErrorResetBoundary.reset();
  //   }, [queryErrorResetBoundary]);
  //
  //   return (
  //     <div>
  //       {error.message}
  //       <button
  //         type={'button'}
  //         onClick={() => {
  //           // Invalidate the route to reload the loader, and reset any router error boundaries
  //           router.invalidate();
  //         }}
  //       >
  //         retry
  //       </button>
  //     </div>
  //   );
  // },
});
