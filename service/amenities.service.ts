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
  MiscellaneousAmenities,
} from "@/model/amenities.type";
import { AmenityModel, GroupedAmenities } from "@/model/amenity.model";

export const groupAmenitiesByCategory = (
  amenities: AmenityModel[]
): GroupedAmenities => {
  const groupedAmenities = amenities.reduce<GroupedAmenities>(
    (acc, amenity) => {
      if (!acc[amenity.category]) {
        acc[amenity.category] = [];
      }

      acc[amenity.category].push({
        name: amenity.name,
        _id: amenity._id,
        path: amenity.path,
        viewBox: amenity.viewBox,
      });

      return acc;
    },
    {}
  );

  Object.values(groupedAmenities).forEach((group) =>
    group.sort((a, b) => a.name.localeCompare(b.name))
  );

  return groupedAmenities;
};

//Constants for amenities
export const entertainmentAmenities: EntertainmentAmenities[] = [
  "TV",
  "Smart TV",
];

export const scenicViewAmenities: ScenicViewAmenities[] = [
  "Courtyard Views",
  "Mountain Views",
  "Sea Views",
];

export const bathroomAmenities: BathroomAmenities[] = [
  "Hair Dryer",
  "Hot Water",
  "HotTub",
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
  ...miscellaneousAmenities,
];
