'use client';

import { useId, useRef, useState, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import type { ChartPoint } from '@/lib/overview-data';
import { useLocale } from '@/lib/i18n/locale-context';

const WIDTH = 640;
const HEIGHT = 220;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export function SignupsChart({ data }: { data: ChartPoint[] }) {
  const { t } = useLocale();
  const gradientId = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const values = data.map((d) => d.value);
  const max = Math.max(1, ...values);
  const min = 0;
  const range = max - min || 1;
  const step = WIDTH / (values.length - 1);

  const points = values.map((value, i) => {
    const x = i * step;
    const y = HEIGHT - PAD_BOTTOM - ((value - min) / range) * (HEIGHT - PAD_TOP - PAD_BOTTOM);
    return [x, y] as const;
  });

  const linePath = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L${WIDTH},${HEIGHT - PAD_BOTTOM} L0,${HEIGHT - PAD_BOTTOM} Z`;

  const guides = [0.25, 0.5, 0.75, 1].map((f) => HEIGHT - PAD_BOTTOM - f * (HEIGHT - PAD_TOP - PAD_BOTTOM));

  function handleMove(event: MouseEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relativeX = ((event.clientX - rect.left) / rect.width) * WIDTH;
    const index = Math.round(relativeX / step);
    setHoverIndex(Math.max(0, Math.min(values.length - 1, index)));
  }

  const active = hoverIndex !== null ? data[hoverIndex] : null;
  const activePoint = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <div>
        <h2 className="text-base font-bold text-ink dark:text-white">{t('overview.chartTitle')}</h2>
        <p className="mt-0.5 text-sm text-ink-faint">{t('overview.chartSubtitle')}</p>
      </div>

      <div className="relative mt-5">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full touch-none"
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
          role="img"
          aria-label={t('overview.chartTitle')}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4fba74" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#4fba74" stopOpacity="0" />
            </linearGradient>
          </defs>

          {guides.map((y) => (
            <line key={y} x1={0} x2={WIDTH} y1={y} y2={y} stroke="currentColor" strokeOpacity={0.06} strokeWidth={1} />
          ))}

          <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
          <path d={linePath} fill="none" stroke="#4fba74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {activePoint && (
            <line x1={activePoint[0]} x2={activePoint[0]} y1={PAD_TOP} y2={HEIGHT - PAD_BOTTOM} stroke="currentColor" strokeOpacity={0.15} strokeWidth={1} />
          )}
          {points.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={hoverIndex === i ? 4.5 : 0}
              fill="#4fba74"
              stroke="var(--surface)"
              strokeWidth="2"
              className="transition-all duration-100"
            />
          ))}

          {data.map((d, i) => (
            <text key={`${d.month}-${i}`} x={i * step} y={HEIGHT - 6} textAnchor="middle" className="fill-ink-faint text-[10px] font-medium">
              {d.month}
            </text>
          ))}
        </svg>

        {active && activePoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            style={{ left: `${(activePoint[0] / WIDTH) * 100}%`, top: `${(activePoint[1] / HEIGHT) * 100}%` }}
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-xs font-semibold text-ink shadow-lg dark:text-white"
          >
            {active.month}: <span className="tabular-nums text-brand-600 dark:text-brand-300">{active.value}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
