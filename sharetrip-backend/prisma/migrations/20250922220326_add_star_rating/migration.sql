/*
  Warnings:

  - The `roomSize` column on the `Accommodation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Accommodation" ADD COLUMN     "starRating" JSONB,
DROP COLUMN "roomSize",
ADD COLUMN     "roomSize" JSONB;
