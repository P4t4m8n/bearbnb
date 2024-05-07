-- CreateEnum
CREATE TYPE "Beds" AS ENUM ('double', 'single', 'crib');

-- CreateEnum
CREATE TYPE "Amenities" AS ENUM ('Wifi', 'Heating', 'AirConditioning', 'Washer', 'Dryer', 'Iron', 'Essentials', 'HotWater', 'TV', 'Refrigerator', 'Microwave', 'CoffeeMaker', 'CookingBasics', 'Oven', 'Stove', 'Dishwasher', 'DishesAndSilverware', 'Kitchen', 'SmokeAlarm', 'CarbonMonoxideAlarm', 'FirstAidKit', 'FireExtinguisher', 'BedroomLock', 'HighChair', 'BabySafetyGates', 'BabysitterRecommendations', 'FreeParkingOnPremises', 'PaidParkingOffPremises', 'PaidParkingOnPremises', 'Elevator', 'WheelchairAccessible', 'BbqGrill', 'PatioOrBalcony', 'GardenOrBackyard', 'PrivateEntrance', 'Gym', 'Pool', 'HotTub', 'Sauna', 'LongTermStaysAllowed', 'LuggageDropoffAllowed', 'CleaningBeforeCheckout', 'PetsAllowed', 'BoardGames', 'BooksAndReadingMaterial', 'SmartTV', 'DedicatedWorkspace');

-- CreateEnum
CREATE TYPE "AmenitiesType" AS ENUM ('Basic', 'Kitchen', 'Safety', 'Family', 'Parking_and_Accessibility', 'Outdoor', 'Fitness', 'Additional', 'Pets', 'Entertainment');

-- CreateTable
CREATE TABLE "Stay" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "baths" INTEGER,
    "uniqueRooms" TEXT[],
    "hostId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "Stay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "stayId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "rate" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "supabaseId" TEXT NOT NULL,
    "isOwner" BOOLEAN NOT NULL,
    "ownerSince" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amenity" (
    "id" TEXT NOT NULL,
    "name" "Amenities" NOT NULL,

    CONSTRAINT "Amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BedRoom" (
    "id" TEXT NOT NULL,
    "beds" "Beds"[],
    "stayId" TEXT NOT NULL,

    CONSTRAINT "BedRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Label" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stayId" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "stayId" TEXT,
    "roomId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "stayId" TEXT,
    "userId" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "adults" INTEGER NOT NULL,
    "children" INTEGER,
    "infants" INTEGER,
    "pets" INTEGER,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "bookingTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SvgIcon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "viewBox" TEXT NOT NULL,

    CONSTRAINT "SvgIcon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Highlight" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "iconId" INTEGER NOT NULL,
    "stayId" TEXT NOT NULL,

    CONSTRAINT "Highlight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_StayAmenities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_LabelToStay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Stay_locationId_key" ON "Stay"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_supabaseId_key" ON "User"("supabaseId");

-- CreateIndex
CREATE UNIQUE INDEX "_StayAmenities_AB_unique" ON "_StayAmenities"("A", "B");

-- CreateIndex
CREATE INDEX "_StayAmenities_B_index" ON "_StayAmenities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LabelToStay_AB_unique" ON "_LabelToStay"("A", "B");

-- CreateIndex
CREATE INDEX "_LabelToStay_B_index" ON "_LabelToStay"("B");

-- AddForeignKey
ALTER TABLE "Stay" ADD CONSTRAINT "Stay_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stay" ADD CONSTRAINT "Stay_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BedRoom" ADD CONSTRAINT "BedRoom_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "BedRoom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "SvgIcon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Highlight" ADD CONSTRAINT "Highlight_stayId_fkey" FOREIGN KEY ("stayId") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StayAmenities" ADD CONSTRAINT "_StayAmenities_A_fkey" FOREIGN KEY ("A") REFERENCES "Amenity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_StayAmenities" ADD CONSTRAINT "_StayAmenities_B_fkey" FOREIGN KEY ("B") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToStay" ADD CONSTRAINT "_LabelToStay_A_fkey" FOREIGN KEY ("A") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LabelToStay" ADD CONSTRAINT "_LabelToStay_B_fkey" FOREIGN KEY ("B") REFERENCES "Stay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
