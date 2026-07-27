import { ServicePage } from '@/components/services/service-page';
import { YOUTH_SERVICE } from '@/data/services';
import { fetchServiceProjects } from '@/lib/api';

export default async function YouthServicePage() {
  const projects = await fetchServiceProjects('YOUTH');
  return <ServicePage data={YOUTH_SERVICE} projects={projects} />;
}
