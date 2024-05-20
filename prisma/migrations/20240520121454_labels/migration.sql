/*
  Warnings:

  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_LabelToStay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LabelToStay" DROP CONSTRAINT "_LabelToStay_A_fkey";

-- DropForeignKey
ALTER TABLE "_LabelToStay" DROP CONSTRAINT "_LabelToStay_B_fkey";

-- AlterTable
ALTER TABLE "Stay" ADD COLUMN     "labels" TEXT[];

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "_LabelToStay";
