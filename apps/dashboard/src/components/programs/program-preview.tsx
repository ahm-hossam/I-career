import Image from 'next/image';
import { Check } from 'lucide-react';
import type { ImageAspect, ProgramPhase, ProgramSponsor } from '@i-career/types';
import { aspectRatioClass } from '@/lib/rich-text';

interface ProgramPreviewProps {
  title: string;
  subtitleEn: string;
  subtitleAr: string;
  logoUrl: string;
  imageAspect: ImageAspect;
  aboutBody: string;
  phases: ProgramPhase[];
  benefits: string[];
  criteria: string[];
  partnerName: string;
  partnerBio: string;
  partnerLogoUrl: string;
  sponsors: ProgramSponsor[];
}

export function ProgramPreview({
  title,
  subtitleEn,
  subtitleAr,
  logoUrl,
  imageAspect,
  aboutBody,
  phases,
  benefits,
  criteria,
  partnerName,
  partnerBio,
  partnerLogoUrl,
  sponsors,
}: ProgramPreviewProps) {
  return (
    <article className="mx-auto max-w-2xl bg-white p-6 sm:p-8">
      <div className={`relative w-full overflow-hidden rounded-3xl bg-brand-50 ${aspectRatioClass(imageAspect)}`}>
        {logoUrl ? (
          <Image src={logoUrl} alt={title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink-faint">No banner image</div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{title || 'Untitled Program'}</h1>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white opacity-60">
          Register
        </span>
      </div>

      {(subtitleEn || aboutBody) && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">About Program</h2>
          {subtitleEn && <p className="mt-2 font-semibold text-ink">{subtitleEn}</p>}
          {subtitleAr && (
            <p className="text-ink-soft" dir="rtl">
              {subtitleAr}
            </p>
          )}
          <div
            className="prose prose-sm mt-4 max-w-none text-ink-soft prose-headings:text-ink prose-strong:text-ink"
            dangerouslySetInnerHTML={{ __html: aboutBody }}
          />
        </section>
      )}

      {phases.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">What you&apos;ll go through</h2>
          <p className="mt-1 text-sm text-ink-faint">The program is delivered across connected phases</p>
          <div className="mt-4 flex flex-col gap-4">
            {phases.map((phase, i) => (
              <div key={i} className="rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-sm">
                <h3 className="font-bold text-ink">{phase.title || 'Untitled phase'}</h3>
                <div
                  className="prose prose-sm mt-1.5 max-w-none text-sm text-ink-soft prose-headings:text-ink prose-strong:text-ink"
                  dangerouslySetInnerHTML={{ __html: phase.description }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {benefits.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Benefits</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check size={12} strokeWidth={3} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>
      )}

      {criteria.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Program Criteria</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {criteria.map((criterion, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-300 text-ink">
                  <Check size={12} strokeWidth={3} />
                </span>
                {criterion}
              </li>
            ))}
          </ul>
        </section>
      )}

      {(partnerName || partnerBio) && (
        <section className="mt-10 rounded-3xl border border-ink/[0.06] bg-brand-50/40 p-6">
          <div className="flex items-center gap-4">
            {partnerLogoUrl && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white">
                <Image src={partnerLogoUrl} alt={partnerName} fill className="object-cover" />
              </div>
            )}
            <h2 className="font-bold text-ink">{partnerName || 'Partner name'}</h2>
          </div>
          <div
            className="prose prose-sm mt-2 max-w-none text-sm text-ink-soft prose-headings:text-ink prose-strong:text-ink"
            dangerouslySetInnerHTML={{ __html: partnerBio }}
          />
        </section>
      )}

      {sponsors.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Sponsors</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sponsors.map((sponsor, i) => (
              <div key={i} className="flex items-start gap-3 rounded-2xl border border-ink/[0.06] bg-white p-4 shadow-sm">
                {sponsor.logoUrl && (
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-brand-50">
                    <Image src={sponsor.logoUrl} alt={sponsor.name} fill className="object-cover" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-bold text-ink">{sponsor.name || 'Sponsor name'}</p>
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
    </article>
  );
}
