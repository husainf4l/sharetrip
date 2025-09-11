/*
  Warnings:

  - You are about to drop the column `ageRange` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerifiedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "ageRange",
DROP COLUMN "emailVerified",
DROP COLUMN "emailVerifiedAt",
DROP COLUMN "languages",
ALTER COLUMN "email" SET NOT NULL;
