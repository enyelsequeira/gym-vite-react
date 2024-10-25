import { useUpdate } from '@/modules/auth/use-login.tsx';
import { getUserOptions } from '@/server/get-users.ts';
import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Cookies } from 'react-cookie';

// Approach 2: Using Cookies instance (Better for utilities/services)
const cookiesInstance = new Cookies();

// You can use this in a separate utility file
export const getCookie = (name: string) => {
  return cookiesInstance.get(name);
};

const Home = () => {
  const { data: users } = useQuery({
    ...getUserOptions(),
  });
  const { mutate, isPending } = useUpdate();
  console.log({ users });

  // let get the cookie
  console.log({
    cookieValue: getCookie('session'),
  });

  return (
    <>
      <Button
        loading={isPending}
        onClick={() => {
          mutate({
            username: 'demo-fronte',
            userIdToUpdate: '3',
          });
        }}
      >
        Mutate
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
