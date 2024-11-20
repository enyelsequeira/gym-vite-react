import CreateButton from '@/components/ui/buttons/create-button.tsx';
import FormSection from '@/components/ui/forms/form-section.tsx';
import { PersonalTextInput } from '@/components/ui/forms/text-input-default.tsx';
import { useCreateNewExercise } from '@/modules/exercises/hooks/create-exercise.tsx';
import { Box, Grid, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';

interface CreateNewExerciseProps {
  onSuccess?: () => void;
}

const CreateNewExercise = ({ onSuccess }: CreateNewExerciseProps) => {
  const { mutate, isPending } = useCreateNewExercise();

  const form = useForm({
    initialValues: {
      name: '',
      notes: '',
      alternative: '',
      video: '',
    },
  });
  return (
    <Box>
      <form
        onSubmit={form.onSubmit((data) => {
          onSuccess?.();
          mutate({
            ...data,
          });
        })}
      >
        <Stack gap="md">
          {/* Basic Information */}
          <FormSection title="Exercise">
            <Grid>
              <Grid.Col span={12}>
                <PersonalTextInput
                  {...form.getInputProps('name')}
                  label="Name"
                  placeholder="Enter name"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <PersonalTextInput
                  {...form.getInputProps('alternative')}
                  label="Alternative"
                  placeholder="Enter alternative"
                />
              </Grid.Col>

              <Grid.Col span={12}>
                <PersonalTextInput
                  {...form.getInputProps('video')}
                  label="Video URL"
                  placeholder="Enter URL"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <PersonalTextInput
                  {...form.getInputProps('notes')}
                  label="Notes"
                  placeholder="Enter Notes"
                />
              </Grid.Col>
            </Grid>
          </FormSection>

          <CreateButton type="submit" variant="gradient" loading={isPending}>
            Save Exercise
          </CreateButton>
        </Stack>
      </form>
    </Box>
  );
};
export default CreateNewExercise;
