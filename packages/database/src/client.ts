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
  HubUser,
  Program,
  ProgramApplication,
  Article,
  ArticleCategory,
  Event,
  EventType,
  Company,
  EmployerUser,
  Prisma,
} from './generated/prisma/index.js';
