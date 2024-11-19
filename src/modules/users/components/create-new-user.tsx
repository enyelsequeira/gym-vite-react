import {
  INITIAL_USER_VALUES,
  UserFormProvider,
  transformUserFormValues,
  useUserForm,
  validateUserForm,
} from '@/components/context/user-creation-edit-context.tsx';
import CreateNewButton from '@/components/ui/buttons/create-button.tsx';
import { DefaultDatePickerInput } from '@/components/ui/forms/default-date-picker-input.tsx';
import { DefaultSelect } from '@/components/ui/forms/default-select.tsx';
import FormSection from '@/components/ui/forms/form-section.tsx';
import PhoneInput from '@/components/ui/forms/phone-input.tsx';
import { PersonalTextInput } from '@/components/ui/forms/text-input-default.tsx';
import { ACTIVITY_LEVELS, GENDEROPTIONS, USER_TYPES } from '@/constants';
import { useCreateNewUser } from '@/modules/users/hooks/create-new-user.tsx';
import { BASE_DATE_FORMAT } from '@/utils/dates.ts';
import { transformCountriesData } from '@/utils/transform-countries-data.ts';
import { Grid, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';

interface CreateNewUserModalProps {
  onSuccess?: () => void;
}

const CreateNewUserModal = ({ onSuccess }: CreateNewUserModalProps) => {
  const { mutate, isPending } = useCreateNewUser();
  const form = useUserForm({
    initialValues: INITIAL_USER_VALUES,
    validate: validateUserForm,
    transformValues: transformUserFormValues,
  });

  return (
    <UserFormProvider form={form}>
      <form
        id="create-user-form"
        onSubmit={form.onSubmit((data) => {
          onSuccess?.();
          mutate({
            ...data,
            dateOfBirth: dayjs(data.dateOfBirth).format(BASE_DATE_FORMAT),
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
                <DefaultSelect
                  label="User Type"
                  placeholder="Select user type"
                  data={USER_TYPES}
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
                <DefaultDatePickerInput
                  maxDate={new Date()}
                  label="Date of Birth"
                  {...form.getInputProps('dateOfBirth')}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <DefaultSelect
                  label="Gender"
                  placeholder="Select gender"
                  data={GENDEROPTIONS}
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
                <DefaultSelect
                  label="Country"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                <DefaultSelect
                  label="Activity Level"
                  placeholder="Select activity level"
                  data={ACTIVITY_LEVELS}
                  {...form.getInputProps('activityLevel')}
                />
              </Grid.Col>
            </Grid>
          </FormSection>

          <Group justify="flex-end" mt="xl">
            <CreateNewButton type="submit" isPending={isPending}>
              Create User
            </CreateNewButton>
          </Group>
        </Stack>
      </form>
    </UserFormProvider>
  );
};

export default CreateNewUserModal;
