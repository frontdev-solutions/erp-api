/*
  Warnings:

  - You are about to drop the column `isManual` on the `UnitConversion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "isManual" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "UnitConversion" DROP COLUMN "isManual";
