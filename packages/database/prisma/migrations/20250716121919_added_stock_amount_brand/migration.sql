/*
  Warnings:

  - Added the required column `StockAmount` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brand` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "StockAmount" INTEGER NOT NULL,
ADD COLUMN     "brand" TEXT NOT NULL;
