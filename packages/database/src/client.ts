import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from './generated/prisma/index.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma = new PrismaClient({ adapter });

export type {
  User,
  PasswordResetRequest,
  Role,
  Gender,
  StudentStatus,
  EmploymentStatus,
  ResetRequestStatus,
  Program,
  ProgramApplication,
  ApplicationStatus,
  ApplicationDecisionSource,
  ProgramForm,
  ProgramFormField,
  FormFieldType,
  ReferralCode,
  ReferralCodeType,
  ReferralSource,
  ReferralEvent,
  ReferralEventType,
  Article,
  ArticleCategory,
  Event,
  EventType,
  Company,
  EmployerUser,
  DashboardUser,
  DashboardUserRole,
  PartnerLogo,
  PartnerLogoCategory,
  ContactSubmission,
  ContactSubmissionStatus,
  ServiceCategory,
  ServiceProject,
  Prisma,
} from './generated/prisma/index.js';
