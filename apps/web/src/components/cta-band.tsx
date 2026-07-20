'use client';

import { motion } from 'motion/react';
import { CTA_BAND_TEXT } from '@/data/home';

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-500 to-brand-hero py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent-300/20 blur-3xl" />

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative text-center text-3xl font-extrabold text-white sm:text-4xl"
      >
        {CTA_BAND_TEXT}
      </motion.h2>
    </section>
  );
}
