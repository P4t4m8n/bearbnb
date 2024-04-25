"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "../service/util";
import { ChangeEvent } from "react";
import SearchSVG from "./svgs/search";

export default function StaySearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (ev: ChangeEvent) => {
    console.log("ev:", ev);
    const params = new URLSearchParams(searchParams);
    console.log("params:", params);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSearchDebounce = debounce(handleSearch, 2000);

  return (
    <div className="search">
      <input placeholder="search" onChange={(ev) => handleSearch}></input>
      <SearchSVG />
    </div>
  );
}
