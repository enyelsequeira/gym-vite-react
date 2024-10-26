import Footer from '@/components/footer/footer.tsx';
import Header from '@/components/header/header.tsx';
import type { AuthenticationContext } from '@/providers/auth.tsx';
import { Box, Container } from '@mantine/core';
import type { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  authentication: AuthenticationContext;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <Box>
      <Header />
      <Container maw={1440} mih={'100dvh'} py={'md'} px={0}>
        <Outlet />
      </Container>
      <Footer />

      <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" />
    </Box>
  );
}
