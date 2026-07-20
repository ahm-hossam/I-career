import type { ProgramItem } from '@/lib/content-types';

export { SORT_OPTIONS } from '@/lib/content-types';

export const PROGRAMS_PAGE = {
  heading: 'Our Programs',
  title: 'Your Chance to Kick Start Your Career With Fully Funded Programs',
  subhead:
    'We design diverse programs to enhance employability, covering various governorates and audiences',
};

export const PROGRAM_TYPE_FILTERS = ['Online', 'Offline', 'Hybrid'] as const;

export const PROGRAMS: ProgramItem[] = [
  {
    slug: 'careerup',
    title: 'CareerUp',
    description: 'Unlock Your Career Potential with Free Professional Training',
  },
  {
    slug: 'she-leads-vol-2',
    title: 'She Leads Vol.2',
    description: 'She Leads Vol.2',
  },
  {
    slug: 'she-leads',
    title: 'She Leads',
    description: 'Discover your path. Build your skills. Own your future.',
  },
  {
    slug: 'low-code-academy',
    title: 'Low-Code Academy',
    description: 'Create More, Code Less!',
  },
  {
    slug: 'online-sessions',
    title: 'Online Sessions',
    description: 'Your Journey, Your Goals, Your Growth.',
    mode: 'Online',
  },
  {
    slug: 'sales-training-online',
    title: 'تدريب مبيعات اونلاين مجاني',
    description: 'طريقك لبداية قوية ومستقبل ناجح في مجال المبيعات',
    mode: 'Online',
  },
];

export const REGISTER_LABEL = 'Register';
export const VIEW_PROGRAM_LABEL = 'View program';
