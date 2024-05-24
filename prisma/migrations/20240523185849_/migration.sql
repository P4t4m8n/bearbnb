/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Location` table. All the data in the column will be lost.
  - Added the required column `lat` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropExtension
DROP EXTENSION "postgis";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.3.2";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "coordinates",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;
