/*
  Warnings:

  - The `birthDate` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `storeName` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "storeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
ADD COLUMN     "birthDate" TIMESTAMP(3);
