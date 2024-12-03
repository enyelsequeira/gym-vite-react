import { DefaultSelect } from '@/components/ui/forms/default-select';
import { PersonalTextInput } from '@/components/ui/forms/text-input-default';
import VideoPlayer from '@/components/video-player';
import { useGetAllExercisesSelect } from '@/modules/exercises/queries/get-all-exercices';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconInfoCircle, IconPencil, IconPlus, IconX } from '@tabler/icons-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface Workout {
  exercise: string;
  sets: string;
  reps: string;
  notes: string;
  isEditing: boolean;
}

interface FormValues {
  dateRange: [Date | null, Date | null];
  days: {
    [key: string]: Workout[];
  };
}

const WeekWorkout = () => {
  const { data: exerciseOptions } = useGetAllExercisesSelect({ limit: 400, page: 1 });

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      dateRange: [null, null],
      days: DAYS.reduce(
        (acc, day) => ({
          // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
          ...acc,
          [day]: [],
        }),
        {} as { [key: string]: Workout[] }
      ),
    },
    validate: (values) => {
      const errors: Partial<Record<string, string>> = {};
      Object.entries(values.days).forEach(([day, workouts]) => {
        const exercises = workouts.map((w) => w.exercise);
        workouts.forEach((workout, index) => {
          const exerciseCount = exercises.filter((e) => e === workout.exercise).length;

          if (exerciseCount > 1) {
            errors[`days.${day}.${index}.exercise`] = 'Exercise already exists for this day';
          }
        });
      });

      return errors;
    },
  });

  console.log({
    form: form.getValues(),
  });

  return (
    <Stack gap="xl">
      <Group justify="space-between" align="flex-end">
        <Title order={2}>Weekly Workout Plan</Title>
        <DatePickerInput
          type="range"
          label="Select date range"
          placeholder="Pick dates range"
          {...form.getInputProps('dateRange')}
          mx="auto"
          maw={400}
        />
      </Group>

      <Grid>
        {DAYS.map((day) => (
          <Grid.Col key={day} span={{ base: 12, md: 6, lg: 4 }}>
            <Paper shadow="sm" p="md" radius="md" withBorder>
              <Title order={4} mb="md">
                {day}
              </Title>
              <Stack gap="md">
                {form.getValues().days[day]?.map((workout, index) => (
                  <Paper
                    key={`${index}-${workout.exercise}`}
                    shadow="xs"
                    p="md"
                    radius="md"
                    bg="gray.0"
                  >
                    <Box pos="relative">
                      {workout.isEditing ? (
                        <Stack gap="xs">
                          <DefaultSelect
                            data={exerciseOptions || []}
                            placeholder="Exercise"
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
                              const validation = form.validate();
                              if (!validation.hasErrors) {
                                form.setFieldValue(`days.${day}.${index}.isEditing`, false);
                              }
                            }}
                          >
                            Save
                          </Button>
                        </Stack>
                      ) : (
                        <Stack gap="md">
                          <Group justify="space-between" align="center">
                            <Group gap="xs">
                              <Text fw={600} size="lg">
                                {workout.exercise}
                              </Text>
                              <Tooltip label={'View Exercise'}>
                                <ActionIcon
                                  variant="subtle"
                                  color="blue.6"
                                  title="View exercise details"
                                  onClick={() => {
                                    modals.open({
                                      closeOnClickOutside: false,
                                      size: 'lg',
                                      centered: true,
                                      title: (
                                        <Text fz={'lg'} fw={600}>
                                          Tutorial
                                        </Text>
                                      ),
                                      children: <VideoPlayer url={'lol'} />,
                                    });
                                  }}
                                >
                                  <IconInfoCircle size={16} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                            <Group gap={'xs'}>
                              <ActionIcon
                                color="red"
                                variant="subtle"
                                onClick={() => {
                                  form.removeListItem(`days.${day}`, index);
                                }}
                              >
                                <IconX size={16} />
                              </ActionIcon>
                              <ActionIcon
                                variant="light"
                                color="gray"
                                title="Edit workout"
                                onClick={() => {
                                  form.setFieldValue(`days.${day}.${index}.isEditing`, true);
                                }}
                              >
                                <IconPencil size={16} />
                              </ActionIcon>
                            </Group>
                          </Group>

                          <Group gap="lg">
                            <Badge size="lg" variant="light">
                              {workout.sets} sets
                            </Badge>
                            <Badge size="lg" variant="light">
                              {workout.reps} reps
                            </Badge>
                          </Group>

                          {workout.notes && (
                            <Text size="sm" c="dimmed" fs={'italic'}>
                              "{workout.notes}"
                            </Text>
                          )}
                        </Stack>
                      )}
                    </Box>
                  </Paper>
                ))}

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
              </Stack>
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
};

export default WeekWorkout;
