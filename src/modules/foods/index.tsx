import { useBaseTable } from '@/components/tables/use-base-table.tsx';
import useFoodColumns from '@/modules/foods/columns/food.tsx';
import CreateNewFood from '@/modules/foods/components/create-new-food';
import { useGetAllFoods } from '@/server/foods';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable } from 'mantine-react-table';
import { useState } from 'react';

const FoodsView = () => {
  const columns = useFoodColumns();
  const [opened, { open, close }] = useDisclosure(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isFetching } = useGetAllFoods({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    name: globalFilter,
  });

  const handleSuccess = () => {
    close();
  };

  const table = useBaseTable({
    columns,
    data,
    isLoading,
    isFetching,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
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
