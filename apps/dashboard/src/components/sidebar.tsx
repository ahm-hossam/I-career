'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronsLeft, ChevronsRight, LogOut, Settings, UserCog } from 'lucide-react';
import { cn } from '@i-career/utils';
import { NAV_SECTIONS } from '@/data/nav';
import { useLocale } from '@/lib/i18n/locale-context';
import { useClickOutside } from '@/lib/use-click-outside';

const CURRENT_USER = { name: 'Nadine Kamal', role: 'Marketing Lead', initials: 'NK' };

export function Sidebar() {
  const { t, dir } = useLocale();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen);

  const CollapseIcon = dir === 'rtl' ? ChevronsRight : ChevronsLeft;
  const ExpandIcon = dir === 'rtl' ? ChevronsLeft : ChevronsRight;

  return (
    <motion.aside
      animate={{ width: collapsed ? 84 : 272 }}
      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      className="relative hidden shrink-0 border-e border-border-subtle bg-surface-glass backdrop-blur-xl lg:flex lg:flex-col"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 start-[-4rem] h-64 w-64 animate-drift rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute bottom-0 start-1/2 h-56 w-56 animate-drift rounded-full bg-accent-300/10 blur-3xl [animation-delay:3s]" />
      </div>

      <div className={cn('relative flex h-[72px] items-center border-b border-border-subtle px-4', collapsed && 'justify-center px-0')}>
        <Link href="/" className="flex items-center gap-2 overflow-hidden">
          <Image src="/brand/favicon-icon.png" alt="" width={28} height={28} className="h-7 w-7 shrink-0" />
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-sm font-bold text-ink dark:text-white"
              >
                iCareer Admin
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      <nav className="relative flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.key} className="mb-5">
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden px-3 pb-2 text-[11px] font-bold uppercase tracking-wide text-ink-faint"
                >
                  {t(`nav.${section.key}`)}
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="flex flex-col gap-1">
              {section.items.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      prefetch={item.href === '/' ? undefined : false}
                      title={collapsed ? t(`nav.${item.key}`) : undefined}
                      className={cn(
                        'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                        collapsed && 'justify-center px-0',
                        active ? 'text-brand-700 dark:text-brand-300' : 'text-ink-soft hover:bg-ink/[0.05] dark:text-white/70 dark:hover:bg-white/5',
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="sidebar-active"
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-500/15 to-accent-300/10 ring-1 ring-brand-500/20"
                        />
                      )}
                      <Icon size={18} className="relative shrink-0" />
                      <AnimatePresence initial={false}>
                        {!collapsed && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative overflow-hidden whitespace-nowrap"
                          >
                            {t(`nav.${item.key}`)}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div ref={profileRef} className="relative border-t border-border-subtle p-3">
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-x-3 bottom-[calc(100%+8px)] overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xl"
            >
              <button
                type="button"
                className="flex w-full items-center gap-2.5 px-4 py-3 text-start text-sm font-medium text-ink-soft transition-colors hover:bg-ink/[0.05] dark:text-white/80 dark:hover:bg-white/5"
              >
                <UserCog size={16} />
                {t('header.account')}
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2.5 px-4 py-3 text-start text-sm font-medium text-ink-soft transition-colors hover:bg-ink/[0.05] dark:text-white/80 dark:hover:bg-white/5"
              >
                <Settings size={16} />
                {t('nav.settings')}
              </button>
              <button
                type="button"
                className="flex w-full items-center gap-2.5 border-t border-border-subtle px-4 py-3 text-start text-sm font-medium text-status-coral transition-colors hover:bg-status-coral/[0.08]"
              >
                <LogOut size={16} />
                {t('header.signOut')}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setProfileOpen((v) => !v)}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl p-2 text-start transition-colors hover:bg-ink/[0.05] dark:hover:bg-white/5',
            collapsed && 'justify-center',
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
            {CURRENT_USER.initials}
          </span>
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="block text-sm font-semibold text-ink dark:text-white">{CURRENT_USER.name}</span>
                <span className="block text-xs text-ink-faint">{CURRENT_USER.role}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="absolute top-20 end-[-13px] z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border border-border-subtle bg-surface text-ink-soft shadow-md transition-colors hover:text-brand-600 dark:text-white/70"
      >
        {collapsed ? <ExpandIcon size={14} /> : <CollapseIcon size={14} />}
      </button>
    </motion.aside>
  );
}
