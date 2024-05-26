/*
  Warnings:

  - You are about to drop the column `rate` on the `Review` table. All the data in the column will be lost.
  - Added the required column `accuracy` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `checkIn` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cleanliness` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `communication` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overallRating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "rate",
ADD COLUMN     "accuracy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "checkIn" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "cleanliness" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "communication" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "location" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "overallRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
