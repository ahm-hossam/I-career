import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { fetchProgram, fetchReferralOverview } from '@/lib/api';
import { ProgramReferralsView } from '@/components/programs/program-referrals-view';

export default async function ProgramReferralsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [program, overview] = await Promise.all([fetchProgram(slug), fetchReferralOverview(slug)]);
  if (!program) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Link
        href={`/programs/${slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-ink dark:text-white/70 dark:hover:text-white"
      >
        <ArrowLeft size={15} />
        Back to {program.title}
      </Link>
      <h1 className="mt-3 text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Referrals &amp; Funnel</h1>
      <p className="mt-1 text-ink-faint">Track how people find and register for {program.title}</p>

      <div className="mt-6">
        <ProgramReferralsView slug={slug} summary={overview.summary} codes={overview.codes} />
      </div>
    </div>
  );
}
