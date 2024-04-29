/*
  Warnings:

  - You are about to drop the column `roomId` on the `Bed` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_roomId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_stayId_fkey";

-- AlterTable
ALTER TABLE "Bed" DROP COLUMN "roomId";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "stayId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_BedToRoom" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BedToRoom_AB_unique" ON "_BedToRoom"("A", "B");

-- CreateIndex
CREATE INDEX "_BedToRoom_B_index" ON "_BedToRoom"("B");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BedToRoom" ADD CONSTRAINT "_BedToRoom_A_fkey" FOREIGN KEY ("A") REFERENCES "Bed"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BedToRoom" ADD CONSTRAINT "_BedToRoom_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
