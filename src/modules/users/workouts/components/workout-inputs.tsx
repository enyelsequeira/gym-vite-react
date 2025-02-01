import { DefaultSelect } from '@/components/ui/forms/default-select';
import { PersonalTextInput } from '@/components/ui/forms/text-input-default';
import VideoPlayer from '@/components/video-player';
import { useGetAllExercisesSelect } from '@/modules/exercises/queries/get-all-exercices';
import { ExerciseTimerModal } from '@/modules/users/user/components/timer';
import {
  type Workout,
  useWorkoutFormContext,
} from '@/modules/users/workouts/context/work-out-context.tsx';
import { ActionIcon, Badge, Box, Button, Group, Paper, Stack, Text, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCheck, IconInfoCircle, IconPencil, IconPlayerPlay, IconX } from '@tabler/icons-react';
import { useState } from 'react';

export interface Exercise {
  group: string;
  items: { label: string; value: string }[];
}

export const ExerciseVideo = () => {
  const handleOpenVideo = () => {
    modals.open({
      size: 'lg',
      centered: true,
      title: 'Exercise Tutorial',
      children: <VideoPlayer url="lol" />,
    });
  };

  return (
    <Tooltip label="Watch Tutorial">
      <ActionIcon variant="subtle" color="blue" onClick={handleOpenVideo}>
        <IconInfoCircle size={16} />
      </ActionIcon>
    </Tooltip>
  );
};

interface ExerciseFormProps {
  day: string;
  index: number;
  availableExercises: Exercise[];
  onSave: () => void;
}

export const ExerciseForm = ({ day, index, availableExercises, onSave }: ExerciseFormProps) => {
  const form = useWorkoutFormContext();

  return (
    <Stack gap="xs">
      <DefaultSelect
        data={availableExercises}
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
        onClick={onSave}
        disabled={!form.values.days[day][index].exercise}
        fullWidth
      >
        Save Exercise
      </Button>
    </Stack>
  );
};

type ExerciseRenderProps = {
  exerciseName: string;
  isTimerOpen: boolean;
  setIsTimerOpen: (open: boolean) => void;
  availableExercises: Exercise[];
  handleComplete: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
  handleSave: () => void;
};

type ExerciseCardProps = {
  workout: Workout;
  day: string;
  index: number;
  children: (props: ExerciseRenderProps) => React.ReactNode;
};

export const ExerciseCard = ({ workout, day, index, children }: ExerciseCardProps) => {
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const form = useWorkoutFormContext();
  const { data: exercises } = useGetAllExercisesSelect({ limit: 400, page: 1 });

  const exerciseName =
    exercises?.flatMap((group) => group.items).find((item) => item.value === workout.exercise)
      ?.label || '';

  const availableExercises =
    exercises?.map((group) => ({
      group: group.group,
      items: group.items.filter((item) => {
        const isUsed = form.values.days[day]
          .filter((_, i) => i !== index)
          .some((w) => w.exercise === item.value);
        return !isUsed;
      }),
    })) || [];

  const handleComplete = () => {
    setIsTimerOpen(false);
    form.setFieldValue(`days.${day}.${index}.completed`, true);
  };

  const handleEdit = () => {
    form.setFieldValue(`days.${day}.${index}.isEditing`, true);
  };

  const handleDelete = () => {
    form.removeListItem(`days.${day}`, index);
  };

  const handleSave = () => {
    form.setFieldValue(`days.${day}.${index}.isEditing`, false);
  };

  return children({
    exerciseName,
    isTimerOpen,
    setIsTimerOpen,
    availableExercises,
    handleComplete,
    handleEdit,
    handleDelete,
    handleSave,
  });
};

export const UserExerciseView = ({
  workout,
  day,
  index,
}: { workout: Workout; day: string; index: number }) => (
  <ExerciseCard workout={workout} day={day} index={index}>
    {({ exerciseName, isTimerOpen, setIsTimerOpen, handleComplete }) => (
      <Paper shadow="xs" p="md" radius="md" bg={workout.completed ? 'gray.0' : 'white'}>
        <Group>
          <ActionIcon
            color={workout.completed ? 'green' : 'blue'}
            variant={workout.completed ? 'light' : 'subtle'}
            onClick={() => !workout.completed && setIsTimerOpen(true)}
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
                {exerciseName}
              </Text>
              <ExerciseVideo />
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

        <ExerciseTimerModal
          opened={isTimerOpen}
          onClose={() => setIsTimerOpen(false)}
          exerciseName={exerciseName}
          totalSets={Number.parseInt(workout.sets) || 0}
          onComplete={handleComplete}
        />
      </Paper>
    )}
  </ExerciseCard>
);

export const AdminExerciseView = ({
  workout,
  day,
  index,
}: { workout: Workout; day: string; index: number }) => (
  <ExerciseCard workout={workout} day={day} index={index}>
    {({ exerciseName, availableExercises, handleEdit, handleDelete, handleSave }) => (
      <Paper shadow="xs" p="md" radius="md" bg="gray.0">
        {workout.isEditing ? (
          <ExerciseForm
            day={day}
            index={index}
            availableExercises={availableExercises}
            onSave={handleSave}
          />
        ) : (
          <>
            <Group align="center" justify="space-between">
              <Group gap="xs">
                <Text fw={600} size="lg">
                  {exerciseName}
                </Text>
                <ExerciseVideo />
              </Group>

              <Group gap="xs">
                <ActionIcon color="red" variant="subtle" onClick={handleDelete}>
                  <IconX size={18} />
                </ActionIcon>
                <ActionIcon variant="light" color="gray" title="Edit workout" onClick={handleEdit}>
                  <IconPencil size={18} />
                </ActionIcon>
              </Group>
            </Group>

            <Group gap="lg" mt="md">
              <Badge size="lg" variant="light" radius="md">
                {workout.sets} sets
              </Badge>
              <Badge size="lg" variant="light" radius="md">
                {workout.reps} reps
              </Badge>
            </Group>

            {workout.notes && (
              <Text size="sm" c="dimmed" fs="italic" mt="md">
                "{workout.notes}"
              </Text>
            )}
          </>
        )}
      </Paper>
    )}
  </ExerciseCard>
);
