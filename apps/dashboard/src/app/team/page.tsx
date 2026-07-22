import { fetchDashboardUsers } from '@/lib/api';
import { TeamView } from '@/components/team/team-view';

export default async function TeamPage() {
  const users = await fetchDashboardUsers();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <TeamView users={users} />
    </div>
  );
}
