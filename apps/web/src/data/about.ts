import type { TeamMember } from '@/lib/content-types';

export const VISION = {
  eyebrow: 'OUR VISION',
  text: 'To be the Leading Career Services Platform in the MENA Region',
};

export const MISSION = {
  eyebrow: 'OUR MISSION',
  text: 'Innovatively Enhance Youth Employability by Connecting Them with the Right Career Resources',
};

export const WHO_ARE_WE = {
  eyebrow: 'WHO ARE WE?',
  paragraph:
    'iCareer is an education-for-employment company. We offer early talents different programs and services that helps enhance their employability. We work with employers, universities, governmental sector, and NGOs, to create programs with impact on youth with our tech-enabled services.',
  playVideoLabel: 'Play Video',
  videoUrl:
    'https://8e2e4e7fa32bc9cc778010c2b1701a7a.cdn.bubble.io/f1721205893276x915417476974803000/iCareer%20Animation%20Video_1%20%281%29.mp4',
};

export const VALUES = {
  eyebrow: 'OUR VALUES',
  items: ['El Value', 'Ownership', 'Continuous improvement', 'Winning together', 'Innovation'],
};

export const NUMBERS_HEADING = 'iCareer in Numbers';

export const TEAM = {
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
  ] satisfies TeamMember[],
};
