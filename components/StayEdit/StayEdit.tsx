"use client";
import { GuestStayType, StayModel, StayType } from "@/model/stay.model";
import { useCallback, useEffect, useState } from "react";
import styles from "./StayEdit.module.scss";
import StayEditType from "./StayEditType/StayEditType";
import StayEditShared from "./StayEditShared/StayEditShared";
import StayEditLocation from "./StayEditLocation/StayEditLocation";
import { LocationModel } from "@/model/location.model";
import { getUserLocation } from "@/service/locations.service";
import StayEditBasics from "./StayEditBasics/StayEditBasics";
import TransitionPage from "./TransitionPage/TransitionPage";
import { AmenityModel } from "@/model/amenity.model";
import StayEditAmenities from "./StayEditAmenities/StayEditAmenities";
import StayEditImages from "./StayEditImages/StayEditImages";

interface Props {
  stay: StayModel;
  dbAmenities: AmenityModel[];
}
export default function StayEdit({ stay, dbAmenities }: Props) {
  const [stage, setStage] = useState(10);
  const [stateStay, setStateStay] = useState<StayModel>(stay);
  console.log("stateStay:", stateStay);

  useEffect(() => {
    const { lat, lng } = stay.location;
    if (lat === 0 && lng === 0) {
      loadUserCoord();
    }
  }, []);

  const loadUserCoord = async () => {
    const { lat, lng } = await getUserLocation();
    setStateStay((prev) => {
      const location = { ...prev.location, lat, lng };
      return { ...prev, location };
    });
  };

  const handleStayType = (type: StayType) => {
    setStateStay((prev) => ({ ...prev, type }));
  };

  const handleStayShared = (guestStay: GuestStayType) => {
    setStateStay((prev) => ({ ...prev, guestStay }));
  };

  const handleLocation = (location: LocationModel) => {
    setStateStay((prev) => ({ ...prev, location }));
  };

  const handleBasics = (
    type: "capacity" | "bedRooms" | "baths",
    value: number
  ) => {
    if (type !== "bedRooms") {
      setStateStay((prev) => ({ ...prev, [type]: value }));
      return;
    }
    let bedRooms;
    if (value) {
      bedRooms = [...stateStay.bedRooms, { beds: [], image: "" }];
    } else {
      bedRooms = stateStay.bedRooms.slice(0, -1);
    }
    setStateStay((prev) => ({ ...prev, bedRooms }));
  };

  const handleAmenities = (amenity: Partial<AmenityModel>) => {
    const amenities = stateStay.amenities;
    const idx = amenities.findIndex((_amenity) => _amenity._id === amenity._id);
    if (idx === -1) {
      amenities.push(amenity as AmenityModel);
    } else {
      amenities.splice(idx, 1);
    }
    setStateStay((prev) => ({ ...prev, amenities }));
  };

  const handleImages = useCallback((imgUrl: string, isDelete: boolean) => {
    let images;
    if (isDelete) {
      images = stateStay.images.filter((img) => img !== imgUrl);
    } else {
      images = [...stateStay.images, imgUrl];
    }
    setStateStay((prev) => ({ ...prev, images }));
  }, []);

  const arrangeImages = useCallback((imgIdx: number, dir: number) => {
    if (imgIdx + dir < 0 || imgIdx + dir >= stateStay.images.length) return;
    const images = [...stateStay.images];
    const temp = images[imgIdx];
    images[imgIdx] = images[imgIdx + dir];
    images[imgIdx + dir] = temp;
    setStateStay((prev) => ({ ...prev, images }));
  }, []);

  const isDisabled =
    (stage === 4 && !stateStay.location.country) ||
    (stage === 5 &&
      (!stateStay.location.streetAddress ||
        !stateStay.location.city ||
        !stateStay.location.countryCode ||
        !stateStay.location.city)) ||
    (stage === 7 && stateStay.capacity < 1) ||
    (stage === 10 && stateStay.images.length < 5);

  const widthStyle = {
    width: `${(stage % 8) * 12.5}%`,
  };

  let checkedAmenities: string[] = [];
  if (stage === 9)
    checkedAmenities = stateStay.amenities.map((amenity) => amenity.name);
  return (
    <section className={styles.stayEdit}>
      {stage === 1 && <TransitionPage stage={stage} />}

      {stage === 2 && (
        <StayEditType type={stateStay.type} handleStayType={handleStayType} />
      )}

      {stage === 3 && (
        <StayEditShared
          guestStay={stateStay.guestStay!}
          handleStayShared={handleStayShared}
        />
      )}

      {stage >= 4 && stage <= 6 && (
        <StayEditLocation
          stage={stage}
          location={stateStay.location}
          setLocation={handleLocation}
          setStage={setStage}
        />
      )}

      {stage === 7 && (
        <StayEditBasics
          capacity={stateStay.capacity}
          bedRooms={stateStay.bedRooms.length}
          baths={stateStay.baths}
          handleBasic={handleBasics}
        />
      )}

      {stage === 8 && <TransitionPage stage={stage} />}

      {stage === 9 && (
        <StayEditAmenities
          amenities={dbAmenities}
          userAmenities={stateStay.amenities}
          handleAmenity={handleAmenities}
        />
      )}

      {stage === 10 && (
        <StayEditImages
          images={stateStay.images}
          setImages={handleImages}
          type={stateStay.type}
          arrangeImages={arrangeImages}
        />
      )}

      <div className={styles.editActions}>
        <div className={styles.progressBar}>
          <div className={styles.barGray}>
            <div
              style={stage < 8 ? widthStyle : { width: "100%" }}
              className={styles.barDark}
            ></div>
          </div>
          <div className={styles.barGray}>
            <div
              style={stage > 8 ? widthStyle : {}}
              className={styles.barDark}
            ></div>
          </div>
          <div className={styles.barGray}>
            <div
              style={stage > 16 ? widthStyle : {}}
              className={styles.barDark}
            ></div>
          </div>
        </div>
        <div className={styles.actionBtns}>
          <button
            className={stage <= 1 ? styles.disabled : ""}
            disabled={stage <= 1}
            onClick={() => setStage((prev) => prev - 1)}
          >
            Back
          </button>
          <button
            className={isDisabled ? styles.disabled : ""}
            disabled={isDisabled}
            onClick={() => setStage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
