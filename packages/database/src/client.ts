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
  ResetRequestStatus,
  Program,
  ProgramApplication,
  ApplicationStatus,
  ProgramForm,
  ProgramFormField,
  FormFieldType,
  ReferralCode,
  ReferralCodeType,
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
  Prisma,
} from './generated/prisma/index.js';
