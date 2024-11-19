import type { NutritionData } from '@/routes/_authenticated/food-conversion.tsx';
import { Card, Flex, Text } from '@mantine/core';

type NutritionDisplayProps = {
  title: string;
  foodName: string;
  amount: number | string;
  unit: string;
  nutrition: NutritionData;
};

export function NutritionDisplay({
  title,
  foodName,
  amount,
  unit,
  nutrition,
}: NutritionDisplayProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" fw={500} mb="md" c="blue.7">
        {title}: {foodName}
      </Text>
      <Card.Section withBorder inheritPadding py="xs" bg="blue.0">
        <Flex direction={'column'} gap={'md'}>
          <Text fw={500}>
            Amount: {amount} {unit}
          </Text>
          <Text fw={500}>Calories: {Math.round(nutrition.calories)} kcal</Text>
          <Text fw={500}>Protein: {nutrition.protein.toFixed(1)}g</Text>
          <Text fw={500}>Carbs: {nutrition.carbs.toFixed(1)}g</Text>
          <Text fw={500}>Fat: {nutrition.fat.toFixed(1)}g</Text>
        </Flex>
      </Card.Section>
    </Card>
  );
}
