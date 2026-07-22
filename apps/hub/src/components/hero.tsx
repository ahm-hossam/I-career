'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { NetworkField } from '@/components/network-field';
import { TypewriterHeading } from '@/components/typewriter-heading';
import { useAuthModal } from '@/lib/auth/auth-modal-context';

const HEADLINE_LINES = [[{ text: 'Find your dream job.' }]];

export function Hero() {
  const { open } = useAuthModal();

  return (
    <section className="relative -mt-[80px] overflow-hidden bg-white pt-[144px] pb-20 sm:pt-[160px] sm:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(79,186,116,0.1),transparent)]" />
      <NetworkField variant="brand" />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-balance font-sans text-4xl font-bold leading-[1.15] tracking-tight text-ink sm:text-5xl">
          <TypewriterHeading lines={HEADLINE_LINES} startDelay={0.3} charDelay={0.03} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/programs"
            className="rounded-full bg-brand-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md"
          >
            Explore Programs
          </Link>
          <button
            type="button"
            onClick={() => open('signup')}
            className="rounded-full bg-accent-300 px-6 py-3 text-sm font-bold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Register
          </button>
        </motion.div>
      </div>
    </section>
  );
}
