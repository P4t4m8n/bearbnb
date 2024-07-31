"use client";
import { AmenityModel, GroupedAmenities } from "@/model/amenity.model";
import styles from "./AmentiasListModel.module.scss";
import { useMemo, useRef } from "react";
import { useModal } from "@/hooks/useModal";
import { DynamicSVG, PlusSVG } from "@/components/svgs/svgs";
import { groupAmenitiesByCategory } from "@/service/amenities.service";

interface Props {
  amenities: AmenityModel[];
}

export default function AmentiasListModel({ amenities }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isModelOpen, setIsModelOpen] = useModal(modalRef, null);

  const groupedAmenities: GroupedAmenities = useMemo(
    () => groupAmenitiesByCategory(amenities),
    [amenities]
  );

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
            <PlusSVG/>
          </button>
          <h2>What this place offers</h2>
          <ul className={styles.amenitiesGroupList}>
            {Object.keys(groupedAmenities).map((category) => (
              <li className={styles.amenitiesGroupCon} key={category}>
                <h3>{category}</h3>
                <ul className={styles.amenitiesList}>
                  {groupedAmenities[category].map((amenity) => (
                    <li className={styles.amenity} key={amenity._id}>
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
