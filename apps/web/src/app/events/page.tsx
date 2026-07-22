import { EventsView } from '@/components/events-view';
import { fetchEvents } from '@/lib/api';

export default async function EventsPage() {
  const events = await fetchEvents();
  return <EventsView events={events} />;
}
