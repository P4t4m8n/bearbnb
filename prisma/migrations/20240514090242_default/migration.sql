/*
  Warnings:

  - Made the column `children` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `infants` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pets` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "adults" SET DEFAULT 1,
ALTER COLUMN "children" SET NOT NULL,
ALTER COLUMN "children" SET DEFAULT 0,
ALTER COLUMN "infants" SET NOT NULL,
ALTER COLUMN "infants" SET DEFAULT 0,
ALTER COLUMN "pets" SET NOT NULL,
ALTER COLUMN "pets" SET DEFAULT 0;
