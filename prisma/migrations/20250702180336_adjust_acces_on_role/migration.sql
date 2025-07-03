/*
  Warnings:

  - You are about to drop the column `roleId` on the `Access` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Access" DROP COLUMN "roleId";

-- AlterTable
ALTER TABLE "AccessesOnRole" ADD CONSTRAINT "AccessesOnRole_pkey" PRIMARY KEY ("accessId", "roleId");
