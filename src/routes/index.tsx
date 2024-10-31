import Footer from '@/components/footer/footer.tsx';
import Header from '@/components/header/header.tsx';
import { useLogout, useUpdate } from '@/modules/auth/use-login.tsx';
import Features from '@/modules/home/components/features';
import Hero from '@/modules/home/components/hero';
import Pricing from '@/modules/home/components/pricing/pricing.tsx';
import Testimonials from '@/modules/home/components/testimonials/testimonials.tsx';
import { useSession } from '@/providers/auth.tsx';
import { getUserOptions } from '@/server/get-users.ts';
import { Box, Container } from '@mantine/core';
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
    <Container maw={1440} mih={'100dvh'} py={'md'} px={0}>
      <Header />
      {/*<Button*/}
      {/*  loading={isPending}*/}
      {/*  onClick={() => {*/}
      {/*    mutate({*/}
      {/*      username: 'one',*/}
      {/*      userIdToUpdate: '4',*/}
      {/*    });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  Mutate*/}
      {/*</Button>{' '}*/}
      {/*<Button*/}
      {/*  loading={isPending}*/}
      {/*  onClick={() => {*/}
      {/*    logout.mutate(*/}
      {/*      {*/}
      {/*        id: `${session.user?.id}`,*/}
      {/*      },*/}
      {/*      {*/}
      {/*        onSuccess: () => {*/}
      {/*          // window.location.reload();*/}
      {/*        },*/}
      {/*      }*/}
      {/*    );*/}
      {/*  }}*/}
      {/*>*/}
      {/*  LOGOUT*/}
      {/*</Button>*/}
      <Box px={{ lg: 80 }}>
        <Hero />
      </Box>
      <Features />
      <Pricing />
      <Testimonials />
      <Footer />
    </Container>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
