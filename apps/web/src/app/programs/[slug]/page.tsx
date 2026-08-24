import { Suspense } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ProgramCard } from '@/components/program-card';
import {
  AboutProgramSection,
  BenefitsSection,
  CriteriaSection,
  PhasesSection,
} from '@/components/programs/program-highlight-sections';
import { ProgramRegisterButton } from '@/components/program-register-button';
import { ReferralShareButton } from '@/components/referral-share-button';
import { ReferralTracker } from '@/components/referral-tracker';
import { fetchMyApplication, fetchProgramBySlug } from '@/lib/api';
import { getSessionToken } from '@/lib/auth/session';
import { aspectRatioClass } from '@/lib/rich-text';
import { getServerLocale } from '@/lib/i18n/server';
import { translate } from '@/lib/i18n/translate';

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [data, token, locale] = await Promise.all([fetchProgramBySlug(slug), getSessionToken(), getServerLocale()]);
  if (!data) notFound();

  const { program, otherPrograms } = data;
  const myApplication = token ? await fetchMyApplication(slug, token) : null;
  const t = (path: string, vars?: Record<string, string | number>) => translate(locale, path, vars);

  const banner = (
    <div
      className={`relative w-full overflow-hidden bg-brand-50 ${program.bannerFullWidth ? '' : 'rounded-3xl'} ${aspectRatioClass(program.imageAspect)}`}
    >
      <Image src={program.logoUrl} alt={program.title} fill className="object-cover" priority />
    </div>
  );

  return (
    <div className="relative -mt-[80px] pt-[124px] sm:pt-[140px]">
      <Suspense fallback={null}>
        <ReferralTracker slug={program.slug} />
      </Suspense>

      {program.bannerFullWidth ? (
        banner
      ) : (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">{banner}</div>
      )}

      <article className="relative mx-auto max-w-4xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="flex items-center gap-3 text-3xl font-extrabold text-ink sm:text-4xl">
            {program.iconUrl && (
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl sm:h-10 sm:w-10">
                <Image src={program.iconUrl} alt="" fill className="object-cover" />
              </span>
            )}
            {program.title}
          </h1>
          <div className="flex items-center gap-3">
            <ReferralShareButton slug={program.slug} />
            <ProgramRegisterButton
              slug={program.slug}
              form={program.form}
              initialApplication={myApplication}
            />
          </div>
        </div>

        <AboutProgramSection
          subtitleEn={program.subtitleEn}
          subtitleAr={program.subtitleAr}
          aboutBody={program.aboutBody}
        />

        <PhasesSection phases={program.phases} />

        <BenefitsSection benefits={program.benefits} />

        <CriteriaSection criteria={program.criteria} />

        <section className="mt-10 rounded-3xl border border-ink/[0.06] bg-brand-50/40 p-6">
          <div className="flex items-center gap-4">
            {program.partnerLogoUrl && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                <Image
                  src={program.partnerLogoUrl}
                  alt={program.partnerName}
                  fill
                  className="object-cover"
                />
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
            <h2 className="text-xl font-bold text-ink">{t('programPage.sponsors')}</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {program.sponsors.map((sponsor, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-sm"
                >
                  {sponsor.logoUrl && (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand-50">
                      <Image
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        fill
                        className="object-cover"
                      />
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
            <h2 className="text-xl font-bold text-ink">{t('programPage.otherPrograms')}</h2>
            <p className="mt-1 text-sm text-ink-faint">{t('programPage.programsRecommended')}</p>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {otherPrograms.map((other, i) => (
                <ProgramCard key={other.id} program={other} index={i} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
