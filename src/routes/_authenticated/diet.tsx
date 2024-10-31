import { createFileRoute } from '@tanstack/react-router';

const DietPage = () => {};

export const Route = createFileRoute('/_authenticated/diet')({
  component: () => <div>Hello /_authenticated/diet!</div>,
});
