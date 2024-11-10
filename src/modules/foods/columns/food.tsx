import type { GetAllFoods } from '@/server/foods.ts';
import { Text } from '@mantine/core';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

const useFoodColumns = () => {
  return useMemo<MRT_ColumnDef<GetAllFoods>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'category',
        header: 'Category',
        size: 150,
      },
      {
        accessorKey: 'servingSize',
        header: 'Serving Size',
        size: 120,
      },
      {
        accessorKey: 'protein',
        header: 'Protein',
        size: 100,
        Cell: ({ cell }) => <Text fz={'sm'}>{cell.getValue<number>()}g</Text>,
      },
      {
        accessorKey: 'fat',
        header: 'Fat',
        size: 100,
        Cell: ({ cell }) => <Text fz={'sm'}>{cell.getValue<number>()}g</Text>,
      },
      {
        accessorKey: 'carbs',
        header: 'Carbs',
        size: 100,
        Cell: ({ cell }) => <Text fz={'sm'}>{cell.getValue<number>()}g</Text>,
      },
      {
        accessorKey: 'calories',
        header: 'Calories',
        size: 100,
        Cell: ({ cell }) => <Text fz={'sm'}>{cell.getValue<number>()}kcal</Text>,
      },
    ],
    []
  );
};
export default useFoodColumns;
