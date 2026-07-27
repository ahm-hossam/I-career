-- CreateEnum
CREATE TYPE "ApplicationDecisionSource" AS ENUM ('AUTO', 'ADMIN');

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "acceptanceCriteria" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "ProgramApplication" ADD COLUMN     "decidedBy" "ApplicationDecisionSource";
