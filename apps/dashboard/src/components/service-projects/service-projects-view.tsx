'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import type { PublicServiceProject, ServiceCategory } from '@i-career/types';
import { cn } from '@i-career/utils';
import {
  createServiceProject,
  deleteServiceProject,
  updateServiceProject,
  uploadServiceProjectLogo,
} from '@/app/service-projects/actions';

const CATEGORIES: { key: ServiceCategory; label: string }[] = [
  { key: 'YOUTH', label: 'Youth' },
  { key: 'EMPLOYERS', label: 'Employers' },
  { key: 'NGOS', label: 'NGOs' },
];

const inputClass =
  'rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function humanizeFilename(filename: string) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();
}

function ProjectRow({
  project,
  onChange,
  onRemove,
}: {
  project: PublicServiceProject;
  onChange: (project: PublicServiceProject) => void;
  onRemove: (id: string) => void;
}) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [linkUrl, setLinkUrl] = useState(project.linkUrl ?? '');
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  async function commit(patch: Partial<{ name: string; description: string; linkUrl: string; logoUrl: string }>) {
    setSaving(true);
    setError(null);
    try {
      const updated = await updateServiceProject(project.id, patch);
      onChange(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogoUpload(file: File) {
    setUploadingLogo(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { url } = await uploadServiceProjectLogo(formData);
      await commit({ logoUrl: url });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handleRemove() {
    if (!confirm(`Remove "${project.name}"?`)) return;
    setRemoving(true);
    try {
      await deleteServiceProject(project.id);
      onRemove(project.id);
    } catch {
      setRemoving(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border-subtle p-4"
    >
      <div className="flex items-start gap-4">
        <button
          type="button"
          onClick={() => logoInputRef.current?.click()}
          disabled={uploadingLogo}
          className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-ink/[0.03] disabled:opacity-60 dark:bg-white/5"
        >
          {uploadingLogo ? (
            <Loader2 size={16} className="animate-spin text-ink-faint" />
          ) : project.logoUrl ? (
            <Image src={project.logoUrl} alt={project.name} fill className="object-contain p-1.5" />
          ) : (
            <span className="text-[9px] text-ink-faint">Logo</span>
          )}
        </button>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => name.trim() && name !== project.name && commit({ name: name.trim() })}
              placeholder="Project name"
              className={cn(inputClass, 'flex-1 min-w-0 font-semibold')}
            />
            {saving && <Loader2 size={14} className="shrink-0 animate-spin text-ink-faint" />}
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              aria-label="Remove project"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08] disabled:opacity-60"
            >
              <Trash2 size={15} />
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => description !== project.description && commit({ description })}
            placeholder="Short description…"
            rows={2}
            className={cn(inputClass, 'resize-none')}
          />
          <input
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onBlur={() => linkUrl !== (project.linkUrl ?? '') && commit({ linkUrl })}
            placeholder="Link URL (optional)"
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="mt-2 text-xs font-medium text-status-coral">{error}</p>}

      <input
        ref={logoInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) void handleLogoUpload(e.target.files[0]);
          e.target.value = '';
        }}
      />
    </motion.div>
  );
}

function CategorySection({
  label,
  category,
  projects,
  onProjectsChange,
}: {
  label: string;
  category: ServiceCategory;
  projects: PublicServiceProject[];
  onProjectsChange: (updater: (prev: PublicServiceProject[]) => PublicServiceProject[]) => void;
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
      const { url } = await uploadServiceProjectLogo(formData);
      const created = await createServiceProject({
        category,
        name: humanizeFilename(file.name),
        description: '',
        logoUrl: url,
      });
      onProjectsChange((prev) => [...prev, created]);
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
          <p className="text-xs text-ink-faint">
            {projects.length} project{projects.length === 1 ? '' : 's'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:bg-ink/[0.04] disabled:opacity-60 dark:text-white/80"
        >
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
          Add project
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            onChange={(updated) =>
              onProjectsChange((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
            }
            onRemove={(id) => onProjectsChange((prev) => prev.filter((p) => p.id !== id))}
          />
        ))}
        {projects.length === 0 && <p className="text-sm text-ink-faint">No projects yet.</p>}
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

export function ServiceProjectsView({ projects: initialProjects }: { projects: PublicServiceProject[] }) {
  const [projects, setProjects] = useState(initialProjects);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-extrabold text-ink dark:text-white sm:text-3xl">Previous Projects</h1>
        <p className="mt-1 text-ink-faint">
          Manage the case-study cards shown on each Services page (Youth / Employers / NGOs) — add, remove, or edit
          per section.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {CATEGORIES.map(({ key, label }) => (
          <CategorySection
            key={key}
            category={key}
            label={label}
            projects={projects.filter((p) => p.category === key).sort((a, b) => a.order - b.order)}
            onProjectsChange={(updater) => setProjects((prev) => updater(prev))}
          />
        ))}
      </div>
    </div>
  );
}
