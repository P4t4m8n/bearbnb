"use server";
import { getSmallStays } from "@/actions/stay.action";
import SearchPageMap from "@/components/SearchPage/SearchPageMap/SearchPageMap";
import SearchStayList from "@/components/SearchPage/SearchStayList/SearchStayList";
import { SearchParamsModel } from "@/model/filters.model";
import { calculateDaysBetweenDates } from "@/service/stay.service";
import styles from "./StaySearchPage.module.scss";

interface Props {
  searchParams: SearchParamsModel;
}
export default async function StaySearchPage({ searchParams }: Props) {
  const stays = await getSmallStays(searchParams);

  let lat = 0;
  let lng = 0;

  if (searchParams?.location) {
    [lat, lng] = searchParams?.location.split(",").map(Number);
  }

  const daysAmount = calculateDaysBetweenDates(
    searchParams.startDate,
    searchParams.endDate
  );
  return (
    <section className={styles.searchPage}>
      <SearchStayList stays={stays} daysAmount={daysAmount} />
      <SearchPageMap location={{ lat, lng }} stays={stays} />
    </section>
  );
}
