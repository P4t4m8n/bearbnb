/*
  Warnings:

  - You are about to drop the column `lat` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `lng` on the `Location` table. All the data in the column will be lost.
  - Added the required column `coordinantes` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.3.2";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "lat",
DROP COLUMN "lng",
ADD COLUMN     "coordinates" JSONB NOT NULL;
