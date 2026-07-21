'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@i-career/utils';
import { NAV_ITEMS, LOGIN_LABEL } from '@/data/site';

const TRIGGER_Y = 90;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [sectionDark, setSectionDark] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const controls = useAnimation();

  // At the very top the bar is full-width & see-through everywhere (not just home).
  // Once scrolled, it shrinks into a floating pill whose fill is the INVERSE of
  // whatever's behind it — white pill over a dark section, dark pill over a light one —
  // so it always pops rather than blending in.
  const atTop = !scrolled;
  const showDarkPill = !atTop && !sectionDark;
  const showLightPill = !atTop && sectionDark;
  const useWhiteText = atTop ? sectionDark : !sectionDark;
  const mode = `${atTop ? 'top' : 'pinned'}-${sectionDark ? 'dark' : 'light'}`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
      let isDark = false;
      darkSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= TRIGGER_Y && rect.bottom >= TRIGGER_Y) isDark = true;
      });
      setSectionDark(isDark);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // A funky little bounce every time the header's mode changes.
  useEffect(() => {
    controls.start({
      scale: [1, 1.06, 0.985, 1.012, 1],
      rotate: [0, -1.4, 1, -0.3, 0],
      transition: { duration: 0.65, times: [0, 0.35, 0.62, 0.82, 1], ease: 'easeOut' },
    });
  }, [mode, controls]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-[padding] duration-300 ease-out',
        atTop ? 'p-0' : 'p-3 sm:p-4',
      )}
    >
      <motion.div
        layout
        animate={controls}
        transition={{ layout: { type: 'spring', stiffness: 320, damping: 32 } }}
        className={cn(
          'mx-auto flex items-center justify-between transition-[max-width,border-radius,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out',
          atTop ? 'max-w-7xl px-4 py-4 sm:px-6 lg:px-8' : 'max-w-4xl px-5 py-2.5 sm:px-6',
          atTop && 'rounded-none border border-transparent bg-transparent shadow-none',
          showDarkPill &&
            'rounded-[2rem] border border-white/10 bg-ink/90 shadow-[0_10px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md',
          showLightPill &&
            'rounded-[2rem] border border-black/[0.06] bg-white/95 shadow-[0_10px_40px_-8px_rgba(21,26,30,0.18)] backdrop-blur-md',
        )}
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="iCareer home">
          <Image
            src="/brand/logo-nav.png"
            alt="iCareer"
            width={140}
            height={31}
            priority
            className={cn('h-7 w-auto transition-[filter] duration-300 sm:h-8', useWhiteText && 'brightness-0 invert')}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors',
                useWhiteText
                  ? 'text-white/75 hover:bg-white/10 hover:text-white'
                  : 'text-ink/80 hover:bg-ink/[0.04] hover:text-ink',
                isActive(item.href) && (useWhiteText ? 'text-white' : 'text-brand-700'),
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active"
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full',
                    useWhiteText ? 'bg-brand-300' : 'bg-brand-500',
                  )}
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden rounded-full bg-accent-300 px-5 py-2.5 text-[15px] font-semibold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 sm:inline-flex"
          >
            {LOGIN_LABEL}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden',
              useWhiteText ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-ink/[0.06]',
            )}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-24 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0, y: -8 }}
            animate={{ height: 'auto', opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 mx-auto mt-2 max-w-4xl overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white/95 shadow-[0_10px_40px_-8px_rgba(21,26,30,0.18)] backdrop-blur-md lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-xl px-4 py-3 text-base font-medium text-ink/80 transition-colors hover:bg-ink/[0.04]',
                    isActive(item.href) && 'bg-brand-50 text-brand-700',
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-full bg-accent-300 px-5 py-3 text-center text-base font-semibold text-ink shadow-sm"
              >
                {LOGIN_LABEL}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
