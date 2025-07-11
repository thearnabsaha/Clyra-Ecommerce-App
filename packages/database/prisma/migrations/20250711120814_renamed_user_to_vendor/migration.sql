/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_username_key" ON "Vendor"("username");

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
