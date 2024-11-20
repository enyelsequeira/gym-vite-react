import PersonalSettings from '@/modules/profile/components/personal-settings.tsx';
import { Center, Flex, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import { Suspense } from 'react';

const ProfileView = () => {
  return (
    <Flex direction="column" gap="md">
      <Paper p="lg" radius="md" withBorder bg="var(--mantine-color-body)">
        <Group mb="md" align="center">
          <IconUserCircle size={30} color="var(--mantine-color-blue-6)" />
          <Stack gap={4}>
            <Title order={4} tt="uppercase">
              Personal Settings
            </Title>
            <Text fw={500} fz="md" c="dimmed">
              Update your profile information, please fill out the form below.
            </Text>
          </Stack>
        </Group>
        <Suspense
          fallback={
            <Center p="xl">
              <Loader size="lg" color="blue" />
            </Center>
          }
        >
          <PersonalSettings />
        </Suspense>
      </Paper>
    </Flex>
  );
};

export default ProfileView;
