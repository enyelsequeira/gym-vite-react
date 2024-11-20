import type { Exercise } from '@/modules/exercises/queries/get-all-exercices.ts';
import { Button, Card, Group, Image, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import type { MRT_ColumnDef } from 'mantine-react-table';
import { useMemo } from 'react';
import ReactPlayer from 'react-player/youtube';

const getCleanYoutubeUrl = (url: string) => {
  try {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
  } catch (e) {
    return url;
  }
};

const VideoPlayer = ({ url }: { url: string }) => {
  const cleanUrl = getCleanYoutubeUrl(url);
  const isYoutubeUrl = cleanUrl?.includes('youtube.com') || cleanUrl?.includes('youtu.be');

  if (isYoutubeUrl) {
    return (
      <ReactPlayer
        url={cleanUrl}
        width="100%"
        controls={true}
        playsinline={false}
        playing={false} // Don't autoplay
        volume={0.8} // Set default volume to 80%
        onError={(e) => console.log({ e })}
        onReady={() => console.log('Video ready to play')}
      />
    );
  }
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src="./404.svg" height={160} alt="video not found" />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>OPPS seems like the video is not working</Text>
      </Group>

      <Button color="blue" fullWidth mt="md" radius="md" onClick={modals.closeAll}>
        Close
      </Button>
    </Card>
  );
};

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
