import Features from '@/modules/home/components/features';
import Hero from '@/modules/home/components/hero';
import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
  return (
    <>
      <Box px={{ lg: 80 }}>
        <Hero />
      </Box>
      <Features />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
