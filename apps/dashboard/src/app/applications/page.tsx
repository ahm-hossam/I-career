import { fetchApplications, fetchPrograms } from '@/lib/api';
import { ApplicationsView } from '@/components/applications/applications-view';

export default async function ApplicationsPage() {
  const [applications, programs] = await Promise.all([fetchApplications(), fetchPrograms()]);

  return <ApplicationsView applications={applications} programs={programs} />;
}
