-- CreateTable
CREATE TABLE "Access" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "roleId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "AccessesOnRole" (
    "id" TEXT NOT NULL,
    "accessId" TEXT NOT NULL,
    "accessName" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Access_id_key" ON "Access"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AccessesOnRole_id_key" ON "AccessesOnRole"("id");

-- AddForeignKey
ALTER TABLE "AccessesOnRole" ADD CONSTRAINT "AccessesOnRole_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessesOnRole" ADD CONSTRAINT "AccessesOnRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
