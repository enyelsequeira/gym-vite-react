import { Button, Card, Group, Image, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
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

export default VideoPlayer;
