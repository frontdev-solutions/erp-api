/*
  Warnings:

  - Added the required column `displayName` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "displayName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "active" SET DEFAULT false;
