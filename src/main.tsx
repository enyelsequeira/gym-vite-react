import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { AppProviders } from '@/provider';
import { routeTree } from '@/routeTree.gen.ts';
import { ConvexQueryClient } from '@convex-dev/react-query';
import { useGSAP } from '@gsap/react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import gsap from 'gsap';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(useGSAP);
// Create a new router instance

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);
const convexQueryClient = new ConvexQueryClient(convex);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
});
convexQueryClient.connect(queryClient);
// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ConvexProvider client={convex}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <QueryClientProvider client={queryClient}>
          <AppProviders>
            <RouterProvider router={router} />
          </AppProviders>
        </QueryClientProvider>
      </CookiesProvider>
    </ConvexProvider>
  );
}
