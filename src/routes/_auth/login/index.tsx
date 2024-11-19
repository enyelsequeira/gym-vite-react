import Logo from '@/components/logo.tsx';
import { useLogin } from '@/modules/auth/use-login.tsx';
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createFileRoute } from '@tanstack/react-router';

function LoginPage() {
  const { mutate, isPending } = useLogin();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });
  return (
    <Grid style={{ minHeight: '100vh' }}>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <Container size="xs" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <Paper w="100%" p="xl">
            {/* Logo */}
            <Flex align={'center'} gap={'xs'} w={'fit-content'}>
              <Logo />
            </Flex>

            {/* Header */}
            <Title order={2} mt="xl">
              Sign in to your account
            </Title>
            <Text c="dimmed" size="sm" mt="xs">
              Not a member?{' '}
              <Anchor href="#" fw={500}>
                Start a 14 day free trial
              </Anchor>
            </Text>

            {/* Form */}
            <form
              onSubmit={form.onSubmit((data) => {
                mutate({
                  ...data,
                });
              })}
            >
              <Stack mt="xl">
                <TextInput
                  label="Username"
                  placeholder="username"
                  required
                  {...form.getInputProps('username')}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps('password')}
                />

                <Group justify="space-between">
                  <Checkbox label="Remember me" />
                  <Anchor component="button" size="sm">
                    Forgot password?
                  </Anchor>
                </Group>

                <Button fullWidth type="submit" loading={isPending}>
                  Sign in
                </Button>
              </Stack>
            </form>

            {/* Social Login */}
            <Divider label="Or continue with" labelPosition="center" my="lg" />

            <Group grow mb="md" mt="md">
              <Button variant="default">Google</Button>

              <Button variant="default">GitHub</Button>
            </Group>
          </Paper>
        </Container>
      </Grid.Col>

      {/* Image Section */}
      <Grid.Col span={{ base: 0, lg: 6 }} w={'100%'} visibleFrom={'lg'}>
        <Image
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e"
          alt="Login background"
        />
      </Grid.Col>
    </Grid>
  );
}

export const Route = createFileRoute('/_auth/login/')({
  component: LoginPage,
});
