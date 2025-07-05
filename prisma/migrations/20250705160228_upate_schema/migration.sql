/*
  Warnings:

  - You are about to drop the column `location` on the `Warehouse` table. All the data in the column will be lost.
  - Added the required column `address` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TEXT,
ADD COLUMN     "birthPlace" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "joinAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Warehouse" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL;
