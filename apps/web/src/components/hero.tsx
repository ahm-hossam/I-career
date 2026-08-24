'use client';

import { motion } from 'motion/react';
import { ChevronDown, Sparkles, TrendingUp } from 'lucide-react';
import { NetworkField } from '@/components/network-field';
import { StatCounter } from '@/components/stat-counter';
import { TypewriterHeading } from '@/components/typewriter-heading';
import { getHomeContent } from '@/data/home';
import { useLocale } from '@/lib/i18n/locale-context';

export function Hero() {
  const { locale } = useLocale();
  const { hero, stats } = getHomeContent(locale);
  const headlineLines =
    locale === 'en'
      ? [
          [{ text: hero.headline[0] }],
          [
            { text: 'EDUCATION', className: 'text-brand-600' },
            { text: ' AND ' },
            { text: 'EMPLOYMENT', className: 'text-accent-500' },
          ],
          [{ text: hero.headline[2] }],
        ]
      : hero.headline.map((line) => [{ text: line }]);

  return (
    <section className="relative -mt-[80px] overflow-hidden bg-white pt-[144px] pb-24 sm:pt-[160px] sm:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(79,186,116,0.1),transparent)]" />
      <NetworkField variant="brand" />

      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: [0, -10, 0], rotate: [-8, -4, -8] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
          rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        className="pointer-events-none absolute start-[6%] top-40 hidden items-center gap-1.5 rounded-full border border-brand-500/20 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-brand-700 shadow-lg backdrop-blur-sm lg:flex"
      >
        <TrendingUp size={13} />
        {stats[1].value}
        {stats[1].suffix} {stats[1].label}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: [0, 10, 0], rotate: [7, 3, 7] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.65 },
          y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.65 },
          rotate: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.65 },
        }}
        className="pointer-events-none absolute end-[7%] top-56 hidden items-center gap-1.5 rounded-full border border-accent-500/25 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-accent-500 shadow-lg backdrop-blur-sm lg:flex"
      >
        <Sparkles size={13} />
        {stats[2].value} {stats[2].label}
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-700 shadow-sm backdrop-blur-sm"
        >
          {getHomeContent(locale).ctaBandText}
        </motion.span>

        <h1 className="mt-6 text-balance font-sans text-4xl font-bold uppercase leading-[1.12] tracking-tight text-ink rtl:leading-[1.5] sm:text-5xl md:text-[3.4rem]">
          <TypewriterHeading lines={headlineLines} startDelay={0.5} charDelay={0.026} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-ink-soft sm:text-xl"
        >
          {hero.subhead}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 2.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-14 flex max-w-3xl justify-center gap-4 px-4 sm:gap-6"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex-1 rounded-2xl border border-ink/[0.06] bg-white/90 px-4 py-6 text-center shadow-lg shadow-brand-900/5 backdrop-blur-sm transition-shadow hover:shadow-xl sm:px-8"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} theme="dark" delay={2.3 + i * 0.1} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="relative mt-12 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-ink-faint"
          aria-hidden="true"
        >
          <ChevronDown size={26} />
        </motion.div>
      </motion.div>
    </section>
  );
}
