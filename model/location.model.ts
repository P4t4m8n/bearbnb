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
  address: string;
}
