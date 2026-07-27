-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('YOUTH', 'EMPLOYERS', 'NGOS');

-- CreateTable
CREATE TABLE "ServiceProject" (
    "id" TEXT NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "linkUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceProject_category_order_idx" ON "ServiceProject"("category", "order");
