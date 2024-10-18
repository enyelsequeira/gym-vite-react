import Features from '@/modules/home/components/features';
import Hero from '@/modules/home/components/hero';
import Pricing from '@/modules/home/components/pricing/pricing.tsx';
import Testimonials from '@/modules/home/components/testimonials/testimonials.tsx';
import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
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
