import ExercisesView from '@/modules/exercises/exercises.tsx';
import { ExtendBaseSearchParams, nameSearchParam } from '@/utils/extend-search-params.ts';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';

const ExerciseSchema = ExtendBaseSearchParams({
  name: nameSearchParam,
});

export const Route = createFileRoute('/_authenticated/exercises')({
  component: RouteComponent,
  validateSearch: zodSearchValidator(ExerciseSchema),
});

function RouteComponent() {
  return <ExercisesView />;
}
