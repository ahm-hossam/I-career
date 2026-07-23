import { Facebook, Instagram, Mail, Search, Megaphone, type LucideIcon } from 'lucide-react';
import type { ReferralSource } from '@i-career/types';

export const SOURCE_OPTIONS: { value: ReferralSource; label: string }[] = [
  { value: 'FACEBOOK', label: 'Facebook' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'GOOGLE', label: 'Google' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'OTHER', label: 'Other' },
];

export const SOURCE_LABELS: Record<ReferralSource, string> = {
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  GOOGLE: 'Google',
  EMAIL: 'Email',
  OTHER: 'Other',
};

export const SOURCE_ICONS: Record<ReferralSource, LucideIcon> = {
  FACEBOOK: Facebook,
  INSTAGRAM: Instagram,
  GOOGLE: Search,
  EMAIL: Mail,
  OTHER: Megaphone,
};

export const SOURCE_STYLES: Record<ReferralSource, string> = {
  FACEBOOK: 'bg-[#1877F2]/10 text-[#1877F2]',
  INSTAGRAM: 'bg-[#E4405F]/10 text-[#E4405F]',
  GOOGLE: 'bg-[#EA4335]/10 text-[#EA4335]',
  EMAIL: 'bg-brand-500/10 text-brand-700 dark:text-brand-300',
  OTHER: 'bg-ink/[0.06] text-ink-soft dark:bg-white/10 dark:text-white/70',
};
