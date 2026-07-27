import { fetchContactSubmissions } from '@/lib/api';
import { ContactSubmissionsView } from '@/components/contact-submissions/contact-submissions-view';

export default async function ContactSubmissionsPage() {
  const submissions = await fetchContactSubmissions();

  return <ContactSubmissionsView submissions={submissions} />;
}
