export type Role = 'ADMIN' | 'USER';
export type Gender = 'MALE' | 'FEMALE';
export type StudentStatus = 'STUDENT' | 'GRADUATE';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

export interface PublicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  nationality: string;
  birthday: string;
  gender: Gender;
  studentStatus: StudentStatus;
  university: string;
  graduationYear: number;
  faculty: string;
  createdAt: string;
}

export type ResetRequestStatus = 'PENDING' | 'RESOLVED';

export interface PasswordResetRequestSummary {
  id: string;
  status: ResetRequestStatus;
  createdAt: string;
  resolvedAt: string | null;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

// --- iCareer Hub -------------------------------------------------------

export interface HubAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  kind: 'hub';
}

export interface PublicHubUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  governorate: string;
  birthday: string;
  gender: Gender;
  studentStatus: StudentStatus;
  university: string;
  faculty: string;
  createdAt: string;
}

export interface ProgramPhase {
  title: string;
  description: string;
}

export type ImageAspect = '16:6' | '16:9' | '1:1';

export interface PublicProgram {
  id: string;
  slug: string;
  title: string;
  subtitleEn: string;
  subtitleAr: string | null;
  logoUrl: string;
  imageAspect: ImageAspect;
  aboutBody: string;
  phases: ProgramPhase[];
  benefits: string[];
  criteria: string[];
  partnerName: string;
  partnerBio: string;
  partnerLogoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramInput {
  slug: string;
  title: string;
  subtitleEn: string;
  subtitleAr: string | null;
  logoUrl: string;
  imageAspect: ImageAspect;
  aboutBody: string;
  phases: ProgramPhase[];
  benefits: string[];
  criteria: string[];
  partnerName: string;
  partnerBio: string;
  partnerLogoUrl: string | null;
}

export type ArticleCategory = 'CAREER_HACKS' | 'JOB_SEARCH' | 'DAY_IN_THE_LIFE' | 'GUIDE';

export interface PublicArticle {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  body: string;
  publishedAt: string;
}

export type EventType =
  | 'INFO_SESSION'
  | 'TRAINING'
  | 'WORKSHOP'
  | 'CAREER_DAY'
  | 'RECRUITMENT_DAY'
  | 'EMPLOYER_CIRCLE'
  | 'CAREER_ADVISING'
  | 'CAREER_TALK'
  | 'EMPLOYMENT_FAIR'
  | 'MENTORSHIP_CIRCLE'
  | 'CAREER_WEEK'
  | 'OTHER';

export interface PublicEvent {
  id: string;
  slug: string;
  title: string;
  type: EventType;
  startsAt: string;
  location: string;
  body: string;
}

export interface EmployerAuthUser {
  id: string;
  email: string;
  fullName: string;
  companyId: string;
  companyName: string;
  kind: 'employer';
}

export interface PublicCompany {
  id: string;
  name: string;
  numberOfEmployees: string;
  industry: string;
  type: string;
  description: string;
  address: string;
  benefits: string[];
  logoUrl: string | null;
  linkedinUrl: string | null;
  facebookUrl: string | null;
  websiteUrl: string | null;
  createdAt: string;
}
