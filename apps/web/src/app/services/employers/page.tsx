import { ServicePage } from '@/components/services/service-page';
import { EMPLOYERS_SERVICE } from '@/data/services';
import { fetchServiceProjects } from '@/lib/api';

export default async function EmployersServicePage() {
  const projects = await fetchServiceProjects('EMPLOYERS');
  return <ServicePage data={EMPLOYERS_SERVICE} projects={projects} />;
}
