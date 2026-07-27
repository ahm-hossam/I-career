'use client';

import { Download } from 'lucide-react';
import { downloadCsv } from '@/lib/csv';

export function ExportButton({ filename, rows }: { filename: string; rows: Record<string, unknown>[] }) {
  return (
    <button
      type="button"
      onClick={() => downloadCsv(filename, rows)}
      disabled={rows.length === 0}
      className="flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:cursor-not-allowed disabled:opacity-50 dark:text-white/80"
    >
      <Download size={15} />
      Export CSV
    </button>
  );
}
