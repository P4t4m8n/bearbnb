/*
  Warnings:

  - You are about to drop the column `uniqueRooms` on the `Stay` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_stayId_fkey";

-- AlterTable
ALTER TABLE "BedRoom" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Stay" DROP COLUMN "uniqueRooms",
ADD COLUMN     "images" TEXT[],
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "summary" SET DEFAULT '';

-- DropTable
DROP TABLE "Image";
