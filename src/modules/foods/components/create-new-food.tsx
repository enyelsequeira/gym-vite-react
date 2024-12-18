import FormSection from '@/components/ui/forms/form-section.tsx';
import { type CreateNewFoodType, useCreateNewFood } from '@/modules/foods/hooks/create-new-food';
import { Box, Button, Grid, NumberInput, Select, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconDeviceFloppy } from '@tabler/icons-react';

const categories = [
  'Fruits',
  'Vegetables',
  'Proteins',
  'Dairy',
  'Grains',
  'Snacks',
  'Beverages',
  'Other',
];

const servingUnits = ['g', 'ml', 'oz', 'pieces', 'servings'];

interface CreateNewFoodProps {
  onSuccess?: () => void;
}

const CreateNewFood = ({ onSuccess }: CreateNewFoodProps) => {
  const { mutate, isPending } = useCreateNewFood();
  const form = useForm<CreateNewFoodType>({
    initialValues: {
      barcode: '',
      brand: '',
      calories: 0,
      carbs: 0,
      fat: 0,
      name: '',
      category: '',
      picture: '',
      protein: 0,
      servingSize: 0,
      servingUnit: '',
    },
  });

  return (
    <Box>
      <form
        onSubmit={form.onSubmit((data) => {
          onSuccess?.();
          mutate({
            ...data,
            calories: Number(data.calories),
            carbs: Number(data.carbs),
            fat: Number(data.fat),
            protein: Number(data.protein),
            servingSize: Number(data.servingSize),
          });
        })}
      >
        <Stack gap="md">
          {/* Basic Information */}
          <FormSection title="Basic Information">
            <Grid>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps('name')}
                  label="Name"
                  placeholder="Enter food name"
                  variant="filled"
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps('brand')}
                  label="Brand"
                  placeholder="Enter brand name"
                  variant="filled"
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  {...form.getInputProps('category')}
                  label="Category"
                  placeholder="Select category"
                  data={categories}
                  variant="filled"
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  {...form.getInputProps('picture')}
                  label="Picture URL"
                  placeholder="Enter picture URL"
                  variant="filled"
                  radius="md"
                />
              </Grid.Col>
            </Grid>
          </FormSection>

          {/* Serving Information */}
          <FormSection title="   Serving Information">
            <Grid>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps('servingSize')}
                  label="Serving Size"
                  placeholder="Enter serving size"
                  variant="filled"
                  radius="md"
                  min={0}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  {...form.getInputProps('servingUnit')}
                  label="Serving Unit"
                  placeholder="Select unit"
                  data={servingUnits}
                  variant="filled"
                  radius="md"
                />
              </Grid.Col>
            </Grid>
          </FormSection>

          {/* Nutritional Information */}
          <FormSection title="  Nutritional Information">
            <Grid>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps('calories')}
                  label="Calories"
                  placeholder="Enter calories"
                  variant="filled"
                  radius="md"
                  min={0}
                  rightSection={
                    <Text size="sm" c="dimmed">
                      kcal
                    </Text>
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps('protein')}
                  label="Protein"
                  placeholder="Enter protein"
                  variant="filled"
                  radius="md"
                  min={0}
                  rightSection={
                    <Text size="sm" c="dimmed">
                      g
                    </Text>
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps('carbs')}
                  label="Carbohydrates"
                  placeholder="Enter carbs"
                  variant="filled"
                  radius="md"
                  min={0}
                  rightSection={
                    <Text size="sm" c="dimmed">
                      g
                    </Text>
                  }
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  {...form.getInputProps('fat')}
                  label="Fat"
                  placeholder="Enter fat"
                  variant="filled"
                  radius="md"
                  min={0}
                  rightSection={
                    <Text size="sm" c="dimmed">
                      g
                    </Text>
                  }
                />
              </Grid.Col>
            </Grid>
          </FormSection>

          {/* Additional Information */}
          <FormSection title="  Additional Information">
            <TextInput
              {...form.getInputProps('barcode')}
              label="Barcode"
              placeholder="Enter barcode"
              variant="filled"
              radius="md"
            />
          </FormSection>

          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            radius="md"
            loading={isPending}
            leftSection={<IconDeviceFloppy size={20} />}
          >
            Save Food
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateNewFood;
