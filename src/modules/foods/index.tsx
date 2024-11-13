import { useBaseTable } from '@/components/tables/use-base-table';
import useFoodColumns from '@/modules/foods/columns/food';
import CreateNewFood from '@/modules/foods/components/create-new-food';
import { useGetAllFoods } from '@/server/foods';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable } from 'mantine-react-table';
import { Route as FoodRoute } from '../../routes/_authenticated/food';

const FoodsView = () => {
  const route = FoodRoute.useSearch();
  const columns = useFoodColumns();
  const [opened, { open, close }] = useDisclosure(false);

  const search = FoodRoute.useSearch();
  const navigate = FoodRoute.useNavigate();

  // Use search params in the query
  const { data, isLoading, isFetching } = useGetAllFoods({
    limit: search.limit,
    page: search.page,
    name: search.name,
  });

  const handleSuccess = () => {
    close();
  };

  const handlePageChange = async (page: number) => {
    await navigate({
      search: {
        ...search,
        page,
      },
    });
  };

  const handleGlobalFilterChange = async (value: string) => {
    if (value !== search.name) {
      await navigate({
        search: {
          ...search,
          name: value,
          // Don't reset page if clearing the filter
          page: value ? 1 : search.page,
        },
      });
    }
  };

  const table = useBaseTable({
    columns,
    data,
    isLoading,
    isFetching,
    onGlobalFilterChange: handleGlobalFilterChange,
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
        <Card padding={'md'} radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs" bg="blue.0" mb={'lg'}>
            <Text fw={500} c="blue.7">
              Food Database
            </Text>
          </Card.Section>
          <MantineReactTable table={table} />
        </Card>

        <Drawer
          opened={opened}
          onClose={close}
          title={
            <Text fw={500} size="lg" c="blue.7">
              Add New Food
            </Text>
          }
          position="right"
          size="md"
        >
          <CreateNewFood onSuccess={handleSuccess} />
        </Drawer>
      </Stack>
    </Container>
  );
};

export default FoodsView;
