import { type PaginationParams, createPaginatedQuery } from '@/utils/create-api-fetcher.ts';

export type Exercise = {
  id: number;
  name: string;
  notes: string;
  alternative: string;
  video: string;
  createdAt: string;
  updatedAt: string;
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
