-- AlterTable
ALTER TABLE "User" ADD COLUMN     "disabilityDetails" TEXT,
ADD COLUMN     "hasDisability" BOOLEAN NOT NULL DEFAULT false;
