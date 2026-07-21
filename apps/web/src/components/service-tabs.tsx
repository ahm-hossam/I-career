'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { ArrowRight, Building2, Check, HeartHandshake, Users } from 'lucide-react';
import { cn } from '@i-career/utils';
import { SERVICE_TABS, SERVICES_HEADING, SERVICES_SUBHEAD } from '@/data/home';

const STEP_HEIGHT = 460;

const tabIcons = [Users, Building2, HeartHandshake];

export function ServiceTabs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeTab = SERVICE_TABS[active];
  const ActiveIcon = tabIcons[active];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(SERVICE_TABS.length - 1, Math.max(0, Math.floor(v * SERVICE_TABS.length)));
    setActive(idx);
  });

  const jumpTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = el.offsetTop + i * STEP_HEIGHT + 1;
    window.scrollTo({ top, behavior: 'smooth' });
  };

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

        <div ref={containerRef} className="relative mt-14" style={{ height: SERVICE_TABS.length * STEP_HEIGHT }}>
          <div className="sticky top-24 grid gap-8 overflow-hidden rounded-3xl border border-ink/[0.06] bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-10">
            <div className="flex flex-col justify-center gap-3">
              {SERVICE_TABS.map((tab, i) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => jumpTo(i)}
                  className={cn(
                    'rounded-2xl border px-5 py-4 text-left transition-all duration-300',
                    i === active
                      ? 'border-brand-500/30 bg-brand-50 shadow-sm'
                      : 'border-transparent text-ink-faint hover:bg-ink/[0.03]',
                  )}
                >
                  <span
                    className={cn(
                      'text-xs font-bold uppercase tracking-wide',
                      i === active ? 'text-brand-600' : 'text-ink-faint',
                    )}
                  >
                    {tab.tabLabel}
                  </span>
                  <AnimatePresence initial={false}>
                    {i === active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <h3 className="mt-1.5 text-xl font-bold text-ink sm:text-2xl">{tab.heading}</h3>
                        <ul className="mt-4 flex flex-col gap-2">
                          {tab.items.map((item) => (
                            <li key={item} className="flex items-center gap-2.5 text-sm text-ink-soft">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                                <Check size={12} strokeWidth={3} />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#contact"
                          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-accent-300 px-5 py-2.5 text-sm font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          {tab.cta}
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            <div className="relative hidden min-h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-hero sm:flex">
              <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-14 -left-10 h-64 w-64 rounded-full bg-accent-300/25 blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.key}
                  initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center gap-4 text-white"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 shadow-xl backdrop-blur-sm">
                    <ActiveIcon size={36} />
                  </span>
                  <span className="text-lg font-bold">{activeTab.tabLabel}</span>
                  <span className="rounded-full bg-white/15 px-4 py-1 text-xs font-semibold backdrop-blur-sm">
                    {activeTab.items.length} Services
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
