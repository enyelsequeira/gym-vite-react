import UserView from '@/modules/users/user-view.tsx';
import { ExtendBaseSearchParams } from '@/utils/extend-search-params.ts';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';
import { z } from 'zod';

const UserSearchParams = ExtendBaseSearchParams({
  username: z.string().optional(),
});

export const Route = createFileRoute('/_authenticated/users/')({
  component: UsersPage,
  validateSearch: zodSearchValidator(UserSearchParams),
});

function UsersPage() {
  return <UserView />;
}
