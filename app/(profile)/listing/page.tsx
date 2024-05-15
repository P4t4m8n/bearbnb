import { getSmallStaysJSX } from "@/service/stay.server";
// import { serverSupabase } from "@/util/supabase/server";
import { getHostListing } from "@/service/booking.server";
import ListingIndex from "@/components/ui/Profile/Listing/ListingIndex";

export default async function Listings({
  searchParams,
}: {
  searchParams: { userId: string; authId: string };
}) {
  //check if the user is the same as the auth user
  const { userId, authId } = searchParams;
  // const user = await serverSupabase.auth.getUser();

  // if (authId !== user.data.user?.id) {
  //   // console.log("authId:", authId);
  // }


  return <ListingIndex userId={userId} />;
}
