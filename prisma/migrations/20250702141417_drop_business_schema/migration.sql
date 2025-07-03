/*
  Warnings:

  - You are about to drop the column `businessId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Business` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "businessId";

-- DropTable
DROP TABLE "Business";
