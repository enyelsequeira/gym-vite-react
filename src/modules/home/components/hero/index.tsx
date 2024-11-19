import { Button, Flex, Grid, Group, Image, Text, Title } from '@mantine/core';

const Hero = () => {
  return (
    <Grid
      px={32}
      styles={{
        inner: {
          margin: 0,
          gap: 32,
        },
      }}
    >
      <Grid.Col
        span={{ md: 4, lg: 5 }}
        style={{
          display: 'flex',
        }}
      >
        <Flex direction={'column'} justify={'center'} align={'center'}>
          <Title
            tt={'uppercase'}
            fz={{
              lg: 40,
            }}
            c={'#101828'}
            fw={600}
            ta={'center'}
            lts={'-1.2px'}
          >
            Transform your body, Track YOUR Progress
          </Title>
          <Text c={'#475467'} fz={20} ta={'center'} mt={24} mb={48}>
            ActiveLife helps you achieve your fitness goals with personalized workouts, nutrition
            tracking, and progress monitoring.
          </Text>

          <Group justify="center">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group>
        </Flex>
      </Grid.Col>

      <Grid.Col span={{ lg: 7 }} maw={592}>
        <Image
          src={'/weight-tracking.webp'}
          w={{ base: '100%', lg: 592 }}
          mah={640}
          style={{
            borderTopLeftRadius: 160,
          }}
        />
      </Grid.Col>
    </Grid>
  );
};
export default Hero;
