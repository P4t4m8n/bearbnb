import MyStayList from "@/components/ui/Profile/MyStays/MyStayList/MyStayList";
import { getSmallStays } from "@/service/stay.server";

export default async function Stays({ searchParams }: { searchParams: any }) {
  const { userId } = searchParams;

  return <MyStayList userId={userId} />;
}
