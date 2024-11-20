import { useBaseTable } from '@/components/tables/use-base-table.tsx';
import useHandlePageChangeAndFiltering from '@/hooks/use-handle-page-change-and-filtering.ts';
import useUserColumns from '@/modules/users/columns/user-columns.tsx';
import CreateNewUserModal from '@/modules/users/components/create-new-user.tsx';
import { useGetAllUsers } from '@/modules/users/queries/get-user.ts';
import { Route as UserRoute } from '@/routes/_authenticated/users/index.tsx';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable } from 'mantine-react-table';

const UserView = () => {
  const { handlePageChange, handleGlobalFilterChange } = useHandlePageChangeAndFiltering();
  const search = UserRoute.useSearch();

  const [opened, { open, close }] = useDisclosure(false);
  const columns = useUserColumns();

  const { data, isLoading, isFetching } = useGetAllUsers({
    limit: search.limit,
    page: search.page,
    username: search.username,
  });

  const table = useBaseTable({
    columns,
    data,
    isLoading,
    isFetching,
    onGlobalFilterChange: (e) =>
      handleGlobalFilterChange({
        searchParam: 'username',
        value: e,
      }),
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
