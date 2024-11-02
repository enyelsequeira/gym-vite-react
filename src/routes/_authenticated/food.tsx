import FoodsView from '@/modules/foods';
import { createFileRoute } from '@tanstack/react-router';

const FoodsPage = () => {
  return <FoodsView />;
};

export const Route = createFileRoute('/_authenticated/food')({
  component: FoodsPage,
});
