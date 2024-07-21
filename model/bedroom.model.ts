export interface BedRoomModel {
  beds: BedsTypes[];
  image: string;
}

export const bedsType = ["double", "single", "crib"];
export type BedsTypes = (typeof bedsType)[number];
