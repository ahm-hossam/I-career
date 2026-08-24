'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import type { PartnerLogoCategory, PublicPartnerLogo } from '@i-career/types';
import { getHomeContent } from '@/data/home';
import { useLocale } from '@/lib/i18n/locale-context';

function useCategoryOrder(): { key: PartnerLogoCategory; label: string }[] {
  const { t } = useLocale();
  return [
    { key: 'GOVERNMENTAL', label: t('logoTicker.governmental') },
    { key: 'ORGANIZATIONS', label: t('logoTicker.organizations') },
    { key: 'EMPLOYERS', label: t('logoTicker.employers') },
    { key: 'UNIVERSITIES', label: t('logoTicker.universities') },
  ];
}

function MarqueeRow({ logos }: { logos: PublicPartnerLogo[] }) {
  const duration = 22 + logos.length * 1.6;

  return (
    <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max items-center gap-10 py-2 animate-marquee group-hover/row:[animation-play-state:paused] sm:gap-14"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={`${logo.id}-${i}`}
            className="flex h-10 shrink-0 items-center grayscale opacity-60 transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <Image
              src={logo.imageUrl}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              loading="eager"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function LogoTicker({ logos }: { logos: PublicPartnerLogo[] }) {
  const { locale } = useLocale();
  const categoryOrder = useCategoryOrder();
  const whoWeWorkedWithHeading = getHomeContent(locale).whoWeWorkedWithHeading;
  const groups = categoryOrder.map(({ key, label }) => ({
    key,
    label,
    logos: logos.filter((l) => l.category === key).sort((a, b) => a.order - b.order),
  })).filter((group) => group.logos.length > 0);

  if (groups.length === 0) return null;

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
          {whoWeWorkedWithHeading}
        </motion.h2>

        <div className="mt-12 flex flex-col gap-10">
          {groups.map((group, i) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <p className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-ink-soft sm:text-start">
                {group.label}
              </p>
              <MarqueeRow logos={group.logos} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
