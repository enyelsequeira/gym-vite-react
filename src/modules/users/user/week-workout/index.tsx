import { DefaultSelect } from '@/components/ui/forms/default-select';
import { PersonalTextInput } from '@/components/ui/forms/text-input-default';
import VideoPlayer from '@/components/video-player';
import { useGetAllExercisesSelect } from '@/modules/exercises/queries/get-all-exercices';
import { ExerciseTimerModal } from '@/modules/users/user/components/timer.tsx';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Divider,
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
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import {
  IconCheck,
  IconInfoCircle,
  IconPencil,
  IconPlayerPlay,
  IconPlus,
  IconTimeDuration30,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Workout {
  exercise: string;
  sets: string;
  reps: string;
  notes: string;
  isEditing: boolean;
  completed?: boolean;
  remainingSets?: number; // Add this field
}

interface FormValues {
  dateRange: [Date | null, Date | null];
  days: {
    [key: string]: Workout[];
  };
}

interface WeekWorkoutProps {
  isUserView?: boolean;
  onExerciseComplete?: (day: string, index: number) => void;
}

const WeekWorkout = ({ isUserView = true, onExerciseComplete }: WeekWorkoutProps) => {
  const { data: exerciseOptions } = useGetAllExercisesSelect({ limit: 400, page: 1 });
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const form = useForm<FormValues>({
    initialValues: {
      dateRange: [null, null],
      days: DAYS.reduce(
        (acc, day) => ({
          ...acc,
          [day]: [],
        }),
        {} as { [key: string]: Workout[] }
      ),
    },
  });

  const getAvailableExercises = (day: string, currentWorkoutIndex: number) => {
    if (!exerciseOptions) return [];

    const usedExercises = form.values.days[day]
      .map((workout, index) => {
        if (index === currentWorkoutIndex) return null;
        const exercise = exerciseOptions
          .flatMap((group) => group.items)
          .find((item) => item.value === workout.exercise);
        return exercise?.label || null;
      })
      .filter(Boolean);

    return exerciseOptions.map((group) => ({
      group: group.group,
      items: group.items.filter((item) => !usedExercises.includes(item.label)),
    }));
  };
  const handleExerciseComplete = (day: string, index: number) => {
    // Update the remaining sets count
    form.setFieldValue(`days.${day}.${index}.completed`, true);
    onExerciseComplete?.(day, index);
  };

  const getDayProgress = (day: string) => {
    const exercises = form.values.days[day] || [];
    if (exercises.length === 0) return 0;
    const completed = exercises.filter((ex) => ex.completed).length;
    return (completed / exercises.length) * 100;
  };
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);

  const renderExerciseCard = (workout: Workout, day: string, index: number) => {
    if (isUserView) {
      return (
        <Paper
          key={`${index}-${workout.exercise}`}
          shadow="xs"
          p="md"
          radius="md"
          bg={workout.completed ? 'gray.0' : 'white'}
        >
          <Group pos="apart">
            <Group>
              <ActionIcon
                color={workout.completed ? 'green' : 'blue'}
                variant={workout.completed ? 'light' : 'subtle'}
                onClick={() => {
                  if (!workout.completed) {
                    setIsTimerModalOpen(true);
                  }
                }}
                size="lg"
                radius="xl"
              >
                {workout.completed ? <IconCheck size={20} /> : <IconPlayerPlay size={20} />}
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
                    {exerciseOptions
                      ?.flatMap((group) => group.items)
                      .find((item) => item.value === workout.exercise)?.label || ''}
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
                  {workout.completed
                    ? 'Completed'
                    : `${workout.sets} ${Number(workout.sets) === 1 ? 'set' : 'sets'} • ${workout.reps} reps`}
                </Text>
                {workout.notes && (
                  <Text size="sm" c="dimmed" mt="xs" fs="italic">
                    {workout.notes}
                  </Text>
                )}
              </Box>
            </Group>
          </Group>

          <ExerciseTimerModal
            opened={isTimerModalOpen}
            onClose={() => setIsTimerModalOpen(false)}
            exerciseName={
              exerciseOptions
                ?.flatMap((group) => group.items)
                .find((item) => item.value === workout.exercise)?.label || ''
            }
            totalSets={Number.parseInt(workout.sets) || 0}
            onComplete={() => {
              onExerciseComplete?.(day, index);
              setIsTimerModalOpen(false);
            }}
          />
        </Paper>
      );
    }

    return (
      <Paper key={`${index}-${workout.exercise}`} shadow="xs" p="md" radius="md" bg="gray.0">
        <Box pos="relative">
          {workout.isEditing ? (
            <Stack gap="xs">
              <DefaultSelect
                data={getAvailableExercises(day, index)}
                placeholder="Select exercise"
                {...form.getInputProps(`days.${day}.${index}.exercise`)}
              />
              <Group grow>
                <PersonalTextInput
                  placeholder="Sets"
                  {...form.getInputProps(`days.${day}.${index}.sets`)}
                />
                <PersonalTextInput
                  placeholder="Reps"
                  {...form.getInputProps(`days.${day}.${index}.reps`)}
                />
              </Group>
              <PersonalTextInput
                placeholder="Notes"
                leftSection={<IconPencil size={16} />}
                {...form.getInputProps(`days.${day}.${index}.notes`)}
              />
              <Button
                variant="light"
                onClick={() => {
                  form.setFieldValue(`days.${day}.${index}.isEditing`, false);
                }}
                disabled={!workout.exercise}
                fullWidth
              >
                Save Exercise
              </Button>
            </Stack>
          ) : (
            <Stack gap="md">
              <Group pos="apart" align="center">
                <Group gap="xs">
                  <Text fw={600} size="lg">
                    {exerciseOptions
                      ?.flatMap((group) => group.items)
                      .find((item) => item.value === workout.exercise)?.label || ''}
                  </Text>
                  <Tooltip label="View Exercise">
                    <ActionIcon
                      variant="subtle"
                      color="blue"
                      onClick={() => {
                        modals.open({
                          closeOnClickOutside: false,
                          size: 'lg',
                          centered: true,
                          title: (
                            <Text fz="lg" fw={600}>
                              Exercise Tutorial
                            </Text>
                          ),
                          children: <VideoPlayer url="lol" />,
                        });
                      }}
                    >
                      <IconInfoCircle size={18} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
                <Group gap="xs">
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => {
                      form.removeListItem(`days.${day}`, index);
                    }}
                  >
                    <IconX size={18} />
                  </ActionIcon>
                  <ActionIcon
                    variant="light"
                    color="gray"
                    title="Edit workout"
                    onClick={() => {
                      form.setFieldValue(`days.${day}.${index}.isEditing`, true);
                    }}
                  >
                    <IconPencil size={18} />
                  </ActionIcon>
                </Group>
              </Group>

              <Group gap="lg">
                <Badge size="lg" variant="light" radius="md">
                  {workout.sets} sets
                </Badge>
                <Badge size="lg" variant="light" radius="md">
                  {workout.reps} reps
                </Badge>
              </Group>

              {workout.notes && (
                <Text size="sm" c="dimmed" fs="italic">
                  "{workout.notes}"
                </Text>
              )}
            </Stack>
          )}
        </Box>
      </Paper>
    );
  };

  return (
    <Container size="xl" px="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
        <Group justify="space-between" align="flex-start">
          <Box>
            <Group align="center" mb="xs">
              <ThemeIcon size="xl" radius="xl" color="blue">
                <IconTimeDuration30 size={24} />
              </ThemeIcon>
              <Title order={1} size="h2">
                {isUserView ? 'My Workout Plan' : 'Weekly Workout Plan'}
              </Title>
            </Group>
            <Text c="dimmed" size="sm">
              {isUserView
                ? 'Track your fitness journey'
                : 'Plan and track your exercises for the week'}
            </Text>
          </Box>
          <Box>
            <DatePickerInput
              type="range"
              label="Select workout week"
              placeholder="Pick dates range"
              {...form.getInputProps('dateRange')}
              clearable
              size="md"
              maw={400}
            />
          </Box>
        </Group>

        <Divider my="lg" />

        <Grid>
          {DAYS.map((day) => {
            const isToday = day === today;
            return (
              <Grid.Col key={day} span={{ base: 12, md: 6, lg: 4 }}>
                <Paper
                  shadow="sm"
                  p="md"
                  radius="md"
                  withBorder
                  bg={isUserView && isToday ? 'blue.0' : undefined}
                >
                  <Group mb="md">
                    <Group>
                      <Title order={4} color={isUserView && isToday ? 'blue' : undefined}>
                        {day}
                        {isUserView && isToday && (
                          <Badge ml="xs" variant="filled" color="blue">
                            Today
                          </Badge>
                        )}
                      </Title>
                    </Group>
                    <Badge size="lg" radius="md" variant="dot">
                      {form.values.days[day]?.length || 0} exercises
                    </Badge>
                  </Group>

                  {isUserView && (
                    <Progress
                      value={getDayProgress(day)}
                      color="blue"
                      size="sm"
                      radius="xl"
                      mb="md"
                    />
                  )}

                  <Stack gap="md">
                    {form.values.days[day]?.map((workout, index) =>
                      renderExerciseCard(workout, day, index)
                    )}

                    {!isUserView && (
                      <Button
                        variant="light"
                        leftSection={<IconPlus size={16} />}
                        fullWidth
                        onClick={() => {
                          form.insertListItem(`days.${day}`, {
                            exercise: '',
                            sets: '',
                            reps: '',
                            notes: '',
                            isEditing: true,
                          });
                        }}
                      >
                        Add Exercise
                      </Button>
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

export default WeekWorkout;
