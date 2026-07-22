import { CalendarClock } from 'lucide-react';

export function EventsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <h2 className="text-3xl font-extrabold text-ink sm:text-[32px]">Upcoming Events</h2>
      <p className="mt-1 text-ink-soft">Check our upcoming events</p>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 rounded-3xl border border-ink/[0.06] bg-brand-50/40 py-24 text-center">
        <CalendarClock size={32} className="text-brand-500" />
        <p className="font-semibold text-ink-soft">Stay tuned</p>
      </div>
    </section>
  );
}
