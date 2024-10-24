import Features from '@/modules/home/components/features';
import Hero from '@/modules/home/components/hero';
import Pricing from '@/modules/home/components/pricing/pricing.tsx';
import Testimonials from '@/modules/home/components/testimonials/testimonials.tsx';
import { convexQuery } from '@convex-dev/react-query';
import { Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { api } from '../../convex/_generated/api';

const Home = () => {
  const { data: tasks } = useQuery(convexQuery(api.tasks.get, {}));
  console.log({ tasks });

  return (
    <>
      <Box px={{ lg: 80 }}>
        <Hero />
      </Box>
      <Features />
      <Pricing />
      <Testimonials />
      <Box>
        {tasks?.map(({ _id, text }) => (
          <div key={_id}>{text}</div>
        ))}
      </Box>
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
