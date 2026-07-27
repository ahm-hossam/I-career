import type { ServiceCategory } from '@i-career/types';

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

export const YOUTH_SERVICE: ServicePageData = {
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
};

export const EMPLOYERS_SERVICE: ServicePageData = {
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
};

export const NGOS_SERVICE: ServicePageData = {
  category: 'NGOS',
  breadcrumbLabel: 'NGOs',
  headlineText: 'SYNERGIZING FORCES FOR TRANSFORMATIVE CHANGE',
  headlineHighlight: 'SYNERGIZING',
  keywords: ['Virtual Career Center', 'Career Fair Summits'],
  approach: {
    heading: 'Employment Programs',
    body: 'We provide **Employment Programs** for NGOs, designed to create a dynamic matchmaking environment that aligns the needs of employers with the skills of job seekers, fostering collaborative opportunities for economic development and workforce growth.',
    ctaLabel: 'Send Email',
    icon: 'rocket',
  },
  sections: [
    {
      heading: 'Virtual Career Center (VCC)',
      body: 'The **Virtual Career Center (VCC)** is a one-stop platform that seamlessly integrates all stakeholders into a single, powerful server. This innovative solution empowers NGOs to efficiently track and support their beneficiaries, fostering a meaningful technological transformation.',
      icon: 'globe',
    },
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
};
