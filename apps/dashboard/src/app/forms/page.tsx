import Link from 'next/link';
import { Plus } from 'lucide-react';
import { fetchProgramForms } from '@/lib/api';
import { FormsList } from '@/components/forms/forms-list';

export default async function FormsPage() {
  const forms = await fetchProgramForms();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Forms</h1>
          <p className="mt-1 text-ink-faint">Build custom registration forms and assign them to programs</p>
        </div>
        <Link
          href="/forms/new"
          className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          <Plus size={16} />
          New Form
        </Link>
      </div>

      <div className="mt-6">
        <FormsList forms={forms} />
      </div>
    </div>
  );
}
