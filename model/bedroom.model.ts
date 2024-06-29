export interface BedRoomModel {
  beds: Beds[];
  images: string[];
}
export type Beds = "double" | "single" | "crib";
