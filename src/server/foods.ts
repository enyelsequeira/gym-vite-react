import { type PaginationParams, createPaginatedQuery } from '@/utils/create-api-fetcher.ts';

export type GetAllFoods = {
  id: number;
  name: string;
  brand: string;
  category: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  picture: string;
  barcode: string;
  verified: boolean;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
};

type FoodQueryParams = PaginationParams & {
  name?: string;
};

export const GET_ALL_FOODS = 'all-foods' as const;

export const useGetAllFoods = createPaginatedQuery<GetAllFoods, FoodQueryParams>({
  queryKey: [GET_ALL_FOODS],
  endpoint: '/foods',
  debounceFields: ['name'],
});
