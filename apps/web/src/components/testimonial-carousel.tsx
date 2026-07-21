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
    <section data-nav-theme="dark" className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-ink py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22120%22%20height%3D%22120%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%2F%3E%3C%2Fsvg%3E')]" />
      <div className="pointer-events-none absolute -top-20 left-[10%] h-80 w-80 rounded-full bg-brand-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-[8%] h-96 w-96 rounded-full bg-accent-300/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    <motion.div
                      key={t.name}
                      whileHover={{ y: -8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="group flex flex-col rounded-2xl border border-white/15 bg-white/10 p-6 shadow-lg backdrop-blur transition-shadow duration-300 hover:border-white/30 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_20px_40px_-10px_rgba(0,0,0,0.4)]"
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
                    </motion.div>
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
