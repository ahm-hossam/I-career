'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import type { ImageAspect, ProgramInput, PublicProgram } from '@i-career/types';
import { cn } from '@i-career/utils';
import { RichTextEditor } from '@/components/rich-text-editor';
import { createProgram, deleteProgram, updateProgram, uploadProgramImage } from '@/app/programs/actions';

const ASPECT_OPTIONS: { value: ImageAspect; label: string }[] = [
  { value: '16:6', label: 'Wide banner (16:6)' },
  { value: '16:9', label: 'Standard (16:9)' },
  { value: '1:1', label: 'Square (1:1)' },
];

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ProgramForm({ program }: { program?: PublicProgram }) {
  const router = useRouter();
  const isEdit = !!program;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const partnerLogoInputRef = useRef<HTMLInputElement>(null);

  const [slug, setSlug] = useState(program?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [title, setTitle] = useState(program?.title ?? '');
  const [subtitleEn, setSubtitleEn] = useState(program?.subtitleEn ?? '');
  const [subtitleAr, setSubtitleAr] = useState(program?.subtitleAr ?? '');
  const [logoUrl, setLogoUrl] = useState(program?.logoUrl ?? '');
  const [imageAspect, setImageAspect] = useState<ImageAspect>(program?.imageAspect ?? '16:6');
  const [aboutBody, setAboutBody] = useState(program?.aboutBody ?? '');
  const [phases, setPhases] = useState(program?.phases ?? []);
  const [benefits, setBenefits] = useState(program?.benefits ?? []);
  const [criteria, setCriteria] = useState(program?.criteria ?? []);
  const [partnerName, setPartnerName] = useState(program?.partnerName ?? '');
  const [partnerBio, setPartnerBio] = useState(program?.partnerBio ?? '');
  const [partnerLogoUrl, setPartnerLogoUrl] = useState(program?.partnerLogoUrl ?? '');

  const [uploading, setUploading] = useState(false);
  const [uploadingPartnerLogo, setUploadingPartnerLogo] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadProgramImage(formData);
      setLogoUrl(url);
    } catch {
      setError('Image upload failed. PDF, JPG, JPEG, PNG only, max 10 MB.');
    } finally {
      setUploading(false);
    }
  }

  async function handlePartnerLogoUpload(file: File) {
    setUploadingPartnerLogo(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadProgramImage(formData);
      setPartnerLogoUrl(url);
    } catch {
      setError('Image upload failed. PDF, JPG, JPEG, PNG only, max 10 MB.');
    } finally {
      setUploadingPartnerLogo(false);
    }
  }

  function updatePhase(index: number, field: 'title' | 'description', value: string) {
    setPhases((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function removePhase(index: number) {
    setPhases((prev) => prev.filter((_, i) => i !== index));
  }

  function updateListItem(list: string[], setList: (v: string[]) => void, index: number, value: string) {
    setList(list.map((item, i) => (i === index ? value : item)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const input: ProgramInput = {
        slug,
        title,
        subtitleEn,
        subtitleAr: subtitleAr || null,
        logoUrl,
        imageAspect,
        aboutBody,
        phases,
        benefits: benefits.filter((b) => b.trim()),
        criteria: criteria.filter((c) => c.trim()),
        partnerName,
        partnerBio,
        partnerLogoUrl: partnerLogoUrl || null,
      };
      if (isEdit) {
        await updateProgram(program.slug, input);
      } else {
        await createProgram(input);
      }
      router.push('/programs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!program) return;
    if (!confirm(`Delete "${program.title}"? This can't be undone.`)) return;
    setDeleting(true);
    try {
      await deleteProgram(program.slug);
      router.push('/programs');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete program.');
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-16">
      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">Basics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Title
            <input
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (!slugTouched) setSlug(slugify(e.target.value));
              }}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Slug
            <input
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              className={cn(inputClass, 'font-mono text-xs')}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Subtitle (English)
            <input required value={subtitleEn} onChange={(e) => setSubtitleEn(e.target.value)} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Subtitle (Arabic) — optional
            <input
              value={subtitleAr ?? ''}
              onChange={(e) => setSubtitleAr(e.target.value)}
              dir="rtl"
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">Banner image</h2>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="relative aspect-[16/9] w-full max-w-xs shrink-0 overflow-hidden rounded-xl bg-ink/[0.04] dark:bg-white/5">
            {logoUrl ? (
              <Image src={logoUrl} alt="" fill className="object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-ink-faint">No image</div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex w-fit items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
            >
              {uploading ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              {uploading ? 'Uploading…' : 'Upload image'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) void handleUpload(e.target.files[0]);
              }}
            />
            <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
              Display shape
              <select
                value={imageAspect}
                onChange={(e) => setImageAspect(e.target.value as ImageAspect)}
                className={cn(inputClass, 'w-fit')}
              >
                {ASPECT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">About Program</h2>
        <div className="mt-4">
          <RichTextEditor value={aboutBody} onChange={setAboutBody} placeholder="Write about the program…" />
        </div>
      </section>

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink dark:text-white">Phases</h2>
          <button
            type="button"
            onClick={() => setPhases((prev) => [...prev, { title: '', description: '' }])}
            className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-ink/[0.04] dark:text-white/80"
          >
            <Plus size={14} />
            Add phase
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border-subtle p-4"
            >
              <div className="flex items-center gap-2">
                <input
                  value={phase.title}
                  onChange={(e) => updatePhase(i, 'title', e.target.value)}
                  placeholder="Phase title"
                  className={cn(inputClass, 'flex-1 font-semibold')}
                />
                <button
                  type="button"
                  onClick={() => removePhase(i)}
                  aria-label="Remove phase"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08]"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <div className="mt-3">
                <RichTextEditor value={phase.description} onChange={(v) => updatePhase(i, 'description', v)} />
              </div>
            </motion.div>
          ))}
          {phases.length === 0 && <p className="text-sm text-ink-faint">No phases yet — this section won&apos;t render on the Hub page.</p>}
        </div>
      </section>

      <ListSection title="Benefits" items={benefits} setItems={setBenefits} onUpdate={updateListItem} />
      <ListSection title="Program Criteria" items={criteria} setItems={setCriteria} onUpdate={updateListItem} />

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">Partner</h2>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-ink/[0.04] dark:bg-white/5">
              {partnerLogoUrl ? (
                <Image src={partnerLogoUrl} alt="" fill className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-[10px] text-ink-faint">No logo</div>
              )}
            </div>
            <button
              type="button"
              onClick={() => partnerLogoInputRef.current?.click()}
              disabled={uploadingPartnerLogo}
              className="flex w-fit items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
            >
              {uploadingPartnerLogo ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              {uploadingPartnerLogo ? 'Uploading…' : 'Upload partner logo'}
            </button>
            <input
              ref={partnerLogoInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) void handlePartnerLogoUpload(e.target.files[0]);
              }}
            />
          </div>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink dark:text-white/90">
            Partner name
            <input required value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className={inputClass} />
          </label>
          <div>
            <p className="mb-1.5 text-sm font-semibold text-ink dark:text-white/90">Partner bio</p>
            <RichTextEditor value={partnerBio} onChange={setPartnerBio} placeholder="About the partner organization…" />
          </div>
        </div>
      </section>

      {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

      <div className="flex items-center justify-between">
        {isEdit ? (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 rounded-full border border-status-coral/20 px-5 py-2.5 text-sm font-semibold text-status-coral transition-colors hover:bg-status-coral/[0.08] disabled:opacity-60"
          >
            <Trash2 size={15} />
            {deleting ? 'Deleting…' : 'Delete program'}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create program'}
        </button>
      </div>
    </form>
  );
}

function ListSection({
  title,
  items,
  setItems,
  onUpdate,
}: {
  title: string;
  items: string[];
  setItems: (v: string[]) => void;
  onUpdate: (list: string[], setList: (v: string[]) => void, index: number, value: string) => void;
}) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-ink dark:text-white">{title}</h2>
        <button
          type="button"
          onClick={() => setItems([...items, ''])}
          className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-ink/[0.04] dark:text-white/80"
        >
          <Plus size={14} />
          Add item
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => onUpdate(items, setItems, i, e.target.value)}
              className={cn(inputClass, 'flex-1')}
            />
            <button
              type="button"
              onClick={() => setItems(items.filter((_, idx) => idx !== i))}
              aria-label="Remove item"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08]"
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-ink-faint">Nothing here yet.</p>}
      </div>
    </section>
  );
}
