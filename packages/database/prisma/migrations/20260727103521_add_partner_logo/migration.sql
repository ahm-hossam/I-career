-- CreateEnum
CREATE TYPE "PartnerLogoCategory" AS ENUM ('GOVERNMENTAL', 'ORGANIZATIONS', 'EMPLOYERS', 'UNIVERSITIES');

-- CreateTable
CREATE TABLE "PartnerLogo" (
    "id" TEXT NOT NULL,
    "category" "PartnerLogoCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "width" INTEGER NOT NULL DEFAULT 160,
    "height" INTEGER NOT NULL DEFAULT 64,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerLogo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PartnerLogo_category_order_idx" ON "PartnerLogo"("category", "order");
