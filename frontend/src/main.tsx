import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { AppProviders } from '@/provider';
import { routeTree } from '@/routeTree.gen.ts';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
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

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </QueryClientProvider>
  );
}
