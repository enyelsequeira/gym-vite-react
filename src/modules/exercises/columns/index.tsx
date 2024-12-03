import VideoPlayer from '@/components/video-player';
import type { Exercise } from '@/modules/exercises/queries/get-all-exercices.ts';
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
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
        accessorKey: 'muscleGroup',
        header: 'Muscle Group',
        size: 150,
      },
      {
        accessorKey: 'video',
        header: 'Video',
        size: 120,
        Cell: ({ cell }) => {
          return (
            <Button
              px={0}
              variant={'transparent'}
              onClick={() => {
                modals.open({
                  closeOnClickOutside: false,
                  size: 'lg',
                  centered: true,
                  title: (
                    <Text fz={'lg'} fw={600}>
                      Tutorial
                    </Text>
                  ),
                  children: <VideoPlayer url={cell.getValue() as string} />,
                });
              }}
            >
              Tutorial
            </Button>
          );
        },
      },
    ],
    []
  );
};
export default useExerciseColumns;
