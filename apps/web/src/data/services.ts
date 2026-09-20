import type { ServiceCategory } from '@i-career/types';
import type { Locale } from '@/lib/i18n/types';

export type ServiceIconName =
  | 'rocket'
  | 'sparkles'
  | 'trophy'
  | 'graduation-cap'
  | 'megaphone'
  | 'heart-handshake'
  | 'globe'
  | 'handshake';

export interface ServiceSection {
  heading: string;
  body: string;
  icon: ServiceIconName;
}

export interface ServiceApproach {
  heading: string;
  body?: string;
  bullets?: string[];
  ctaLabel: string;
  icon: ServiceIconName;
}

export interface ServicePageData {
  category: ServiceCategory;
  breadcrumbLabel: string;
  headlineText: string;
  headlineHighlight: string;
  keywords: string[];
  approach: ServiceApproach;
  sections: ServiceSection[];
  ctaHeading: string;
  ctaLabel: string;
}

interface ServicesContent {
  youth: ServicePageData;
  employers: ServicePageData;
  ngos: ServicePageData;
}

const SERVICES_CONTENT: Record<Locale, ServicesContent> = {
  en: {
    youth: {
      category: 'YOUTH',
      breadcrumbLabel: 'Youth',
      headlineText: 'EMPOWERING YOUTHS FOR A BRIGHT FUTURE!',
      headlineHighlight: 'YOUTHS',
      keywords: ['CHOOSE · PREPARE · APPLY', 'Summits & Events'],
      approach: {
        heading: 'Bridging the Gap Between Education and Employment for Youths Through **OUR APPROACH**',
        bullets: ['How to **CHOOSE** your career', 'How to **PREPARE** for it', 'How to **APPLY** for a job'],
        ctaLabel: 'Send Email',
        icon: 'rocket',
      },
      sections: [
        {
          heading: 'Employment Programs',
          body: 'By developing our unique **Choose, Prepare, Apply** approach, **iCareer** offers Employment Programs utilized by this three-step process to guide youths through their career journey. Firstly, helping them **Choose** the ideal career path by providing them with personalized career assessments to uncover their strengths and interests. **Prepare** youth for the job market by covering essential job technicalities and offering comprehensive services such as CV review and writing, as well as interview preparation. Finally, navigate them on how to **Apply** for top tier companies.',
          icon: 'sparkles',
        },
        {
          heading: 'Summits and Events',
          body: 'Our summits and events are tailored to guide youths through every step of their career journey. We provide a wide range of workshops to enhance their professional skills, mentorship sessions from industry experts, and panel discussions performed by top notch speakers to share their career experiences. **iCareer** also facilitates connections with leading companies, offering exclusive opportunities to network with potential employers and gain insights into various industries.',
          icon: 'trophy',
        },
      ],
      ctaHeading: 'Start Your Journey Now!',
      ctaLabel: 'Send Email',
    },
    employers: {
      category: 'EMPLOYERS',
      breadcrumbLabel: 'Employers',
      headlineText: 'BREAKING THE CURSE OF JOBLESSNESS!',
      headlineHighlight: 'JOBLESSNESS!',
      keywords: ['Applicant Tracking System', 'Corporate Training'],
      approach: {
        heading: 'Applicant Tracking System (ATS)',
        body: 'We aim to revolutionize the hiring process by offering a top notch **Applicant Tracking System (ATS)** for our employers! This helps them streamline their recruitment and hiring processes, where they can easily track candidates, schedule interviews, post job opportunities, send automated emails and more!',
        ctaLabel: 'Request a Demo',
        icon: 'rocket',
      },
      sections: [
        {
          heading: 'Corporate Training and Development Programs',
          body: 'We specialize in upskilling employees by equipping them with required skills and knowledge to excel their soft skills and organizational abilities. Through targeted **Corporate training and development** programs, employees gain proficiency in communication, teamwork, leadership, and other crucial areas. This positions them for career advancement and opportunities for promotion within the organization.',
          icon: 'graduation-cap',
        },
        {
          heading: 'Employer Branding',
          body: 'We enhance employer branding through digital assets like Day in the Life Of an Employee (DILO) content, crafted to showcase company culture and attract top talent. Our high-quality written career pages highlight career opportunities and organizational values. Additionally, we facilitate engagement through campus activities, enabling employers to establish strong connections across multiple universities and cultivate diverse talent pools.',
          icon: 'megaphone',
        },
        {
          heading: 'Corporate Social Responsibility (CSR) Programs',
          body: 'We design **Corporate Social Responsibility (CSR)** Programs that foster skill development and ensure comprehensive job placement. By doing so, we actively contribute to the communities’ economic growth and social stability.',
          icon: 'heart-handshake',
        },
      ],
      ctaHeading: "Let's Talk Recruitment!",
      ctaLabel: 'Send Email',
    },
    ngos: {
      category: 'NGOS',
      breadcrumbLabel: 'NGOs',
      headlineText: 'SYNERGIZING FORCES FOR TRANSFORMATIVE CHANGE',
      headlineHighlight: 'SYNERGIZING',
      keywords: ['Career Fair Summits'],
      approach: {
        heading: 'Employment Programs',
        body: 'We provide **Employment Programs** for NGOs, designed to create a dynamic matchmaking environment that aligns the needs of employers with the skills of job seekers, fostering collaborative opportunities for economic development and workforce growth.',
        ctaLabel: 'Send Email',
        icon: 'rocket',
      },
      sections: [
        {
          heading: 'Employment Programs for Refugees',
          body: 'We offer Employment Programs specialized for refugees. These programs include personalized career guidance, skill development workshops, and job placement services tailored to the unique needs of refugees to empower their economic independence and social integration.',
          icon: 'heart-handshake',
        },
        {
          heading: 'Career Fair Summits',
          body: 'We host **Career Fair Summits** that connect employers with beneficiaries. These summits create valuable opportunities for networking and employment, where employers and job seekers alike benefit from a rich array of activities that enhance engagement and foster professional growth.',
          icon: 'trophy',
        },
        {
          heading: 'Engagement With The Private Sector',
          body: 'We provide NGOs with a dynamic platform to engage and collaborate with the private sector. This environment fosters partnerships and opens avenues for mutual growth, allowing NGOs to leverage private sector resources and expertise to enhance their impact and effectiveness.',
          icon: 'handshake',
        },
      ],
      ctaHeading: 'Be Part of Our Success!',
      ctaLabel: 'Send Email',
    },
  },
  ar: {
    youth: {
      category: 'YOUTH',
      breadcrumbLabel: 'الشباب',
      headlineText: 'تمكين الشباب من أجل مستقبل مشرق!',
      headlineHighlight: 'الشباب',
      keywords: ['اختر · استعد · تقدّم', 'قمم وفعاليات'],
      approach: {
        heading: 'سد الفجوة بين التعليم والتوظيف للشباب من خلال **منهجيتنا**',
        bullets: ['كيف **تختار** مسارك المهني', 'كيف **تستعد** له', 'كيف **تتقدم** لوظيفة'],
        ctaLabel: 'أرسل بريدًا إلكترونيًا',
        icon: 'rocket',
      },
      sections: [
        {
          heading: 'برامج التوظيف',
          body: 'من خلال تطوير منهجيتنا الفريدة **اختر، استعد، تقدّم**، تقدّم **iCareer** برامج توظيف تعتمد على هذه العملية المكونة من ثلاث خطوات لإرشاد الشباب خلال رحلتهم المهنية. أولًا، مساعدتهم على **اختيار** المسار المهني المثالي من خلال تقييمات مهنية شخصية للكشف عن نقاط قوتهم واهتماماتهم. **إعداد** الشباب لسوق العمل من خلال تغطية الجوانب الفنية الأساسية للوظائف وتقديم خدمات شاملة مثل مراجعة وكتابة السيرة الذاتية، بالإضافة إلى التحضير للمقابلات الشخصية. وأخيرًا، إرشادهم حول كيفية **التقدّم** للعمل في الشركات الكبرى.',
          icon: 'sparkles',
        },
        {
          heading: 'القمم والفعاليات',
          body: 'تم تصميم قممنا وفعالياتنا لإرشاد الشباب في كل خطوة من رحلتهم المهنية. نوفر مجموعة واسعة من ورش العمل لتعزيز مهاراتهم المهنية، وجلسات إرشاد من خبراء الصناعة، وحلقات نقاش يقدمها متحدثون بارزون لمشاركة تجاربهم المهنية. تسهّل **iCareer** أيضًا التواصل مع الشركات الرائدة، مما يتيح فرصًا حصرية للتواصل مع أصحاب العمل المحتملين واكتساب رؤى حول مختلف الصناعات.',
          icon: 'trophy',
        },
      ],
      ctaHeading: 'ابدأ رحلتك الآن!',
      ctaLabel: 'أرسل بريدًا إلكترونيًا',
    },
    employers: {
      category: 'EMPLOYERS',
      breadcrumbLabel: 'أصحاب العمل',
      headlineText: 'كسر لعنة البطالة!',
      headlineHighlight: 'البطالة!',
      keywords: ['نظام تتبع المتقدمين', 'التدريب المؤسسي'],
      approach: {
        heading: 'نظام تتبع المتقدمين (ATS)',
        body: 'نهدف إلى إحداث ثورة في عملية التوظيف من خلال تقديم **نظام تتبع متقدمين (ATS)** متطور لأصحاب العمل لدينا! يساعدهم هذا على تبسيط عمليات التوظيف والاستقطاب، حيث يمكنهم بسهولة تتبع المرشحين، وجدولة المقابلات، ونشر الفرص الوظيفية، وإرسال رسائل بريدية تلقائية والمزيد!',
        ctaLabel: 'اطلب عرضًا تجريبيًا',
        icon: 'rocket',
      },
      sections: [
        {
          heading: 'برامج التدريب والتطوير المؤسسي',
          body: 'نتخصص في تطوير مهارات الموظفين من خلال تزويدهم بالمهارات والمعارف اللازمة لتحسين مهاراتهم الشخصية وقدراتهم التنظيمية. من خلال برامج **التدريب والتطوير المؤسسي** الموجهة، يكتسب الموظفون كفاءة في التواصل والعمل الجماعي والقيادة ومجالات أساسية أخرى. هذا يؤهلهم للتقدم الوظيفي وفرص الترقية داخل المؤسسة.',
          icon: 'graduation-cap',
        },
        {
          heading: 'العلامة التجارية لصاحب العمل',
          body: 'نعزز العلامة التجارية لأصحاب العمل من خلال أصول رقمية مثل محتوى "يوم في حياة موظف" (DILO)، المصمم لإبراز ثقافة الشركة واستقطاب أفضل المواهب. تسلط صفحاتنا الوظيفية عالية الجودة الضوء على الفرص الوظيفية وقيم المؤسسة. بالإضافة إلى ذلك، نسهّل التواصل من خلال الأنشطة الجامعية، مما يمكّن أصحاب العمل من إقامة روابط قوية عبر عدة جامعات وبناء مجمعات مواهب متنوعة.',
          icon: 'megaphone',
        },
        {
          heading: 'برامج المسؤولية الاجتماعية للشركات (CSR)',
          body: 'نصمم برامج **المسؤولية الاجتماعية للشركات (CSR)** التي تعزز تطوير المهارات وتضمن التنسيب الوظيفي الشامل. من خلال ذلك، نساهم بفاعلية في النمو الاقتصادي والاستقرار الاجتماعي للمجتمعات.',
          icon: 'heart-handshake',
        },
      ],
      ctaHeading: 'لنتحدث عن التوظيف!',
      ctaLabel: 'أرسل بريدًا إلكترونيًا',
    },
    ngos: {
      category: 'NGOS',
      breadcrumbLabel: 'المنظمات غير الحكومية',
      headlineText: 'توحيد الجهود من أجل تغيير جذري',
      headlineHighlight: 'توحيد الجهود',
      keywords: ['قمم معارض التوظيف'],
      approach: {
        heading: 'برامج التوظيف',
        body: 'نقدم **برامج توظيف** للمنظمات غير الحكومية، مصممة لخلق بيئة مطابقة ديناميكية تُوائم بين احتياجات أصحاب العمل ومهارات الباحثين عن عمل، مما يعزز فرص التعاون من أجل التنمية الاقتصادية ونمو القوى العاملة.',
        ctaLabel: 'أرسل بريدًا إلكترونيًا',
        icon: 'rocket',
      },
      sections: [
        {
          heading: 'برامج التوظيف للاجئين',
          body: 'نقدم برامج توظيف متخصصة للاجئين. تشمل هذه البرامج إرشادًا مهنيًا شخصيًا، وورش عمل لتطوير المهارات، وخدمات تنسيب وظيفي مصممة خصيصًا لتلبية الاحتياجات الفريدة للاجئين لتعزيز استقلالهم الاقتصادي واندماجهم الاجتماعي.',
          icon: 'heart-handshake',
        },
        {
          heading: 'قمم معارض التوظيف',
          body: 'نستضيف **قمم معارض التوظيف** التي تربط أصحاب العمل بالمستفيدين. تخلق هذه القمم فرصًا قيّمة للتواصل والتوظيف، حيث يستفيد أصحاب العمل والباحثون عن عمل على حد سواء من مجموعة غنية من الأنشطة التي تعزز المشاركة وتدعم النمو المهني.',
          icon: 'trophy',
        },
        {
          heading: 'التعاون مع القطاع الخاص',
          body: 'نوفر للمنظمات غير الحكومية منصة ديناميكية للتفاعل والتعاون مع القطاع الخاص. تعزز هذه البيئة الشراكات وتفتح آفاقًا للنمو المشترك، مما يتيح للمنظمات غير الحكومية الاستفادة من موارد وخبرات القطاع الخاص لتعزيز أثرها وفعاليتها.',
          icon: 'handshake',
        },
      ],
      ctaHeading: 'كن جزءًا من نجاحنا!',
      ctaLabel: 'أرسل بريدًا إلكترونيًا',
    },
  },
};

export function getServicesContent(locale: Locale): ServicesContent {
  return SERVICES_CONTENT[locale];
}
