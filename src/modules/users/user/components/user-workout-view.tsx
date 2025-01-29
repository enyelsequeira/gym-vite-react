import VideoPlayer from '@/components/video-player';
import { DAYS } from '@/modules/users/user/week-workout';
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCheck, IconInfoCircle, IconPlayerPlay, IconTimeDuration30 } from '@tabler/icons-react';

// Mock for user view - in real app would come from props or context
const isUserView = true;

interface Workout {
  exercise: string;
  sets: string;
  reps: string;
  notes: string;
  isEditing: boolean;
  completed?: boolean; // Added for user view
}

interface FormValues {
  dateRange: [Date | null, Date | null];
  days: {
    [key: string]: Workout[];
  };
}

const UserWorkoutView = ({ workoutPlan }: { workoutPlan: FormValues }) => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Mock function to handle exercise completion
  const toggleExerciseComplete = (day: string, index: number) => {
    console.log(`Toggling exercise ${index} for ${day}`);
  };

  const getDayProgress = (day: string) => {
    const exercises = workoutPlan.days[day] || [];
    if (exercises.length === 0) return 0;
    const completed = exercises.filter((ex) => ex.completed).length;
    return (completed / exercises.length) * 100;
  };

  return (
    <Container size="xl" px="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" align="flex-start" mb="lg">
          <Box>
            <Group align="center" mb="xs">
              <ThemeIcon size="xl" radius="xl" color="blue">
                <IconTimeDuration30 size={24} />
              </ThemeIcon>
              <Title order={1} size="h2">
                My Workout Plan
              </Title>
            </Group>
            <Text c="dimmed" size="sm">
              Track your fitness journey
            </Text>
          </Box>
          <Badge size="xl" variant="light" color="blue">
            Week of {workoutPlan.dateRange[0]?.toLocaleDateString()}
          </Badge>
        </Group>

        <Grid>
          {DAYS.map((day) => {
            const isToday = day === today;
            const dayProgress = getDayProgress(day);

            return (
              <Grid.Col key={day} span={{ base: 12, md: 6, lg: 4 }}>
                <Paper
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                  bg={isToday ? 'blue.0' : undefined}
                >
                  <Stack gap="md">
                    <Group p="apart">
                      <Group>
                        <Title order={4} c={isToday ? 'blue' : undefined}>
                          {day}
                          {isToday && (
                            <Badge ml="xs" variant="filled" color="blue">
                              Today
                            </Badge>
                          )}
                        </Title>
                      </Group>
                      <Text size="sm" c="dimmed">
                        {workoutPlan.days[day]?.length || 0} exercises
                      </Text>
                    </Group>

                    <Progress value={dayProgress} color="blue" size="sm" radius="xl" />

                    <Stack gap="sm">
                      {workoutPlan.days[day]?.map((workout, index) => (
                        <Paper
                          key={index}
                          shadow="xs"
                          p="md"
                          radius="md"
                          bg={workout.completed ? 'gray.0' : 'white'}
                        >
                          <Group p="apart">
                            <Group>
                              <ActionIcon
                                color={workout.completed ? 'green' : 'blue'}
                                variant={workout.completed ? 'light' : 'subtle'}
                                onClick={() => toggleExerciseComplete(day, index)}
                                size="lg"
                                radius="xl"
                              >
                                {workout.completed ? (
                                  <IconCheck size={20} />
                                ) : (
                                  <IconPlayerPlay size={20} />
                                )}
                              </ActionIcon>
                              <Box>
                                <Group gap="xs">
                                  <Text
                                    fw={500}
                                    size="lg"
                                    style={{
                                      textDecoration: workout.completed ? 'line-through' : 'none',
                                      color: workout.completed ? 'dimmed' : undefined,
                                    }}
                                  >
                                    {workout.exercise}
                                  </Text>
                                  <Tooltip label="Watch Tutorial">
                                    <ActionIcon
                                      variant="subtle"
                                      color="blue"
                                      onClick={() => {
                                        modals.open({
                                          size: 'lg',
                                          centered: true,
                                          title: 'Exercise Tutorial',
                                          children: <VideoPlayer url="lol" />,
                                        });
                                      }}
                                    >
                                      <IconInfoCircle size={16} />
                                    </ActionIcon>
                                  </Tooltip>
                                </Group>
                                <Text size="sm" c="dimmed">
                                  {workout.sets} sets • {workout.reps} reps
                                </Text>
                                {workout.notes && (
                                  <Text size="sm" c="dimmed" mt="xs" fs="italic">
                                    {workout.notes}
                                  </Text>
                                )}
                              </Box>
                            </Group>
                          </Group>
                        </Paper>
                      ))}
                    </Stack>

                    {workoutPlan.days[day]?.length === 0 && (
                      <Text c="dimmed" ta="center" py="xl">
                        Rest day
                      </Text>
                    )}
                  </Stack>
                </Paper>
              </Grid.Col>
            );
          })}
        </Grid>
      </Card>
    </Container>
  );
};

export default UserWorkoutView;
