'use client';

import { motion } from 'motion/react';
import { NetworkField } from '@/components/network-field';

export function PageHeaderBanner({ heading, subhead }: { heading: string; subhead?: string }) {
  return (
    <section className="relative -mt-[80px] overflow-hidden bg-white pt-[144px] pb-10 sm:pt-[160px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(79,186,116,0.1),transparent)]" />
      <NetworkField variant="brand" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-balance text-3xl font-extrabold text-ink sm:text-4xl">{heading}</h1>
          {subhead && <p className="mt-4 text-ink-soft">{subhead}</p>}
        </motion.div>
      </div>
    </section>
  );
}
