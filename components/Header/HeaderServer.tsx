"use server";
import "server-only";
import { getSmallAmenities } from "@/actions/amenities.action";
import { AmenitySmallModel } from "@/model/amenity.model";
import Header from "./Header";

export default async function HeaderServer() {
  const amenities: AmenitySmallModel[] = await getSmallAmenities();
  return <Header amenities={amenities} />;
}
