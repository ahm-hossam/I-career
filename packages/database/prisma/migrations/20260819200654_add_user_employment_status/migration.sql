-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('FULL_TIME', 'PART_TIME', 'FREELANCE', 'PROJECT_BASED', 'INTERNSHIP', 'UNEMPLOYED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "employmentStatus" "EmploymentStatus";
