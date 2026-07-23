-- DropForeignKey
ALTER TABLE "HubUser" DROP CONSTRAINT "HubUser_referredByCodeId_fkey";

-- DropForeignKey
ALTER TABLE "ProgramApplication" DROP CONSTRAINT "ProgramApplication_hubUserId_fkey";

-- DropForeignKey
ALTER TABLE "ReferralCode" DROP CONSTRAINT "ReferralCode_ownerHubUserId_fkey";

-- DropIndex
DROP INDEX "ProgramApplication_hubUserId_programId_key";

-- DropIndex
DROP INDEX "ReferralCode_ownerHubUserId_programId_key";

-- AlterTable
ALTER TABLE "ProgramApplication" DROP COLUMN "hubUserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ReferralCode" DROP COLUMN "ownerHubUserId",
ADD COLUMN     "ownerUserId" TEXT;

-- AlterTable
ALTER TABLE "ReferralEvent" DROP COLUMN "hubUserId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
-- `governorate` backfilled with a placeholder for the 2 existing dev rows (both Egyptian test accounts) since the column is required going forward.
ALTER TABLE "User" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "governorate" TEXT NOT NULL DEFAULT 'Cairo',
ADD COLUMN     "referredByCodeId" TEXT;

ALTER TABLE "User" ALTER COLUMN "governorate" DROP DEFAULT;

-- DropTable
DROP TABLE "HubUser";

-- CreateIndex
CREATE UNIQUE INDEX "ProgramApplication_userId_programId_key" ON "ProgramApplication"("userId", "programId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_ownerUserId_programId_key" ON "ReferralCode"("ownerUserId", "programId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_referredByCodeId_fkey" FOREIGN KEY ("referredByCodeId") REFERENCES "ReferralCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramApplication" ADD CONSTRAINT "ProgramApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_ownerUserId_fkey" FOREIGN KEY ("ownerUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
