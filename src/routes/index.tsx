import { useLogout, useUpdate } from '@/modules/auth/use-login.tsx';
import { useSession } from '@/providers/auth.tsx';
import { getUserOptions } from '@/server/get-users.ts';
import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
  const { session } = useSession();
  const { data: users } = useQuery({
    ...getUserOptions(),
  });
  const logout = useLogout();
  const { mutate, isPending } = useUpdate();
  console.log({ users });

  // let get the cookie
  console.log({
    session,
  });

  return (
    <>
      <Button
        loading={isPending}
        onClick={() => {
          mutate({
            username: 'one',
            userIdToUpdate: '4',
          });
        }}
      >
        Mutate
      </Button>{' '}
      <Button
        loading={isPending}
        onClick={() => {
          logout.mutate(
            {
              id: `${session.user?.id}`,
            },
            {
              onSuccess: () => {
                // window.location.reload();
              },
            }
          );
        }}
      >
        LOGOUT
      </Button>
      {/*<Box px={{ lg: 80 }}>*/}
      {/*  <Hero />*/}
      {/*</Box>*/}
      {/*<Features />*/}
      {/*<Pricing />*/}
      {/*<Testimonials />*/}
      {/*<Box>*/}
      {/*  {tasks?.map(({ _id, text }) => (*/}
      {/*    <div key={_id}>{text}</div>*/}
      {/*  ))}*/}
      {/*</Box>*/}
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
