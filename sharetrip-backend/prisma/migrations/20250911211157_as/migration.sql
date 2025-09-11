/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Embedding` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhoneOtp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Story` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Embedding" DROP CONSTRAINT "Embedding_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PhoneOtp" DROP CONSTRAINT "PhoneOtp_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Story" DROP CONSTRAINT "Story_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Story" DROP CONSTRAINT "Story_tourId_fkey";

-- DropTable
DROP TABLE "public"."AuditLog";

-- DropTable
DROP TABLE "public"."Embedding";

-- DropTable
DROP TABLE "public"."PhoneOtp";

-- DropTable
DROP TABLE "public"."Story";
