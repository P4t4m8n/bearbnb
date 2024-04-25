"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function StayFilter() {
  const [currItems, setCurrItems] = useState([]);
  const svgArray = Array.from({ length: 50 });

  useEffect(() => {});

  const page = useRef(1);
  const itemsPerPage = 10;
  const paginate = (dir: number) => {};

  return (
    <div className="flex">
      <ul className="flex">
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
        <li>
          <Image src="/0.jpeg" alt="" width={24} height={24}></Image>
          <h5>National parks</h5>
        </li>
      </ul>
      <button>Filters</button>
    </div>
  );
}
