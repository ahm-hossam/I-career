import type { PastEventItem, UpcomingEventItem } from '@/lib/content-types';

export const EVENTS_PAGE = {
  eyebrow: 'FIND EVENTS',
  title: 'Learn, Connect, and Expand Your Expertise',
};

export const UPCOMING_EVENTS_HEADING = 'Upcoming Events';
export const UPCOMING_EVENTS_SUBHEAD = 'Stay tuned';
export const PREVIOUS_EVENTS_HEADING = 'Previous Events';

export const UPCOMING_EVENTS: UpcomingEventItem[] = [
  {
    slug: 'enactus-career-summit',
    title: 'Enactus Career Summit',
    excerpt:
      "Enactus Career Summit is the stop where Egypt's highly skilled top students, leading companies, and industry...",
    startDate: 'Start date: 31/07/2024 - 11:00 am',
    mode: 'Offline',
  },
  {
    slug: 'fempower-summit',
    title: 'FEMpower Summit',
    excerpt:
      'In partnership with UN Women Egypt, the Korea International Cooperation Agency (KOICA), the...',
    startDate: 'Start date: 09/03/2024 - 10:00 am',
    mode: 'Offline',
  },
  {
    slug: 'supply-chain-innovation-summit',
    title: 'Supply Chain Innovation Summit',
    excerpt:
      'The Supply Chain Innovation Summit was held 4 times/yearly in a row, it successfully continued its legacy...',
    startDate: 'Start date: 17/03/2023 - 09:00 am',
    mode: 'Offline',
  },
  {
    slug: 'be-ready',
    title: 'Be Ready',
    excerpt:
      'Transforming Higher Education into Career success through a collaboration with the Ministry of Higher...',
    startDate: 'Start date: 07/09/2024 - 10:00 am',
    mode: 'Offline',
  },
  {
    slug: 'technovate',
    title: 'Technovate',
    excerpt:
      'Partnering with ODC (Orange Digital Center) and GIZ (Deutsche Gesellschaft für Internationale...',
    startDate: 'Start date: 25/11/2023 - 10:00 am',
    mode: 'Offline',
  },
];

export const PAST_EVENTS: PastEventItem[] = [
  { day: '22', month: 'Nov', title: 'FEMpower Summit 2025', year: '2025' },
  { day: '27', month: 'Sep', title: 'Retail Hiring Day', year: '2025' },
  { day: '31', month: 'Jul', title: 'Enactus Career Summit', year: '2025' },
  { day: '26', month: 'Jul', title: 'Customer Service Hiring Day', year: '2025' },
];

export const VIEW_EVENT_LABEL = 'View Event';
