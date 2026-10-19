-- Rename the existing status enum instead of dropping it.
-- This preserves existing RoleRequest.status values.
ALTER TYPE "RequestStatus" RENAME TO "RoleRequestStatus";

-- Rename the existing Contest column instead of dropping/recreating it.
-- This preserves existing organizer/coordinator references.
ALTER TABLE "Contest"
RENAME COLUMN "organizerId" TO "coordinatorId";

-- Rename the foreign-key constraint to match the new Prisma field name.
ALTER TABLE "Contest"
RENAME CONSTRAINT "Contest_organizerId_fkey"
TO "Contest_coordinatorId_fkey";

-- Remove the old RoleRequest timestamp.
ALTER TABLE "RoleRequest"
DROP COLUMN "updatedAt";

-- Add the new role-request information.
ALTER TABLE "RoleRequest"
ADD COLUMN "reason" TEXT,
ADD COLUMN "rejectionReason" TEXT,
ADD COLUMN "reviewedAt" TIMESTAMP(3),
ADD COLUMN "reviewedById" TEXT;

-- Add the reviewer relationship.
ALTER TABLE "RoleRequest"
ADD CONSTRAINT "RoleRequest_reviewedById_fkey"
FOREIGN KEY ("reviewedById")
REFERENCES "User"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;