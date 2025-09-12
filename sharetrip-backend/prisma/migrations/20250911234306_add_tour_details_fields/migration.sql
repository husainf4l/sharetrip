-- AlterTable
ALTER TABLE "public"."Tour" ADD COLUMN     "ageRestriction" INTEGER,
ADD COLUMN     "difficulty" TEXT,
ADD COLUMN     "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "itinerary" TEXT,
ADD COLUMN     "requirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "whatsExcluded" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "whatsIncluded" TEXT[] DEFAULT ARRAY[]::TEXT[];
