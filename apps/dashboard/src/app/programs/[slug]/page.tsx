import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { fetchProgram, fetchProgramForms } from '@/lib/api';
import { ProgramForm } from '@/components/programs/program-form';

export default async function EditProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [program, forms] = await Promise.all([fetchProgram(slug), fetchProgramForms()]);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link href="/programs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white">
        <ArrowLeft size={15} />
        Back to Programs
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">{program.title}</h1>

      <div className="mt-6">
        <ProgramForm program={program} forms={forms} />
      </div>
    </div>
  );
}
