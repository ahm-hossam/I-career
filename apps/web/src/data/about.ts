import type { TeamMember } from '@/lib/content-types';
import type { Locale } from '@/lib/i18n/types';

interface AboutContent {
  vision: { eyebrow: string; text: string };
  mission: { eyebrow: string; text: string };
  whoAreWe: { eyebrow: string; paragraph: string; playVideoLabel: string; videoUrl: string };
  values: { eyebrow: string; items: string[] };
  numbersHeading: string;
  team: {
    heading: string;
    subhead: string;
    paragraph: string;
    closing: string;
    members: TeamMember[];
  };
}

const ABOUT_CONTENT: Record<Locale, AboutContent> = {
  en: {
    vision: {
      eyebrow: 'OUR VISION',
      text: 'To be the Leading Career Services Platform in the MENA Region',
    },
    mission: {
      eyebrow: 'OUR MISSION',
      text: 'Innovatively Enhance Youth Employability by Connecting Them with the Right Career Resources',
    },
    whoAreWe: {
      eyebrow: 'WHO ARE WE?',
      paragraph:
        'iCareer is an education-for-employment company. We offer early talents different programs and services that helps enhance their employability. We work with employers, universities, governmental sector, and NGOs, to create programs with impact on youth with our tech-enabled services.',
      playVideoLabel: 'Play Video',
      videoUrl:
        'https://8e2e4e7fa32bc9cc778010c2b1701a7a.cdn.bubble.io/f1721205893276x915417476974803000/iCareer%20Animation%20Video_1%20%281%29.mp4',
    },
    values: {
      eyebrow: 'OUR VALUES',
      items: ['El Value', 'Ownership', 'Continuous improvement', 'Winning together', 'Innovation'],
    },
    numbersHeading: 'iCareer in Numbers',
    team: {
      heading: 'Meet Our Team',
      subhead: "What's our secret? Great people",
      paragraph:
        'iCareer team is on a daily quest to create impact for all of our customers. We act as a focal point between youth, universities, employers, and NGOs and help each to overcome their challenges',
      closing: 'And how do we do all this? With our passionate team!',
      members: [
        { name: 'Akram Marwan', role: 'CEO & Managing Director' },
        { name: 'Ahmed Mamdouh', role: 'Programs & Operations Manager' },
        { name: 'Muhammad Elsherbiny', role: 'Senior Software Developer' },
        { name: 'Nadine Kamal', role: 'Marketing Lead' },
      ],
    },
  },
  ar: {
    vision: {
      eyebrow: 'رؤيتنا',
      text: 'أن نكون المنصة الرائدة للخدمات المهنية في منطقة الشرق الأوسط وشمال أفريقيا',
    },
    mission: {
      eyebrow: 'رسالتنا',
      text: 'تعزيز فرص توظيف الشباب بطرق مبتكرة عبر ربطهم بالموارد المهنية المناسبة',
    },
    whoAreWe: {
      eyebrow: 'من نحن؟',
      paragraph:
        'iCareer شركة متخصصة في التعليم من أجل التوظيف. نقدّم للمواهب الشابة برامج وخدمات متنوعة تساعد على تعزيز فرص توظيفهم. نعمل مع أصحاب العمل والجامعات والقطاع الحكومي والمنظمات غير الحكومية لإنشاء برامج ذات أثر ملموس على الشباب من خلال خدماتنا التقنية.',
      playVideoLabel: 'تشغيل الفيديو',
      videoUrl:
        'https://8e2e4e7fa32bc9cc778010c2b1701a7a.cdn.bubble.io/f1721205893276x915417476974803000/iCareer%20Animation%20Video_1%20%281%29.mp4',
    },
    values: {
      eyebrow: 'قيمنا',
      items: ['القيمة', 'الملكية', 'التحسين المستمر', 'الفوز معًا', 'الابتكار'],
    },
    numbersHeading: 'iCareer بالأرقام',
    team: {
      heading: 'تعرّف على فريقنا',
      subhead: 'ما سرّنا؟ أشخاص رائعون',
      paragraph:
        'يسعى فريق iCareer يوميًا لتحقيق أثر إيجابي لجميع عملائنا. نعمل كحلقة وصل بين الشباب والجامعات وأصحاب العمل والمنظمات غير الحكومية، ونساعد كل طرف على تجاوز تحدياته',
      closing: 'وكيف نحقق كل هذا؟ بفضل فريقنا الشغوف!',
      members: [
        { name: 'أكرم مروان', role: 'الرئيس التنفيذي والمدير العام' },
        { name: 'أحمد ممدوح', role: 'مدير البرامج والعمليات' },
        { name: 'محمد الشربيني', role: 'مطور برمجيات أول' },
        { name: 'ناردين كمال', role: 'رئيسة قسم التسويق' },
      ],
    },
  },
};

export function getAboutContent(locale: Locale): AboutContent {
  return ABOUT_CONTENT[locale];
}
