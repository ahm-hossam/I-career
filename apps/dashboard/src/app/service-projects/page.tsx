import { fetchServiceProjects } from '@/lib/api';
import { ServiceProjectsView } from '@/components/service-projects/service-projects-view';

export default async function ServiceProjectsPage() {
  const projects = await fetchServiceProjects();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <ServiceProjectsView projects={projects} />
    </div>
  );
}
