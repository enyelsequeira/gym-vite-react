import CreateNewButton from '@/components/ui/buttons/create-button.tsx';
import FormSection from '@/components/ui/forms/form-section.tsx';
import { useChangePassword } from '@/server/change-password.tsx';
import { useGetMe } from '@/server/get-me.ts';
import { Alert, Container, Grid, Group, PasswordInput } from '@mantine/core';
import { isNotEmpty, matchesField, useForm } from '@mantine/form';
import { IconInfoCircle } from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/change-password')({
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const { data } = useGetMe();
  const icon = <IconInfoCircle />;
  const { mutate, isPending } = useChangePassword();

  const form = useForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: isNotEmpty('Current password is required'),
      newPassword: (value, values) =>
        value === values.currentPassword
          ? 'New Password cannot be the same as the current password'
          : isNotEmpty('New Password cannot be empty')(value),
      confirmPassword: matchesField('newPassword', 'Passwords are not the same'),
    },
  });
  return (
    <Container px={'xs'}>
      {data?.firstLogin ? (
        <Alert
          variant="light"
          color="blue"
          title={`Hello ${data?.name.toUpperCase()}, `}
          icon={icon}
          my={'xl'}
          fw={600}
          c={'yellow.8'}
        >
          It seems like this is the first time logging in, before continuing please change your
          temporary password that was given to you. This will make your account more secure and
          accessible only to you
        </Alert>
      ) : null}

      <FormSection title="Change Password">
        <form
          onSubmit={form.onSubmit((d) => {
            mutate(
              {
                ...d,
              },
              {
                onSuccess() {
                  form.reset();
                },
              }
            );
          })}
        >
          <Grid mt="md">
            <Grid.Col span={12}>
              <PasswordInput
                maw={440}
                label="Current Password"
                placeholder="Current Password"
                variant={'filled'}
                radius={'md'}
                {...form.getInputProps('currentPassword')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                label="New Password"
                placeholder="Enter new Password"
                variant={'filled'}
                radius={'md'}
                {...form.getInputProps('newPassword')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PasswordInput
                label="Confirm New Password"
                placeholder="Confirm new password"
                variant={'filled'}
                radius={'md'}
                {...form.getInputProps('confirmPassword')}
              />
            </Grid.Col>
          </Grid>
          <Group justify="flex-end" mt="xl">
            <CreateNewButton type={'submit'} isPending={isPending}>
              Change Password
            </CreateNewButton>
          </Group>
        </form>
      </FormSection>
    </Container>
  );
}
