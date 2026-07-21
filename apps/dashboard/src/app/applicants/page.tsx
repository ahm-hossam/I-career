import { fetchResetRequests, fetchUsers } from '@/lib/api';
import { ApplicantsView } from '@/components/applicants/applicants-view';

export default async function ApplicantsPage() {
  const [users, requests] = await Promise.all([fetchUsers(), fetchResetRequests()]);

  return <ApplicantsView users={users} requests={requests} />;
}
