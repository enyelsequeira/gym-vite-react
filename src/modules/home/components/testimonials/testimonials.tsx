import { useGSAP } from '@gsap/react';
import { Carousel, type Embla } from '@mantine/carousel';
import { Box, Button, Flex, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import gsap from 'gsap';
import { useCallback, useRef, useState } from 'react';
import classes from './testimonials.module.css';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      withBorder
      style={{ backgroundImage: `url(${image})` }}
      h={600}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        Read article
      </Button>
    </Paper>
  );
}

const data = [
  {
    image:
      'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Best forests to visit in North America',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Hawaii beaches review: better than you think',
    category: 'beach',
  },
  {
    image:
      'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Mountains at night: 12 best locations to enjoy the view',
    category: 'nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    title: 'Aurora in Norway: when to visit for best experience',
    category: 'nature',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1661582679082-e97a94d8dd4d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Best places to visit this winter',
    category: 'tourism',
  },
  {
    image:
      'https://images.unsplash.com/photo-1647456753452-e5d7cbf16df1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Active volcanos reviews: travel at your own risk',
    category: 'nature',
  },
];
const Testimonials = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [embla, setEmbla] = useState<Embla | null>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef(null);

  const setSlideRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      slideRefs.current[index] = el;
    },
    []
  );

  useGSAP(
    () => {
      if (embla) {
        const rotateAndScaleSlides = () => {
          const visibleSlides = embla.slidesInView(true);
          slideRefs.current.forEach((slide, index) => {
            if (slide) {
              const isVisible = visibleSlides.indexOf(index) > -1;
              gsap.to(slide, {
                rotation: isVisible ? 0 : 15,
                scale: isVisible ? 1 : 0.8,
                opacity: isVisible ? 1 : 0.5,
                duration: 0.4,
              });
            }
          });
        };

        embla.on('select', rotateAndScaleSlides);
        embla.on('scroll', rotateAndScaleSlides);
        gsap.ticker.add(rotateAndScaleSlides);

        return () => {
          embla.off('select', rotateAndScaleSlides);
          embla.off('scroll', rotateAndScaleSlides);
          gsap.ticker.remove(rotateAndScaleSlides);
        };
      }
    },
    { scope: containerRef, dependencies: [embla] }
  );

  const slides = data.map((item, index) => (
    <Carousel.Slide key={item.title}>
      <div ref={setSlideRef(index)}>
        <Card {...item} />
      </div>
    </Carousel.Slide>
  ));

  return (
    <Box px={{ base: 'sm', lg: 80 }} my={100} component={'section'} ref={containerRef}>
      <Flex direction={'column'} maw={700} mb={77}>
        <Text c={'#0B4A6F'} fz={'md'} fw={600}>
          Testimonials
        </Text>
        <Text mt={12} mb={20} c={'#101828'} fw={600} fz={36}>
          Results with no BS
        </Text>
        <Text fz={20} c={'#475467'}>
          Results that last a life time, better you
        </Text>
      </Flex>
      <Carousel
        classNames={{
          control: classes.control,
        }}
        maw={900}
        mx={'auto'}
        slideSize={{ base: '100%', sm: '50%' }}
        slideGap={{ base: 'xl', sm: 2 }}
        align="center"
        slidesToScroll={mobile ? 1 : 2}
        getEmblaApi={setEmbla}
      >
        {slides}
      </Carousel>
    </Box>
  );
};

export default Testimonials;
