import Link from 'next/link';
import { FileText } from 'lucide-react';
import type { PublicProgramForm } from '@i-career/types';

export function FormsList({ forms }: { forms: PublicProgramForm[] }) {
  if (forms.length === 0) {
    return (
      <div className="rounded-3xl border border-border-subtle bg-surface p-10 text-center text-sm text-ink-faint shadow-sm">
        No forms yet — create one to start customizing program registration.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {forms.map((form) => (
        <Link
          key={form.id}
          href={`/forms/${form.id}`}
          className="flex flex-col gap-3 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm transition-shadow hover:shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <FileText size={18} />
            </span>
            <div>
              <p className="font-bold text-ink dark:text-white">{form.name}</p>
              <p className="text-xs text-ink-faint">
                {form.fields.length} field{form.fields.length === 1 ? '' : 's'} · used by {form.programCount}{' '}
                program{form.programCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
