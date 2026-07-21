'use client';

import { motion } from 'motion/react';
import { GraduationCap, Rocket, Sparkles } from 'lucide-react';
import { NetworkField } from '@/components/network-field';
import { CTA_BAND_TEXT, STATS } from '@/data/home';

const PILLS = [
  { ...STATS[0], icon: Sparkles, position: 'left-[6%] top-9 sm:top-10', delay: 0.15, swing: -8 },
  { ...STATS[2], icon: GraduationCap, position: 'right-[8%] top-14 sm:top-16', delay: 0.3, swing: 6 },
  { ...STATS[1], icon: Rocket, position: 'left-[14%] bottom-9 sm:bottom-11', delay: 0.45, swing: -6 },
];

const GHOST_WORDS = Array.from({ length: 6 }, () => CTA_BAND_TEXT.toUpperCase());

export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-500 to-brand-hero py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="flex w-max items-center gap-16 animate-marquee" style={{ animationDuration: '48s' }}>
          {[...GHOST_WORDS, ...GHOST_WORDS].map((word, i) => (
            <span
              key={i}
              className="text-[7rem] font-extrabold uppercase leading-none tracking-tight text-white/[0.07] sm:text-[9rem] lg:text-[10rem]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <NetworkField variant="inverted" />

      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent-300/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {PILLS.map((pill) => {
        const Icon = pill.icon;
        return (
          <motion.div
            key={pill.label}
            initial={{ opacity: 0, y: pill.swing > 0 ? 16 : -16, rotate: pill.swing }}
            whileInView={{ opacity: 1, y: [0, pill.swing, 0], rotate: pill.swing }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              opacity: { duration: 0.5, delay: pill.delay },
              y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: pill.delay },
            }}
            className={`pointer-events-none absolute z-10 ${pill.position} hidden items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-black/10 backdrop-blur-md sm:flex`}
          >
            <Icon size={14} />
            {pill.value}
            {pill.suffix} {pill.label}
          </motion.div>
        );
      })}

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block"
        >
          <div className="pointer-events-none absolute -inset-x-12 -inset-y-8 -z-10 rounded-full bg-white/10 blur-2xl" />
          <h2 className="animate-shimmer bg-gradient-to-r from-white/60 via-white to-white/60 bg-clip-text text-4xl font-extrabold text-transparent [background-size:200%_auto] sm:text-5xl">
            {CTA_BAND_TEXT}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
