import { useBaseTable } from '@/components/tables/use-base-table.tsx';
import useHandlePageChangeAndFiltering from '@/hooks/use-handle-page-change-and-filtering.ts';
import useExerciseColumns from '@/modules/exercises/columns';
import CreateNewExercise from '@/modules/exercises/components/create-new-exercise.tsx';
import { useGetAllExercises } from '@/modules/exercises/queries/get-all-exercices.ts';
import { Route as ExerciseRoute } from '@/routes/_authenticated/exercises';
import { Button, Card, Container, Drawer, Stack, Text } from '@mantine/core';
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
        globalFilter: search.name,
      },
    },
  });

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <Card padding={'md'} radius="md" withBorder>
          <Card.Section withBorder inheritPadding py="xs" bg="blue.0" mb={'lg'}>
            <Text fw={500} c="blue.7">
              Exercise Database
            </Text>
          </Card.Section>
          <MantineReactTable table={table} />
        </Card>

        <Drawer
          opened={opened}
          onClose={close}
          title={
            <Text fw={500} size="lg" c="blue.7">
              Add New Exercise
            </Text>
          }
          position="right"
          size="md"
        >
          <CreateNewExercise
            onSuccess={() => {
              close();
            }}
          />
        </Drawer>
      </Stack>
    </Container>
  );
};
export default ExercisesView;
