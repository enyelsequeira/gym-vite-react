import { useGetAllFoods } from '@/server/foods';
import { Button, Container, Group, NumberInput, Paper, Select, Stack, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface GetAllFoods {
  id: number;
  name: string;
  brand: string | null;
  category: string;
  servingSize: number;
  servingUnit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  picture: string | null;
  barcode: string | null;
  verified: boolean;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

// Component Types
interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface ChartData {
  name: string;
  Source: number;
  Target: number;
}

interface NutritionChartProps {
  sourceNutrition: NutritionData;
  targetNutrition: NutritionData;
}

interface CalculationResult {
  amount: number;
  unit: string;
  sourceNutrition: NutritionData;
  targetNutrition: NutritionData;
}

interface SelectOption {
  value: string;
  label: string;
}

interface GroupedSelectData {
  group: string;
  items: SelectOption[];
}

const NutritionChart: React.FC<NutritionChartProps> = ({ sourceNutrition, targetNutrition }) => {
  const data: ChartData[] = [
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
  const [result, setResult] = useState<CalculationResult | null>(null);

  const foods = foodData?.data ?? [];

  const calculateNutrition = (food: GetAllFoods, qty: number): NutritionData => ({
    calories: food.calories * (qty / food.servingSize),
    protein: food.protein * (qty / food.servingSize),
    carbs: food.carbs * (qty / food.servingSize),
    fat: food.fat * (qty / food.servingSize),
  });

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

    const sourceNutrition = calculateNutrition(source, Number(amount));
    const targetNutrition = calculateNutrition(target, targetAmount);

    setResult({
      amount: Math.round(targetAmount * 10) / 10,
      unit: target.servingUnit,
      sourceNutrition,
      targetNutrition,
    });
  };

  const selectData: GroupedSelectData[] = Object.entries(
    foods.reduce<Record<string, SelectOption[]>>((acc, food) => {
      const category = food.category || 'OTHER';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        value: food.id.toString(),
        label: `${food.name} (${food.servingSize}${food.servingUnit})`,
      });
      return acc;
    }, {})
  ).map(([group, items]) => ({
    group,
    items: items.sort((a, b) => a.label.localeCompare(b.label)),
  }));

  const getTargetFoodOptions = (): SelectOption[] => {
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

  const getSelectedFood = (id: string): GetAllFoods | undefined =>
    foods.find((f) => f.id.toString() === id);

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
                setResult(null);
              }}
              searchable
              clearable
            />

            <NumberInput
              label={`Amount ${sourceFood ? `(${getSelectedFood(sourceFood)?.servingUnit})` : ''}`}
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
              onChange={(value) => {
                setTargetFood(value);
                setResult(null);
              }}
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

      {result && sourceFood && targetFood && (
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
            {[
              {
                title: 'Source',
                food: getSelectedFood(sourceFood),
                amount,
                nutrition: result.sourceNutrition,
              },
              {
                title: 'Exchange',
                food: getSelectedFood(targetFood),
                amount: result.amount,
                nutrition: result.targetNutrition,
              },
            ].map((item) => (
              <Paper key={item.title} shadow="sm" p="md">
                <Text size="lg" fw={500} mb="md">
                  {item.title}: {item.food?.name}
                </Text>
                <Stack gap="xs">
                  <Text>
                    Amount: {item.amount} {item.food?.servingUnit}
                  </Text>
                  <Text>Calories: {Math.round(item.nutrition.calories)} kcal</Text>
                  <Text>Protein: {item.nutrition.protein.toFixed(1)}g</Text>
                  <Text>Carbs: {item.nutrition.carbs.toFixed(1)}g</Text>
                  <Text>Fat: {item.nutrition.fat.toFixed(1)}g</Text>
                </Stack>
              </Paper>
            ))}
          </Group>
        </Stack>
      )}
    </Container>
  );
}

export const Route = createFileRoute('/_authenticated/food-conversion')({
  component: FoodCalculator,
});
