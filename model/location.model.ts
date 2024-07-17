export interface CoordsModel {
  lat: number;
  lng: number;
}

export interface LocationSmallModel extends CoordsModel {
  country: string;
  city: string;
}
export interface LocationModel extends LocationSmallModel {
  _id?: string; // ObjectId as string
  countryCode: string;
  streetAddress: string;
  postalCode?: string;
  entrance?: string;
  apt?: string;
  house?: string;
  [key: string]: string | number | undefined;
}

export type LocationModelKeys = keyof LocationModel;
