import { FoodExchangeForm } from '@/modules/food-conversion';
import NutritionChart from '@/modules/food-conversion/components/nutrition-chart';
import { NutritionDisplay } from '@/modules/food-conversion/components/nutrition-display.tsx';
import {
  FormConversionProvider,
  useFormConversion,
} from '@/modules/food-conversion/context/form.tsx';
import { calculateNutrition, getSelectedFood } from '@/modules/food-conversion/helpers';
import { type GetAllFoods, useGetAllFoods } from '@/server/foods';
import { Container, Grid, Paper, Stack } from '@mantine/core';
import { isNotEmpty } from '@mantine/form';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface CalculationResult {
  amount: number;
  unit: string;
  sourceNutrition: NutritionData;
  targetNutrition: NutritionData;
}

function FoodCalculator() {
  const { data: foodData } = useGetAllFoods({
    limit: 400,
    page: 1,
  });
  const foods = foodData?.data ?? [];

  const [result, setResult] = useState<CalculationResult | null>(null);
  const [selectedSourceFood, setSelectedSourceFood] = useState<GetAllFoods | undefined>(undefined);
  const [selectedTargetFood, setSelectedTargetFood] = useState<GetAllFoods | undefined>(undefined);

  const form = useFormConversion({
    mode: 'uncontrolled',
    initialValues: {
      sourceFood: null,
      targetFood: null,
      amount: 100,
    },
    validate: {
      sourceFood: isNotEmpty('Please enter a valid food'),
      targetFood: isNotEmpty('Please enter a valid food'),
      amount: (value) => (!value || value <= 0 ? 'Please enter a valid amount' : null),
    },
    onValuesChange: (values) => {
      setSelectedSourceFood(getSelectedFood(foods, values.sourceFood));
      setSelectedTargetFood(getSelectedFood(foods, values.targetFood));
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const source = getSelectedFood(foods, values.sourceFood);
    const target = getSelectedFood(foods, values.targetFood);
    if (!source || !target || !values.amount) return;
    const caloriesPerUnit = {
      source: source.calories / source.servingSize,
      target: target.calories / target.servingSize,
    };
    const targetAmount = (Number(values.amount) * caloriesPerUnit.source) / caloriesPerUnit.target;

    setResult({
      amount: Math.round(targetAmount * 10) / 10,
      unit: target.servingUnit,
      sourceNutrition: calculateNutrition(source, Number(values.amount)),
      targetNutrition: calculateNutrition(target, targetAmount),
    });
  });

  return (
    <FormConversionProvider form={form}>
      <Container size="lg">
        <form onSubmit={handleSubmit}>
          <Paper shadow="sm" p="md">
            <FoodExchangeForm foods={foods} />
          </Paper>
        </form>

        {result && selectedSourceFood && selectedTargetFood && (
          <Stack gap="md" mt="md">
            <Paper shadow="sm" p="md">
              <NutritionChart
                sourceNutrition={result.sourceNutrition}
                targetNutrition={result.targetNutrition}
              />
            </Paper>

            <Grid>
              <Grid.Col span={{ lg: 6 }}>
                <NutritionDisplay
                  title="Source"
                  foodName={selectedSourceFood.name}
                  amount={form.values.amount}
                  unit={selectedSourceFood.servingUnit}
                  nutrition={result.sourceNutrition}
                />
              </Grid.Col>
              <Grid.Col span={{ lg: 6 }}>
                <NutritionDisplay
                  title="Exchange"
                  foodName={selectedTargetFood.name}
                  amount={result.amount}
                  unit={result.unit}
                  nutrition={result.targetNutrition}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Container>
    </FormConversionProvider>
  );
}

export const Route = createFileRoute('/_authenticated/food-conversion')({
  component: FoodCalculator,
});
