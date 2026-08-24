'use client';

import {
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Megaphone,
  Rocket,
  Send,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { PublicServiceProject } from '@i-career/types';
import { NetworkField } from '@/components/network-field';
import { TypewriterHeading } from '@/components/typewriter-heading';
import type { ServiceIconName, ServicePageData } from '@/data/services';
import { useLocale } from '@/lib/i18n/locale-context';
import { BoldedText } from './bolded-text';
import { ServiceProjectsSection } from './service-projects-section';

const ICONS: Record<ServiceIconName, typeof Sparkles> = {
  rocket: Rocket,
  sparkles: Sparkles,
  trophy: Trophy,
  'graduation-cap': GraduationCap,
  megaphone: Megaphone,
  'heart-handshake': HeartHandshake,
  globe: Globe2,
  handshake: Handshake,
};

export function ServicePage({ data, projects }: { data: ServicePageData; projects: PublicServiceProject[] }) {
  const { t } = useLocale();
  const highlightIndex = data.headlineText.indexOf(data.headlineHighlight);
  const before = highlightIndex >= 0 ? data.headlineText.slice(0, highlightIndex) : data.headlineText;
  const after = highlightIndex >= 0 ? data.headlineText.slice(highlightIndex + data.headlineHighlight.length) : '';
  const ApproachIcon = ICONS[data.approach.icon];
  const ghostWords = Array.from({ length: 6 }, () => data.ctaHeading.toUpperCase());

  return (
    <div>
      <section className="relative -mt-[80px] overflow-hidden bg-white pt-[144px] pb-20 sm:pt-[160px] sm:pb-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(79,186,116,0.1),transparent)]" />
        <NetworkField variant="brand" />

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: [0, -10, 0], rotate: [-6, -2, -6] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
            rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          }}
          className="pointer-events-none absolute start-[6%] top-40 hidden items-center gap-1.5 rounded-full border border-brand-500/20 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-lg backdrop-blur-sm lg:flex"
        >
          <Sparkles size={13} />
          {data.keywords[0]}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: [0, 10, 0], rotate: [6, 2, 6] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.65 },
            y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.65 },
            rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.65 },
          }}
          className="pointer-events-none absolute end-[7%] top-56 hidden items-center gap-1.5 rounded-full border border-accent-500/25 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-accent-500 shadow-lg backdrop-blur-sm lg:flex"
        >
          <ApproachIcon size={13} />
          {data.keywords[1]}
        </motion.div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur-sm"
          >
            {t('servicesBreadcrumb.prefix')} / {data.breadcrumbLabel}
          </motion.span>

          <h1 className="mt-6 text-balance font-sans text-3xl font-bold uppercase leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-5xl">
            <TypewriterHeading
              lines={[[{ text: before }, { text: data.headlineHighlight, className: 'text-accent-500' }, { text: after }]]}
              startDelay={0.5}
              charDelay={0.02}
            />
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="relative -mt-16 rounded-3xl border border-ink/[0.06] bg-white p-6 shadow-xl shadow-brand-900/5 sm:-mt-20 sm:p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600">
              <ApproachIcon size={20} />
            </span>
            <h2 className="text-lg font-extrabold text-ink sm:text-xl">
              <BoldedText text={data.approach.heading} />
            </h2>
          </div>

          {data.approach.body && (
            <p className="mt-4 text-sm text-ink-soft sm:text-base">
              <BoldedText text={data.approach.body} />
            </p>
          )}

          {data.approach.bullets && (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {data.approach.bullets.map((bullet, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <BoldedText text={bullet} />
                </motion.span>
              ))}
            </div>
          )}

          <motion.a
            href="/contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-300 px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-shadow hover:shadow-md"
          >
            {data.approach.ctaLabel}
            <Send size={16} />
          </motion.a>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {data.sections.map((section, i) => {
            const SectionIcon = ICONS[section.icon];
            return (
              <motion.section
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="rounded-3xl border border-ink/[0.06] bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-300/20 text-accent-500">
                  <SectionIcon size={20} />
                </span>
                <h2 className="mt-4 text-base font-extrabold text-ink">{section.heading}</h2>
                <p className="mt-2 text-sm text-ink-soft">
                  <BoldedText text={section.body} />
                </p>
              </motion.section>
            );
          })}
        </div>

        <ServiceProjectsSection projects={projects} />
      </div>

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-500 to-brand-hero py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="flex w-max items-center gap-16 animate-marquee" style={{ animationDuration: '46s' }}>
            {[...ghostWords, ...ghostWords].map((word, i) => (
              <span
                key={i}
                className="text-[5rem] font-extrabold uppercase leading-none tracking-tight text-white/[0.07] rtl:leading-[1.3] sm:text-[7rem]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <NetworkField variant="inverted" />

        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent-300/25 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
          <motion.h2
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl font-extrabold text-white sm:text-4xl"
          >
            {data.ctaHeading}
          </motion.h2>
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-700 shadow-lg transition-shadow hover:shadow-xl"
          >
            {data.ctaLabel}
            <Send size={16} />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
