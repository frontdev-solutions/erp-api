/*
  Warnings:

  - You are about to drop the column `longtitude` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `longtitude` on the `VisitOnClient` table. All the data in the column will be lost.
  - Added the required column `longitude` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `VisitOnClient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "VisitOnClient" DROP COLUMN "longtitude",
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
