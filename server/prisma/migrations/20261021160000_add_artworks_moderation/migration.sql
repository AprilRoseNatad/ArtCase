-- CreateEnum
CREATE TYPE "public"."ArtworkCategory" AS ENUM ('DIGITAL', 'TRADITIONAL', 'GRAPHIC', 'AI', 'FANART', 'THREE_D', 'PIXEL');

-- CreateEnum
CREATE TYPE "public"."ArtworkStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'HIDDEN');

-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'ADMIN';

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "public"."Artwork" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "imageUrl" TEXT NOT NULL,
    "category" "public"."ArtworkCategory" NOT NULL,
    "status" "public"."ArtworkStatus" NOT NULL DEFAULT 'PENDING',
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "moderationReason" VARCHAR(1000),
    "reviewedAt" TIMESTAMP(3),
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Artwork_creatorId_idx" ON "public"."Artwork"("creatorId" ASC);

-- CreateIndex
CREATE INDEX "Artwork_reviewedById_idx" ON "public"."Artwork"("reviewedById" ASC);

-- CreateIndex
CREATE INDEX "Artwork_status_isPublic_createdAt_idx" ON "public"."Artwork"("status" ASC, "isPublic" ASC, "createdAt" ASC);

-- AddForeignKey
ALTER TABLE "public"."Artwork" ADD CONSTRAINT "Artwork_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Artwork" ADD CONSTRAINT "Artwork_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
