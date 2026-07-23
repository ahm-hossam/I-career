'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Eye, EyeOff, Search } from 'lucide-react';
import type { PublicCompany } from '@i-career/types';
import { cn } from '@i-career/utils';
import { useEmployerAuth } from '@/lib/auth/employer-auth-context';
import {
  COMPANY_BENEFIT_OPTIONS,
  COMPANY_TYPE_OPTIONS,
  EMPLOYEE_COUNT_OPTIONS,
  INDUSTRY_OPTIONS,
} from '@/data/employer-registration-options';
import { FileUploadField } from './file-upload-field';

const inputClass =
  'rounded-xl border border-ink/10 px-4 py-2.5 font-normal text-ink outline-none transition-colors focus:border-brand-500';

type Step = 'search' | 'existing-contact' | 'basic' | 'social' | 'documents' | 'contact';

const WIZARD_STEPS: { key: Step; label: string }[] = [
  { key: 'basic', label: 'Basic info' },
  { key: 'social', label: 'Social Links' },
  { key: 'documents', label: 'Documents' },
  { key: 'contact', label: 'Contact info' },
];

interface CompanyForm {
  name: string;
  numberOfEmployees: string;
  industry: string;
  type: string;
  description: string;
  address: string;
  benefits: string[];
  logoUrl?: string;
  linkedinUrl: string;
  facebookUrl: string;
  websiteUrl: string;
  documentUrls: string[];
}

interface ContactForm {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  password: string;
}

const INITIAL_COMPANY: CompanyForm = {
  name: '',
  numberOfEmployees: '',
  industry: '',
  type: '',
  description: '',
  address: '',
  benefits: [],
  logoUrl: undefined,
  linkedinUrl: '',
  facebookUrl: '',
  websiteUrl: '',
  documentUrls: [],
};

const INITIAL_CONTACT: ContactForm = { fullName: '', email: '', phone: '', jobTitle: '', password: '' };

export function EmployerWizard() {
  const router = useRouter();
  const { setEmployer } = useEmployerAuth();

  const [step, setStep] = useState<Step>('search');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<PublicCompany[]>([]);
  const [searched, setSearched] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<PublicCompany | null>(null);

  const [company, setCompany] = useState<CompanyForm>(INITIAL_COMPANY);
  const [contact, setContact] = useState<ContactForm>(INITIAL_CONTACT);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearching(true);
    try {
      const res = await fetch(`/api/employer/companies?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.items ?? []);
      setSearched(true);
    } finally {
      setSearching(false);
    }
  }

  function toggleBenefit(benefit: string) {
    setCompany((c) => ({
      ...c,
      benefits: c.benefits.includes(benefit) ? c.benefits.filter((b) => b !== benefit) : [...c.benefits, benefit],
    }));
  }

  async function submitExisting(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCompany) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/employer/register-existing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId: selectedCompany.id, ...contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Something went wrong.');
        return;
      }
      setEmployer({
        id: '',
        email: contact.email,
        fullName: contact.fullName,
        companyId: selectedCompany.id,
        companyName: selectedCompany.name,
        kind: 'employer',
      });
      router.push('/');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  async function submitNewCompany(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/employer/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...company, ...contact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? 'Something went wrong.');
        return;
      }
      setEmployer({
        id: '',
        email: contact.email,
        fullName: contact.fullName,
        companyId: data.company.id,
        companyName: data.company.name,
        kind: 'employer',
      });
      router.push('/');
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = WIZARD_STEPS.findIndex((s) => s.key === step);
  const progress = stepIndex >= 0 ? ((stepIndex + 1) / WIZARD_STEPS.length) * 100 : 0;

  if (step === 'search') {
    return (
      <div className="relative -mt-[80px] mx-auto max-w-xl px-4 pb-16 pt-[124px] sm:px-6 sm:pt-[140px]">
        <h1 className="text-2xl font-extrabold text-ink">Do you think your company has already registered?</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Please make sure you search for your company by its title in the field below
        </p>

        <form onSubmit={handleSearch} className="mt-6 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Company name"
            className={`${inputClass} flex-1`}
          />
          <button
            type="submit"
            disabled={searching}
            className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-600 disabled:opacity-60"
          >
            <Search size={16} />
            Search
          </button>
        </form>

        {searched && results.length === 0 && (
          <p className="mt-4 text-sm text-ink-soft">
            No result found. Your search did not match any company. Please register your company or make sure you have
            entered the right name.
          </p>
        )}

        {results.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {results.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCompany(c);
                    setStep('existing-contact');
                  }}
                  className="w-full rounded-xl border border-ink/10 px-4 py-3 text-start text-sm font-semibold text-ink transition-colors hover:border-brand-500"
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={() => setStep('basic')}
          className="mt-6 w-full rounded-full bg-accent-300 px-5 py-3 text-sm font-bold text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          Register your Company
        </button>
      </div>
    );
  }

  if (step === 'existing-contact') {
    return (
      <div className="relative -mt-[80px] mx-auto max-w-md px-4 pb-16 pt-[124px] sm:px-6 sm:pt-[140px]">
        <button type="button" onClick={() => setStep('search')} className="text-sm font-semibold text-brand-600 hover:underline">
          Back
        </button>
        <h1 className="mt-3 text-2xl font-extrabold text-ink">Join {selectedCompany?.name}</h1>

        <form onSubmit={submitExisting} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Full name
            <input
              required
              value={contact.fullName}
              onChange={(e) => setContact((c) => ({ ...c, fullName: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Email
            <input
              required
              type="email"
              value={contact.email}
              onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Phone
            <input
              required
              value={contact.phone}
              onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Job title
            <input
              required
              value={contact.jobTitle}
              onChange={(e) => setContact((c) => ({ ...c, jobTitle: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Password
            <input
              required
              type="password"
              minLength={8}
              value={contact.password}
              onChange={(e) => setContact((c) => ({ ...c, password: e.target.value }))}
              className={inputClass}
            />
          </label>

          {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-600 disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Sign-up'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative -mt-[80px] mx-auto max-w-xl px-4 pb-16 pt-[124px] sm:px-6 sm:pt-[140px]">
      <button type="button" onClick={() => setStep('search')} className="text-sm font-semibold text-brand-600 hover:underline">
        Back
      </button>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-full bg-brand-500"
        />
      </div>
      <div className="mt-3 flex justify-between text-xs font-semibold text-ink-faint">
        {WIZARD_STEPS.map((s) => (
          <span key={s.key} className={cn(s.key === step && 'text-brand-600')}>
            {s.label}
          </span>
        ))}
      </div>

      {step === 'basic' && (
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-ink">Company Basic info</h2>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Company Name
            <input value={company.name} onChange={(e) => setCompany((c) => ({ ...c, name: e.target.value }))} className={inputClass} />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Number of Employees
            <select
              value={company.numberOfEmployees}
              onChange={(e) => setCompany((c) => ({ ...c, numberOfEmployees: e.target.value }))}
              className={`${inputClass} bg-white`}
            >
              <option value="" disabled>
                Number of Employees
              </option>
              {EMPLOYEE_COUNT_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Industry
            <select
              value={company.industry}
              onChange={(e) => setCompany((c) => ({ ...c, industry: e.target.value }))}
              className={`${inputClass} bg-white`}
            >
              <option value="" disabled>
                Industry
              </option>
              {INDUSTRY_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Type
            <select
              value={company.type}
              onChange={(e) => setCompany((c) => ({ ...c, type: e.target.value }))}
              className={`${inputClass} bg-white`}
            >
              <option value="" disabled>
                Type
              </option>
              {COMPANY_TYPE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Description
            <textarea
              rows={3}
              value={company.description}
              onChange={(e) => setCompany((c) => ({ ...c, description: e.target.value }))}
              className={`${inputClass} resize-none`}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Address
            <input value={company.address} onChange={(e) => setCompany((c) => ({ ...c, address: e.target.value }))} className={inputClass} />
          </label>
          <div>
            <p className="text-sm font-semibold text-ink">Company Benefits</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {COMPANY_BENEFIT_OPTIONS.map((benefit) => (
                <button
                  key={benefit}
                  type="button"
                  onClick={() => toggleBenefit(benefit)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                    company.benefits.includes(benefit) ? 'bg-brand-500 text-white' : 'bg-ink/[0.04] text-ink-soft hover:bg-ink/[0.08]',
                  )}
                >
                  {benefit}
                </button>
              ))}
            </div>
          </div>
          <FileUploadField
            label="Logo"
            urls={company.logoUrl ? [company.logoUrl] : []}
            onChange={(urls) => setCompany((c) => ({ ...c, logoUrl: urls[0] }))}
          />
          <button
            type="button"
            onClick={() => setStep('social')}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            Save and continue
          </button>
        </div>
      )}

      {step === 'social' && (
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-ink">Company Social Links</h2>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            LinkedIn
            <input
              type="url"
              placeholder="https://linkedin.com/company/…"
              value={company.linkedinUrl}
              onChange={(e) => setCompany((c) => ({ ...c, linkedinUrl: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Facebook
            <input
              type="url"
              placeholder="https://facebook.com/…"
              value={company.facebookUrl}
              onChange={(e) => setCompany((c) => ({ ...c, facebookUrl: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Website
            <input
              type="url"
              placeholder="https://…"
              value={company.websiteUrl}
              onChange={(e) => setCompany((c) => ({ ...c, websiteUrl: e.target.value }))}
              className={inputClass}
            />
          </label>
          <button
            type="button"
            onClick={() => setStep('documents')}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            Save and continue
          </button>
        </div>
      )}

      {step === 'documents' && (
        <div className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-ink">Company Documents</h2>
          <FileUploadField
            label="Verification documents"
            multiple
            urls={company.documentUrls}
            onChange={(urls) => setCompany((c) => ({ ...c, documentUrls: urls }))}
          />
          <button
            type="button"
            onClick={() => setStep('contact')}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white hover:bg-brand-600"
          >
            Save and continue
          </button>
        </div>
      )}

      {step === 'contact' && (
        <form onSubmit={submitNewCompany} className="mt-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-ink">Contact info</h2>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Full name
            <input
              required
              value={contact.fullName}
              onChange={(e) => setContact((c) => ({ ...c, fullName: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Email
            <input
              required
              type="email"
              value={contact.email}
              onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Phone
            <input
              required
              value={contact.phone}
              onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Job title
            <input
              required
              value={contact.jobTitle}
              onChange={(e) => setContact((c) => ({ ...c, jobTitle: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-ink">
            Password
            <div className="relative">
              <input
                required
                type={showPassword ? 'text' : 'password'}
                minLength={8}
                value={contact.password}
                onChange={(e) => setContact((c) => ({ ...c, password: e.target.value }))}
                className={`${inputClass} w-full pr-11`}
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
          </label>

          {error && <p className="text-sm font-medium text-status-coral">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-600 disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Sign-up'}
          </button>
        </form>
      )}
    </div>
  );
}
