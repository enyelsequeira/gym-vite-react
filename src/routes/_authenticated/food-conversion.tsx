import { useGetAllFoods } from '@/server/foods.ts';
import { Button, Container, Group, NumberInput, Paper, Select, Stack, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const NutritionChart = ({ sourceNutrition, targetNutrition }) => {
  const data = [
    {
      name: 'Calories',
      Source: Math.round(sourceNutrition.calories),
      Target: Math.round(targetNutrition.calories),
    },
    {
      name: 'Protein',
      Source: Math.round(sourceNutrition.protein * 10) / 10,
      Target: Math.round(targetNutrition.protein * 10) / 10,
    },
    {
      name: 'Carbs',
      Source: Math.round(sourceNutrition.carbs * 10) / 10,
      Target: Math.round(targetNutrition.carbs * 10) / 10,
    },
    {
      name: 'Fat',
      Source: Math.round(sourceNutrition.fat * 10) / 10,
      Target: Math.round(targetNutrition.fat * 10) / 10,
    },
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Source" fill="#228be6" name="Original" />
          <Bar dataKey="Target" fill="#40c057" name="Exchange" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

function FoodCalculator() {
  const { data: foodData } = useGetAllFoods({
    limit: 400,
    page: 1,
  });

  const [sourceFood, setSourceFood] = useState<string | null>(null);
  const [targetFood, setTargetFood] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | ''>(100);
  const [result, setResult] = useState(null);

  const foods = foodData?.data || [];

  const calculateExchange = () => {
    if (!sourceFood || !targetFood || !amount) return;

    const source = foods.find((f) => f.id.toString() === sourceFood);
    const target = foods.find((f) => f.id.toString() === targetFood);

    if (!source || !target) return;

    // Calculate based on per serving nutrients
    const caloriesPerUnit = {
      source: source.calories / source.servingSize,
      target: target.calories / target.servingSize,
    };

    // Calculate the exchange amount
    const targetAmount = (Number(amount) * caloriesPerUnit.source) / caloriesPerUnit.target;

    // Calculate nutritional values for the source amount
    const sourceNutrition = {
      calories: source.calories * (Number(amount) / source.servingSize),
      protein: source.protein * (Number(amount) / source.servingSize),
      carbs: source.carbs * (Number(amount) / source.servingSize),
      fat: source.fat * (Number(amount) / source.servingSize),
    };

    // Calculate nutritional values for the target amount
    const targetNutrition = {
      calories: target.calories * (targetAmount / target.servingSize),
      protein: target.protein * (targetAmount / target.servingSize),
      carbs: target.carbs * (targetAmount / target.servingSize),
      fat: target.fat * (targetAmount / target.servingSize),
    };

    setResult({
      amount: Math.round(targetAmount * 10) / 10,
      unit: target.servingUnit,
      sourceNutrition,
      targetNutrition,
    });
  };

  // Group foods by category for the source food select
  const selectData = Object.entries(
    foods.reduce(
      (acc, food) => {
        const category = food.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push({
          value: food.id.toString(),
          label: `${food.name} (${food.servingSize}${food.servingUnit})`,
        });
        return acc;
      },
      {} as Record<string, { value: string; label: string }[]>
    )
  ).map(([group, items]) => ({
    group,
    items: items.sort((a, b) => a.label.localeCompare(b.label)),
  }));

  // Get filtered foods for target food select
  const getTargetFoodOptions = () => {
    if (!sourceFood) return [];
    const source = foods.find((f) => f.id.toString() === sourceFood);
    if (!source) return [];

    return foods
      .filter((f) => f.category === source.category && f.id.toString() !== sourceFood)
      .map((f) => ({
        value: f.id.toString(),
        label: `${f.name} (${f.servingSize}${f.servingUnit})`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  };

  return (
    <Container size="lg">
      <Paper shadow="sm" p="md">
        <Stack gap="md">
          <Group grow>
            <Select
              label="Source Food"
              placeholder="Select a food"
              data={selectData}
              value={sourceFood}
              onChange={(value) => {
                setSourceFood(value);
                setTargetFood(null);
              }}
              searchable
              clearable
            />

            <NumberInput
              label={`Amount ${sourceFood ? `(${foods.find((f) => f.id.toString() === sourceFood)?.servingUnit})` : ''}`}
              value={amount}
              onChange={setAmount}
              min={0}
              placeholder="Enter amount"
            />

            <Select
              label="Exchange With"
              placeholder="Select target food"
              data={getTargetFoodOptions()}
              value={targetFood}
              onChange={setTargetFood}
              disabled={!sourceFood}
              searchable
              clearable
            />
          </Group>

          <Button
            onClick={calculateExchange}
            disabled={!sourceFood || !targetFood || !amount}
            fullWidth
          >
            Calculate Exchange
          </Button>
        </Stack>
      </Paper>

      {result && (
        <Stack gap="md" mt="md">
          <Paper shadow="sm" p="md">
            <Text size="lg" fw={500} mb="md">
              Nutritional Comparison
            </Text>
            <NutritionChart
              sourceNutrition={result.sourceNutrition}
              targetNutrition={result.targetNutrition}
            />
          </Paper>

          <Group grow>
            <Paper shadow="sm" p="md">
              <Text size="lg" fw={500} mb="md">
                Source: {foods.find((f) => f.id.toString() === sourceFood)?.name}
              </Text>
              <Stack gap="xs">
                <Text>
                  Amount: {amount} {foods.find((f) => f.id.toString() === sourceFood)?.servingUnit}
                </Text>
                <Text>Calories: {Math.round(result.sourceNutrition.calories)} kcal</Text>
                <Text>Protein: {result.sourceNutrition.protein.toFixed(1)}g</Text>
                <Text>Carbs: {result.sourceNutrition.carbs.toFixed(1)}g</Text>
                <Text>Fat: {result.sourceNutrition.fat.toFixed(1)}g</Text>
              </Stack>
            </Paper>

            <Paper shadow="sm" p="md">
              <Text size="lg" fw={500} mb="md">
                Exchange: {foods.find((f) => f.id.toString() === targetFood)?.name}
              </Text>
              <Stack gap="xs">
                <Text>
                  Amount: {result.amount} {result.unit}
                </Text>
                <Text>Calories: {Math.round(result.targetNutrition.calories)} kcal</Text>
                <Text>Protein: {result.targetNutrition.protein.toFixed(1)}g</Text>
                <Text>Carbs: {result.targetNutrition.carbs.toFixed(1)}g</Text>
                <Text>Fat: {result.targetNutrition.fat.toFixed(1)}g</Text>
              </Stack>
            </Paper>
          </Group>
        </Stack>
      )}
    </Container>
  );
}

export const Route = createFileRoute('/_authenticated/food-conversion')({
  component: FoodCalculator,
});
