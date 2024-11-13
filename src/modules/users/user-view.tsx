import { useBaseTable } from '@/components/tables/use-base-table.tsx';
import useUserColumns from '@/modules/users/columns/user-columns.tsx';
import CreateNewUserModal from '@/modules/users/components/create-new-user.tsx';
import { useGetAllUsers } from '@/modules/users/queries/get-user.ts';
import { Route as UserRoute } from '@/routes/_authenticated/users/index.tsx';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable } from 'mantine-react-table';

const UserView = () => {
  const search = UserRoute.useSearch();
  const navigate = UserRoute.useNavigate();

  const [opened, { open, close }] = useDisclosure(false);
  const columns = useUserColumns();

  const { data, isLoading, isFetching } = useGetAllUsers({
    limit: search.limit,
    page: search.page,
    username: search.username,
  });

  const handlePageChange = async (page: number) => {
    await navigate({
      search: {
        ...search,
        page,
      },
    });
  };

  const handleGlobalFilterChange = async (value: string) => {
    if (value !== search.username) {
      await navigate({
        search: {
          ...search,
          username: value,
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
      activePage: search.page ?? 1,
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
        globalFilter: search.username,
      },
    },
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
    </Container>
  );
};
export default UserView;
