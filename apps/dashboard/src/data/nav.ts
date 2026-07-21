import {
  Building2,
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  School,
  Settings,
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
      { key: 'programs', href: '/programs', icon: GraduationCap },
      { key: 'events', href: '/events', icon: CalendarDays },
    ],
  },
  {
    key: 'section_network',
    items: [
      { key: 'employers', href: '/employers', icon: Building2 },
      { key: 'universities', href: '/universities', icon: School },
      { key: 'partners', href: '/partners', icon: HeartHandshake },
    ],
  },
  {
    key: 'section_workspace',
    items: [
      { key: 'team', href: '/team', icon: UsersRound },
      { key: 'settings', href: '/settings', icon: Settings },
    ],
  },
];
