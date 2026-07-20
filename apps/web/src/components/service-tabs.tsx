'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@i-career/utils';
import { SERVICE_TABS, SERVICES_HEADING, SERVICES_SUBHEAD } from '@/data/home';

export function ServiceTabs() {
  const [active, setActive] = useState(SERVICE_TABS[0].key);
  const activeTab = SERVICE_TABS.find((tab) => tab.key === active) ?? SERVICE_TABS[0];

  return (
    <section id="services" className="bg-brand-50/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-ink sm:text-[32px]">{SERVICES_HEADING}</h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-ink-soft">{SERVICES_SUBHEAD}</p>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-ink/10 bg-white p-1.5 shadow-sm">
            {SERVICE_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActive(tab.key)}
                className={cn(
                  'relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:text-base',
                  active === tab.key ? 'text-white' : 'text-ink-soft hover:text-ink',
                )}
              >
                {active === tab.key && (
                  <motion.span
                    layoutId="service-tab-pill"
                    className="absolute inset-0 rounded-full bg-brand-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.tabLabel}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-12 min-h-[380px] overflow-hidden rounded-3xl border border-ink/[0.06] bg-white p-8 shadow-sm sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-10 sm:grid-cols-2 sm:items-center"
            >
              <div>
                <h3 className="text-2xl font-bold text-ink sm:text-[26px]">{activeTab.heading}</h3>
                <a
                  href="#contact"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent-300 px-6 py-3 text-sm font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:text-base"
                >
                  {activeTab.cta}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <ul className="flex flex-col gap-3.5">
                {activeTab.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 + i * 0.05 }}
                    className="flex items-center gap-3 rounded-2xl border border-ink/[0.06] bg-brand-50/50 px-4 py-3"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    <span className="font-medium text-ink">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
