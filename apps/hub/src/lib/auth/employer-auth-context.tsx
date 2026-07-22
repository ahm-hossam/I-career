'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { EmployerAuthUser } from '@i-career/types';

interface EmployerAuthContextValue {
  employer: EmployerAuthUser | null;
  setEmployer: (employer: EmployerAuthUser | null) => void;
  logout: () => Promise<void>;
}

const EmployerAuthContext = createContext<EmployerAuthContextValue | null>(null);

export function EmployerAuthProvider({
  initialEmployer,
  children,
}: {
  initialEmployer: EmployerAuthUser | null;
  children: ReactNode;
}) {
  const [employer, setEmployer] = useState<EmployerAuthUser | null>(initialEmployer);
  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch('/api/employer/logout', { method: 'POST' });
    setEmployer(null);
    router.refresh();
  }, [router]);

  const value = useMemo<EmployerAuthContextValue>(() => ({ employer, setEmployer, logout }), [employer, logout]);

  return <EmployerAuthContext.Provider value={value}>{children}</EmployerAuthContext.Provider>;
}

export function useEmployerAuth() {
  const ctx = useContext(EmployerAuthContext);
  if (!ctx) throw new Error('useEmployerAuth must be used within EmployerAuthProvider');
  return ctx;
}
