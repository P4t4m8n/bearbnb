/*
  Warnings:

  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BedToRoom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `bedRoomId` to the `Bed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_stayId_fkey";

-- DropForeignKey
ALTER TABLE "_BedToRoom" DROP CONSTRAINT "_BedToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_BedToRoom" DROP CONSTRAINT "_BedToRoom_B_fkey";

-- AlterTable
ALTER TABLE "Bed" ADD COLUMN     "bedRoomId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stay" ADD COLUMN     "baths" INTEGER,
ADD COLUMN     "uniqueRooms" TEXT[],
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "_BedToRoom";

-- CreateTable
CREATE TABLE "BedRoom" (
    "id" TEXT NOT NULL,
    "stayId" TEXT NOT NULL,

    CONSTRAINT "BedRoom_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BedRoom" ADD CONSTRAINT "BedRoom_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bed" ADD CONSTRAINT "Bed_bedRoomId_fkey" FOREIGN KEY ("bedRoomId") REFERENCES "BedRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "BedRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
