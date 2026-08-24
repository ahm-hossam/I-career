'use client';

import { motion } from 'motion/react';
import { Award, Check, FileText, ListChecks, Milestone } from 'lucide-react';
import type { ProgramPhase } from '@i-career/types';
import { useLocale } from '@/lib/i18n/locale-context';

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof FileText;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600">
        <Icon size={19} />
      </span>
      <div>
        <h2 className="text-xl font-bold text-ink">{title}</h2>
        {subtitle && <p className="text-xs text-ink-faint">{subtitle}</p>}
      </div>
    </div>
  );
}

export function AboutProgramSection({
  subtitleEn,
  subtitleAr,
  aboutBody,
}: {
  subtitleEn: string;
  subtitleAr: string | null;
  aboutBody: string;
}) {
  const { t } = useLocale();
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4 }}
      className="mt-10 rounded-3xl border border-ink/[0.06] bg-white p-6 shadow-sm"
    >
      <SectionHeading icon={FileText} title={t('programPage.aboutProgram')} />
      <p className="mt-4 font-semibold text-ink">{subtitleEn}</p>
      {subtitleAr && (
        <p className="mt-1 text-ink-soft" dir="rtl">
          {subtitleAr}
        </p>
      )}
      <div
        className="prose prose-sm mt-4 max-w-none text-ink-soft prose-headings:text-ink prose-strong:text-ink"
        dangerouslySetInnerHTML={{ __html: aboutBody }}
      />
    </motion.section>
  );
}

export function PhasesSection({ phases }: { phases: ProgramPhase[] }) {
  const { t } = useLocale();
  if (phases.length === 0) return null;

  return (
    <section className="mt-10">
      <SectionHeading
        icon={Milestone}
        title={t('programPage.whatYoullGoThrough')}
        subtitle={t('programPage.phasesSubtitle')}
      />
      <div className="mt-6 flex flex-col">
        {phases.map((phase, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {i < phases.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute start-[19px] top-10 h-[calc(100%-1.5rem)] w-px bg-ink/[0.08]"
              />
            )}
            <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white shadow-sm shadow-brand-900/10">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-ink/[0.06] bg-white p-5 shadow-sm">
              <h3 className="font-bold text-ink">{phase.title}</h3>
              <div
                className="prose prose-sm mt-1.5 max-w-none text-sm text-ink-soft prose-headings:text-ink prose-strong:text-ink"
                dangerouslySetInnerHTML={{ __html: phase.description }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function BenefitsSection({ benefits }: { benefits: string[] }) {
  const { t } = useLocale();
  if (benefits.length === 0) return null;

  return (
    <section className="mt-10">
      <SectionHeading icon={Award} title={t('programPage.benefits')} />
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {benefits.map((benefit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-2xl border border-brand-500/15 bg-brand-50/50 p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
              <Check size={13} strokeWidth={3} />
            </span>
            <p className="text-sm font-medium text-ink">{benefit}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function CriteriaSection({ criteria }: { criteria: string[] }) {
  const { t } = useLocale();
  if (criteria.length === 0) return null;

  return (
    <section className="mt-10">
      <SectionHeading icon={ListChecks} title={t('programPage.programCriteria')} />
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {criteria.map((criterion, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="flex items-start gap-3 rounded-2xl border border-accent-500/20 bg-accent-50/60 p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-300 text-ink">
              <Check size={13} strokeWidth={3} />
            </span>
            <p className="text-sm font-medium text-ink">{criterion}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
