import type { NutritionData } from '@/routes/_authenticated/food-conversion.tsx';
import type { GetAllFoods } from '@/server/foods.ts';

export function calculateNutrition(food: GetAllFoods, qty: number): NutritionData {
  return {
    calories: food.calories * (qty / food.servingSize),
    protein: food.protein * (qty / food.servingSize),
    carbs: food.carbs * (qty / food.servingSize),
    fat: food.fat * (qty / food.servingSize),
  };
}

export function prepareFoodSelectData(foods: GetAllFoods[]) {
  return Object.entries(
    foods.reduce<Record<string, { value: string; label: string }[]>>((acc, food) => {
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
}

export const getSelectedFood = (foods: GetAllFoods[], id: string | null) =>
  id ? foods.find((f) => f.id.toString() === id) : undefined;
