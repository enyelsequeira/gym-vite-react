import UserOverview from '@/modules/overview/user-overview.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/(user)/overview')({
  component: OverviewPage,
})

function OverviewPage() {
  return <UserOverview />
}
