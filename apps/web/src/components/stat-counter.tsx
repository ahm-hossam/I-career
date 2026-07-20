'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'motion/react';
import { cn } from '@i-career/utils';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  theme?: 'dark' | 'light';
  className?: string;
}

export function StatCounter({ value, suffix = '', label, theme = 'dark', className }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className={className}>
      <div
        className={cn(
          'font-sans text-4xl font-bold tabular-nums sm:text-[42px]',
          theme === 'dark' ? 'text-ink' : 'text-white',
        )}
      >
        {display}
        {suffix}
      </div>
      <div className={cn('mt-1 text-sm font-medium', theme === 'dark' ? 'text-ink-soft' : 'text-white/75')}>
        {label}
      </div>
    </div>
  );
}
