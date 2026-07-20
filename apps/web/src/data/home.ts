import type { ServiceTab, Testimonial } from '@/lib/content-types';

export const HERO = {
  headline: ['REVOLUTIONIZING', 'EDUCATION AND EMPLOYMENT', 'ECOSYSTEMS FOR ALL'],
  subhead: 'Comprehensive services that will redefine education for employment at scale',
};

export const STATS = [
  { value: 37, suffix: '', label: 'Projects' },
  { value: 400, suffix: '+', label: 'Employers' },
  { value: 18, suffix: '', label: 'Universities' },
];

export const WHO_WE_WORKED_WITH_HEADING = 'Who We Worked With';

export const SERVICES_HEADING = 'Our Services';
export const SERVICES_SUBHEAD =
  'Connecting employers, universities, and early talents all together in one platform';

export const SERVICE_TABS: ServiceTab[] = [
  {
    key: 'youth',
    tabLabel: 'For Youth',
    heading: 'Pave Your Career Future',
    items: [
      'Employment Programs',
      'Workshops and Mentorship',
      'Summits and Events',
      'One-to-one Services',
      'Job Placement',
    ],
    cta: 'Explore Our Services for YOUTH',
  },
  {
    key: 'employers',
    tabLabel: 'For Employers',
    heading: 'Hunt Talents Easier',
    items: [
      'Applicant Tracking System',
      'Career Service Management',
      'Corporate Training and Development Programs',
      'Talent Pools',
      'Corporate Social Responsibility Programs',
    ],
    cta: 'Explore Our Services for EMPLOYERS',
  },
  {
    key: 'ngos',
    tabLabel: 'For NGOs',
    heading: 'Drive Positive Change',
    items: [
      'Employment Programs',
      'Virtual Career Center',
      'Career Fair Summits',
      'Refugees Employment',
      'Private Sector Engagement',
    ],
    cta: 'Explore Our Services for NGOS',
  },
];

export const PROGRAMS_TEASER = {
  heading: 'Our Programs',
  subhead: 'Your chance to kick start your career with fully funded programs',
  cta: 'View More',
};

export const EVENTS_TEASER = {
  heading: 'Our Events',
  subhead: 'Get face-to-face with employers, boost your skills through rich content, and apply for jobs!',
  cta: 'View More',
  featured: {
    title: 'Jobzella Career Fair',
    mode: 'Offline' as const,
    date: '21 Dec 2024',
    location: 'Cairo',
    tag: 'Career Fair',
    cta: 'View Event',
  },
};

export const TESTIMONIALS_HEADING = 'Testimonials';
export const TESTIMONIALS_SUBHEAD = 'This is how much people love us!';

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'iCareer events are great opportunities for the youth to get exposed to the opportunities available for them.',
    name: 'Nelly Mahmoud',
    title: 'CCO & head of youth beyond banking & financial inclusion at EG-BANK',
    avatar: '/partners/avatars/nelly-mahmoud.png',
  },
  {
    quote:
      'I think that every girl who came to FEMpower Summit by iCareer today is already striving & wants to find a better opportunity, learn & develop.',
    name: 'Alaa Amer',
    title: 'North Africa Talent acquisition chief leader at P&G',
    avatar: '/partners/avatars/alaa-amer.png',
  },
  {
    quote:
      'it’s a very good event, and we’re pleased to see all these people either Egyptians or refugees and see all these companies.',
    name: 'Eric Oechslin',
    title: 'Director of ILO Career Office',
    avatar: '/partners/avatars/eric-oechslin.png',
  },
  {
    quote:
      'Alex Career Day is a different event as it doesn’t only provide job opportunities for Egyptians, but also for refugees and migrants in Egypt.',
    name: 'Mohamed Saeed',
    title: 'Program officer at Embassy of Switzerland – office for Development Cooperation',
    avatar: '/partners/avatars/mohamed-saeed.png',
  },
  {
    quote:
      'Alex Career Day is a big success, attracting a large number of young Alexandrian job seekers, we are also pleased by the large number of refugee and immigrant youth who have taken part.',
    name: 'Caroline Naguib',
    title: 'Project Manager/Senior Coordinator at ILO',
    avatar: '/partners/avatars/caroline-naguib.png',
  },
  {
    quote:
      'I can see many youngsters here in Supply Chain Innovation Summit talking about their future here. As a setup, you’ve been able to bring together professionals, youngsters & Organizations to share ideas.',
    name: 'Rahul Ral',
    title: 'Regional Head – Middle East & NW Africa – ECU WorldWide',
    avatar: '/partners/avatars/rahul-ral.png',
  },
  {
    quote:
      'As the company of Obekian, we are starting in Egypt now in the digital transformation, so it’s good to attend Supply Chain Innovation Summit to see what the market looks like and its dynamics.',
    name: 'Riyadh Alem',
    title: 'General Manager at OBKEIAN DIGITAL SOLUTIONS',
    avatar: '/partners/avatars/riyadh-alem.png',
  },
  {
    quote:
      'I am very impressed by the number of girls attending today at FEMpower Summit by iCareer, they are all young and passionate fresh graduates.',
    name: 'Engy Amin',
    title: 'Programme Analyst at UNWOMEN',
    avatar: '/partners/avatars/engy-amin.png',
  },
  {
    quote:
      'I’m so impressed by Supply Chain Innovation Summit by iCareer. it’s a great event. They didn’t just focus on big companies as Maersk, but also on startups. We want to be always sponsoring similar events.',
    name: 'Omar Gharbo',
    title: 'Managing Director at MAERSK',
    avatar: '/partners/avatars/omar-gharbo.png',
  },
];

export const CTA_BAND_TEXT = 'Be Career Ready!';
