import { type CreateNewFoodType, useCreateNewFood } from '@/server/foods.ts';
import { Box, Button, Flex, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const formInputs = [
  { name: 'name', type: 'text' },
  { name: 'brand', type: 'text' },
  { name: 'category', type: 'text' },
  { name: 'servingSize', type: 'number' },
  { name: 'servingUnit', type: 'text' },
  { name: 'calories', type: 'number' },
  { name: 'protein', type: 'number' },
  { name: 'fat', type: 'number' },
  { name: 'carbs', type: 'number' },
  { name: 'picture', type: 'text' },
  { name: 'barcode', type: 'text' },
];

interface CreateNewFoodProps {
  onSuccess?: () => void;
}

const CreateNewFood = ({ onSuccess }: CreateNewFoodProps) => {
  const { mutate } = useCreateNewFood();
  const form = useForm<CreateNewFoodType>({
    mode: 'uncontrolled',
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
    <Box mt={'md'}>
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
        <Flex direction={'column'} gap={'xs'}>
          {formInputs.map((input) => (
            <TextInput
              {...form.getInputProps(input.name)}
              label={input.name}
              tt={'uppercase'}
              key={form.key(input.name)}
              type={input.type}
            />
          ))}
          <Button type={'submit'} mt={'md'}>
            Create New
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
export default CreateNewFood;
