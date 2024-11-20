import { useBaseTable } from '@/components/tables/use-base-table';
import { TableDrawer, TableWrapper } from '@/components/ui/table-wrapper';
import useHandlePageChangeAndFiltering from '@/hooks/use-handle-page-change-and-filtering.ts';
import useFoodColumns from '@/modules/foods/columns/food';
import CreateNewFood from '@/modules/foods/components/create-new-food';
import { useGetAllFoods } from '@/server/foods';
import { Button, Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable } from 'mantine-react-table';
import { Route as FoodRoute } from '../../routes/_authenticated/food';

const FoodsView = () => {
  const route = FoodRoute.useSearch();
  const { handlePageChange, handleGlobalFilterChange } = useHandlePageChangeAndFiltering();
  const columns = useFoodColumns();
  const [opened, { open, close }] = useDisclosure(false);

  const search = FoodRoute.useSearch();

  // Use search params in the query
  const { data, isLoading, isFetching } = useGetAllFoods({
    limit: search.limit,
    page: search.page,
    name: search.name,
  });

  const table = useBaseTable({
    columns,
    data,
    isLoading,
    isFetching,
    onGlobalFilterChange: (e) => handleGlobalFilterChange({ value: e, searchParam: 'name' }),
    paginationOptions: {
      activePage: route.page,
      onPageChange: handlePageChange,
      totalPages: data?.page?.totalPages || 0,
    },
    tableOptions: {
      renderTopToolbarCustomActions: () => (
        <Button
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan' }}
          radius="md"
          leftSection={<IconPlus size={20} />}
          onClick={open}
        >
          Create New
        </Button>
      ),
      state: {
        globalFilter: search.name,
      },
    },
  });

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <TableWrapper tableTitle={'Food Database'}>
          <MantineReactTable table={table} />
        </TableWrapper>
        <TableDrawer opened={opened} onClose={close} title={'Add New Food'}>
          <CreateNewFood onSuccess={close} />
        </TableDrawer>
      </Stack>
    </Container>
  );
};

export default FoodsView;
