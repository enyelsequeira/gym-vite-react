import { useSession } from '@/providers/auth.tsx';
import {
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

function ProfilePage() {
  const { session } = useSession();
  const form = useForm({
    initialValues: {
      firstName: session.user?.name,
      lastName: session.user?.lastName,
      emailAddress: '',
      city: '',
      country: '',
      age: '',
      phone: '',
    },
  });
  return (
    <Container>
      <Flex direction={'column'} gap={'sm'}>
        <Paper p={'md'}>
          <Stack mb={'md'}>
            <Text fw={'bold'} fz={'xl'} tt={'uppercase'}>
              Personal Settings
            </Text>
            <Text fw={500} fz={'lg'} c={'dimmed'}>
              Update your profile information, please fill out the form below.
            </Text>
          </Stack>
          <form>
            <Grid>
              <Grid.Col span={6}>
                <TextInput label="First Name" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Last Name" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Email Address" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Age" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput label="City" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Country" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Phone" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Occupation" />
              </Grid.Col>
            </Grid>
            <Group justify="flex-end" my={'md'}>
              <Button px={'lg'} leftSection={<IconDeviceFloppy />}>
                Save
              </Button>
            </Group>
          </form>
        </Paper>
        <Divider color={'blue'} my={'xs'} />
        <Paper p={'md'}>
          <Stack mb={'md'}>
            <Text fw={'bold'} fz={'xl'} tt={'uppercase'}>
              Personal Goals
            </Text>
            <Text fw={500} fz={'lg'} c={'dimmed'}>
              Adjust or modify your personal goals, please fill out the form below.
            </Text>
          </Stack>
          <form>
            <Grid>
              <Grid.Col span={6}>
                <TextInput label="Current Weight" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Goal Weight" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Workout Days" />
              </Grid.Col>

              <Grid.Col span={6}>
                <TextInput label="Preffered Foods" />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput label="Foods to Avoid" />
              </Grid.Col>
            </Grid>
            <Group justify="flex-end" my={'md'}>
              <Button px={'lg'} leftSection={<IconDeviceFloppy />}>
                Save
              </Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </Container>
  );
}

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage,
});
