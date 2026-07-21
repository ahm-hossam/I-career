'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type AuthModalView = 'closed' | 'login' | 'signup' | 'forgot';

interface AuthModalContextValue {
  view: AuthModalView;
  open: (view: Exclude<AuthModalView, 'closed'>) => void;
  close: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<AuthModalView>('closed');

  const open = useCallback((next: Exclude<AuthModalView, 'closed'>) => setView(next), []);
  const close = useCallback(() => setView('closed'), []);

  const value = useMemo<AuthModalContextValue>(() => ({ view, open, close }), [view, open, close]);

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider');
  return ctx;
}
