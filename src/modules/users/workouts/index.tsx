import {
  AdminExerciseView,
  UserExerciseView,
} from '@/modules/users/workouts/components/workout-inputs.tsx';
import { DAYS } from '@/modules/users/workouts/constants.ts';
import { useWorkoutFormContext } from '@/modules/users/workouts/context/work-out-context.tsx';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconPlus, IconTimeDuration30 } from '@tabler/icons-react';

const isUserView = true;

const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

const WorkoutMainView = () => {
  const form = useWorkoutFormContext();
  const getDayProgress = (day: string) => {
    const exercises = form.values.days[day] || [];
    if (exercises.length === 0) return 0;
    const completed = exercises.filter((ex) => ex.completed).length;
    return (completed / exercises.length) * 100;
  };
  return (
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
                    <Title order={4} c={isUserView && isToday ? 'blue' : undefined}>
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
                    isUserView ? (
                      <UserExerciseView
                        key={`${day}-${index}`}
                        workout={workout}
                        day={day}
                        index={index}
                      />
                    ) : (
                      <AdminExerciseView
                        key={`${day}-${index}`}
                        workout={workout}
                        day={day}
                        index={index}
                      />
                    )
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
  );
};

export default WorkoutMainView;
