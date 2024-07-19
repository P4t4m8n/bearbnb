import { getStayById } from "@/actions/stay.action";
import { getEmptyStay } from "@/service/stay.service";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import StayEdit from "@/components/StayEdit/StayEdit";
import { getAmenities, getSmallAmenities } from "@/actions/amenities.action";

export default async function Page({
  searchParams,
}: {
  searchParams: { _id: string };
}) {
  const token = cookies().get("session")?.value;

  if (!token) {
    return redirect("/login");
  }

  let user: {
    userId: string;
    iat: number;
    exp: number;
  } | null = null;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET || "") as {
      userId: string;
      iat: number;
      exp: number;
    };
  } catch (error) {
    console.error("Invalid token", error);
    return redirect("/login");
  }

  let stay = getEmptyStay();
  const { _id } = searchParams;

  if (_id) {
    stay = await getStayById(_id);
    if (!stay) {
      console.error("Stay not found for ID:", _id);
      return redirect("/404");
    }
    if (user.userId !== stay.host._id) {
      console.error("Unauthorized access by user:", user.userId);
      return redirect("/403");
    }
  }
  const amenities = await getAmenities();

  //TODO add  filter for amenities for edit

  return <StayEdit stay={stay} dbAmenities={amenities} />;
}
