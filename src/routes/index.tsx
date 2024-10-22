import Features from '@/modules/home/components/features';
import Hero from '@/modules/home/components/hero';
import Pricing from '@/modules/home/components/pricing/pricing.tsx';
import Testimonials from '@/modules/home/components/testimonials/testimonials.tsx';
import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

// async function getCurrentUser() {
//   const res = await api.tasks.$get();
//   if (!res.ok) {
//     throw new Error("server error");
//   }
//   const data = await res.json();
//   return data;
// }

// export const userQueryOptions = queryOptions({
//   queryKey: ["get-current-user"],
//   queryFn: getCurrentUser,
//   staleTime: Number.POSITIVE_INFINITY,
// });
const Home = () => {
  // const { data } = useQuery({
  //   ...userQueryOptions,
  // });
  // console.log({ data });
  return (
    <>
      <Box px={{ lg: 80 }}>
        <Hero />
      </Box>
      <Features />
      <Pricing />
      <Testimonials />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
