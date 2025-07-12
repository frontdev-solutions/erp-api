/*
  Warnings:

  - Added the required column `latitude` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longtitude` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longtitude" DOUBLE PRECISION NOT NULL;
