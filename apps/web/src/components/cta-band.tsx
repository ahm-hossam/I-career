'use client';

import { motion } from 'motion/react';
import { Rocket, Sparkles } from 'lucide-react';
import { CTA_BAND_TEXT } from '@/data/home';

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-brand-600 via-brand-500 to-brand-hero py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
      <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-10 h-72 w-72 rounded-full bg-accent-300/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: -16, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: -6 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="pointer-events-none absolute left-[8%] top-8 hidden items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:flex"
      >
        <Sparkles size={14} />
        37 Projects
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16, rotate: 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: 6 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pointer-events-none absolute bottom-8 right-[10%] hidden items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:flex"
      >
        <Rocket size={14} />
        400+ Employers
      </motion.div>

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
