import { OverviewView } from '@/components/overview-view';
import { fetchPrograms, fetchResetRequests, fetchUsers } from '@/lib/api';
import { buildActivityItems, buildApplicantsKpi, buildProgramsKpi, buildSignupChart, emptyKpi } from '@/lib/overview-data';

export default async function DashboardOverviewPage() {
  const [users, requests, programs] = await Promise.all([fetchUsers(), fetchResetRequests(), fetchPrograms()]);

  const kpis = [buildApplicantsKpi(users), buildProgramsKpi(programs), emptyKpi('kpiEmployers'), emptyKpi('kpiEvents')];
  const chartData = buildSignupChart(users);
  const activityItems = buildActivityItems(users, requests);

  return <OverviewView kpis={kpis} chartData={chartData} recentUsers={users} activityItems={activityItems} />;
}
