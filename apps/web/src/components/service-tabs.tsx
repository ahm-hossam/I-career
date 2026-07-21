'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Building2, Check, HeartHandshake, Users } from 'lucide-react';
import { cn } from '@i-career/utils';
import { SERVICE_TABS, SERVICES_HEADING, SERVICES_SUBHEAD } from '@/data/home';

const TAB_ICONS = [Users, Building2, HeartHandshake];

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const activeTab = SERVICE_TABS[active];
  const ActiveIcon = TAB_ICONS[active];

  return (
    <section id="services" data-nav-theme="dark" className="relative overflow-hidden bg-ink py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-32 left-[12%] h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-[8%] h-80 w-80 rounded-full bg-accent-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-[32px]">{SERVICES_HEADING}</h2>
          <p className="mx-auto mt-3 max-w-xl text-balance text-white/60">{SERVICES_SUBHEAD}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-3"
        >
          <div className="relative flex flex-col gap-1.5 rounded-2xl bg-black/20 p-1.5 sm:flex-row">
            {SERVICE_TABS.map((tab, i) => {
              const Icon = TAB_ICONS[i];
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'relative flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide transition-colors',
                    i === active ? 'text-ink' : 'text-white/50 hover:text-white/80',
                  )}
                >
                  {i === active && (
                    <motion.span
                      layoutId="service-tab-active"
                      transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-xl bg-brand-500"
                    />
                  )}
                  <Icon size={15} className="relative" />
                  <span className="relative">{tab.tabLabel}</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 p-4 sm:grid-cols-2 sm:gap-8 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.key}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col justify-center"
              >
                <h3 className="text-xl font-bold text-white sm:text-2xl">{activeTab.heading}</h3>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {activeTab.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 + i * 0.06 }}
                      className="flex items-center gap-2.5 text-sm text-white/70"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="group mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent-300 px-5 py-2.5 text-sm font-semibold text-ink shadow-lg shadow-accent-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                >
                  {activeTab.cta}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </AnimatePresence>

            <div className="relative hidden min-h-[280px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-hero sm:flex">
              <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-10 h-64 w-64 rounded-full bg-accent-300/25 blur-3xl" />

              <div className="relative flex flex-col items-center gap-4 text-white">
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 shadow-xl backdrop-blur-sm">
                  <ActiveIcon size={36} />
                </span>
                <span className="text-lg font-bold">{activeTab.tabLabel}</span>
                <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold backdrop-blur-sm">
                  {activeTab.items.length} Services
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
