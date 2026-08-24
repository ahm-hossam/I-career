'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import {
  EMPLOYMENT_STATUS_OPTIONS,
  FACULTIES,
  GENDER_OPTIONS,
  GOVERNORATES,
  NATIONALITIES,
  optionLabel,
  STUDENT_STATUS_OPTIONS,
  UNIVERSITIES,
} from '@/data/registration-options';
import { trackCompleteRegistration } from '@/lib/facebook-pixel';
import { useLocale } from '@/lib/i18n/locale-context';

const inputClass =
  'rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500';
const errorInputClass = 'border-status-coral focus:border-status-coral';

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  nationality: string;
  governorate: string;
  birthday: string;
  gender: string;
  studentStatus: string;
  university: string;
  graduationYear: string;
  faculty: string;
  hasDisability: string;
  disabilityDetails: string;
  employmentStatus: string;
}

const REQUIRED_FIELDS: (keyof FormState)[] = [
  'firstName',
  'lastName',
  'phone',
  'email',
  'password',
  'nationality',
  'governorate',
  'birthday',
  'gender',
  'studentStatus',
  'university',
  'graduationYear',
  'faculty',
  'hasDisability',
  'employmentStatus',
];

const INITIAL_STATE: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  nationality: '',
  governorate: '',
  birthday: '',
  gender: '',
  studentStatus: '',
  university: '',
  graduationYear: '',
  faculty: '',
  hasDisability: '',
  disabilityDetails: '',
  employmentStatus: '',
};

function Field({
  label,
  children,
  showError,
}: {
  label: string;
  children: React.ReactNode;
  showError: boolean;
}) {
  const { t } = useLocale();
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
      {label}
      {children}
      {showError && <span className="text-xs font-medium text-status-coral">{t('auth.required')}</span>}
    </label>
  );
}

export function SignupForm() {
  const { setUser } = useAuth();
  const { open, close } = useAuthModal();
  const router = useRouter();
  const { t, locale } = useLocale();

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function markTouched(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  function isInvalid(key: keyof FormState) {
    return touched[key] && !form[key].trim();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const allTouched = Object.fromEntries(REQUIRED_FIELDS.map((k) => [k, true]));
    setTouched(allTouched);
    const missing = REQUIRED_FIELDS.some((k) => !form[k].trim());
    if (missing) {
      setError(t('auth.fillRequiredFields'));
      return;
    }
    if (form.hasDisability === 'yes' && !form.disabilityDetails.trim()) {
      setTouched((prev) => ({ ...prev, disabilityDetails: true }));
      setError(t('auth.specifyDisability'));
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          graduationYear: Number(form.graduationYear),
          hasDisability: form.hasDisability === 'yes',
          disabilityDetails: form.hasDisability === 'yes' ? form.disabilityDetails.trim() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? t('auth.somethingWentWrongRetry'));
        return;
      }
      setUser(data.user);
      trackCompleteRegistration();
      close();
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('auth.firstName')} showError={!!isInvalid('firstName')}>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            onBlur={() => markTouched('firstName')}
            className={`${inputClass} ${isInvalid('firstName') ? errorInputClass : ''}`}
          />
        </Field>
        <Field label={t('auth.lastName')} showError={!!isInvalid('lastName')}>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            onBlur={() => markTouched('lastName')}
            className={`${inputClass} ${isInvalid('lastName') ? errorInputClass : ''}`}
          />
        </Field>
      </div>

      <Field label={t('auth.phoneNumber')} showError={!!isInvalid('phone')}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
          onBlur={() => markTouched('phone')}
          className={`${inputClass} ${isInvalid('phone') ? errorInputClass : ''}`}
        />
      </Field>

      <Field label={t('auth.emailAddress')} showError={!!isInvalid('email')}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          onBlur={() => markTouched('email')}
          className={`${inputClass} ${isInvalid('email') ? errorInputClass : ''}`}
        />
      </Field>

      <Field label={t('auth.password')} showError={!!isInvalid('password')}>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            onBlur={() => markTouched('password')}
            className={`${inputClass} ${isInvalid('password') ? errorInputClass : ''} w-full pe-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
            className="absolute inset-y-0 end-3 flex items-center text-ink-faint hover:text-ink"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </Field>

      <Field label={t('auth.nationality')} showError={!!isInvalid('nationality')}>
        <select
          value={form.nationality}
          onChange={(e) => set('nationality', e.target.value)}
          onBlur={() => markTouched('nationality')}
          className={`${inputClass} ${isInvalid('nationality') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            {t('auth.selectNationality')}
          </option>
          {NATIONALITIES.map((n) => (
            <option key={n.value} value={n.value}>
              {optionLabel(n, locale)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('auth.governorate')} showError={!!isInvalid('governorate')}>
        <select
          value={form.governorate}
          onChange={(e) => set('governorate', e.target.value)}
          onBlur={() => markTouched('governorate')}
          className={`${inputClass} ${isInvalid('governorate') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            {t('auth.selectGovernorate')}
          </option>
          {GOVERNORATES.map((g) => (
            <option key={g.value} value={g.value}>
              {optionLabel(g, locale)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('auth.birthday')} showError={!!isInvalid('birthday')}>
          <input
            type="date"
            value={form.birthday}
            onChange={(e) => set('birthday', e.target.value)}
            onBlur={() => markTouched('birthday')}
            className={`${inputClass} ${isInvalid('birthday') ? errorInputClass : ''}`}
          />
        </Field>
        <Field label={t('auth.gender')} showError={!!isInvalid('gender')}>
          <select
            value={form.gender}
            onChange={(e) => set('gender', e.target.value)}
            onBlur={() => markTouched('gender')}
            className={`${inputClass} ${isInvalid('gender') ? errorInputClass : ''} bg-white`}
          >
            <option value="" disabled>
              {t('auth.selectGender')}
            </option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {optionLabel(g, locale)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={t('auth.studentOrGraduateStatus')} showError={!!isInvalid('studentStatus')}>
        <select
          value={form.studentStatus}
          onChange={(e) => set('studentStatus', e.target.value)}
          onBlur={() => markTouched('studentStatus')}
          className={`${inputClass} ${isInvalid('studentStatus') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            {t('auth.selectStatus')}
          </option>
          {STUDENT_STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {optionLabel(s, locale)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t('auth.university')} showError={!!isInvalid('university')}>
          <select
            value={form.university}
            onChange={(e) => set('university', e.target.value)}
            onBlur={() => markTouched('university')}
            className={`${inputClass} ${isInvalid('university') ? errorInputClass : ''} bg-white`}
          >
            <option value="" disabled>
              {t('auth.selectUniversity')}
            </option>
            {UNIVERSITIES.map((u) => (
              <option key={u.value} value={u.value}>
                {optionLabel(u, locale)}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t('auth.graduationYear')} showError={!!isInvalid('graduationYear')}>
          <input
            type="number"
            placeholder="yyyy"
            min={1950}
            max={2100}
            value={form.graduationYear}
            onChange={(e) => set('graduationYear', e.target.value)}
            onBlur={() => markTouched('graduationYear')}
            className={`${inputClass} ${isInvalid('graduationYear') ? errorInputClass : ''}`}
          />
        </Field>
      </div>

      <Field label={t('auth.faculty')} showError={!!isInvalid('faculty')}>
        <select
          value={form.faculty}
          onChange={(e) => set('faculty', e.target.value)}
          onBlur={() => markTouched('faculty')}
          className={`${inputClass} ${isInvalid('faculty') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            {t('auth.selectFaculty')}
          </option>
          {FACULTIES.map((f) => (
            <option key={f.value} value={f.value}>
              {optionLabel(f, locale)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('auth.employmentStatusQuestion')} showError={!!isInvalid('employmentStatus')}>
        <select
          value={form.employmentStatus}
          onChange={(e) => set('employmentStatus', e.target.value)}
          onBlur={() => markTouched('employmentStatus')}
          className={`${inputClass} ${isInvalid('employmentStatus') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            {t('auth.selectOption')}
          </option>
          {EMPLOYMENT_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {optionLabel(opt, locale)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('auth.hasDisabilityQuestion')} showError={!!isInvalid('hasDisability')}>
        <select
          value={form.hasDisability}
          onChange={(e) => set('hasDisability', e.target.value)}
          onBlur={() => markTouched('hasDisability')}
          className={`${inputClass} ${isInvalid('hasDisability') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            {t('auth.selectOption')}
          </option>
          <option value="no">{t('auth.no')}</option>
          <option value="yes">{t('auth.yes')}</option>
        </select>
      </Field>

      {form.hasDisability === 'yes' && (
        <Field label={t('auth.pleaseSpecify')} showError={!!touched.disabilityDetails && !form.disabilityDetails.trim()}>
          <input
            type="text"
            value={form.disabilityDetails}
            onChange={(e) => set('disabilityDetails', e.target.value)}
            onBlur={() => markTouched('disabilityDetails')}
            className={`${inputClass} ${touched.disabilityDetails && !form.disabilityDetails.trim() ? errorInputClass : ''}`}
          />
        </Field>
      )}

      {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? t('auth.submitting') : t('auth.submit')}
      </button>

      <p className="text-center text-sm text-ink-soft">
        {t('auth.alreadyHaveAccount')}{' '}
        <button type="button" onClick={() => open('login')} className="font-semibold text-brand-600 hover:underline">
          {t('auth.logInLink')}
        </button>
      </p>
    </form>
  );
}
