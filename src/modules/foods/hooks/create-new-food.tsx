import { API } from '@/server';
import type { GetAllFoods } from '@/server/foods.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type CreateNewFoodType = Pick<
  GetAllFoods,
  | 'name'
  | 'brand'
  | 'category'
  | 'servingSize'
  | 'servingUnit'
  | 'calories'
  | 'protein'
  | 'fat'
  | 'carbs'
  | 'picture'
  | 'barcode'
>;

export const useCreateNewFood = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-new-food'],
    mutationFn: async (data: CreateNewFoodType) => {
      try {
        // Add artificial delay
        await new Promise((resolve) => setTimeout(resolve, 8000));

        const res = await API.url('/foods')
          .post(data)
          .unauthorized(() => {
            console.log('Unauthorized');
          })
          .json<GetAllFoods>();
        return res;
      } catch (e) {
        console.log({ e });
        throw e;
      }
    },
    onMutate: async (newFood: CreateNewFoodType) => {
      await queryClient.cancelQueries({ queryKey: ['all-foods'] });

      const previousFoods = queryClient.getQueryData<GetAllFoods[]>(['all-foods']);

      const optimisticFood: GetAllFoods = {
        id: -Math.random(), // Using negative ID to identify optimistic entries
        ...newFood,
        verified: false,
        createdBy: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<GetAllFoods[]>(['all-foods'], (old) =>
        old ? [...old, optimisticFood] : [optimisticFood]
      );

      return { previousFoods };
    },
    onError: (_e, _, context) => {
      if (context?.previousFoods) {
        queryClient.setQueryData(['all-foods'], context.previousFoods);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['all-foods'] });
    },
  });
};
