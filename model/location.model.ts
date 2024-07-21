import { ObjectId } from "mongodb";

export interface CoordsModel {
  lat: number;
  lng: number;
}

export interface LocationSmallModel extends CoordsModel {
  country: string;
  city: string;
}
export interface LocationModel extends LocationSmallModel {
  _id?: string;
  countryCode: string;
  streetAddress: string;
  postalCode?: string;
  entrance?: string;
  apt?: string;
  house?: string;
  [key: string]: string | number | undefined;
}

export type LocationModelKeys = keyof LocationModel;

export interface LocationSchema {
  _id?: ObjectId;
  country: string;
  countryCode: string;
  city: string;
  streetAddress: string;
  postalCode?: string;
  entrance?: string;
  apt?: string;
  house?: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}
