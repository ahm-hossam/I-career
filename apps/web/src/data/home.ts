import type { ServiceTab, Testimonial } from '@/lib/content-types';
import type { Locale } from '@/lib/i18n/types';

interface HomeContent {
  hero: { headline: string[]; subhead: string };
  stats: { value: number; suffix: string; label: string }[];
  whoWeWorkedWithHeading: string;
  servicesHeading: string;
  servicesSubhead: string;
  serviceTabs: ServiceTab[];
  programsTeaser: { heading: string; subhead: string; cta: string };
  eventsTeaser: {
    heading: string;
    subhead: string;
    cta: string;
    featured: {
      slug: string;
      title: string;
      mode: 'Offline';
      date: string;
      location: string;
      tag: string;
      cta: string;
    };
  };
  testimonialsHeading: string;
  testimonialsSubhead: string;
  testimonials: Testimonial[];
  ctaBandText: string;
}

const HOME_CONTENT: Record<Locale, HomeContent> = {
  en: {
    hero: {
      headline: ['REVOLUTIONIZING', 'EDUCATION AND EMPLOYMENT', 'ECOSYSTEMS FOR ALL'],
      subhead: 'Comprehensive services that will redefine education for employment at scale',
    },
    stats: [
      { value: 37, suffix: '', label: 'Projects' },
      { value: 400, suffix: '+', label: 'Employers' },
      { value: 18, suffix: '', label: 'Universities' },
    ],
    whoWeWorkedWithHeading: 'Who We Worked With',
    servicesHeading: 'Our Services',
    servicesSubhead: 'Connecting employers, universities, and early talents all together in one platform',
    serviceTabs: [
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
          'Career Fair Summits',
          'Refugees Employment',
          'Private Sector Engagement',
        ],
        cta: 'Explore Our Services for NGOS',
      },
    ],
    programsTeaser: {
      heading: 'Our Programs',
      subhead: 'Your chance to kick start your career with fully funded programs',
      cta: 'View More',
    },
    eventsTeaser: {
      heading: 'Our Events',
      subhead: 'Get face-to-face with employers, boost your skills through rich content, and apply for jobs!',
      cta: 'View More',
      featured: {
        slug: 'next-summit',
        title: 'NEXT Summit',
        mode: 'Offline',
        date: '12 Sep 2026',
        location: 'Cairo',
        tag: 'Career Summit',
        cta: 'View Event',
      },
    },
    testimonialsHeading: 'Testimonials',
    testimonialsSubhead: 'This is how much people love us!',
    testimonials: [
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
    ],
    ctaBandText: 'Be Career Ready!',
  },
  ar: {
    hero: {
      headline: ['نحو ثورة في', 'منظومات التعليم والتوظيف', 'من أجل الجميع'],
      subhead: 'خدمات شاملة تعيد تعريف التعليم من أجل التوظيف على نطاق واسع',
    },
    stats: [
      { value: 37, suffix: '', label: 'مشروع' },
      { value: 400, suffix: '+', label: 'صاحب عمل' },
      { value: 18, suffix: '', label: 'جامعة' },
    ],
    whoWeWorkedWithHeading: 'من عملنا معهم',
    servicesHeading: 'خدماتنا',
    servicesSubhead: 'نربط أصحاب العمل والجامعات والمواهب الشابة معًا في منصة واحدة',
    serviceTabs: [
      {
        key: 'youth',
        tabLabel: 'للشباب',
        heading: 'مهّد الطريق لمستقبلك المهني',
        items: [
          'برامج التوظيف',
          'ورش عمل وإرشاد مهني',
          'قمم وفعاليات',
          'خدمات فردية',
          'التنسيب الوظيفي',
        ],
        cta: 'استكشف خدماتنا للشباب',
      },
      {
        key: 'employers',
        tabLabel: 'لأصحاب العمل',
        heading: 'استقطب المواهب بسهولة أكبر',
        items: [
          'نظام تتبع المتقدمين',
          'إدارة خدمات التوظيف',
          'برامج التدريب والتطوير المؤسسي',
          'مجمعات المواهب',
          'برامج المسؤولية الاجتماعية للشركات',
        ],
        cta: 'استكشف خدماتنا لأصحاب العمل',
      },
      {
        key: 'ngos',
        tabLabel: 'للمنظمات غير الحكومية',
        heading: 'قد التغيير الإيجابي',
        items: [
          'برامج التوظيف',
          'قمم معارض التوظيف',
          'توظيف اللاجئين',
          'التعاون مع القطاع الخاص',
        ],
        cta: 'استكشف خدماتنا للمنظمات غير الحكومية',
      },
    ],
    programsTeaser: {
      heading: 'برامجنا',
      subhead: 'فرصتك لبدء مسيرتك المهنية من خلال برامج ممولة بالكامل',
      cta: 'عرض المزيد',
    },
    eventsTeaser: {
      heading: 'فعالياتنا',
      subhead: 'التق وجهًا لوجه بأصحاب العمل، وطوّر مهاراتك من خلال محتوى غني، وتقدّم للوظائف!',
      cta: 'عرض المزيد',
      featured: {
        slug: 'next-summit',
        title: 'قمة NEXT',
        mode: 'Offline',
        date: '12 سبتمبر 2026',
        location: 'القاهرة',
        tag: 'قمة مهنية',
        cta: 'عرض الفعالية',
      },
    },
    testimonialsHeading: 'آراء عملائنا',
    testimonialsSubhead: 'هكذا يحبنا الناس!',
    testimonials: [
      {
        quote: 'فعاليات iCareer فرصة رائعة للشباب للتعرف على الفرص المتاحة لهم.',
        name: 'نيللي محمود',
        title: 'مديرة تنفيذية للاستدامة ورئيسة قسم الشباب والشمول المصرفي والمالي في بنك مصر (EG-BANK)',
        avatar: '/partners/avatars/nelly-mahmoud.png',
      },
      {
        quote:
          'أعتقد أن كل فتاة حضرت قمة FEMpower بواسطة iCareer اليوم تسعى بالفعل وتريد إيجاد فرصة أفضل، والتعلم والتطور.',
        name: 'آلاء عامر',
        title: 'رئيسة استقطاب المواهب لشمال أفريقيا في P&G',
        avatar: '/partners/avatars/alaa-amer.png',
      },
      {
        quote: 'إنها فعالية جيدة جدًا، ويسعدنا رؤية كل هؤلاء الأشخاص من مصريين ولاجئين، ورؤية كل هذه الشركات.',
        name: 'إريك أويكسلين',
        title: 'مدير مكتب التوظيف في منظمة العمل الدولية',
        avatar: '/partners/avatars/eric-oechslin.png',
      },
      {
        quote:
          'يوم الإسكندرية الوظيفي فعالية مختلفة لأنها لا توفر فرص عمل للمصريين فقط، بل أيضًا للاجئين والمهاجرين في مصر.',
        name: 'محمد سعيد',
        title: 'مسؤول برامج في سفارة سويسرا – مكتب التعاون الإنمائي',
        avatar: '/partners/avatars/mohamed-saeed.png',
      },
      {
        quote:
          'يوم الإسكندرية الوظيفي نجاح كبير، حيث يجذب عددًا كبيرًا من الباحثين عن عمل الشباب في الإسكندرية، ويسعدنا أيضًا العدد الكبير من الشباب اللاجئين والمهاجرين الذين شاركوا فيه.',
        name: 'كارولين نجيب',
        title: 'مديرة مشروع/منسقة أولى في منظمة العمل الدولية',
        avatar: '/partners/avatars/caroline-naguib.png',
      },
      {
        quote:
          'أرى العديد من الشباب هنا في قمة ابتكار سلاسل التوريد يتحدثون عن مستقبلهم. كمنظمين، تمكنتم من الجمع بين المهنيين والشباب والمنظمات لتبادل الأفكار.',
        name: 'راهول رال',
        title: 'الرئيس الإقليمي – الشرق الأوسط وشمال غرب أفريقيا – ECU WorldWide',
        avatar: '/partners/avatars/rahul-ral.png',
      },
      {
        quote:
          'بصفتنا شركة أوبكيان، نبدأ الآن في مصر في التحول الرقمي، لذا من الجيد حضور قمة ابتكار سلاسل التوريد لمعرفة شكل السوق وديناميكياته.',
        name: 'رياض علم',
        title: 'المدير العام في OBKEIAN DIGITAL SOLUTIONS',
        avatar: '/partners/avatars/riyadh-alem.png',
      },
      {
        quote:
          'أنا معجبة جدًا بعدد الفتيات الحاضرات اليوم في قمة FEMpower بواسطة iCareer، جميعهن شابات وخريجات حديثات ومتحمسات.',
        name: 'إنجي أمين',
        title: 'محللة برامج في هيئة الأمم المتحدة للمرأة',
        avatar: '/partners/avatars/engy-amin.png',
      },
      {
        quote:
          'أنا معجب جدًا بقمة ابتكار سلاسل التوريد بواسطة iCareer. إنها فعالية رائعة. لم يركزوا فقط على الشركات الكبرى مثل Maersk، بل أيضًا على الشركات الناشئة. نريد أن نظل دائمًا من رعاة فعاليات مماثلة.',
        name: 'عمر غربو',
        title: 'المدير الإداري في MAERSK',
        avatar: '/partners/avatars/omar-gharbo.png',
      },
    ],
    ctaBandText: 'كن جاهزًا لمهنتك!',
  },
};

export function getHomeContent(locale: Locale): HomeContent {
  return HOME_CONTENT[locale];
}
