import { Hero } from '@/components/hero';
import { LogoTicker } from '@/components/logo-ticker';
import { ServiceTabs } from '@/components/service-tabs';
import { ProgramsTeaser } from '@/components/programs-teaser';
import { EventsTeaser } from '@/components/events-teaser';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { CtaBand } from '@/components/cta-band';
import { fetchPartnerLogos, fetchPrograms } from '@/lib/api';

export default async function Home() {
  const [programs, partnerLogos] = await Promise.all([fetchPrograms(), fetchPartnerLogos()]);

  return (
    <>
      <Hero />
      <LogoTicker logos={partnerLogos} />
      <ServiceTabs />
      <ProgramsTeaser programs={programs} />
      <EventsTeaser />
      <TestimonialCarousel />
      <CtaBand />
    </>
  );
}
