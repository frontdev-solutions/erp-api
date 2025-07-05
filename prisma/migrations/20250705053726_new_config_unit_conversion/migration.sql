-- AlterTable
ALTER TABLE "UnitConversion" ADD COLUMN     "description" TEXT,
ADD COLUMN     "isManual" BOOLEAN NOT NULL DEFAULT false;
