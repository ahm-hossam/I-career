'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Plus, Trash2 } from 'lucide-react';
import type { FormFieldType, ProgramFormFieldInput, ProgramFormInput, PublicProgramForm } from '@i-career/types';
import { cn } from '@i-career/utils';
import { createProgramForm, deleteProgramForm, updateProgramForm } from '@/app/forms/actions';

const FIELD_TYPE_OPTIONS: { value: FormFieldType; label: string }[] = [
  { value: 'SHORT_TEXT', label: 'Short text' },
  { value: 'LONG_TEXT', label: 'Long text' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'PHONE', label: 'Phone' },
  { value: 'NUMBER', label: 'Number' },
  { value: 'DROPDOWN', label: 'Dropdown' },
  { value: 'CHECKBOXES', label: 'Checkboxes' },
  { value: 'YES_NO', label: 'Yes / No' },
  { value: 'DATE', label: 'Date' },
  { value: 'FILE', label: 'File upload' },
];

const OPTIONS_TYPES: FormFieldType[] = ['DROPDOWN', 'CHECKBOXES'];

const inputClass =
  'rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brand-500 dark:text-white';

function emptyField(): ProgramFormFieldInput {
  return { label: '', type: 'SHORT_TEXT', required: false, options: [] };
}

export function ProgramFormBuilder({ form }: { form?: PublicProgramForm }) {
  const router = useRouter();
  const isEdit = !!form;

  const [name, setName] = useState(form?.name ?? '');
  const [fields, setFields] = useState<ProgramFormFieldInput[]>(
    form?.fields.map((f) => ({ label: f.label, type: f.type, required: f.required, options: f.options })) ?? [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(index: number, patch: Partial<ProgramFormFieldInput>) {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  function removeField(index: number) {
    setFields((prev) => prev.filter((_, i) => i !== index));
  }

  function moveField(index: number, direction: -1 | 1) {
    setFields((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function updateOption(fieldIndex: number, optionIndex: number, value: string) {
    setFields((prev) =>
      prev.map((f, i) =>
        i === fieldIndex ? { ...f, options: f.options.map((o, oi) => (oi === optionIndex ? value : o)) } : f,
      ),
    );
  }

  function addOption(fieldIndex: number) {
    setFields((prev) => prev.map((f, i) => (i === fieldIndex ? { ...f, options: [...f.options, ''] } : f)));
  }

  function removeOption(fieldIndex: number, optionIndex: number) {
    setFields((prev) =>
      prev.map((f, i) => (i === fieldIndex ? { ...f, options: f.options.filter((_, oi) => oi !== optionIndex) } : f)),
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const input: ProgramFormInput = {
        name,
        fields: fields.map((f) => ({ ...f, options: f.options.filter((o) => o.trim()) })),
      };
      if (isEdit) {
        await updateProgramForm(form.id, input);
      } else {
        await createProgramForm(input);
      }
      router.push('/forms');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!form) return;
    if (
      !confirm(
        `Delete "${form.name}"? Programs using it will keep their submitted answers but lose the assignment.`,
      )
    )
      return;
    setDeleting(true);
    try {
      await deleteProgramForm(form.id);
      router.push('/forms');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete form.');
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-16">
      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <h2 className="text-base font-bold text-ink dark:text-white">Form name</h2>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ready For Tomorrow — Application"
          className={cn(inputClass, 'mt-4 w-full')}
        />
      </section>

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink dark:text-white">Fields</h2>
          <button
            type="button"
            onClick={() => setFields((prev) => [...prev, emptyField()])}
            className="flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink-soft hover:bg-ink/[0.04] dark:text-white/80"
          >
            <Plus size={14} />
            Add field
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {fields.map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border-subtle p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  value={field.label}
                  onChange={(e) => updateField(i, { label: e.target.value })}
                  placeholder="Field label"
                  className={cn(inputClass, 'flex-1 font-semibold')}
                />
                <select
                  value={field.type}
                  onChange={(e) => updateField(i, { type: e.target.value as FormFieldType, options: [] })}
                  className={cn(inputClass, 'sm:w-44')}
                >
                  {FIELD_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <label className="flex shrink-0 items-center gap-1.5 text-xs font-semibold text-ink-soft dark:text-white/70">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(i, { required: e.target.checked })}
                  />
                  Required
                </label>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveField(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint hover:bg-ink/[0.04] disabled:opacity-30"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveField(i, 1)}
                    disabled={i === fields.length - 1}
                    aria-label="Move down"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink-faint hover:bg-ink/[0.04] disabled:opacity-30"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeField(i)}
                    aria-label="Remove field"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08]"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {OPTIONS_TYPES.includes(field.type) && (
                <div className="mt-3 flex flex-col gap-2 border-t border-border-subtle pt-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-faint">Options</p>
                  {field.options.map((option, oi) => (
                    <div key={oi} className="flex items-center gap-2">
                      <input
                        value={option}
                        onChange={(e) => updateOption(i, oi, e.target.value)}
                        className={cn(inputClass, 'flex-1')}
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(i, oi)}
                        aria-label="Remove option"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-status-coral hover:bg-status-coral/[0.08]"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(i)}
                    className="flex w-fit items-center gap-1.5 text-xs font-semibold text-brand-600 hover:underline"
                  >
                    <Plus size={12} />
                    Add option
                  </button>
                </div>
              )}
            </motion.div>
          ))}
          {fields.length === 0 && <p className="text-sm text-ink-faint">No fields yet — add at least one.</p>}
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
            {deleting ? 'Deleting…' : 'Delete form'}
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting || fields.length === 0}
          className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : isEdit ? 'Save changes' : 'Create form'}
        </button>
      </div>
    </form>
  );
}
