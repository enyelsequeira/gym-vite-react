import PhoneInput from '@/modules/profile/components/phone-input-matine';
import { useCreateNewUser } from '@/modules/users/hooks/create-new-user.tsx';
import { Button, Card, Grid, Group, Select, Stack, Text, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';
import dayjs from 'dayjs';
import type { ReactNode } from 'react';
import { defaultCountries } from 'react-international-phone';

type FormSectionProps = {
  title: string;
  children: ReactNode;
};

const FormSection = ({ title, children }: FormSectionProps) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section withBorder inheritPadding py="xs" bg="var(--mantine-color-blue-0)">
      <Text fw={500} c="var(--mantine-color-blue-7)">
        {title}
      </Text>
    </Card.Section>
    {children}
  </Card>
);

const PersonalTextInput = TextInput.withProps({
  variant: 'filled',
  radius: 'md',
});

const transformCountriesData = () => {
  return defaultCountries.map((country) => {
    const [countryName, countryCode] = country;
    return {
      label: countryName,
      value: countryCode.toUpperCase(),
    };
  });
};

interface CreateNewUserModalProps {
  onSuccess?: () => void;
}

const CreateNewUserModal = ({ onSuccess }: CreateNewUserModalProps) => {
  const { mutate, isPending } = useCreateNewUser();
  const form = useForm({
    initialValues: {
      username: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      type: 'USER',
      city: '',
      country: '',
      phone: '',
      occupation: '',
      height: undefined,
      weight: undefined,
      targetWeight: undefined,
      dateOfBirth: new Date(),
      gender: undefined,
      activityLevel: undefined,
    },
    validate: {
      username: isNotEmpty("Username can't be empty"),
      email: isNotEmpty("Email can't be empty"),
      password: isNotEmpty('<PASSWORD>'),
      name: isNotEmpty("Name can't be empty"),
      lastName: isNotEmpty("Last name can't be empty"),
    },
    transformValues: (values) => {
      return {
        ...values,
        height: values.height ? Number(values.height) : undefined,
        weight: values.weight ? Number(values.weight) : undefined,
        targetWeight: values.targetWeight ? Number(values.targetWeight) : undefined,
      };
    },
  });

  return (
    <form
      id="create-user-form"
      onSubmit={form.onSubmit((data) => {
        onSuccess?.();
        mutate({
          ...data,
          dateOfBirth: dayjs(data.dateOfBirth).format(),
        });
      })}
    >
      <Stack gap="md">
        {/* Account Information Section */}
        <FormSection title="Account Information">
          <Grid mt="md">
            <Grid.Col span={6}>
              <PersonalTextInput
                label="Username"
                placeholder="Enter username"
                required
                {...form.getInputProps('username')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PersonalTextInput
                label="Email Address"
                placeholder="Enter email address"
                required
                {...form.getInputProps('email')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PersonalTextInput
                label="Password"
                type="password"
                placeholder="Enter password"
                required
                {...form.getInputProps('password')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="User Type"
                placeholder="Select user type"
                data={['USER', 'ADMIN']}
                required
                variant="filled"
                radius="md"
                {...form.getInputProps('type')}
              />
            </Grid.Col>
          </Grid>
        </FormSection>

        {/* Personal Information Section */}
        <FormSection title="Personal Information">
          <Grid mt="md">
            <Grid.Col span={6}>
              <PersonalTextInput
                label="First Name"
                placeholder="Enter first name"
                required
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PersonalTextInput
                label="Last Name"
                placeholder="Enter last name"
                required
                {...form.getInputProps('lastName')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <DatePickerInput
                variant="filled"
                radius="md"
                maxDate={new Date()}
                label="Date of Birth"
                placeholder="Select date"
                {...form.getInputProps('dateOfBirth')}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, lg: 6 }}>
              <Select
                variant="filled"
                radius="md"
                label="Gender"
                placeholder="Select gender"
                data={['MALE', 'FEMALE', 'OTHER']}
                {...form.getInputProps('gender')}
              />
            </Grid.Col>
          </Grid>
        </FormSection>

        {/* Contact Details Section */}
        <FormSection title="Contact Details">
          <Grid mt="md">
            <Grid.Col span={{ md: 12 }}>
              <PhoneInput label="Phone" {...form.getInputProps('phone')} />
            </Grid.Col>

            <Grid.Col span={{ md: 6 }}>
              <Select
                allowDeselect={false}
                label="Country"
                variant="filled"
                radius="md"
                data={transformCountriesData()}
                placeholder="Enter country"
                {...form.getInputProps('country')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <PersonalTextInput
                label="City"
                placeholder="Enter city"
                {...form.getInputProps('city')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <PersonalTextInput
                label="Occupation"
                placeholder="Enter occupation"
                {...form.getInputProps('occupation')}
              />
            </Grid.Col>
          </Grid>
        </FormSection>

        {/* Health & Fitness Section */}
        <FormSection title="Health & Fitness">
          <Grid mt="md">
            <Grid.Col span={{ md: 6 }}>
              <PersonalTextInput
                label="Height"
                placeholder="Enter height"
                rightSection={
                  <Text size="sm" c="dimmed">
                    cm
                  </Text>
                }
                {...form.getInputProps('height')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <PersonalTextInput
                label="Current Weight"
                placeholder="Enter weight"
                rightSection={
                  <Text size="sm" c="dimmed">
                    kg
                  </Text>
                }
                {...form.getInputProps('weight')}
              />
            </Grid.Col>
            <Grid.Col span={{ md: 6 }}>
              <PersonalTextInput
                label="Target Weight"
                placeholder="Enter target"
                rightSection={
                  <Text size="sm" c="dimmed">
                    kg
                  </Text>
                }
                {...form.getInputProps('targetWeight')}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Select
                variant="filled"
                radius="md"
                label="Activity Level"
                placeholder="Select activity level"
                data={[
                  { value: 'SEDENTARY', label: 'Sedentary (little or no exercise)' },
                  { value: 'LIGHT', label: 'Light (exercise 1-3 times/week)' },
                  { value: 'MODERATE', label: 'Moderate (exercise 4-5 times/week)' },
                  { value: 'VERY_ACTIVE', label: 'Very Active (daily exercise)' },
                  { value: 'EXTREME', label: 'Extreme (intense exercise 2x/day)' },
                ]}
                allowDeselect={false}
                {...form.getInputProps('activityLevel')}
              />
            </Grid.Col>
          </Grid>
        </FormSection>

        <Group justify="flex-end" mt="xl">
          {/*<CreateNewButton type="submit" />*/}
          <Button
            variant="gradient"
            type="submit"
            gradient={{ from: 'blue', to: 'cyan' }}
            radius="md"
            px="xl"
            loading={isPending}
            leftSection={<IconDeviceFloppy size={20} />}
          >
            Create User
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CreateNewUserModal;
