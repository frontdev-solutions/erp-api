/*
  Warnings:

  - The primary key for the `AccessesOnRole` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "AccessesOnRole" DROP CONSTRAINT "AccessesOnRole_pkey";
