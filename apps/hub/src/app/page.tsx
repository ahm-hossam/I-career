import { EventsTeaser } from '@/components/events-teaser';
import { Hero } from '@/components/hero';
import { ProgramsTeaser } from '@/components/programs-teaser';
import { fetchPrograms } from '@/lib/api';

export default async function HomePage() {
  const programs = await fetchPrograms();

  return (
    <>
      <Hero />
      <ProgramsTeaser programs={programs} />
      <EventsTeaser />
    </>
  );
}
