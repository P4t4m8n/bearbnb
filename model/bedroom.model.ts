export interface BedRoomModel {
  beds: Beds[];
  image: string;
}
export type Beds = "double" | "single" | "crib";
