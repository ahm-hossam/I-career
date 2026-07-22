import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProgramFormBuilder } from '@/components/forms/program-form-builder';

export default function NewProgramFormPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        href="/forms"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white"
      >
        <ArrowLeft size={15} />
        Back to Forms
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">New Form</h1>

      <div className="mt-6">
        <ProgramFormBuilder />
      </div>
    </div>
  );
}
