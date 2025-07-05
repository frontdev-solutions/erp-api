/*
  Warnings:

  - You are about to drop the column `baseUnitId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `smallestUnitId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_baseUnitId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "baseUnitId",
ADD COLUMN     "smallestUnitId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_smallestUnitId_fkey" FOREIGN KEY ("smallestUnitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
