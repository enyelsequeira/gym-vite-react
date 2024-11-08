import { API } from '@/server/index.ts';
import { queryOptions, useQuery } from '@tanstack/react-query';

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

export const GET_ALL_FOODS = 'all-foods' as const;

export const getFoodOptions = () => {
  return queryOptions({
    queryKey: [GET_ALL_FOODS],
    queryFn: async () => {
      try {
        return await API.get('/foods')
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json<GetAllFoods[]>();
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
  });
};

export const useGetAllFoods = () => {
  return useQuery({
    ...getFoodOptions(),
  });
};
