-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "FormFieldType" AS ENUM ('SHORT_TEXT', 'LONG_TEXT', 'EMAIL', 'PHONE', 'NUMBER', 'DROPDOWN', 'CHECKBOXES', 'YES_NO', 'DATE', 'FILE');

-- CreateEnum
CREATE TYPE "ReferralCodeType" AS ENUM ('PERSONAL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ReferralEventType" AS ENUM ('CLICK', 'SIGNUP', 'APPLICATION');

-- AlterTable
ALTER TABLE "HubUser" ADD COLUMN     "referredByCodeId" TEXT;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "formId" TEXT;

-- AlterTable
ALTER TABLE "ProgramApplication" ADD COLUMN     "answers" JSONB,
ADD COLUMN     "attendedAt" TIMESTAMP(3),
ADD COLUMN     "referralCodeId" TEXT,
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateTable
CREATE TABLE "ProgramForm" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramFormField" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "FormFieldType" NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" TEXT[],
    "order" INTEGER NOT NULL,

    CONSTRAINT "ProgramFormField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "ReferralCodeType" NOT NULL,
    "label" TEXT,
    "programId" TEXT NOT NULL,
    "ownerHubUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralEvent" (
    "id" TEXT NOT NULL,
    "referralCodeId" TEXT NOT NULL,
    "type" "ReferralEventType" NOT NULL,
    "hubUserId" TEXT,
    "programApplicationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_ownerHubUserId_programId_key" ON "ReferralCode"("ownerHubUserId", "programId");

-- AddForeignKey
ALTER TABLE "HubUser" ADD CONSTRAINT "HubUser_referredByCodeId_fkey" FOREIGN KEY ("referredByCodeId") REFERENCES "ReferralCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_formId_fkey" FOREIGN KEY ("formId") REFERENCES "ProgramForm"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramApplication" ADD CONSTRAINT "ProgramApplication_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "ReferralCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramFormField" ADD CONSTRAINT "ProgramFormField_formId_fkey" FOREIGN KEY ("formId") REFERENCES "ProgramForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_ownerHubUserId_fkey" FOREIGN KEY ("ownerHubUserId") REFERENCES "HubUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralEvent" ADD CONSTRAINT "ReferralEvent_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "ReferralCode"("id") ON DELETE CASCADE ON UPDATE CASCADE;
