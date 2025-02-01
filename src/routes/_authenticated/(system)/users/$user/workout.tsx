import { DAYS } from '@/modules/users/user/week-workout';
import WorkoutMainView from '@/modules/users/workouts';
import {
  type Workout,
  WorkoutFormProvider,
  useWorkoutForm,
} from '@/modules/users/workouts/context/work-out-context.tsx';
import { Container } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/(system)/users/$user/workout')({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data: exerciseOptions } = useGetAllExercisesSelect({
  //   limit: 400,
  //   page: 1,
  // })
  const form = useWorkoutForm({
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
  });

  return (
    <WorkoutFormProvider form={form}>
      <Container size={'lg'}>
        <WorkoutMainView />
      </Container>
    </WorkoutFormProvider>
  );
}
