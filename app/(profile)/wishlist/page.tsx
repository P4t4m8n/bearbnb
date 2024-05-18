import WishlistIndex from "@/components/ui/Profile/Wishlist/WishlistIndex";

export default async function Wishlist({
  searchParams,
}: {
  searchParams: { userId: string; authId: string };
}) {
  const { userId } = searchParams;

  return <WishlistIndex userId={userId} />;
}
