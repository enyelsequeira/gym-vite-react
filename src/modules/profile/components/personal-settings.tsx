import CreateButton from '@/components/ui/buttons/create-button.tsx';
import { DefaultSelect } from '@/components/ui/forms/default-select.tsx';
import FormSection from '@/components/ui/forms/form-section.tsx';
import PhoneInput from '@/components/ui/forms/phone-input.tsx';
import { PersonalTextInput } from '@/components/ui/forms/text-input-default.tsx';
import { useUpdateProfile } from '@/modules/profile/hooks/use-update-profile.tsx';
import { useGetMeSuspenseQuery } from '@/server/get-me.ts';
import { transformCountriesData } from '@/utils/countries-transformed.ts';
import { Grid, Group, Select, Stack, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';

const PersonalSettings = () => {
  const { mutate, isPending } = useUpdateProfile();
  const { data } = useGetMeSuspenseQuery();
  const form = useForm({
    initialValues: {
      username: data?.username ?? '',
      name: data?.name ?? '',
      lastName: data?.lastName ?? '',
      email: data?.email ?? '',
      city: data?.city ?? '',
      country: data?.country ?? '',
      phone: data?.phone ?? '',
      occupation: data?.occupation ?? '',
      height: data.height ?? undefined,
      weight: data.weight ?? undefined,
      targetWeight: data.targetWeight ?? undefined,
      dateOfBirth: dayjs(data.dateOfBirth).toDate() ?? new Date(),
      gender: data.gender ?? undefined,
      activityLevel: data.activityLevel ?? undefined,
    },
  });

  return (
    <form
      id={'profile-settings'}
      onSubmit={form.onSubmit((e) => {
        mutate({
          ...e,
          id: data?.id,
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
                {...form.getInputProps('username')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PersonalTextInput
                label="Email Address"
                placeholder="Enter email address"
                {...form.getInputProps('email')}
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
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <PersonalTextInput
                label="Last Name"
                placeholder="Enter last name"
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
                data={['Male', 'Female', 'Other']}
                {...form.getInputProps('gender')}
              />
            </Grid.Col>
          </Grid>
        </FormSection>

        {/* Contact Details Section */}
        <FormSection title="Contact Details">
          <Grid mt="md">
            <Grid.Col
              span={{
                md: 6,
              }}
            >
              <PhoneInput label={'Phone'} {...form.getInputProps('phone')} />
            </Grid.Col>
            <Grid.Col
              span={{
                md: 6,
              }}
            >
              <PersonalTextInput
                label="Occupation"
                placeholder="Enter occupation"
                {...form.getInputProps('occupation')}
              />
            </Grid.Col>
            <Grid.Col
              span={{
                md: 6,
              }}
            >
              <PersonalTextInput
                label="City"
                placeholder="Enter city"
                {...form.getInputProps('city')}
              />
            </Grid.Col>
            <Grid.Col
              span={{
                md: 6,
              }}
            >
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
          </Grid>
        </FormSection>

        {/* Health & Fitness Section */}
        <FormSection title="Health & Fitness">
          <Grid mt="md">
            <Grid.Col
              span={{
                md: 4,
              }}
            >
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
            <Grid.Col
              span={{
                md: 4,
              }}
            >
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
            <Grid.Col
              span={{
                md: 4,
              }}
            >
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
              <DefaultSelect
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
          <CreateButton type={'submit'} form={'profile-settings'} px="xl" loading={isPending}>
            Save Changes
          </CreateButton>
        </Group>
      </Stack>
    </form>
  );
};

export default PersonalSettings;
