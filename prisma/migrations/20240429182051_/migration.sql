/*
  Warnings:

  - You are about to drop the `_AmenityToStay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AmenityToStay" DROP CONSTRAINT "_AmenityToStay_A_fkey";

-- DropForeignKey
ALTER TABLE "_AmenityToStay" DROP CONSTRAINT "_AmenityToStay_B_fkey";

-- DropTable
DROP TABLE "_AmenityToStay";

-- CreateTable
CREATE TABLE "_StayAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_StayAmenities_AB_unique" ON "_StayAmenities"("A", "B");

-- CreateIndex
CREATE INDEX "_StayAmenities_B_index" ON "_StayAmenities"("B");

-- AddForeignKey
ALTER TABLE "_StayAmenities" ADD CONSTRAINT "_StayAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StayAmenities" ADD CONSTRAINT "_StayAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
