import type { Locale } from '@/lib/i18n/types';

export interface EventPillar {
  title: string;
  body: string;
}

export interface EventStat {
  value: string;
  label: string;
}

export interface EventContent {
  slug: string;
  title: string;
  tagline: string;
  date: string;
  location: string;
  organizer: string;
  description: string[];
  pillars: EventPillar[];
  stats: EventStat[];
  externalUrl: string;
  ctaLabel: string;
}

const EVENTS: Record<string, Record<Locale, EventContent>> = {
  'next-summit': {
    en: {
      slug: 'next-summit',
      title: 'NEXT Summit — Explore What Fits You',
      tagline: 'Find what’s NEXT for you. Your NEXT move starts here.',
      date: 'September 12, 2026',
      location: 'The Greek Campus, Cairo, Egypt',
      organizer: 'iCareer',
      description: [
        'NEXT Summit is a career-readiness and real-hiring experience designed for students, graduates, and young professionals — built to take you from unsure to clear through real career paths, practical skills, mentoring, and direct hiring opportunities.',
        'Expect 3,000+ attendees, 30+ hiring companies with open roles, 100+ speakers and mentors, and 55+ sessions across multiple stages — from a Main Stage and Masterclasses to a Real Hiring Zone and structured mentorship and networking.',
      ],
      pillars: [
        { title: 'Explore', body: 'Discover the industries and career paths that genuinely match you.' },
        { title: 'Prepare', body: 'Build practical, market-ready skills through hands-on sessions.' },
        { title: 'Connect', body: 'Meet professionals, mentors, and employers face to face.' },
        { title: 'Get Hired', body: 'Access real vacancies and on-the-spot assessments.' },
      ],
      stats: [
        { value: '3,000+', label: 'Attendees' },
        { value: '30+', label: 'Hiring companies' },
        { value: '100+', label: 'Speakers & mentors' },
        { value: '55+', label: 'Sessions' },
      ],
      externalUrl: 'https://nextsummit.io/',
      ctaLabel: 'Visit NEXT Summit',
    },
    ar: {
      slug: 'next-summit',
      title: 'قمة NEXT — اكتشف ما يناسبك',
      tagline: 'اكتشف خطوتك القادمة. رحلتك المهنية تبدأ من هنا.',
      date: '12 سبتمبر 2026',
      location: 'الجرين كامبس، القاهرة، مصر',
      organizer: 'آي كارير',
      description: [
        'قمة NEXT هي تجربة توظيف حقيقية وإعداد مهني مصممة للطلاب والخريجين والمهنيين الشباب، لمساعدتك على الانتقال من حالة التردد إلى الوضوح من خلال مسارات مهنية حقيقية، ومهارات عملية، وإرشاد مباشر، وفرص توظيف فعلية.',
        'يشارك في القمة أكثر من 3000 حضور، وأكثر من 30 شركة توظيف بفرص عمل حقيقية، وأكثر من 100 متحدث وموجّه، وأكثر من 55 جلسة على عدة منصات — من المسرح الرئيسي وورش العمل المتخصصة إلى منطقة التوظيف المباشر والتواصل المهني المنظم.',
      ],
      pillars: [
        { title: 'استكشف', body: 'اكتشف المجالات والمسارات المهنية التي تناسبك فعليًا.' },
        { title: 'استعد', body: 'اكتسب مهارات عملية مطلوبة في سوق العمل من خلال جلسات تطبيقية.' },
        { title: 'تواصل', body: 'تعرّف على متخصصين وموجّهين وأصحاب عمل وجهًا لوجه.' },
        { title: 'احصل على وظيفة', body: 'تقدّم لفرص عمل حقيقية وشارك في تقييمات فورية.' },
      ],
      stats: [
        { value: '+3000', label: 'حضور' },
        { value: '+30', label: 'شركة توظيف' },
        { value: '+100', label: 'متحدث وموجّه' },
        { value: '+55', label: 'جلسة' },
      ],
      externalUrl: 'https://nextsummit.io/',
      ctaLabel: 'زيارة موقع NEXT Summit',
    },
  },
};

export function getEventContent(slug: string, locale: Locale): EventContent | null {
  return EVENTS[slug]?.[locale] ?? null;
}
