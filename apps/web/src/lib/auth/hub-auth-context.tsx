'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { HubAuthUser } from '@i-career/types';

interface HubAuthContextValue {
  user: HubAuthUser | null;
  setUser: (user: HubAuthUser | null) => void;
  logout: () => Promise<void>;
}

const HubAuthContext = createContext<HubAuthContextValue | null>(null);

export function HubAuthProvider({ initialUser, children }: { initialUser: HubAuthUser | null; children: ReactNode }) {
  const [user, setUser] = useState<HubAuthUser | null>(initialUser);
  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch('/api/hub-auth/logout', { method: 'POST' });
    setUser(null);
    router.refresh();
  }, [router]);

  const value = useMemo<HubAuthContextValue>(() => ({ user, setUser, logout }), [user, logout]);

  return <HubAuthContext.Provider value={value}>{children}</HubAuthContext.Provider>;
}

export function useHubAuth() {
  const ctx = useContext(HubAuthContext);
  if (!ctx) throw new Error('useHubAuth must be used within HubAuthProvider');
  return ctx;
}
