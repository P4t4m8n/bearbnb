"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import StayPreviewSkeleton from "../skeletons/StayPreviewSkeleton/StayPreviewSkeleton";
import { getSmallStaysJSX } from "@/actions/stay.action";

let page = 2;

export default function LoadMore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stays, setStays] = useState<React.JSX.Element[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries()) as any;

    const container = containerRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            setLoading(true);
            const _stays = await getSmallStaysJSX(params, page);
            if (!_stays || !_stays.length) {
              observer.unobserve(container);
              observer.disconnect();
              setLoading(false);
              return;
            }
            if (_stays)
              setStays((prev) => {
                return [...prev, ..._stays];
              });
            page++;
            setLoading(false);
            // if (!_stays || _stays.length < 8) page = 1;
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
  }, []);

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
