'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import type { ProgramFunnelSummary, PublicReferralCode, ReferralSource } from '@i-career/types';
import { cn } from '@i-career/utils';
import { SOURCE_ICONS, SOURCE_OPTIONS, SOURCE_STYLES } from '@/lib/referral-sources';
import { createCustomReferralCode } from '@/app/programs/[slug]/referrals/actions';

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function FunnelCard({ label, value, sublabel }: { label: string; value: number; sublabel?: string }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-ink dark:text-white">{value}</p>
      {sublabel && <p className="mt-0.5 text-xs text-ink-faint">{sublabel}</p>}
    </div>
  );
}

export function ProgramReferralsView({
  slug,
  summary,
  codes,
}: {
  slug: string;
  summary: ProgramFunnelSummary;
  codes: PublicReferralCode[];
}) {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [label, setLabel] = useState('');
  const [source, setSource] = useState<ReferralSource>('FACEBOOK');
  const [campaignName, setCampaignName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createCustomReferralCode(slug, { code, label, source, campaignName: campaignName || undefined });
      setCode('');
      setLabel('');
      setCampaignName('');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <FunnelCard label="Clicks" value={summary.clicks} />
        <FunnelCard label="Signups" value={summary.signups} />
        <FunnelCard
          label="Applications"
          value={summary.applications}
          sublabel={`${summary.organicApplications} organic`}
        />
        <FunnelCard label="Accepted" value={summary.accepted} />
        <FunnelCard label="Rejected" value={summary.rejected} />
        <FunnelCard label="Attended" value={summary.attended} />
      </div>

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">Create a campaign / custom code</h2>
        <p className="mt-1 text-sm text-ink-faint">
          Share a named code with a partner organization, or use it as the destination link for a marketing
          campaign (e.g. a Facebook ad) to track its performance separately.
        </p>
        <form onSubmit={handleCreate} className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Code
            <input
              required
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. FB_SUMMER26"
              className={cn(inputClass, 'font-mono uppercase')}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Label
            <input
              required
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Acme Corp"
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Source
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as ReferralSource)}
              className={cn(inputClass, 'bg-surface')}
            >
              {SOURCE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Campaign name
            <input
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              placeholder="e.g. Summer 2026 launch"
              className={inputClass}
            />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus size={15} />
            {submitting ? 'Creating…' : 'Create code'}
          </button>
        </form>
        {error && <p className="mt-2 text-sm font-medium text-status-coral">{error}</p>}
      </section>

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">Referral codes</h2>
        {codes.length === 0 ? (
          <p className="mt-4 text-sm text-ink-faint">
            No referral codes yet — they&apos;re created automatically when a logged-in visitor views this program,
            or manually above for campaigns and B2B partners.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-sm">
              <thead>
                <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-2.5 text-start font-bold">Code</th>
                  <th className="px-3 py-2.5 text-start font-bold">Owner / Source</th>
                  <th className="px-3 py-2.5 text-start font-bold">Clicks</th>
                  <th className="px-3 py-2.5 text-start font-bold">Signups</th>
                  <th className="px-3 py-2.5 text-start font-bold">Applications</th>
                  <th className="px-3 py-2.5 text-start font-bold">Accepted</th>
                  <th className="px-3 py-2.5 text-start font-bold">Attended</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((c) => {
                  const SourceIcon = SOURCE_ICONS[c.source];
                  return (
                    <tr key={c.id} className="border-t border-border-subtle">
                      <td className="px-3 py-3 font-mono text-xs font-semibold text-ink dark:text-white">{c.code}</td>
                      <td className="px-3 py-3 text-ink-soft dark:text-white/80">
                        {c.type === 'CUSTOM' ? (
                          <div className="flex flex-col gap-1">
                            <span className="font-semibold text-ink dark:text-white">
                              {c.campaignName ?? c.label ?? 'Custom'}
                            </span>
                            <span
                              className={cn(
                                'inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold',
                                SOURCE_STYLES[c.source],
                              )}
                            >
                              <SourceIcon size={11} />
                              {c.label}
                            </span>
                          </div>
                        ) : (
                          (c.ownerName ?? '—')
                        )}
                      </td>
                      <td className="px-3 py-3 text-ink-faint">{c.clicks}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.signups}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.applications}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.accepted}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.attended}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
