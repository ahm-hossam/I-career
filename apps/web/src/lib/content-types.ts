export const SORT_OPTIONS = ['Newest to Oldest', 'Oldest to Newest', 'A to Z', 'Z to A'] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export interface NavItem {
  label: string;
  href: string;
}

export interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
}

export interface PartnerGroup {
  label: string;
  logos: PartnerLogo[];
}

export interface ServiceTab {
  key: string;
  tabLabel: string;
  heading: string;
  items: string[];
  cta: string;
}

export interface ProgramItem {
  slug: string;
  title: string;
  description: string;
  mode?: 'Online' | 'Offline' | 'Hybrid';
}

export interface UpcomingEventItem {
  slug: string;
  title: string;
  excerpt: string;
  startDate: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
}

export interface PastEventItem {
  day: string;
  month: string;
  title: string;
  year: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatar: string;
}

export interface TeamMember {
  name: string;
  role: string;
}
