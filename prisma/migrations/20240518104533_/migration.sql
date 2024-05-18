/*
  Warnings:

  - Made the column `baths` on table `Stay` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stay" ALTER COLUMN "baths" SET NOT NULL,
ALTER COLUMN "baths" SET DEFAULT 0;
