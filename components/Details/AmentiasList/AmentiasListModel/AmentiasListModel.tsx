"use client";
import { AmenityModel, GroupedAmenities } from "@/model/amenity.model";
import styles from "./AmentiasListModel.module.scss";
import { useRef } from "react";
import { useModal } from "@/hooks/useModal";
import { DynamicSVG } from "@/components/svgs/svgs";

interface Props {
  amenities: AmenityModel[];
}

export default function AmentiasListModel({ amenities }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModal(modalRef, null);

  const groupedAmenities: GroupedAmenities = amenities.reduce<GroupedAmenities>(
    (acc, amenity) => {
      const { category } = amenity;
      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push({
        name: amenity.name,
        _id: amenity._id,
        path: amenity.path,
        viewBox: amenity.viewBox,
      });
      return acc;
    },
    {}
  );

  for (const category in groupedAmenities) {
    groupedAmenities[category].sort((a, b) => a.name.localeCompare(b.name));
  }
  return (
    <>
      <button className={styles.openBtn} onClick={() => setIsModelOpen(true)}>
        {`Show all ${amenities.length} amenities`}
      </button>
      {isModelOpen && (
        <div ref={modalRef} className={styles.amenitiesModel}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsModelOpen(false)}
          >
            X
          </button>
          <h2>What this place offers</h2>
          <ul>
            {Object.keys(groupedAmenities).map((category) => (
              <li key={category}>
                <h3>{category}</h3>
                <ul>
                  {groupedAmenities[category].map((amenity) => (
                    <li key={amenity._id}>
                      <DynamicSVG
                        path={amenity.path!}
                        viewBox={amenity.viewBox!}
                      />
                      <h4>{amenity.name}</h4>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
