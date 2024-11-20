import ExercisesView from '@/modules/exercises/exercises.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

// Define search params schema with Zod
const searchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  name: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/exercises')({
  component: RouteComponent,
  validateSearch: zodSearchValidator(searchSchema),
});

function RouteComponent() {
  return <ExercisesView />;
}
