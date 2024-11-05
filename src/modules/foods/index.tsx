import CreateNewFood from '@/modules/foods/components/create-new-food';
import { type GetAllFoods, useGetAllFoods } from '@/server/foods';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { type MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';

const FoodsView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useGetAllFoods();

  const columns = useMemo<MRT_ColumnDef<GetAllFoods>[]>(
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

  const table = useMantineReactTable({
    columns,
    data: data ?? [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    enableBottomToolbar: false,
    initialState: {
      density: 'xs',
    },
    mantineTableProps: {
      p: 'xs',
      striped: false,
      highlightOnHover: false,
      fz: 'sm',
    },
    mantinePaperProps: {
      p: 8,
    },
    mantineTableHeadCellProps: {
      align: 'left',
      style: {
        backgroundColor: 'blue.0',
        color: 'blue.7',
        fontWeight: 500,
        textTransform: 'uppercase',
      },
    },

    mantineTableBodyRowProps: ({ row }) => ({
      style:
        row.original.id < 0
          ? {
              animation: 'shimmer-and-pulse 2s infinite',
              background: `linear-gradient(
                110deg,
                var(--mantine-color-white) 0%,
                var(--mantine-color-blue-1) 50%,
                var(--mantine-color-white) 100%
              )`,
              backgroundSize: '200% 100%',
            }
          : undefined,
    }),
    mantineTableBodyCellProps: {
      color: 'blue.7',
    },
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
          <CreateNewFood onSuccess={close} />
        </Drawer>
      </Stack>

      <style>
        {`
          @keyframes shimmer-and-pulse {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default FoodsView;
