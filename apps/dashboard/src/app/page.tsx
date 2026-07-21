import { OverviewView } from '@/components/overview-view';
import { fetchResetRequests, fetchUsers } from '@/lib/api';
import { buildActivityItems, buildApplicantsKpi, buildSignupChart, emptyKpi } from '@/lib/overview-data';

export default async function DashboardOverviewPage() {
  const [users, requests] = await Promise.all([fetchUsers(), fetchResetRequests()]);

  const kpis = [buildApplicantsKpi(users), emptyKpi('kpiPrograms'), emptyKpi('kpiEmployers'), emptyKpi('kpiEvents')];
  const chartData = buildSignupChart(users);
  const activityItems = buildActivityItems(users, requests);

  return <OverviewView kpis={kpis} chartData={chartData} recentUsers={users} activityItems={activityItems} />;
}
