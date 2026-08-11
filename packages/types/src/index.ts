export type Role = 'ADMIN' | 'USER';
export type Gender = 'MALE' | 'FEMALE';
export type StudentStatus = 'STUDENT' | 'GRADUATE';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  kind: 'user';
}

export interface PublicUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  nationality: string;
  governorate: string;
  birthday: string;
  gender: Gender;
  studentStatus: StudentStatus;
  university: string;
  graduationYear: number;
  faculty: string;
  hasDisability: boolean;
  disabilityDetails: string | null;
  archived: boolean;
  createdAt: string;
}

export interface UserListItem extends PublicUser {
  applicationsCount: number;
  attendedCount: number;
}

export interface UserApplicationSummary {
  id: string;
  status: ApplicationStatus;
  attendedAt: string | null;
  createdAt: string;
  program: { id: string; slug: string; title: string };
}

export interface UserDetail extends PublicUser {
  applications: UserApplicationSummary[];
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

export interface ProgramPhase {
  title: string;
  description: string;
}

export interface ProgramSponsor {
  name: string;
  description: string;
  logoUrl: string;
}

export type ImageAspect = '16:6' | '16:9' | '1:1';

export interface ProgramAcceptanceCriteria {
  gender?: string[];
  nationality?: string[];
  governorate?: string[];
  studentStatus?: string[];
  university?: string[];
  faculty?: string[];
  hasDisability?: boolean[];
  minAge?: number;
  maxAge?: number;
}

export type ApplicationDecisionSource = 'AUTO' | 'ADMIN';

export type FormFieldType =
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'EMAIL'
  | 'PHONE'
  | 'NUMBER'
  | 'DROPDOWN'
  | 'CHECKBOXES'
  | 'YES_NO'
  | 'DATE'
  | 'FILE';

export interface ProgramFormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options: string[];
  order: number;
}

export interface PublicProgramForm {
  id: string;
  name: string;
  fields: ProgramFormField[];
  programCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramFormFieldInput {
  label: string;
  type: FormFieldType;
  required: boolean;
  options: string[];
}

export interface ProgramFormInput {
  name: string;
  fields: ProgramFormFieldInput[];
}

export interface PublicProgram {
  id: string;
  slug: string;
  title: string;
  subtitleEn: string;
  subtitleAr: string | null;
  logoUrl: string;
  imageAspect: ImageAspect;
  bannerFullWidth: boolean;
  aboutBody: string;
  phases: ProgramPhase[];
  benefits: string[];
  criteria: string[];
  partnerName: string;
  partnerBio: string;
  partnerLogoUrl: string | null;
  sponsors: ProgramSponsor[];
  acceptanceCriteria: ProgramAcceptanceCriteria;
  form: PublicProgramForm | null;
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
  bannerFullWidth: boolean;
  aboutBody: string;
  phases: ProgramPhase[];
  benefits: string[];
  criteria: string[];
  partnerName: string;
  partnerBio: string;
  partnerLogoUrl: string | null;
  sponsors: ProgramSponsor[];
  acceptanceCriteria: ProgramAcceptanceCriteria;
  formId: string | null;
}

export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface PublicProgramApplication {
  id: string;
  status: ApplicationStatus;
  decidedBy: ApplicationDecisionSource | null;
  rejectionReason: string | null;
  attendedAt: string | null;
  answers: Record<string, string | string[]> | null;
  createdAt: string;
  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    university: string;
    faculty: string;
    hasDisability: boolean;
    disabilityDetails: string | null;
  };
  referral: {
    code: string;
    label: string | null;
    type: ReferralCodeType;
  } | null;
}

export interface ApplicationListItem {
  id: string;
  status: ApplicationStatus;
  decidedBy: ApplicationDecisionSource | null;
  rejectionReason: string | null;
  attendedAt: string | null;
  createdAt: string;
  program: { id: string; slug: string; title: string };
  applicant: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    university: string;
    faculty: string;
    hasDisability: boolean;
    disabilityDetails: string | null;
    archived: boolean;
  };
  referral: {
    code: string;
    label: string | null;
    type: ReferralCodeType;
  } | null;
}

export interface MyApplicationStatus {
  id: string;
  status: ApplicationStatus;
  rejectionReason: string | null;
  attendedAt: string | null;
  createdAt: string;
}

export type ReferralCodeType = 'PERSONAL' | 'CUSTOM';
export type ReferralSource = 'FACEBOOK' | 'INSTAGRAM' | 'GOOGLE' | 'EMAIL' | 'OTHER';

export interface PublicReferralCode {
  id: string;
  code: string;
  type: ReferralCodeType;
  label: string | null;
  source: ReferralSource;
  campaignName: string | null;
  ownerName: string | null;
  clicks: number;
  signups: number;
  applications: number;
  accepted: number;
  rejected: number;
  attended: number;
  createdAt: string;
}

export interface CampaignProgramBreakdown {
  program: { id: string; slug: string; title: string };
  count: number;
}

export interface CampaignSummary extends PublicReferralCode {
  program: { id: string; slug: string; title: string } | null;
  url: string;
  programBreakdown: CampaignProgramBreakdown[];
}

export interface CreateReferralCodeInput {
  code: string;
  label: string;
  source: ReferralSource;
  campaignName?: string;
}

export interface ProgramFunnelSummary {
  clicks: number;
  signups: number;
  applications: number;
  organicApplications: number;
  accepted: number;
  rejected: number;
  attended: number;
}

export interface ProgramReferralOverview {
  summary: ProgramFunnelSummary;
  codes: PublicReferralCode[];
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

export type DashboardUserRole = 'ADMIN';

export interface DashboardAuthUser {
  id: string;
  email: string;
  name: string;
  role: DashboardUserRole;
  kind: 'dashboard';
}

export interface PublicDashboardUser {
  id: string;
  name: string;
  email: string;
  role: DashboardUserRole;
  active: boolean;
  createdAt: string;
}

export interface DashboardUserInput {
  name: string;
  email: string;
  role: DashboardUserRole;
}

export type PartnerLogoCategory = 'GOVERNMENTAL' | 'ORGANIZATIONS' | 'EMPLOYERS' | 'UNIVERSITIES';

export interface PublicPartnerLogo {
  id: string;
  category: PartnerLogoCategory;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
  order: number;
}

export interface PartnerLogoInput {
  category: PartnerLogoCategory;
  name: string;
  imageUrl: string;
  width: number;
  height: number;
}

export type ServiceCategory = 'YOUTH' | 'EMPLOYERS' | 'NGOS';

export interface PublicServiceProject {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  logoUrl: string;
  linkUrl: string | null;
  order: number;
}

export interface ServiceProjectInput {
  category: ServiceCategory;
  name: string;
  description: string;
  logoUrl: string;
  linkUrl?: string;
}

export type ContactSubmissionStatus = 'NEW' | 'READ' | 'RESOLVED';

export interface ContactSubmissionListItem {
  id: string;
  name: string;
  email: string;
  message: string;
  audience: string | null;
  service: string | null;
  status: ContactSubmissionStatus;
  createdAt: string;
}

export interface ContactSubmissionInput {
  name: string;
  email: string;
  message: string;
  audience?: string;
  service?: string;
}
