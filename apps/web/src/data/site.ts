import type { NavItem } from '@/lib/content-types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Programs', href: '/programs' },
  { label: 'Events', href: '/events' },
  { label: 'About us', href: '/about' },
  { label: 'Contact us', href: '/contact' },
];

export const LOGIN_LABEL = 'Login';

export const FOOTER_TAGLINE = 'Be Career Ready!';

export const FOOTER_COLUMNS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Team', href: '/about#team' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact us', href: '/contact' },
      { label: 'Follow us', href: '#social' },
    ],
  },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/icareer' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/icareer' },
  { label: 'Facebook', href: 'https://www.facebook.com/icareer' },
];

export const COPYRIGHT = '© 2026 iCareer';

export const CONTACT_EMAIL = 'hello@icareer.com.eg';
