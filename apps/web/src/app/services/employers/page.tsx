import { ServicePage } from '@/components/services/service-page';
import { getServicesContent } from '@/data/services';
import { fetchServiceProjects } from '@/lib/api';
import { getServerLocale } from '@/lib/i18n/server';

export default async function EmployersServicePage() {
  const [projects, locale] = await Promise.all([fetchServiceProjects('EMPLOYERS'), getServerLocale()]);
  return <ServicePage data={getServicesContent(locale).employers} projects={projects} />;
}
