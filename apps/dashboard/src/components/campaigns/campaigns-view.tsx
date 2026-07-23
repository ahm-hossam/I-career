'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, Globe, Megaphone, Plus, Trash2, X } from 'lucide-react';
import type { CampaignSummary, PublicProgram, ReferralSource } from '@i-career/types';
import { cn } from '@i-career/utils';
import { SOURCE_ICONS, SOURCE_OPTIONS, SOURCE_STYLES } from '@/lib/referral-sources';
import { createCampaign, deleteCampaign } from '@/app/campaigns/actions';

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function FunnelCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-ink dark:text-white">{value}</p>
    </div>
  );
}

function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1.5 rounded-full border border-border-subtle px-2.5 py-1 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] dark:text-white/75"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied' : 'Copy link'}
    </button>
  );
}

export function CampaignsView({
  campaigns,
  programs,
}: {
  campaigns: CampaignSummary[];
  programs: PublicProgram[];
}) {
  const router = useRouter();
  const [sourceFilter, setSourceFilter] = useState<'ALL' | ReferralSource>('ALL');
  const [programFilter, setProgramFilter] = useState<'ALL' | 'SITEWIDE' | string>('ALL');
  const [createOpen, setCreateOpen] = useState(false);

  const [programSlug, setProgramSlug] = useState('');
  const [code, setCode] = useState('');
  const [label, setLabel] = useState('');
  const [source, setSource] = useState<ReferralSource>('FACEBOOK');
  const [campaignName, setCampaignName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      campaigns.filter((c) => {
        if (sourceFilter !== 'ALL' && c.source !== sourceFilter) return false;
        if (programFilter === 'ALL') return true;
        if (programFilter === 'SITEWIDE') return c.program === null;
        return c.program?.slug === programFilter;
      }),
    [campaigns, sourceFilter, programFilter],
  );

  const totals = useMemo(
    () =>
      filtered.reduce(
        (acc, c) => ({
          clicks: acc.clicks + c.clicks,
          signups: acc.signups + c.signups,
          applications: acc.applications + c.applications,
          accepted: acc.accepted + c.accepted,
          attended: acc.attended + c.attended,
        }),
        { clicks: 0, signups: 0, applications: 0, accepted: 0, attended: 0 },
      ),
    [filtered],
  );

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await createCampaign({
        programSlug: programSlug || undefined,
        code,
        label,
        source,
        campaignName: campaignName || undefined,
      });
      setCreateOpen(false);
      setProgramSlug('');
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

  async function handleRemove(campaign: CampaignSummary) {
    if (!confirm(`Remove campaign "${campaign.campaignName ?? campaign.label ?? campaign.code}"? This cannot be undone.`))
      return;
    setPendingId(campaign.id);
    try {
      await deleteCampaign(campaign.id);
      router.refresh();
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Campaigns</h1>
          <p className="mt-1 text-ink-faint">
            Track clicks, signups, applications and attendance from marketing campaigns across all programs
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600"
        >
          <Plus size={16} />
          Create Campaign
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <FunnelCard label="Clicks" value={totals.clicks} />
        <FunnelCard label="Signups" value={totals.signups} />
        <FunnelCard label="Applications" value={totals.applications} />
        <FunnelCard label="Accepted" value={totals.accepted} />
        <FunnelCard label="Attended" value={totals.attended} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value as 'ALL' | ReferralSource)}
          className={cn(inputClass, 'w-auto bg-surface')}
        >
          <option value="ALL">All sources</option>
          {SOURCE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className={cn(inputClass, 'w-auto bg-surface')}
        >
          <option value="ALL">All programs</option>
          <option value="SITEWIDE">Sitewide (no specific program)</option>
          {programs.map((p) => (
            <option key={p.id} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <Megaphone size={28} className="text-ink-faint" />
            <p className="text-sm text-ink-faint">
              {campaigns.length === 0
                ? 'No campaigns yet — create one to get a trackable link for your next Facebook ad or other marketing push.'
                : 'No campaigns match this filter.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1040px] border-collapse text-sm">
              <thead>
                <tr className="text-start text-xs font-bold uppercase tracking-wide text-ink-faint">
                  <th className="px-3 py-2.5 text-start font-bold">Campaign</th>
                  <th className="px-3 py-2.5 text-start font-bold">Program</th>
                  <th className="px-3 py-2.5 text-start font-bold">Link</th>
                  <th className="px-3 py-2.5 text-start font-bold">Clicks</th>
                  <th className="px-3 py-2.5 text-start font-bold">Signups</th>
                  <th className="px-3 py-2.5 text-start font-bold">Applications</th>
                  <th className="px-3 py-2.5 text-start font-bold">Accepted</th>
                  <th className="px-3 py-2.5 text-start font-bold">Attended</th>
                  <th className="px-3 py-2.5 text-start font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const SourceIcon = SOURCE_ICONS[c.source];
                  return (
                    <tr key={c.id} className="border-t border-border-subtle">
                      <td className="px-3 py-3">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-ink dark:text-white">
                            {c.campaignName ?? c.label ?? c.code}
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
                      </td>
                      <td className="px-3 py-3 text-ink-soft dark:text-white/80">
                        {c.program ? (
                          c.program.title
                        ) : (
                          <div className="flex flex-col gap-1.5">
                            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-ink/[0.06] px-2 py-0.5 text-[11px] font-bold text-ink-soft dark:bg-white/10 dark:text-white/70">
                              <Globe size={11} />
                              Sitewide
                            </span>
                            {c.programBreakdown.length > 0 && (
                              <ul className="text-xs text-ink-faint">
                                {c.programBreakdown.map((b) => (
                                  <li key={b.program.id}>
                                    {b.program.title}: {b.count}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <CopyLinkButton url={c.url} />
                      </td>
                      <td className="px-3 py-3 text-ink-faint">{c.clicks}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.signups}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.applications}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.accepted}</td>
                      <td className="px-3 py-3 text-ink-faint">{c.attended}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          disabled={pendingId === c.id}
                          onClick={() => handleRemove(c)}
                          aria-label="Remove campaign"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08] disabled:opacity-60"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {createOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            onClick={() => setCreateOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-border-subtle bg-surface p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-ink dark:text-white">Create campaign</h3>
                <button
                  type="button"
                  onClick={() => setCreateOpen(false)}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint hover:bg-ink/[0.05] hover:text-ink"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreate} className="mt-4 flex flex-col gap-3">
                <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
                  Program
                  <select
                    value={programSlug}
                    onChange={(e) => setProgramSlug(e.target.value)}
                    className={cn(inputClass, 'bg-surface')}
                  >
                    <option value="">No specific program (sitewide)</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs font-normal text-ink-faint">
                    Leave as sitewide for campaigns that link to the homepage or programs list and let visitors
                    pick a program themselves.
                  </span>
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
                    placeholder="e.g. Summer Facebook push"
                    className={inputClass}
                  />
                </label>

                {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Plus size={15} />
                  {submitting ? 'Creating…' : 'Create campaign'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
