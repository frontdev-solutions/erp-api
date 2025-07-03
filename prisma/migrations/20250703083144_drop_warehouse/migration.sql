/*
  Warnings:

  - You are about to drop the column `warehouseId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Warehouse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_warehouseId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "warehouseId";

-- DropTable
DROP TABLE "Warehouse";
