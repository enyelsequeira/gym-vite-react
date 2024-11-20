import { useBaseTable } from '@/components/tables/use-base-table.tsx';
import { TableDrawer, TableWrapper } from '@/components/ui/table-wrapper';
import useHandlePageChangeAndFiltering from '@/hooks/use-handle-page-change-and-filtering.ts';
import useUserColumns from '@/modules/users/columns/user-columns.tsx';
import CreateNewUserModal from '@/modules/users/components/create-new-user.tsx';
import { useGetAllUsers } from '@/modules/users/queries/get-user.ts';
import { Route as UserRoute } from '@/routes/_authenticated/users/index.tsx';
import { Button, Container, Stack } from '@mantine/core';
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
        <TableWrapper tableTitle={'Users Database'}>
          <MantineReactTable table={table} />
        </TableWrapper>
        <TableDrawer opened={opened} onClose={close} title={'Add New User'}>
          <CreateNewUserModal onSuccess={close} />
        </TableDrawer>
      </Stack>
    </Container>
  );
};
export default UserView;
