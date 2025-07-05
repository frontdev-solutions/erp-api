/*
  Warnings:

  - You are about to drop the column `isManual` on the `Unit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "isManual";

-- AlterTable
ALTER TABLE "UnitConversion" ADD COLUMN     "isManual" BOOLEAN NOT NULL DEFAULT false;
