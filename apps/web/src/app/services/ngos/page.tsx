import { ServicePage } from '@/components/services/service-page';
import { NGOS_SERVICE } from '@/data/services';
import { fetchServiceProjects } from '@/lib/api';

export default async function NgosServicePage() {
  const projects = await fetchServiceProjects('NGOS');
  return <ServicePage data={NGOS_SERVICE} projects={projects} />;
}
