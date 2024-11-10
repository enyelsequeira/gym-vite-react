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
  const columns = useFoodColumns();
  const [opened, { open, close }] = useDisclosure(false);

  // Get search params from the route
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

  const handleGlobalFilterChange = (value: string) => {
    navigate({
      search: {
        ...search,
        name: value || undefined,
        page: 1,
      },
    });
  };

  const handlePaginationChange = ({
    pageIndex,
    pageSize,
  }: { pageIndex: number; pageSize: number }) => {
    navigate({
      search: {
        ...search,
        page: pageIndex + 1,
        limit: pageSize,
      },
    });
  };

  const table = useBaseTable({
    columns,
    data,
    isLoading,
    isFetching,
    onGlobalFilterChange: handleGlobalFilterChange,
    onPaginationChange: handlePaginationChange,
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
        pagination: {
          pageIndex: search.page - 1,
          pageSize: search.limit,
        },
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
