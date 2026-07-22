import { Hero } from '@/components/hero';
import { LogoTicker } from '@/components/logo-ticker';
import { ServiceTabs } from '@/components/service-tabs';
import { ProgramsTeaser } from '@/components/programs-teaser';
import { EventsTeaser } from '@/components/events-teaser';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { CtaBand } from '@/components/cta-band';
import { fetchPrograms } from '@/lib/api';

export default async function Home() {
  const programs = await fetchPrograms();

  return (
    <>
      <Hero />
      <LogoTicker />
      <ServiceTabs />
      <ProgramsTeaser programs={programs} />
      <EventsTeaser />
      <TestimonialCarousel />
      <CtaBand />
    </>
  );
}
