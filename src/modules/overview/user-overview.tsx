import { useGetUserWeightsSuspense } from '@/modules/overview/queries/get-user-weights.ts';
import { AreaChart } from '@mantine/charts';
import { Box, Card, Group, Paper, Stack, Text } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import dayjs from 'dayjs';

const UserOverview = () => {
  const { data: rawData } = useGetUserWeightsSuspense();
  const weights = rawData;

  // Transform the data for the chart
  const chartData = weights
    .map((item) => ({
      date: dayjs(item.date).format('MMM DD'),
      weight: item.weight,
      timestamp: item.date,
      note: item.notes,
      source: item.source,
    }))
    .sort((a, b) => dayjs(a.timestamp).valueOf() - dayjs(b.timestamp).valueOf());

  // Calculate statistics
  const latestWeight = weights[0]?.weight || 0;
  const previousWeight = weights[1]?.weight || latestWeight;
  const weightChange = latestWeight - previousWeight;
  const percentageChange = ((weightChange / previousWeight) * 100).toFixed(1);
  const isWeightLoss = weightChange < 0;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs" mb="md" bg="var(--mantine-color-blue-0)">
        <Text fw={500} c="var(--mantine-color-blue-7)">
          Weight Progress
        </Text>
      </Card.Section>

      {/* Stats Overview */}
      <Stack gap="xs" mb="lg">
        <Text size="xl" fw={500}>
          {latestWeight.toFixed(1)} kg
        </Text>
        <Group gap="xs">
          {weightChange !== 0 && (
            <>
              {isWeightLoss ? (
                <IconArrowDownRight size={20} style={{ color: 'var(--mantine-color-teal-6)' }} />
              ) : (
                <IconArrowUpRight size={20} style={{ color: 'var(--mantine-color-red-6)' }} />
              )}
              <Text size="sm" c={isWeightLoss ? 'teal.6' : 'red.6'} fw={500}>
                {weightChange > 0 ? '+' : ''}
                {weightChange.toFixed(1)} kg ({percentageChange}%)
              </Text>
            </>
          )}
        </Group>
      </Stack>

      {/* Weight Chart */}
      <Box>
        <AreaChart
          h={300}
          data={chartData}
          dataKey="date"
          series={[
            {
              name: 'weight',
              color: 'blue.6',
            },
          ]}
          curveType="monotone"
          strokeWidth={2}
          fillOpacity={0.4}
          valueFormatter={(value) => `${value} kg`}
          yAxisLabel="Weight (kg)"
          xAxisLabel="Date"
          tooltipProps={{
            content: ({ payload }) => {
              if (!payload?.[0]) return null;
              const data = payload[0].payload;
              return (
                <Paper p="sm" withBorder shadow="sm">
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      {dayjs(data.timestamp).format('MMM DD, YYYY')}
                    </Text>
                    <Text size="sm">Weight: {data.weight} kg</Text>
                    <Text size="xs" c="dimmed">
                      Source: {data.source}
                    </Text>
                    {data.note && (
                      <Text size="xs" c="dimmed">
                        {data.note}
                      </Text>
                    )}
                  </Stack>
                </Paper>
              );
            },
            animationDuration: 200,
          }}
          areaChartProps={{
            margin: { top: 20, right: 40, bottom: 40, left: 40 },
          }}
        />
      </Box>
    </Card>
  );
};

export default UserOverview;
