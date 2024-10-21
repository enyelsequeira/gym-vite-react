import { useGSAP } from '@gsap/react';
import { Box, Button, Card, Flex, Grid, Stack, Text } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  text: string;
}

interface PricingPlan {
  plan: string;
  price: number;
}

interface PricingCardProps extends PricingPlan {
  features: Feature[];
}

const list: Feature[] = [
  { text: 'Access to all basic features' },
  { text: 'Basic reporting and analytics' },
  { text: 'Up to 10 individual users' },
  { text: 'Up to 10 individual users' },
  { text: 'Up to 10 individual users' },
];

const PricingCard = ({ plan, price, features }: PricingCardProps) => {
  return (
    <Card px={32} pt={40} pb={32} withBorder radius="md" bd={'1px solid #E4E7EC'}>
      <Flex direction={'column'} gap={'md'} align={'center'}>
        <Text c={'#101828'} fz={48} fw={600}>
          ${price}/Month
        </Text>
        <Stack gap={0} align={'center'}>
          <Text c={'#101828'} fz={20} fw={600}>
            {plan}
          </Text>
          <Text c={'#475467'} fz={'md'}>
            Billed annually
          </Text>
        </Stack>
      </Flex>
      <Flex direction={'column'} pt={32} gap={'md'}>
        {features.map((item, index) => (
          <Flex key={`${index + 1}`} align={'center'} gap={'md'}>
            <Box
              w={24}
              h={24}
              bg={'#DCFAE6'}
              style={{
                borderRadius: 49,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconCheck size={20} color={'#079455'} />
            </Box>
            <Text c={'#475467'} fz={'md'}>
              {item.text}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Button mt={'lg'} fullWidth px={'md'} py={'sm'} c={'white'} fw={600}>
        Get Started
      </Button>
    </Card>
  );
};

const Pricing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    cardsRef.current[index] = el;
  }, []);

  useGSAP(() => {
    const cards = cardsRef.current.filter((card) => card !== null);

    cards.forEach((card, index) => {
      gsap.set(card, { y: 50, opacity: 0 });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(card, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.3,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(card, {
            y: 50,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const pricingPlans: PricingPlan[] = [
    { plan: 'Basic Plan', price: 10 },
    { plan: 'Pro Plan', price: 20 },
    { plan: 'Enterprise Plan', price: 40 },
  ];

  return (
    <Box px={{ base: 'sm', lg: 80 }} my={100} component={'section'} ref={containerRef}>
      <Flex direction={'column'} maw={700} mb={77}>
        <Text c={'#0B4A6F'} fz={'md'} fw={600}>
          Pricing
        </Text>
        <Text mt={12} mb={20} c={'#101828'} fw={600} fz={36}>
          Simple, Transparent pricing
        </Text>
        <Text fz={20} c={'#475467'}>
          We believe that health and fitness should be accessible to all, no matter the
          circumstances
        </Text>
      </Flex>
      <Grid px={32}>
        {pricingPlans.map((planData, index) => (
          <Grid.Col key={planData.plan} span={{ lg: 4 }}>
            <div ref={(el) => setCardRef(el, index)}>
              <PricingCard plan={planData.plan} price={planData.price} features={list} />
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default Pricing;
