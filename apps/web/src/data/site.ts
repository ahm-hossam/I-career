import type { NavItem } from '@/lib/content-types';
import type { Locale } from '@/lib/i18n/types';

interface SiteContent {
  navItems: NavItem[];
  footerTagline: string;
  footerColumns: { heading: string; links: { label: string; href: string }[] }[];
  copyright: string;
}

const SITE_CONTENT: Record<Locale, SiteContent> = {
  en: {
    navItems: [
      { label: 'Home', href: '/' },
      {
        label: 'Services',
        href: '/#services',
        children: [
          { label: 'Youth', href: '/services/youth' },
          { label: 'Employers', href: '/services/employers' },
          { label: 'NGOs', href: '/services/ngos' },
        ],
      },
      { label: 'Programs', href: '/programs' },
      { label: 'Events', href: '/events' },
      { label: 'Contact us', href: '/contact' },
    ],
    footerTagline: 'Be Career Ready!',
    footerColumns: [
      {
        heading: 'Support',
        links: [
          { label: 'Contact us', href: '/contact' },
          { label: 'Follow us', href: '#social' },
          { label: 'For Employers', href: '/employer/register' },
        ],
      },
    ],
    copyright: '© 2026 iCareer',
  },
  ar: {
    navItems: [
      { label: 'الرئيسية', href: '/' },
      {
        label: 'الخدمات',
        href: '/#services',
        children: [
          { label: 'الشباب', href: '/services/youth' },
          { label: 'أصحاب العمل', href: '/services/employers' },
          { label: 'المنظمات غير الحكومية', href: '/services/ngos' },
        ],
      },
      { label: 'البرامج', href: '/programs' },
      { label: 'الفعاليات', href: '/events' },
      { label: 'اتصل بنا', href: '/contact' },
    ],
    footerTagline: 'كن جاهزًا لمهنتك!',
    footerColumns: [
      {
        heading: 'الدعم',
        links: [
          { label: 'اتصل بنا', href: '/contact' },
          { label: 'تابعنا', href: '#social' },
          { label: 'لأصحاب العمل', href: '/employer/register' },
        ],
      },
    ],
    copyright: '© 2026 iCareer',
  },
};

export function getSiteContent(locale: Locale): SiteContent {
  return SITE_CONTENT[locale];
}

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/icareer' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/icareer' },
  { label: 'Facebook', href: 'https://www.facebook.com/icareer' },
];

export const CONTACT_EMAIL = 'hello@icareer.com.eg';
