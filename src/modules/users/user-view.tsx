import CreateNewUserModal from '@/modules/users/components/create-new-user.tsx';
import { type GetAllUsers, useGetAllUsers } from '@/modules/users/queries/get-user.ts';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { type MRT_ColumnDef, MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { useMemo } from 'react';

const UserView = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useGetAllUsers();

  const columns = useMemo<MRT_ColumnDef<GetAllUsers>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 80,
      },
      {
        accessorKey: 'username',
        header: 'Username',
        size: 150,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 200,
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
        size: 200,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        size: 150,
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        size: 200,
        accessorFn: ({ createdAt }) => dayjs(createdAt).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        size: 200,
        accessorFn: ({ updatedAt }) => dayjs(updatedAt).format('DD/MM/YYYY'),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
      },
      {
        accessorKey: 'height',
        header: 'Height',
        size: 100,
        Cell: ({ cell }) =>
          cell.getValue<number>() ? <Text fz={'sm'}>{cell.getValue<number>()} cm</Text> : null,
      },
      {
        accessorKey: 'weight',
        header: 'Weight',
        size: 100,
        Cell: ({ cell }) =>
          cell.getValue<number>() ? <Text fz={'sm'}>{cell.getValue<number>()} kg</Text> : null,
      },
      {
        accessorKey: 'targetWeight',
        header: 'Target Weight',
        size: 150,
        Cell: ({ cell }) =>
          cell.getValue<number>() ? <Text fz={'sm'}>{cell.getValue<number>()} kg</Text> : null,
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 150,
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 150,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 150,
      },
      {
        accessorKey: 'occupation',
        header: 'Occupation',
        size: 200,
      },
      {
        header: 'Date of Birth',
        size: 200,
        accessorFn: ({ dateOfBirth }) =>
          dateOfBirth
            ? dayjs(dateOfBirth).isValid()
              ? dayjs(dateOfBirth).format('DD/MM/YYYY')
              : 'Invalid Date'
            : 'N/A',
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
        size: 100,
      },
      {
        accessorKey: 'activityLevel',
        header: 'Activity Level',
        size: 200,
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
