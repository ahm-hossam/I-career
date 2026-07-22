import type { Event } from '@i-career/database';

export function toPublicEvent(event: Event) {
  return {
    id: event.id,
    slug: event.slug,
    title: event.title,
    type: event.type,
    startsAt: event.startsAt,
    location: event.location,
    body: event.body,
  };
}
