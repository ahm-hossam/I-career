'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { PARTNER_GROUPS } from '@/data/partners';
import { WHO_WE_WORKED_WITH_HEADING } from '@/data/home';

function MarqueeRow({ groupIndex }: { groupIndex: number }) {
  const group = PARTNER_GROUPS[groupIndex];
  const duration = 22 + group.logos.length * 1.6;

  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max items-center gap-10 py-2 animate-marquee group-hover/row:[animation-play-state:paused] sm:gap-14"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...group.logos, ...group.logos].map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="flex h-10 shrink-0 items-center grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-9 w-auto object-contain sm:h-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoTicker() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-extrabold text-ink sm:text-[32px]"
        >
          {WHO_WE_WORKED_WITH_HEADING}
        </motion.h2>

        <div className="mt-12 flex flex-col gap-10">
          {PARTNER_GROUPS.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-ink-soft sm:text-left">
                {group.label}
              </p>
              <MarqueeRow groupIndex={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
