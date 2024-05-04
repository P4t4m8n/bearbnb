/*
  Warnings:

  - You are about to drop the column `bookingTIme` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `adults` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bookingTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "bookingTIme",
ADD COLUMN     "adults" INTEGER NOT NULL,
ADD COLUMN     "bookingTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "children" INTEGER,
ADD COLUMN     "infants" INTEGER,
ADD COLUMN     "pets" INTEGER;
