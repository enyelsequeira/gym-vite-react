import WeightChartCard from '@/components/charts/weight-chart.tsx';
import { useGetUserWeight } from '@/modules/overview/queries/get-user-weights.ts';
import WeekWorkout from '@/modules/users/user/week-workout';
import { StandardViewDateFormat } from '@/utils/dates.ts';
import { Avatar, Badge, Container, Flex, Grid, Group, Paper, Stack, Text } from '@mantine/core';
import {
  IconMail,
  IconPhone,
  IconRating12Plus,
  IconShoppingBag,
  IconUser,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';

type ContactInfoProps = {
  label: string;
  value: string;
  icon: ReactNode;
};
const ContactInformation = ({ icon, value, label }: ContactInfoProps) => {
  return (
    <Flex align={'center'} gap={'xs'}>
      {icon}
      <Stack gap={0}>
        <Text tt={'capitalize'} size="sm" c="blue.7" fw={500} mb={4}>
          {label}
        </Text>
        <Text size="sm">{value}</Text>
      </Stack>
    </Flex>
  );
};

type Props = {
  userId: number;
};

const UserView = ({ userId }: Props) => {
  const { data: weights } = useGetUserWeight({
    userId: Number(userId),
  });
  console.log({ weights });

  const user = {
    id: 23,
    username: 'enyel3',
    name: 'Enyel',
    lastName: 'Sequeira',
    type: 'USER',
    createdAt: '2024-11-13T18:04:27.000Z',
    updatedAt: '2024-11-13T18:06:21.000Z',
    email: 'enyel3@mail.com',
    height: 12,
    weight: 110,
    targetWeight: 120,
    country: 'AG',
    city: 'asda',
    phone: '+11231231231',
    occupation: 'dsasd',
    dateOfBirth: '1994-11-11T00:00:00.000Z',
    gender: 'MALE',
    activityLevel: 'VERY_ACTIVE',
    firstLogin: false,
  };

  type StatsCards = {
    label: string;
    value: string | number;
    unit?: string;
  };
  const StatsCard = ({ label, value, unit }: StatsCards) => (
    <Paper shadow="xs" p="md" radius="md" bg="blue.0">
      <Text mb={4} tt={'capitalize'} size="sm" c="blue.9" fw={500}>
        {label}
      </Text>
      <Group gap={4} align={'center'}>
        <Text size="xl" fw={700}>
          {value}
        </Text>
        {unit && (
          <Text size="sm" c="dimmed" fw={700}>
            {unit}
          </Text>
        )}
      </Group>
    </Paper>
  );

  return (
    <Container size={'lg'}>
      {/* Header Section */}
      <Paper shadow="sm" radius="md" withBorder p={'lg'}>
        <Grid>
          <Grid.Col span={{ lg: 3 }}>
            <Flex gap={'md'}>
              <Avatar size={'xl'} color="blue.7" radius="md">
                {user.name[0]}
                {user.lastName[0]}
              </Avatar>
              <Flex direction={'column'} gap={'xs'}>
                <Stack gap={'xs'} align={'center'}>
                  <Text fw={500} tt={'capitalize'} c="blue.7">
                    Name
                  </Text>
                  <Text size="sm" fw={700}>
                    {user.name} {user.lastName}
                  </Text>
                  <Badge color="blue">{user.type}</Badge>
                </Stack>
                <Stack align={'center'}>
                  <Stack gap={3}>
                    <Text tt={'capitalize'} size="sm" c="blue.7" fw={500}>
                      Member Since
                    </Text>
                    <Text size="sm">{StandardViewDateFormat(user.createdAt)}</Text>
                  </Stack>
                  <Stack gap={3}>
                    <Text tt={'capitalize'} size="sm" c="blue.7" fw={500}>
                      Last Updated
                    </Text>
                    <Text size="sm">{StandardViewDateFormat(user.updatedAt)}</Text>
                  </Stack>
                </Stack>
              </Flex>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, lg: 5 }}>
            <Text fw={600} mb="lg">
              Contact Information
            </Text>
            <Grid>
              <Grid.Col span={{ lg: 6 }}>
                <Stack>
                  <ContactInformation
                    icon={<IconUser />}
                    label={'Username'}
                    value={user.username}
                  />
                  <ContactInformation icon={<IconMail />} label={'Email'} value={user.email} />
                  <ContactInformation icon={<IconPhone />} label={'Phone'} value={user.phone} />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ lg: 6 }}>
                <Stack>
                  <ContactInformation
                    icon={<IconRating12Plus />}
                    label={'age'}
                    value={`${dayjs(user.dateOfBirth).fromNow(true)}`}
                  />
                  <ContactInformation
                    icon={<IconShoppingBag />}
                    label={'Occupation'}
                    value={user.occupation}
                  />
                  <ContactInformation
                    icon={<IconUser />}
                    label={'Activity Level'}
                    value={user.activityLevel}
                  />
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6, lg: 4 }}>
            <Text fw={600} mb="lg">
              Health And Fitness Metric
            </Text>
            <Grid>
              <Grid.Col span={{ lg: 6 }}>
                <StatsCard label={'Height'} value={120} unit={'CM'} />
              </Grid.Col>
              <Grid.Col span={{ lg: 6 }}>
                <StatsCard label={'Gender'} value={'F'} />
              </Grid.Col>
              <Grid.Col span={{ lg: 6 }}>
                <StatsCard label={'Weight'} value={120} unit={'KG'} />
              </Grid.Col>
              <Grid.Col span={{ lg: 6 }}>
                <StatsCard label={'Target Weight'} value={120} unit={'KG'} />
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Paper>
      <Grid my={'md'}>
        <Grid.Col span={{ lg: 6 }}>
          <WeightChartCard weights={weights ?? []} />
        </Grid.Col>
        <Grid.Col span={{ lg: 12 }}>
          <WeekWorkout />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default UserView;
