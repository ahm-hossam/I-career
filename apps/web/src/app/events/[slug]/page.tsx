import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Calendar, ExternalLink, MapPin, Users } from 'lucide-react';
import { getEventContent } from '@/data/events-content';
import { getServerLocale } from '@/lib/i18n/server';

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const event = getEventContent(slug, locale);
  if (!event) notFound();

  return (
    <article className="relative -mt-[80px] mx-auto max-w-4xl px-4 pb-12 pt-[124px] sm:px-6 sm:pb-16 sm:pt-[140px] lg:px-8">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{event.title}</h1>
      <p className="mt-2 text-lg text-ink-soft">{event.tagline}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-faint">
        <span className="flex items-center gap-1.5">
          <Calendar size={16} />
          {event.date}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={16} />
          {event.location}
        </span>
        <span className="flex items-center gap-1.5">
          <Users size={16} />
          {event.organizer}
        </span>
      </div>

      <a
        href={event.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700"
      >
        {event.ctaLabel}
        <ExternalLink size={16} className="transition-transform group-hover:translate-x-0.5" />
      </a>

      <div className="prose prose-ink mt-10 max-w-none text-ink-soft">
        {event.description.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>

      <section className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {event.pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-2xl border border-ink/[0.06] bg-brand-50/40 p-5">
            <h3 className="font-bold text-ink">{pillar.title}</h3>
            <p className="mt-1.5 text-sm text-ink-soft">{pillar.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-sm sm:grid-cols-4">
        {event.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl font-extrabold text-brand-600">{stat.value}</p>
            <p className="mt-1 text-xs text-ink-faint">{stat.label}</p>
          </div>
        ))}
      </section>

      <div className="mt-10 flex items-center justify-between border-t border-ink/[0.06] pt-6">
        <Link href="/events" className="text-sm font-semibold text-brand-600 hover:underline">
          {locale === 'ar' ? 'كل الفعاليات' : 'All events'}
        </Link>
        <a
          href={event.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-ink"
        >
          {event.ctaLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}
