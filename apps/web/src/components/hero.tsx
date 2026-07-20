'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { StatCounter } from '@/components/stat-counter';
import { HERO, STATS } from '@/data/home';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-hero via-brand-500 to-brand-600 pb-28 pt-20 sm:pb-36 sm:pt-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent-300/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-6rem] left-[20%] h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-balance font-sans text-4xl font-bold uppercase leading-[1.12] tracking-tight text-white sm:text-5xl md:text-[3.4rem]"
        >
          <span className="block">{HERO.headline[0]}</span>
          <span className="block">
            <span className="text-accent-300">EDUCATION</span> AND{' '}
            <span className="text-accent-300">EMPLOYMENT</span>
          </span>
          <span className="block">{HERO.headline[2]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-balance text-lg text-white/85 sm:text-xl"
        >
          {HERO.subhead}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto mt-14 flex max-w-2xl justify-center px-4"
      >
        <div className="grid w-full grid-cols-3 gap-4 rounded-3xl border border-white/25 bg-white/10 px-6 py-7 shadow-xl backdrop-blur-xl sm:gap-8 sm:px-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} theme="light" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-12 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/70"
          aria-hidden="true"
        >
          <ChevronDown size={26} />
        </motion.div>
      </motion.div>
    </section>
  );
}
