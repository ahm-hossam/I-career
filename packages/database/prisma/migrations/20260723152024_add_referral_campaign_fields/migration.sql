-- CreateEnum
CREATE TYPE "ReferralSource" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'GOOGLE', 'EMAIL', 'OTHER');

-- AlterTable
ALTER TABLE "ReferralCode" ADD COLUMN     "campaignName" TEXT,
ADD COLUMN     "source" "ReferralSource" NOT NULL DEFAULT 'OTHER';
