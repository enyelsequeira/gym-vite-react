import { type PaginationParams, createPaginatedQuery } from '@/utils/create-api-fetcher.ts';

export type Exercise = {
  id: number;
  name: string;
  notes: string;
  alternative: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  muscleGroup: string;
};

type ExerciseQueryParams = PaginationParams & {
  name?: string;
};

export const GET_ALL_EXERCISES = 'all-foods' as const;

export const useGetAllExercises = createPaginatedQuery<Exercise, ExerciseQueryParams>({
  queryKey: [GET_ALL_EXERCISES],
  endpoint: '/exercises',
  debounceFields: ['name'],
});

export const useGetAllExercisesSelect = createPaginatedQuery<
  Exercise,
  ExerciseQueryParams,
  { group: string; items: { value: string; label: string }[] }[]
>({
  queryKey: [GET_ALL_EXERCISES],
  endpoint: '/exercises',
  select: (response) => {
    const groupedExercises = response.data.reduce(
      (acc, exercise) => {
        if (!acc[exercise.muscleGroup]) {
          acc[exercise.muscleGroup] = [];
        }
        acc[exercise.muscleGroup].push({
          value: exercise.id.toString(),
          label: exercise.name,
        });
        return acc;
      },
      {} as Record<string, { value: string; label: string }[]>
    );

    return Object.entries(groupedExercises).map(([muscleGroup, exercises]) => ({
      group: muscleGroup,
      items: exercises,
    }));
  },
});
