// FoodsView.tsx
import CreateNewFood from '@/modules/foods/components/create-new-food.tsx';
import { type GetAllFoods, useGetAllFoods } from '@/server/foods.ts';
import { Button, Container, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
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
      },
      {
        accessorKey: 'name',
        header: 'Name',
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
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    state: {
      density: 'xs',
    },
    mantineTableProps: {
      p: 'xs',
      striped: false,
      highlightOnHover: false,
      fz: 'sm',
    },
    mantineTableHeadProps: {
      c: 'gray.8',
      tt: 'uppercase',
      fw: 600,
    },
    mantineTableBodyCellProps: ({ row }) => ({
      c: 'blue.9',
      fw: 500,
      tt: 'capitalize',
      style:
        row.original.id < 0
          ? {
              animation: 'shimmer-and-pulse 2s infinite',
              background: `linear-gradient(
                110deg,
                transparent 33%,
                rgba(83, 109, 254, 0.2) 50%,
                transparent 67%
              )`,
              backgroundSize: '200% 100%',
              position: 'relative',
            }
          : undefined,
    }),
    renderTopToolbarCustomActions: () => <Button onClick={open}>Create New</Button>,
  });

  return (
    <Container size={'xl'}>
      <Drawer.Root opened={opened} onClose={close}>
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <Drawer.Title fw={600} fz={20} tt={'capitalize'}>
              Create New Food
            </Drawer.Title>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Body>
            <CreateNewFood onSuccess={close} />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <MantineReactTable table={table} />
      <style>
        {`
          @keyframes shimmer-and-pulse {
            0% {
              background-position: 200% 0;
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(83, 109, 254, 0.2);
            }
            50% {
              background-position: -200% 0;
              transform: scale(1.02);
              box-shadow: 0 0 0 10px rgba(83, 109, 254, 0);
            }
            100% {
              background-position: 200% 0;
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(83, 109, 254, 0);
            }
          }
        `}
      </style>
    </Container>
  );
};

export default FoodsView;
