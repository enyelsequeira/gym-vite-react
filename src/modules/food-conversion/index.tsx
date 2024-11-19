import { DefaultSelect } from '@/components/ui/forms/default-select.tsx';
import { useFormConversionContext } from '@/modules/food-conversion/context/form.tsx';
import { getSelectedFood, prepareFoodSelectData } from '@/modules/food-conversion/helpers';
import type { GetAllFoods } from '@/server/foods.ts';
import { Button, type ComboboxItem, Grid, NumberInput } from '@mantine/core';
import { useState } from 'react';

type Props = {
  foods: GetAllFoods[];
};

export function FoodExchangeForm({ foods }: Props) {
  const form = useFormConversionContext();
  const [targetFood, setTargetFood] = useState<ComboboxItem[] | null>(null);

  const sourceFoodData = prepareFoodSelectData(foods);

  const selectedSourceFood = getSelectedFood(foods, form.values.sourceFood);

  form.watch('sourceFood', ({ value }) => {
    const selectedSourceFood = getSelectedFood(foods, value);
    const targetFoodData = selectedSourceFood
      ? foods
          .filter(
            (f) =>
              f.category === selectedSourceFood.category &&
              f.id.toString() !== form.values.sourceFood
          )
          .map((f) => ({
            value: f.id.toString(),
            label: `${f.name} (${f.servingSize}${f.servingUnit})`,
          }))
      : // .sort((a, b) => a.label.localeCompare(b.label)) // we do not need to sort we do not care about it
        [];
    setTargetFood(targetFoodData);
  });

  return (
    <Grid>
      <Grid.Col span={{ lg: 4 }}>
        <DefaultSelect
          label="Source Food"
          placeholder="Select a food"
          data={sourceFoodData}
          searchable
          clearable
          {...form.getInputProps('sourceFood')}
        />
      </Grid.Col>

      <Grid.Col span={{ lg: 4 }}>
        <NumberInput
          label={`Amount ${selectedSourceFood ? `(${selectedSourceFood.servingUnit})` : ''}`}
          {...form.getInputProps('amount')}
          min={0}
          placeholder="Enter amount"
          variant={'filled'}
          radius={'md'}
        />
      </Grid.Col>
      <Grid.Col span={{ lg: 4 }}>
        <DefaultSelect
          label="Exchange With"
          placeholder="Select target food"
          data={targetFood || []}
          {...form.getInputProps('targetFood')}
          searchable
          clearable
        />
      </Grid.Col>

      <Button
        gradient={{ from: 'blue', to: 'cyan' }}
        variant={'gradient'}
        type="submit"
        fullWidth
        mt={'md'}
      >
        Calculate Exchange
      </Button>
    </Grid>
  );
}
