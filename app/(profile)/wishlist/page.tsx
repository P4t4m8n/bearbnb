import WishlistIndex from "@/components/ui/Profile/Wishlist/WishlistIndex";
import { getLikesByUser } from "@/service/like.server";
// import { serverSupabase } from "@/util/supabase/server";

export default async function Wishlist({
  searchParams,
}: {
  searchParams: { userId: string; authId: string };
}) {
  const { userId, authId } = searchParams;
  // const user = await serverSupabase.auth.getUser();

  // if (authId !== user.data.user?.id) {
  //   // console.log("authId:", authId);
  // }
  const likes = await getLikesByUser(userId);
  return <WishlistIndex userId={userId} />;
}
