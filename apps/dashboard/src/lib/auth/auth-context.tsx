'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import type { DashboardAuthUser } from '@i-career/types';

interface DashboardAuthContextValue {
  user: DashboardAuthUser | null;
  logout: () => Promise<void>;
}

const DashboardAuthContext = createContext<DashboardAuthContextValue | null>(null);

export function DashboardAuthProvider({
  initialUser,
  children,
}: {
  initialUser: DashboardAuthUser | null;
  children: ReactNode;
}) {
  const [user, setUser] = useState<DashboardAuthUser | null>(initialUser);
  const [prevInitialUser, setPrevInitialUser] = useState(initialUser);

  // The root layout persists across client-side navigations (it isn't remounted),
  // so a fresh `initialUser` from the server on a later render wouldn't otherwise
  // reach this component — useState's initializer only applies on first mount.
  // Adjusting state directly during render (React's documented pattern for this,
  // rather than an effect) avoids an extra cascading render.
  if (initialUser !== prevInitialUser) {
    setPrevInitialUser(initialUser);
    setUser(initialUser);
  }

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      // Even if the network call fails, still force the redirect below —
      // a failed logout request should never leave the user stuck.
      console.error('Logout request failed:', err);
    }
    setUser(null);
    // Hard navigation, not router.push: this is a full auth-state transition,
    // so we want a clean remount with no client router/prefetch cache involved.
    window.location.href = '/login';
  }, []);

  const value = useMemo<DashboardAuthContextValue>(() => ({ user, logout }), [user, logout]);

  return <DashboardAuthContext.Provider value={value}>{children}</DashboardAuthContext.Provider>;
}

export function useDashboardAuth() {
  const ctx = useContext(DashboardAuthContext);
  if (!ctx) throw new Error('useDashboardAuth must be used within DashboardAuthProvider');
  return ctx;
}
