/*
  Warnings:

  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stay" DROP CONSTRAINT "Stay_locationId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Stay" ADD CONSTRAINT "Stay_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
