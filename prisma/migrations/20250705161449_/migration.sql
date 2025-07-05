/*
  Warnings:

  - You are about to drop the column `displayName` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `Unit` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Warehouse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Unit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sureName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Role_displayName_key";

-- DropIndex
DROP INDEX "Unit_name_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "displayName",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Unit" DROP COLUMN "displayName",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "sureName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Warehouse" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_code_key" ON "Category"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_code_key" ON "Unit"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Warehouse_code_key" ON "Warehouse"("code");
