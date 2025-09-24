-- AlterTable
ALTER TABLE "public"."Accommodation" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Tour" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;
