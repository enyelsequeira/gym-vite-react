import FoodsView from '@/modules/foods';
import { ExtendBaseSearchParams, nameSearchParam } from '@/utils/extend-search-params.ts';
import { createFileRoute } from '@tanstack/react-router';
import { zodSearchValidator } from '@tanstack/router-zod-adapter';

const FoodSearch = ExtendBaseSearchParams({
  name: nameSearchParam,
});

export const Route = createFileRoute('/_authenticated/food')({
  component: FoodsPage,
  validateSearch: zodSearchValidator(FoodSearch),
});

function FoodsPage() {
  return <FoodsView />;
}
