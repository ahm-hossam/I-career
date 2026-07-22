'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';
import { useAuthModal } from '@/lib/auth/auth-modal-context';
import { FACULTIES, GENDER_OPTIONS, GOVERNORATES, STUDENT_STATUS_OPTIONS, UNIVERSITIES } from '@/data/registration-options';

const inputClass =
  'rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500';
const errorInputClass = 'border-status-coral focus:border-status-coral';

interface FormState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  governorate: string;
  birthday: string;
  gender: string;
  studentStatus: string;
  university: string;
  faculty: string;
}

const REQUIRED_FIELDS: (keyof FormState)[] = [
  'email',
  'password',
  'firstName',
  'lastName',
  'phone',
  'governorate',
  'birthday',
  'gender',
  'studentStatus',
  'university',
  'faculty',
];

const INITIAL_STATE: FormState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  governorate: '',
  birthday: '',
  gender: '',
  studentStatus: '',
  university: '',
  faculty: '',
};

function Field({ label, children, showError }: { label: string; children: React.ReactNode; showError: boolean }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
      {label}
      {children}
      {showError && <span className="text-xs font-medium text-status-coral">Required</span>}
    </label>
  );
}

export function SignupForm() {
  const { setUser } = useAuth();
  const { open, close } = useAuthModal();
  const router = useRouter();

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
    if (REQUIRED_FIELDS.some((k) => !form[k].trim())) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Something went wrong. Please try again.');
        return;
      }
      setUser(data.user);
      close();
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="E-Mail Address" showError={!!isInvalid('email')}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          onBlur={() => markTouched('email')}
          className={`${inputClass} ${isInvalid('email') ? errorInputClass : ''}`}
        />
      </Field>

      <Field label="Password" showError={!!isInvalid('password')}>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={(e) => set('password', e.target.value)}
            onBlur={() => markTouched('password')}
            className={`${inputClass} ${isInvalid('password') ? errorInputClass : ''} w-full pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-3 flex items-center text-ink-faint hover:text-ink"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" showError={!!isInvalid('firstName')}>
          <input
            type="text"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            onBlur={() => markTouched('firstName')}
            className={`${inputClass} ${isInvalid('firstName') ? errorInputClass : ''}`}
          />
        </Field>
        <Field label="Last Name" showError={!!isInvalid('lastName')}>
          <input
            type="text"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            onBlur={() => markTouched('lastName')}
            className={`${inputClass} ${isInvalid('lastName') ? errorInputClass : ''}`}
          />
        </Field>
      </div>

      <Field label="Phone Number" showError={!!isInvalid('phone')}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set('phone', e.target.value)}
          onBlur={() => markTouched('phone')}
          className={`${inputClass} ${isInvalid('phone') ? errorInputClass : ''}`}
        />
      </Field>

      <Field label="Governorate" showError={!!isInvalid('governorate')}>
        <select
          value={form.governorate}
          onChange={(e) => set('governorate', e.target.value)}
          onBlur={() => markTouched('governorate')}
          className={`${inputClass} ${isInvalid('governorate') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            Enter Governorate
          </option>
          {GOVERNORATES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Birthday" showError={!!isInvalid('birthday')}>
          <input
            type="date"
            value={form.birthday}
            onChange={(e) => set('birthday', e.target.value)}
            onBlur={() => markTouched('birthday')}
            className={`${inputClass} ${isInvalid('birthday') ? errorInputClass : ''}`}
          />
        </Field>
        <Field label="Gender" showError={!!isInvalid('gender')}>
          <select
            value={form.gender}
            onChange={(e) => set('gender', e.target.value)}
            onBlur={() => markTouched('gender')}
            className={`${inputClass} ${isInvalid('gender') ? errorInputClass : ''} bg-white`}
          >
            <option value="" disabled>
              Enter Gender
            </option>
            {GENDER_OPTIONS.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Are you Student or Graduate?" showError={!!isInvalid('studentStatus')}>
        <select
          value={form.studentStatus}
          onChange={(e) => set('studentStatus', e.target.value)}
          onBlur={() => markTouched('studentStatus')}
          className={`${inputClass} ${isInvalid('studentStatus') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            Choose
          </option>
          {STUDENT_STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="University" showError={!!isInvalid('university')}>
        <select
          value={form.university}
          onChange={(e) => set('university', e.target.value)}
          onBlur={() => markTouched('university')}
          className={`${inputClass} ${isInvalid('university') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            Choose
          </option>
          {UNIVERSITIES.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Faculty" showError={!!isInvalid('faculty')}>
        <select
          value={form.faculty}
          onChange={(e) => set('faculty', e.target.value)}
          onBlur={() => markTouched('faculty')}
          className={`${inputClass} ${isInvalid('faculty') ? errorInputClass : ''} bg-white`}
        >
          <option value="" disabled>
            Choose
          </option>
          {FACULTIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </Field>

      {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Submitting…' : 'Submit'}
      </button>

      <p className="text-center text-sm text-ink-soft">
        Already have an account?{' '}
        <button type="button" onClick={() => open('login')} className="font-semibold text-brand-600 hover:underline">
          Log in
        </button>
      </p>
    </form>
  );
}
