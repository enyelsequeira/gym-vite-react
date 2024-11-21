import WeightChartCard from '@/components/charts/weight-chart.tsx';
import { useGetUserWeightsSuspense } from '@/modules/overview/queries/get-user-weights.ts';
import { useSession } from '@/providers/auth.tsx';

const UserOverview = () => {
  const { session } = useSession();
  const { data: rawData } = useGetUserWeightsSuspense({
    userId: Number(session.user?.id),
  });
  return <WeightChartCard weights={rawData} />;
};

export default UserOverview;
