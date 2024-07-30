export interface BedRoomModel {
  beds: BedsTypes[];
  image: string;
}

export interface BedroomMap {
  [key: string]: number;
}

export interface BedRoomMapDTO {
  icons: BedsTypes[];
  image: string;  
  description: string;
}

export const bedsType = [
  "double",
  "single",
  "crib",
  "king",
  "queen",
  "sofa",
  "bunk",
];
export type BedsTypes = (typeof bedsType)[number];
