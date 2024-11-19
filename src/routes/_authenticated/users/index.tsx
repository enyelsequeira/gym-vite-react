import UserView from '@/modules/users/user-view.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

const searchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(10),
  username: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersPage,
  validateSearch: zodSearchValidator(searchSchema),
});

function UsersPage() {
  return <UserView />;
}
