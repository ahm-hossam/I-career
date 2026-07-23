import {
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Users,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  key: string;
  href: string;
  icon: LucideIcon;
}

export interface NavSection {
  key: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    key: 'section_main',
    items: [
      { key: 'overview', href: '/', icon: LayoutDashboard },
      { key: 'applicants', href: '/applicants', icon: Users },
      { key: 'applications', href: '/applications', icon: ClipboardCheck },
      { key: 'programs', href: '/programs', icon: GraduationCap },
      { key: 'campaigns', href: '/campaigns', icon: Megaphone },
      { key: 'forms', href: '/forms', icon: ClipboardList },
    ],
  },
  {
    key: 'section_workspace',
    items: [{ key: 'team', href: '/team', icon: UsersRound }],
  },
];
