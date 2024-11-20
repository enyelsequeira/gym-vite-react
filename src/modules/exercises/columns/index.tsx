import type { Exercise } from '@/modules/exercises/queries/get-all-exercices.ts';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';

const useExerciseColumns = () => {
  return useMemo<MRT_ColumnDef<Exercise>[]>(
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
        accessorKey: 'alternative',
        header: 'Alternative',
        size: 150,
      },
      {
        accessorKey: 'video',
        header: 'Video',
        size: 120,
      },
    ],
    []
  );
};
export default useExerciseColumns;
