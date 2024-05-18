import ListingIndex from "@/components/ui/Profile/Listing/ListingIndex";

export default async function Listings({
  searchParams,
}: {
  searchParams: { userId: string; authId: string };
}) {
  const { userId } = searchParams;



  return <ListingIndex userId={userId} />;
}
