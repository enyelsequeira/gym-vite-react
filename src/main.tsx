import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css'; //if using mantine date picker features
import 'mantine-react-table/styles.css'; //import MRT styles
import '@mantine/charts/styles.css';
import { AppProviders } from '@/providers';
import { AuthenticationProvider, useSession } from '@/providers/auth.tsx';
import { routeTree } from '@/routeTree.gen.ts';
import { useGSAP } from '@gsap/react';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import gsap from 'gsap';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';

dayjs.extend(relativeTime);

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(useGSAP);
// Create a new router instance

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});
// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    authentication: undefined!,
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

function App() {
  const authentication = useSession();

  return (
    <RouterProvider
      router={router}
      defaultPreload="intent"
      context={{
        authentication,
      }}
    />
  );
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <AppProviders>
            <Notifications limit={5} />
            <App />
          </AppProviders>
        </AuthenticationProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}
//
