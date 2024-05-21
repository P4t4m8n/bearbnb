"use client";

import { useEffect, useRef, useState } from "react";
import { getSmallStaysJSX } from "@/service/stay.server";
import { useParams, useSearchParams } from "next/navigation";
import StayPreviewSkeleton from "../skeletons/StayPreviewSkeleton/StayPreviewSkeleton";
import { FilterByModel } from "@/model/filters.model";
import { useFilterStore } from "@/store/userFIlterStore";
import { LabelsType } from "@/model/labels.type";
import { get } from "http";
import { getEmptyFilter } from "@/service/stay.service";

let page = 1;

export default function LoadMore() {
  const containerRef = useRef<HTMLDivElement>(null);
  let filterBy: FilterByModel = getEmptyFilter();
  const [stays, setStays] = useState<React.JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    let labelText = searchParams.get("label") as LabelsType;
    if (labelText) {
      filterBy.label = labelText;
    }
    const container = containerRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
            const _stays = await getSmallStaysJSX(filterBy, page);
            if (_stays)
              setStays((prev) => {
                return [...prev, ..._stays];
              });
            page++;
            setLoading(false);
            if (!_stays || !_stays.length) {
              observer.disconnect();
            }
          }
        },
        {
          threshold: [1.0],
          rootMargin: "0px 0px 0px 0px",
        }
      );

      observer.observe(container);

      return () => {
        observer.unobserve(container);
        observer.disconnect();
      };
    }
  },[]);

  return (
    <>
      {stays && stays.length > 0 && stays}
      {loading &&
        new Array(8).fill(0).map((_, i) => <StayPreviewSkeleton key={i} />)}
      <div
        ref={containerRef}
        style={{
          height: "2px",
          opacity: "0",
          minWidth: "85vw",
          position: "absolute",
          bottom: "0",
        }}
      ></div>
    </>
  );
}
