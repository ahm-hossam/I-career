'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@i-career/utils';
import { TESTIMONIALS, TESTIMONIALS_HEADING, TESTIMONIALS_SUBHEAD } from '@/data/home';

const PER_VIEW_LG = 3;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pages = Math.ceil(TESTIMONIALS.length / PER_VIEW_LG);
  const trackRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    setIndex(((next % pages) + pages) % pages);
  }, [pages]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(index + 1), 5000);
    return () => clearInterval(id);
  }, [index, paused, goTo]);

  return (
    <section className="bg-brand-500 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-[32px]">{TESTIMONIALS_HEADING}</h2>
          <p className="mt-2 text-white/85">{TESTIMONIALS_SUBHEAD}</p>
        </motion.div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {Array.from({ length: pages }).map((_, pageIdx) => (
                <div key={pageIdx} className="grid w-full shrink-0 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {TESTIMONIALS.slice(pageIdx * PER_VIEW_LG, pageIdx * PER_VIEW_LG + PER_VIEW_LG).map((t) => (
                    <div
                      key={t.name}
                      className="flex flex-col rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur"
                    >
                      <Quote size={28} className="text-white/40" />
                      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white">{t.quote}</p>
                      <div className="mt-6 flex items-center gap-3">
                        <Image
                          src={t.avatar}
                          alt={t.name}
                          width={44}
                          height={44}
                          className="h-11 w-11 rounded-full border-2 border-white/30 object-cover"
                        />
                        <div>
                          <p className="text-sm font-bold text-white">{t.name}</p>
                          <p className="text-xs text-white/70">{t.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    i === index ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/60',
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15"
              aria-label="Next testimonials"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
