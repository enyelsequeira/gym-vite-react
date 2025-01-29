import {
  Button,
  Center,
  Group,
  Modal,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { IconClock } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface ExerciseTimerModalProps {
  opened: boolean;
  onClose: () => void;
  exerciseName: string;
  totalSets: number;
  onComplete: () => void;
}

type TimerState = 'selecting' | 'countdown' | 'completed';

const timeOptions = [
  { label: '30 Seconds', value: 30 },
  { label: '1 Minute', value: 60 },
  { label: '2 Minutes', value: 120 },
  { label: 'Custom', value: -1 },
];

export const ExerciseTimerModal = ({
  opened,
  onClose,
  exerciseName,
  totalSets,
  onComplete,
}: ExerciseTimerModalProps) => {
  const [timerState, setTimerState] = useState<TimerState>('selecting');
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [setsLeft, handlers] = useCounter(totalSets, { min: 0, max: totalSets });
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (opened) {
      // Reset state when modal opens
      setTimerState('selecting');
      handlers.set(totalSets);
      if (timerInterval) clearInterval(timerInterval);
    }
  }, [opened]);

  useEffect(() => {
    if (timeLeft === 0 && timerState === 'countdown') {
      if (timerInterval) clearInterval(timerInterval);

      const newSetsLeft = setsLeft - 1;
      handlers.decrement();

      if (newSetsLeft > 0) {
        // If there are sets remaining, go back to selection
        setTimerState('selecting');
      } else {
        // If all sets are complete, show completion and auto-close
        setTimerState('completed');
        setTimeout(() => {
          onComplete();
          onClose();
        }, 1500);
      }
    }
  }, [timeLeft, timerState]);

  const startTimer = (seconds: number) => {
    setSelectedTime(seconds);
    setTimeLeft(seconds);
    setTimerState('countdown');

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    setTimerInterval(interval);
  };

  const getTimeDisplay = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <ThemeIcon size="lg" radius="xl" color="blue">
            <IconClock size={20} />
          </ThemeIcon>
          <Text fw={600}>{exerciseName}</Text>
        </Group>
      }
      centered
      size="sm"
    >
      <Stack gap="xl">
        {timerState === 'selecting' && (
          <>
            <Text size="lg" fw={500} ta="center">
              {setsLeft} {setsLeft === 1 ? 'set' : 'sets'} remaining
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Select rest time
            </Text>
            <SimpleGrid cols={2}>
              {timeOptions.map((option) => (
                <Button
                  key={option.value}
                  variant="light"
                  color="blue"
                  onClick={() => {
                    if (option.value === -1) {
                      // Handle custom time input
                      const time = window.prompt('Enter time in seconds');
                      if (time && !isNaN(Number(time))) {
                        startTimer(Number(time));
                      }
                    } else {
                      startTimer(option.value);
                    }
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </SimpleGrid>
          </>
        )}

        {timerState === 'countdown' && (
          <>
            <Center>
              <Text size="xl" fw={700}>
                {getTimeDisplay()}
              </Text>
            </Center>
            <Progress value={(timeLeft / selectedTime) * 100} size="xl" radius="xl" color="blue" />
            <Text size="sm" ta="center" c="dimmed">
              Rest time remaining
            </Text>
          </>
        )}

        {timerState === 'completed' && (
          <Center>
            <Text size="xl" fw={700} c="green">
              Exercise Complete!
            </Text>
          </Center>
        )}
      </Stack>
    </Modal>
  );
};
