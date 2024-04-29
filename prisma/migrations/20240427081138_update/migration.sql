/*
  Warnings:

  - You are about to drop the column `rating` on the `Stay` table. All the data in the column will be lost.
  - Added the required column `svg` to the `Amenity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOwner` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerSince` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stay" DROP CONSTRAINT "Stay_hostId_fkey";

-- AlterTable
ALTER TABLE "Amenity" ADD COLUMN     "svg" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stay" DROP COLUMN "rating";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isOwner" BOOLEAN NOT NULL,
ADD COLUMN     "ownerSince" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Stay" ADD CONSTRAINT "Stay_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
