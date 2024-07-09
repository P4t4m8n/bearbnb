export type EntertainmentAmenities = "TV" | "Smart TV";

export type ScenicViewAmenities =
  | "Sea view"
  | "Mountain view"
  | "Courtyard view";

export type BathroomAmenities = "Hair Dryer" | "Hot Water";

export type BedroomAndLaundryAmenities =
  | "Cleaning Products"
  | "Washer"
  | "Dryer"
  | "Iron"
  | "Essentials"
  | "Bed Linens";

export type EssentialsAmenities = "Wifi" | "Heating" | "Air Conditioning";

export type KitchenAmenities =
  | "Dishwasher"
  | "Refrigerator"
  | "Microwave"
  | "Coffee Maker"
  | "Cooking Basics"
  | "Oven"
  | "Stove"
  | "Dishes And Silverware";

export type SafetyAmenities =
  | "Smoke Alarm"
  | "Carbon Monoxide Alarm"
  | "First Aid Kit"
  | "Fire Extinguisher";

export type ParkingAmenities =
  | "Free Parking On Premises"
  | "Paid Parking On Premises";

export type OutdoorAmenities =
  | "BBQ"
  | "Patio Or Balcony"
  | "Garden Or Backyard"
  | "Private Entrance"
  | "Out door Dining Area";

export type SpaAmenities = "HotTub" | "Sauna";

export type MiscellaneousAmenities =
  | "Sun Lounge"
  | "Luggage Dropoff Allowed"
  | "Dedicated Workspace"
  | "Elevator"
  | "High Chair"
  |"Early Check-in"

export type Amenity =
  | EntertainmentAmenities
  | ScenicViewAmenities
  | BathroomAmenities
  | BedroomAndLaundryAmenities
  | EssentialsAmenities
  | KitchenAmenities
  | SafetyAmenities
  | ParkingAmenities
  | OutdoorAmenities
  | SpaAmenities
  | MiscellaneousAmenities;
