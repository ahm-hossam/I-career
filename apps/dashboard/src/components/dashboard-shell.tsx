'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { CommandPalette } from '@/components/command-palette';
import { Sidebar } from '@/components/sidebar';
import { TopHeader } from '@/components/top-header';
import type { ActivityItem } from '@/lib/overview-data';

export function DashboardShell({ children, activity }: { children: ReactNode; activity: ActivityItem[] }) {
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen((v) => !v);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopHeader onOpenSearch={() => setCommandOpen(true)} activity={activity} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
