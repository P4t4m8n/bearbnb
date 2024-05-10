"use client";

import { useEffect, useRef, useState } from "react";
import { getSmallStays } from "@/service/stay.server";
import { useParams } from "next/navigation";
import { SearchBY } from "@/model/stay.model";
import StayPreviewSkeleton from "../skeletons/StayPreviewSkeleton/StayPreviewSkeleton";

let page = 1;

export default function LoadMore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stays, setStays] = useState<React.JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const { startDate, endDate, name } = useParams<{
    startDate: string;
    endDate: string;
    name: string;
  }>();

  const searchObj: SearchBY = {
    dates: {
      start: startDate ? new Date(startDate) : null,
      end: endDate ? new Date(endDate) : null,
    },
    priceRange: { start: 1, end: 999999999999 },
    location: "",
    name: name || "",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        async (entries) => {
          console.log("entries[0]:", entries[0]);
          if (entries[0].isIntersecting) {
            setLoading(true);
            const _stays = await getSmallStays(searchObj, page);
            if (_stays) setStays((prev) => [...prev, ..._stays]);
            page++;
            setLoading(false);
            if (!_stays || _stays.length < 8) page = 1;
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
  });

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