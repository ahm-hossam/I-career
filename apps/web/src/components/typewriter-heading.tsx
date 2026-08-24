'use client';

import { motion } from 'motion/react';
import { useLocale } from '@/lib/i18n/locale-context';

export interface TypewriterSegment {
  text: string;
  className?: string;
}

interface TypewriterHeadingProps {
  lines: TypewriterSegment[][];
  charDelay?: number;
  startDelay?: number;
  className?: string;
  cursorClassName?: string;
}

interface FlatChar {
  char: string;
  lineIndex: number;
  segIndex: number;
}

/**
 * Types out multi-line, multi-color headline text one character at a time,
 * then leaves a blinking cursor. Each line stays a fixed block (no reflow
 * mid-type) so the layout matches the final, fully-typed headline throughout.
 */
export function TypewriterHeading({
  lines,
  charDelay = 0.026,
  startDelay = 0.2,
  className,
  cursorClassName,
}: TypewriterHeadingProps) {
  const { dir } = useLocale();

  if (dir === 'rtl') {
    // Arabic letters need to sit adjacent to their neighbors to get the correct
    // connected glyph shapes — splitting them into per-character inline-block
    // spans (as the LTR typewriter effect below does) breaks that shaping and
    // the RTL reordering. RTL gets a per-line fade-in instead, text left intact.
    return (
      <span className={className}>
        {lines.map((segments, lineIndex) => (
          <motion.span
            key={lineIndex}
            className="block"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: startDelay + lineIndex * 0.12 }}
          >
            {segments.map((segment, segIndex) => (
              <span key={segIndex} className={segment.className}>
                {segment.text}
              </span>
            ))}
          </motion.span>
        ))}
      </span>
    );
  }

  const flat: FlatChar[] = lines.flatMap((segments, lineIndex) =>
    segments.flatMap((segment, segIndex) =>
      segment.text.split('').map((char) => ({ char, lineIndex, segIndex })),
    ),
  );

  const cursorDelay = startDelay + flat.length * charDelay;
  const lastLineIndex = lines.length - 1;

  return (
    <span className={className}>
      {lines.map((segments, lineIndex) => (
        <span key={lineIndex} className="block">
          {segments.map((segment, segIndex) => (
            <span key={segIndex} className={segment.className}>
              {flat.map((item, flatIndex) => {
                if (item.lineIndex !== lineIndex || item.segIndex !== segIndex) return null;
                return (
                  <motion.span
                    key={flatIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.01, delay: startDelay + flatIndex * charDelay }}
                    className="inline-block"
                  >
                    {item.char === ' ' ? ' ' : item.char}
                  </motion.span>
                );
              })}
            </span>
          ))}
          {lineIndex === lastLineIndex && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0, 0] }}
              transition={{
                delay: cursorDelay,
                duration: 0.9,
                repeat: Infinity,
                repeatDelay: 0.15,
                times: [0, 0.1, 0.5, 0.6, 1],
              }}
              aria-hidden="true"
              className={cursorClassName ?? 'ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-current align-middle'}
            />
          )}
        </span>
      ))}
    </span>
  );
}
