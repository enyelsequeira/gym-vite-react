import PersonalSettings from '@/modules/profile/components/personal-settings.tsx';
import { Center, Flex, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import { type PropsWithChildren, Suspense } from 'react';

const StyledPaper = ({ children }: PropsWithChildren) => (
  <Paper p="lg" radius="md" withBorder bg="var(--mantine-color-body)">
    {children}
  </Paper>
);

const ProfileView = () => {
  return (
    <Flex direction="column" gap="md">
      <StyledPaper>
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
      </StyledPaper>
    </Flex>
  );
};

export default ProfileView;
