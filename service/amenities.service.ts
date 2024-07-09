import {
  Amenity,
  EntertainmentAmenities,
  ScenicViewAmenities,
  BathroomAmenities,
  BedroomAndLaundryAmenities,
  EssentialsAmenities,
  KitchenAmenities,
  SafetyAmenities,
  ParkingAmenities,
  OutdoorAmenities,
  SpaAmenities,
  MiscellaneousAmenities,
} from "@/model/amenities.type";

export const entertainmentAmenities: EntertainmentAmenities[] = [
  "TV",
  "Smart TV",
];

export const scenicViewAmenities: ScenicViewAmenities[] = [
  "Sea view",
  "Mountain view",
  "Courtyard view",
];

export const bathroomAmenities: BathroomAmenities[] = [
  "Hair Dryer",
  "Hot Water",
];

export const bedroomAndLaundryAmenities: BedroomAndLaundryAmenities[] = [
  "Cleaning Products",
  "Washer",
  "Dryer",
  "Iron",
  "Essentials",
  "Bed Linens",
];

export const essentialsAmenities: EssentialsAmenities[] = [
  "Wifi",
  "Heating",
  "Air Conditioning",
];

export const kitchenAmenities: KitchenAmenities[] = [
  "Dishwasher",
  "Refrigerator",
  "Microwave",
  "Coffee Maker",
  "Cooking Basics",
  "Oven",
  "Stove",
  "Dishes And Silverware",
];

export const safetyAmenities: SafetyAmenities[] = [
  "Smoke Alarm",
  "Carbon Monoxide Alarm",
  "First Aid Kit",
  "Fire Extinguisher",
];

export const parkingAmenities: ParkingAmenities[] = [
  "Free Parking On Premises",
  "Paid Parking On Premises",
];

export const outdoorAmenities: OutdoorAmenities[] = [
  "BBQ",
  "Patio Or Balcony",
  "Garden Or Backyard",
  "Private Entrance",
  "Out door Dining Area",
];

export const spaAmenities: SpaAmenities[] = ["HotTub", "Sauna"];

export const miscellaneousAmenities: MiscellaneousAmenities[] = [
  "Sun Lounge",
  "Luggage Dropoff Allowed",
  "Dedicated Workspace",
  "Elevator",
  "High Chair",
];

export const allAmenities: Amenity[] = [
  ...entertainmentAmenities,
  ...scenicViewAmenities,
  ...bathroomAmenities,
  ...bedroomAndLaundryAmenities,
  ...essentialsAmenities,
  ...kitchenAmenities,
  ...safetyAmenities,
  ...parkingAmenities,
  ...outdoorAmenities,
  ...spaAmenities,
  ...miscellaneousAmenities,
];
