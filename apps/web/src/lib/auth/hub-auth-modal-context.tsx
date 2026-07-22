'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type HubAuthModalView = 'closed' | 'login' | 'signup';

interface HubAuthModalContextValue {
  view: HubAuthModalView;
  open: (view: Exclude<HubAuthModalView, 'closed'>) => void;
  close: () => void;
}

const HubAuthModalContext = createContext<HubAuthModalContextValue | null>(null);

export function HubAuthModalProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<HubAuthModalView>('closed');

  const open = useCallback((next: Exclude<HubAuthModalView, 'closed'>) => setView(next), []);
  const close = useCallback(() => setView('closed'), []);

  const value = useMemo<HubAuthModalContextValue>(() => ({ view, open, close }), [view, open, close]);

  return <HubAuthModalContext.Provider value={value}>{children}</HubAuthModalContext.Provider>;
}

export function useHubAuthModal() {
  const ctx = useContext(HubAuthModalContext);
  if (!ctx) throw new Error('useHubAuthModal must be used within HubAuthModalProvider');
  return ctx;
}
