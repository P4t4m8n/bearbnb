/*
  Warnings:

  - You are about to drop the `Bed` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Amenities" AS ENUM ('Wifi', 'Heating', 'AirConditioning', 'Washer', 'Dryer', 'Iron', 'Essentials', 'HotWater', 'TV', 'Refrigerator', 'Microwave', 'CoffeeMaker', 'CookingBasics', 'Oven', 'Stove', 'Dishwasher', 'DishesAndSilverware', 'Kitchen', 'SmokeAlarm', 'CarbonMonoxideAlarm', 'FirstAidKit', 'FireExtinguisher', 'BedroomLock', 'HighChair', 'BabySafetyGates', 'BabysitterRecommendations', 'FreeParkingOnPremises', 'PaidParkingOffPremises', 'PaidParkingOnPremises', 'Elevator', 'WheelchairAccessible', 'BbqGrill', 'PatioOrBalcony', 'GardenOrBackyard', 'PrivateEntrance', 'Gym', 'Pool', 'HotTub', 'Sauna', 'LongTermStaysAllowed', 'LuggageDropoffAllowed', 'CleaningBeforeCheckout', 'PetsAllowed', 'BoardGames', 'BooksAndReadingMaterial', 'SmartTV', 'DedicatedWorkspace');

-- CreateEnum
CREATE TYPE "AmenitiesType" AS ENUM ('Basic', 'Kitchen', 'Safety', 'Family', 'Parking_and_Accessibility', 'Outdoor', 'Fitness', 'Additional', 'Pets', 'Entertainment');

-- DropForeignKey
ALTER TABLE "Bed" DROP CONSTRAINT "Bed_bedRoomId_fkey";

-- AlterTable
ALTER TABLE "BedRoom" ADD COLUMN     "beds" "Beds"[];

-- DropTable
DROP TABLE "Bed";

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "stayId" TEXT,
    "userId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "bookingTIme" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
