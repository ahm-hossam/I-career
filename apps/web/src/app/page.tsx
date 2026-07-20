import { Hero } from '@/components/hero';
import { LogoTicker } from '@/components/logo-ticker';
import { ServiceTabs } from '@/components/service-tabs';
import { ProgramsTeaser } from '@/components/programs-teaser';
import { EventsTeaser } from '@/components/events-teaser';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { CtaBand } from '@/components/cta-band';

export default function Home() {
  return (
    <>
      <Hero />
      <LogoTicker />
      <ServiceTabs />
      <ProgramsTeaser />
      <EventsTeaser />
      <TestimonialCarousel />
      <CtaBand />
    </>
  );
}
