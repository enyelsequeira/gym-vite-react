import FoodsView from '@/modules/foods';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

// Define search params schema with Zod
const searchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  name: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/food')({
  component: FoodsPage,
  validateSearch: zodSearchValidator(searchSchema),
});

function FoodsPage() {
  return <FoodsView />;
}
