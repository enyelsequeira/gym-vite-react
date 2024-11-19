import { BarChart } from '@mantine/charts';

type NutritionData = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};
type NutritionChartProps = {
  sourceNutrition: NutritionData;
  targetNutrition: NutritionData;
};
type ChartData = {
  name: string;
  Source: number;
  Target: number;
};

const NutritionChart = ({ sourceNutrition, targetNutrition }: NutritionChartProps) => {
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
      <BarChart
        h={300}
        data={data}
        dataKey="name"
        withLegend
        legendProps={{ verticalAlign: 'bottom' }}
        series={[
          { name: 'Source', color: 'blue.7' },
          { name: 'Target', color: 'green.7' },
        ]}
        gridProps={{ strokeDasharray: '3 3' }}
        tooltipAnimationDuration={200}
        valueFormatter={(value) => value.toFixed(1)}
      />
    </div>
  );
};
export default NutritionChart;
