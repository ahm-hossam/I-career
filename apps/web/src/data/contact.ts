import type { Locale } from '@/lib/i18n/types';

interface ContactContent {
  contactPage: { eyebrow: string; title: string; subhead: string };
  contactForm: {
    whoAreYouLabel: string;
    whoAreYouOptions: string[];
    serviceLabel: string;
    serviceOptions: string[];
    submitLabel: string;
  };
  contactSide: {
    heading: string;
    email: string;
    socialLabels: { facebook: string; linkedin: string; instagram: string };
  };
}

const CONTACT_CONTENT: Record<Locale, ContactContent> = {
  en: {
    contactPage: {
      eyebrow: 'Get in Touch with Us',
      title: 'Questions? We’ve Got Answers!',
      subhead: 'Connect with us and let us know how we can assist you',
    },
    contactForm: {
      whoAreYouLabel: 'Who are you?',
      whoAreYouOptions: ['Youth', 'An employer', 'A university', 'An NGO'],
      serviceLabel: 'Which service do you want to inquire about?',
      serviceOptions: ['Events', 'Career opportunities', 'Programs', 'Products', 'I don’t know'],
      submitLabel: 'Send message',
    },
    contactSide: {
      heading: 'We’d Love to Hear from You !',
      email: 'hello@icareer.com.eg',
      socialLabels: {
        facebook: 'iCareer | Facebook',
        linkedin: 'iCareer | LinkedIn',
        instagram: 'iCareer | Instagram',
      },
    },
  },
  ar: {
    contactPage: {
      eyebrow: 'تواصل معنا',
      title: 'أسئلة؟ لدينا الإجابات!',
      subhead: 'تواصل معنا وأخبرنا كيف يمكننا مساعدتك',
    },
    contactForm: {
      whoAreYouLabel: 'من أنت؟',
      whoAreYouOptions: ['شاب', 'صاحب عمل', 'جامعة', 'منظمة غير حكومية'],
      serviceLabel: 'عن أي خدمة تريد الاستفسار؟',
      serviceOptions: ['الفعاليات', 'الفرص الوظيفية', 'البرامج', 'المنتجات', 'لا أعرف'],
      submitLabel: 'إرسال الرسالة',
    },
    contactSide: {
      heading: 'يسعدنا أن نسمع منك!',
      email: 'hello@icareer.com.eg',
      socialLabels: {
        facebook: 'iCareer | فيسبوك',
        linkedin: 'iCareer | لينكدإن',
        instagram: 'iCareer | إنستغرام',
      },
    },
  },
};

export function getContactContent(locale: Locale): ContactContent {
  return CONTACT_CONTENT[locale];
}
