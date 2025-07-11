/*
  Warnings:

  - You are about to drop the column `username` on the `Vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Vendor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vendor_username_key";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");
