'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import type { PartnerLogoCategory, PublicPartnerLogo } from '@i-career/types';
import { cn } from '@i-career/utils';
import {
  createPartnerLogo,
  deletePartnerLogo,
  updatePartnerLogo,
  uploadPartnerLogoImage,
} from '@/app/partner-logos/actions';

const CATEGORIES: { key: PartnerLogoCategory; label: string }[] = [
  { key: 'GOVERNMENTAL', label: 'Governmental Partners' },
  { key: 'ORGANIZATIONS', label: 'International & Local Organizations' },
  { key: 'EMPLOYERS', label: 'Employers' },
  { key: 'UNIVERSITIES', label: 'Universities' },
];

const inputClass =
  'rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function humanizeFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
}

function LogoRow({
  logo,
  onChange,
  onRemove,
}: {
  logo: PublicPartnerLogo;
  onChange: (logo: PublicPartnerLogo) => void;
  onRemove: (id: string) => void;
}) {
  const [name, setName] = useState(logo.name);
  const [width, setWidth] = useState(logo.width);
  const [height, setHeight] = useState(logo.height);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function commit(patch: Partial<{ name: string; width: number; height: number }>) {
    setSaving(true);
    try {
      const updated = await updatePartnerLogo(logo.id, patch);
      onChange(updated);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove() {
    if (!confirm(`Remove "${logo.name}"?`)) return;
    setRemoving(true);
    try {
      await deletePartnerLogo(logo.id);
      onRemove(logo.id);
    } catch {
      setRemoving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-2xl border border-border-subtle p-3"
    >
      <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-ink/[0.03] dark:bg-white/5">
        <Image src={logo.imageUrl} alt={logo.name} width={72} height={44} className="h-9 w-auto object-contain" />
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={() => name.trim() && name !== logo.name && commit({ name: name.trim() })}
        className={cn(inputClass, 'flex-1 min-w-0 font-semibold')}
      />

      <div className="flex items-center gap-1.5 text-xs text-ink-faint">
        <span>W</span>
        <input
          type="number"
          min={1}
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          onBlur={() => width !== logo.width && commit({ width })}
          className={cn(inputClass, 'w-16')}
        />
        <span>H</span>
        <input
          type="number"
          min={1}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          onBlur={() => height !== logo.height && commit({ height })}
          className={cn(inputClass, 'w-16')}
        />
      </div>

      {saving && <Loader2 size={14} className="shrink-0 animate-spin text-ink-faint" />}

      <button
        type="button"
        onClick={handleRemove}
        disabled={removing}
        aria-label="Remove logo"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08] disabled:opacity-60"
      >
        <Trash2 size={15} />
      </button>
    </motion.div>
  );
}

function CategorySection({
  label,
  category,
  logos,
  onLogosChange,
}: {
  label: string;
  category: PartnerLogoCategory;
  logos: PublicPartnerLogo[];
  onLogosChange: (updater: (prev: PublicPartnerLogo[]) => PublicPartnerLogo[]) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(file: File) {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadPartnerLogoImage(formData);
      const created = await createPartnerLogo({
        category,
        name: humanizeFilename(file.name),
        imageUrl: url,
        width: 300,
        height: 120,
      });
      onLogosChange((prev) => [...prev, created]);
    } catch {
      setError('Upload failed. JPG, JPEG, or PNG only, max 10 MB.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-ink dark:text-white">{label}</h2>
          <p className="text-xs text-ink-faint">{logos.length} logo{logos.length === 1 ? '' : 's'}</p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add logo
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {logos.map((logo) => (
          <LogoRow
            key={logo.id}
            logo={logo}
            onChange={(updated) =>
              onLogosChange((prev) => prev.map((l) => (l.id === updated.id ? updated : l)))
            }
            onRemove={(id) => onLogosChange((prev) => prev.filter((l) => l.id !== id))}
          />
        ))}
        {logos.length === 0 && <p className="text-sm text-ink-faint">No logos yet.</p>}
      </div>

      {error && <p className="mt-3 text-sm font-medium text-status-coral">{error}</p>}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) void handleAdd(e.target.files[0]);
          e.target.value = '';
        }}
      />
    </section>
  );
}

export function PartnerLogosView({ logos: initialLogos }: { logos: PublicPartnerLogo[] }) {
  const [logos, setLogos] = useState(initialLogos);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Who We Worked With</h1>
        <p className="mt-1 text-ink-faint">
          Manage the partner logos shown in the homepage&apos;s &ldquo;Who We Worked With&rdquo; section — add, remove, or resize per section.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {CATEGORIES.map(({ key, label }) => (
          <CategorySection
            key={key}
            category={key}
            label={label}
            logos={logos.filter((l) => l.category === key).sort((a, b) => a.order - b.order)}
            onLogosChange={(updater) => setLogos((prev) => updater(prev))}
          />
        ))}
      </div>
    </div>
  );
}
