'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2, X } from 'lucide-react';
import type { ProgramFormField } from '@i-career/types';
import { FileUploadField } from '@/components/employer/file-upload-field';
import { useLocale } from '@/lib/i18n/locale-context';

const inputClass =
  'rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500';

type Answers = Record<string, string | string[]>;

function isEmpty(value: string | string[] | undefined) {
  return value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
}

function renderField(
  field: ProgramFormField,
  value: string | string[] | undefined,
  onChange: (v: string | string[]) => void,
  onBlur: () => void,
  t: (path: string, vars?: Record<string, string | number>) => string,
) {
  switch (field.type) {
    case 'LONG_TEXT':
      return (
        <textarea
          rows={4}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${inputClass} resize-none`}
        />
      );
    case 'EMAIL':
      return (
        <input
          type="email"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
      );
    case 'PHONE':
      return (
        <input
          type="tel"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
      );
    case 'NUMBER':
      return (
        <input
          type="number"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
      );
    case 'DATE':
      return (
        <input
          type="date"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
      );
    case 'DROPDOWN':
      return (
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`${inputClass} bg-white`}
        >
          <option value="" disabled>
            {t('applyForm.choose')}
          </option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    case 'CHECKBOXES': {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className="flex flex-wrap gap-2">
          {field.options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => {
                onBlur();
                onChange(selected.includes(o) ? selected.filter((v) => v !== o) : [...selected, o]);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                selected.includes(o) ? 'bg-brand-500 text-white' : 'bg-ink/[0.04] text-ink-soft hover:bg-ink/[0.08]'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      );
    }
    case 'YES_NO':
      return (
        <div className="flex gap-2">
          {[
            { code: 'Yes', label: t('applyForm.yes') },
            { code: 'No', label: t('applyForm.no') },
          ].map((o) => (
            <button
              key={o.code}
              type="button"
              onClick={() => {
                onBlur();
                onChange(o.code);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                value === o.code ? 'bg-brand-500 text-white' : 'bg-ink/[0.04] text-ink-soft hover:bg-ink/[0.08]'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      );
    case 'FILE':
      return (
        <FileUploadField
          label={`${field.label}${field.required ? ' *' : ''}`}
          urls={value ? [value as string] : []}
          onChange={(urls) => {
            onBlur();
            onChange(urls[0] ?? '');
          }}
        />
      );
    case 'SHORT_TEXT':
    default:
      return (
        <input
          type="text"
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={inputClass}
        />
      );
  }
}

export function ApplyFormModal({
  fields,
  submitting,
  error,
  onClose,
  onSubmit,
}: {
  fields: ProgramFormField[];
  submitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (answers: Answers) => void;
}) {
  const { t } = useLocale();
  const [answers, setAnswers] = useState<Answers>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  function set(fieldId: string, value: string | string[]) {
    setAnswers((a) => ({ ...a, [fieldId]: value }));
  }

  function markTouched(fieldId: string) {
    setTouched((t) => ({ ...t, [fieldId]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(Object.fromEntries(fields.map((f) => [f.id, true])));
    const missing = fields.some((f) => f.required && isEmpty(answers[f.id]));
    if (missing) return;
    onSubmit(answers);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t('applyForm.close')}
            className="absolute end-5 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-ink/[0.05] hover:text-ink"
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-extrabold text-ink">{t('applyForm.title')}</h2>
          <p className="mt-1 text-sm text-ink-soft">{t('applyForm.subtitle')}</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.id} className="flex flex-col gap-1.5">
                {field.type !== 'FILE' && (
                  <label className="text-sm font-semibold text-ink">
                    {field.label}
                    {field.required && <span className="text-status-coral"> *</span>}
                  </label>
                )}
                {renderField(field, answers[field.id], (v) => set(field.id, v), () => markTouched(field.id), t)}
                {field.required && touched[field.id] && isEmpty(answers[field.id]) && (
                  <span className="text-xs font-medium text-status-coral">{t('applyForm.required')}</span>
                )}
              </div>
            ))}

            {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {submitting ? t('applyForm.submitting') : t('applyForm.submit')}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
