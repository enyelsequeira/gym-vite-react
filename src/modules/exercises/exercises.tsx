import { useBaseTable } from '@/components/tables/use-base-table.tsx';
import GenericButton from '@/components/ui/buttons/create-button.tsx';
import { TableDrawer, TableWrapper } from '@/components/ui/table-wrapper';
import useHandlePageChangeAndFiltering from '@/hooks/use-handle-page-change-and-filtering.ts';
import useExerciseColumns from '@/modules/exercises/columns';
import CreateNewExercise from '@/modules/exercises/components/create-new-exercise.tsx';
import { useGetAllExercises } from '@/modules/exercises/queries/get-all-exercices.ts';
import { Route as ExerciseRoute } from '@/routes/_authenticated/(system)/exercises.tsx';
import { Container, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { MantineReactTable } from 'mantine-react-table';

const ExercisesView = () => {
  const { handlePageChange, handleGlobalFilterChange } = useHandlePageChangeAndFiltering();
  const route = ExerciseRoute.useSearch();
  const columns = useExerciseColumns();

  const search = ExerciseRoute.useSearch();
  const { data, isLoading, isFetching } = useGetAllExercises({
    limit: search.limit,
    page: search.page,
    name: search.name,
  });

  const table = useBaseTable({
    columns,
    data,
    isLoading,
    isFetching,
    onGlobalFilterChange: (e) =>
      handleGlobalFilterChange({
        value: e,
        searchParam: 'name',
      }),
    paginationOptions: {
      activePage: route.page,
      onPageChange: handlePageChange,
      totalPages: data?.page?.totalPages || 0,
    },
    tableOptions: {
      renderTopToolbarCustomActions: () => (
        <GenericButton leftSection={<IconPlus />} onClick={open}>
          Create New
        </GenericButton>
      ),
      state: {
        globalFilter: search.name,
      },
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <TableWrapper tableTitle={'Exercise Database'}>
          <MantineReactTable table={table} />
        </TableWrapper>
        <TableDrawer opened={opened} onClose={close} title={'Add New Exercise'}>
          <CreateNewExercise
            onSuccess={() => {
              close();
            }}
          />
        </TableDrawer>
      </Stack>
    </Container>
  );
};
export default ExercisesView;
