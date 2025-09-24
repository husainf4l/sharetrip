-- AlterTable
ALTER TABLE "public"."Accommodation" ADD COLUMN     "cancellationPolicy" TEXT,
ADD COLUMN     "checkInOutTimes" JSONB,
ADD COLUMN     "languagesSpoken" JSONB,
ADD COLUMN     "neighborhoodHighlights" JSONB,
ADD COLUMN     "roomSize" TEXT,
ADD COLUMN     "roomTypes" JSONB,
ADD COLUMN     "safetyCompliance" JSONB;
