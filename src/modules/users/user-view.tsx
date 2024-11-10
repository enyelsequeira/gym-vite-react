import useUserColumns from '@/modules/users/columns/user-columns.tsx';
import CreateNewUserModal from '@/modules/users/components/create-new-user.tsx';
import { useGetAllUsers } from '@/modules/users/queries/get-user.ts';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useState } from 'react';

const UserView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const columns = useUserColumns();
  const [globalFilter, setGlobalFilter] = useState('');

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const { data, isLoading } = useGetAllUsers({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    username: globalFilter,
  });

  const table = useMantineReactTable({
    columns,
    data: data?.data ?? [],
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: true,
    enableSorting: false,
    enableDensityToggle: false,
    enableHiding: false,
    enableFullScreenToggle: false,
    paginationDisplayMode: 'pages',
    manualPagination: true,
    enableFilterMatchHighlighting: false,

    rowCount: data?.page?.totalElements ?? 0,
    manualFiltering: true,
    onGlobalFilterChange: setGlobalFilter, //hoist internal global state to your state

    state: {
      globalFilter,
      pagination,
      isLoading,
    },
    initialState: {
      density: 'xs',
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onPaginationChange: setPagination,
    mantinePaginationProps: {
      showRowsPerPage: false,
      withEdges: true,
      radius: 'md',
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
              Users Database
            </Text>
          </Card.Section>
          <MantineReactTable table={table} />
        </Card>

        <Drawer
          opened={opened}
          onClose={close}
          title={
            <Text fw={500} size="lg" c="blue.7">
              Add New User
            </Text>
          }
          position="right"
          size="md"
        >
          <CreateNewUserModal onSuccess={close} />
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
export default UserView;
