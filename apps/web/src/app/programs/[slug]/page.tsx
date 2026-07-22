import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Check } from 'lucide-react';
import { ProgramCard } from '@/components/program-card';
import { ProgramRegisterButton } from '@/components/program-register-button';
import { ReferralShareCard } from '@/components/referral-share-card';
import { ReferralTracker } from '@/components/referral-tracker';
import { fetchProgramBySlug } from '@/lib/api';
import { aspectRatioClass } from '@/lib/rich-text';

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchProgramBySlug(slug);
  if (!data) notFound();

  const { program, otherPrograms } = data;

  return (
    <article className="relative -mt-[80px] mx-auto max-w-4xl px-4 pb-12 pt-[124px] sm:px-6 sm:pb-16 sm:pt-[140px] lg:px-8">
      <Suspense fallback={null}>
        <ReferralTracker slug={program.slug} />
      </Suspense>

      <div className={`relative w-full overflow-hidden rounded-3xl bg-brand-50 ${aspectRatioClass(program.imageAspect)}`}>
        <Image src={program.logoUrl} alt={program.title} fill className="object-cover" priority />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{program.title}</h1>
        <ProgramRegisterButton slug={program.slug} form={program.form} />
      </div>

      <ReferralShareCard slug={program.slug} />

      <section className="mt-10">
        <h2 className="text-xl font-bold text-ink">About Program</h2>
        <p className="mt-2 font-semibold text-ink">{program.subtitleEn}</p>
        {program.subtitleAr && <p className="text-ink-soft" dir="rtl">{program.subtitleAr}</p>}
        <div
          className="prose prose-sm mt-4 max-w-none text-ink-soft prose-headings:text-ink prose-strong:text-ink"
          dangerouslySetInnerHTML={{ __html: program.aboutBody }}
        />
      </section>

      {program.phases.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">What you&apos;ll go through</h2>
          <p className="mt-1 text-sm text-ink-faint">The program is delivered across connected phases</p>
          <div className="mt-4 flex flex-col gap-4">
            {program.phases.map((phase) => (
              <div key={phase.title} className="rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-ink">{phase.title}</h3>
                <div
                  className="prose prose-sm mt-1.5 max-w-none text-sm text-ink-soft prose-headings:text-ink prose-strong:text-ink"
                  dangerouslySetInnerHTML={{ __html: phase.description }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {program.benefits.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Benefits</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {program.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}

      {program.criteria.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Program Criteria</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {program.criteria.map((criterion) => (
              <li key={criterion} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-300 text-ink">
                  <Check size={12} strokeWidth={3} />
                </span>
                {criterion}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-10 rounded-3xl border border-ink/[0.06] bg-brand-50/40 p-6">
        <div className="flex items-center gap-4">
          {program.partnerLogoUrl && (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
              <Image src={program.partnerLogoUrl} alt={program.partnerName} fill className="object-cover" />
            </div>
          )}
          <h2 className="font-bold text-ink">{program.partnerName}</h2>
        </div>
        <div
          className="prose prose-sm mt-2 max-w-none text-sm text-ink-soft prose-headings:text-ink prose-strong:text-ink"
          dangerouslySetInnerHTML={{ __html: program.partnerBio }}
        />
      </section>

      {program.sponsors.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Sponsors</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {program.sponsors.map((sponsor, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-sm"
              >
                {sponsor.logoUrl && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand-50">
                    <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-ink">{sponsor.name}</p>
                  <div
                    className="prose prose-sm mt-1 max-w-none text-xs text-ink-soft prose-headings:text-ink prose-strong:text-ink"
                    dangerouslySetInnerHTML={{ __html: sponsor.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {otherPrograms.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold text-ink">Other Programs</h2>
          <p className="mt-1 text-sm text-ink-faint">Programs recommended for you</p>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {otherPrograms.map((other, i) => (
              <ProgramCard key={other.id} program={other} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
