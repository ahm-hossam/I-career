'use client';

import { useRef, useState, useSyncExternalStore } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Bell, ChevronDown, LogOut, Moon, Search, Sun } from 'lucide-react';
import { cn } from '@i-career/utils';
import { useDashboardAuth } from '@/lib/auth/auth-context';
import { useLocale } from '@/lib/i18n/locale-context';
import type { Locale } from '@/lib/i18n/types';
import type { ActivityItem } from '@/lib/overview-data';
import { useTheme } from '@/lib/theme/theme-context';
import { useClickOutside } from '@/lib/use-click-outside';

const LANGS: { locale: Locale; label: string }[] = [
  { locale: 'en', label: 'EN' },
  { locale: 'ar', label: 'AR' },
];

const READ_STORAGE_KEY = 'icareer-admin-read-notifications';
const EMPTY_READ_IDS: Set<string> = new Set();

let cachedReadIds: Set<string> | null = null;
const readIdsListeners = new Set<() => void>();

function loadReadIds(): Set<string> {
  try {
    const raw = window.localStorage.getItem(READ_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function getReadIdsSnapshot(): Set<string> {
  cachedReadIds ??= loadReadIds();
  return cachedReadIds;
}

function getReadIdsServerSnapshot(): Set<string> {
  return EMPTY_READ_IDS;
}

function subscribeReadIds(callback: () => void) {
  readIdsListeners.add(callback);
  return () => readIdsListeners.delete(callback);
}

function updateReadIds(next: Set<string>) {
  cachedReadIds = next;
  try {
    window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...next]));
  } catch {
    // Storage can be unavailable (private mode, restrictive policies) — read state
    // just won't persist across visits.
  }
  readIdsListeners.forEach((listener) => listener());
}

function targetForActivity(item: ActivityItem): string {
  return item.kind === 'resetRequest' ? '/applicants?tab=requests' : '/applicants?tab=users';
}

export function TopHeader({ onOpenSearch, activity }: { onOpenSearch: () => void; activity: ActivityItem[] }) {
  const { t, locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useDashboardAuth();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const readIds = useSyncExternalStore(subscribeReadIds, getReadIdsSnapshot, getReadIdsServerSnapshot);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen);
  useClickOutside(userMenuRef, () => setUserMenuOpen(false), userMenuOpen);

  const unreadCount = activity.filter((item) => !readIds.has(item.id)).length;

  function markRead(id: string) {
    const next = new Set(readIds);
    next.add(id);
    updateReadIds(next);
  }

  function markAllRead() {
    const next = new Set(readIds);
    activity.forEach((item) => next.add(item.id));
    updateReadIds(next);
  }

  function handleItemClick(item: ActivityItem) {
    markRead(item.id);
    setNotifOpen(false);
    router.push(targetForActivity(item));
  }

  return (
    <header className="sticky top-0 z-30 flex h-[72px] items-center gap-3 border-b border-border-subtle bg-surface-glass px-4 backdrop-blur-xl sm:px-6">
      <button
        type="button"
        onClick={onOpenSearch}
        className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-border-subtle bg-surface/60 px-4 py-2.5 text-start text-sm text-ink-faint transition-colors hover:border-brand-500/30 sm:max-w-sm"
      >
        <Search size={16} className="shrink-0" />
        <span className="truncate">{t('common.searchPlaceholder')}</span>
        <span className="ms-auto hidden shrink-0 items-center gap-0.5 rounded-md border border-border-subtle bg-ink/[0.04] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink-faint sm:inline-flex dark:bg-white/5">
          <span>⌘</span>K
        </span>
      </button>

      <div className="ms-auto flex items-center gap-2">
        <div className="relative flex items-center gap-0.5 rounded-full border border-border-subtle bg-surface/60 p-1">
          {LANGS.map((lang) => (
            <button
              key={lang.locale}
              type="button"
              onClick={() => setLocale(lang.locale)}
              aria-label={`${t('header.languageLabel')}: ${lang.label}`}
              className={cn(
                'relative rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
                locale === lang.locale ? 'text-white' : 'text-ink-faint hover:text-ink dark:hover:text-white',
              )}
            >
              {locale === lang.locale && (
                <motion.span
                  layoutId="lang-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-brand-500"
                />
              )}
              <span className="relative">{lang.label}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('header.themeLight') : t('header.themeDark')}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface/60 text-ink-soft transition-colors hover:text-brand-600 dark:text-white/70"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -60, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.7 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.span>
          </AnimatePresence>
        </button>

        <div ref={notifRef} className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label={t('header.notifications')}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-surface/60 text-ink-soft transition-colors hover:text-brand-600 dark:text-white/70"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-status-coral px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute end-0 top-[calc(100%+10px)] z-40 w-80 overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
                  <span className="text-sm font-bold text-ink dark:text-white">{t('header.notifications')}</span>
                  {unreadCount > 0 && (
                    <button type="button" onClick={markAllRead} className="text-xs font-semibold text-brand-600 hover:underline">
                      {t('header.markAllRead')}
                    </button>
                  )}
                </div>
                {activity.length === 0 ? (
                  <p className="px-4 py-6 text-center text-sm text-ink-faint">{t('header.notificationsEmpty')}</p>
                ) : (
                  <ul className="max-h-80 overflow-y-auto">
                    {activity.map((item) => {
                      const isRead = readIds.has(item.id);
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => handleItemClick(item)}
                            className="flex w-full gap-3 border-b border-border-subtle px-4 py-3 text-start last:border-0 hover:bg-ink/[0.03] dark:hover:bg-white/5"
                          >
                            <span
                              className={cn(
                                'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                                isRead ? 'bg-ink/15 dark:bg-white/15' : 'bg-brand-500 shadow-[0_0_0_3px] shadow-brand-500/20',
                              )}
                            />
                            <div className="min-w-0">
                              <p className={cn('text-sm', isRead ? 'text-ink-faint' : 'text-ink dark:text-white/90')}>
                                <span className="font-semibold">{item.actor}</span> {item.detail}
                              </p>
                              <p className="mt-0.5 text-xs text-ink-faint">{item.time}</p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {user && (
          <div ref={userMenuRef} className="relative">
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-border-subtle bg-surface/60 py-1 pl-1 pr-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.04] dark:text-white/90"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
                {user.name.slice(0, 1).toUpperCase()}
              </span>
              <span className="hidden max-w-[120px] truncate sm:inline">{user.name}</span>
              <ChevronDown size={14} className="text-ink-faint" />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute end-0 top-[calc(100%+10px)] z-40 w-48 overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xl"
                >
                  <div className="border-b border-border-subtle px-4 py-3">
                    <p className="truncate text-sm font-semibold text-ink dark:text-white">{user.name}</p>
                    <p className="truncate text-xs text-ink-faint">{user.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setUserMenuOpen(false);
                      void logout();
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium text-status-coral transition-colors hover:bg-status-coral/[0.08]"
                  >
                    <LogOut size={16} />
                    {t('header.signOut')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
}
