import { type GetAllFoods, useGetAllFoods } from '@/server/foods.ts';
import { Box } from '@mantine/core';
import { type MRT_ColumnDef, MRT_Table, useMantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';

const FoodsView = () => {
  const { data, isLoading } = useGetAllFoods();
  const columns = useMemo<MRT_ColumnDef<GetAllFoods>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'servingSize',
        header: 'Serving Size',
      },
      {
        accessorKey: 'protein',
        header: 'Protein',
      },
      {
        accessorKey: 'fat',
        header: 'Fat',
      },
      {
        accessorKey: 'carbs',
        header: 'Carbs',
      },
      {
        accessorKey: 'calories',
        header: 'Calories',
      },
    ],
    []
  );
  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
      // className: clsx(classes.table),
      highlightOnHover: false,
      striped: 'odd',
      withColumnBorders: true,
      withRowBorders: true,
      withTableBorder: true,
    },
  });
  return (
    <Box>
      <MRT_Table table={table} />
    </Box>
  );
};

export default FoodsView;
