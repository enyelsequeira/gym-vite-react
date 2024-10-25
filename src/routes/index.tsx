import Features from '@/modules/home/components/features';
import Hero from '@/modules/home/components/hero';
import Pricing from '@/modules/home/components/pricing/pricing.tsx';
import Testimonials from '@/modules/home/components/testimonials/testimonials.tsx';
import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
  // const { data: users } = useQuery({
  //   ...getUserOptions(),
  // });
  // console.log({ users });

  return (
    <>
      <Box px={{ lg: 80 }}>
        <Hero />
      </Box>
      <Features />
      <Pricing />
      <Testimonials />
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
